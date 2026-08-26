# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow", "pyproj"]
# ///
"""Reconstruct a Skydio 3D Scan ourselves: COLMAP SfM -> OpenMVS textured mesh
and a Brush Gaussian splat, georeferenced from the photo geotags.

    uv run tools/reconstruct.py data/<scan-dir> --id strip1 --stage sfm      # COLMAP sparse (CPU; ~1 h / 700 photos)
    uv run tools/reconstruct.py data/<scan-dir> --id strip1 --stage mesh     # OpenMVS densify + mesh + texture -> static/flights/<id>/recon.glb
    uv run tools/reconstruct.py data/<scan-dir> --id strip1 --stage splat    # Brush 3DGS -> static/flights/<id>/splat.ply (+ .spz if spz is installed)
    uv run tools/reconstruct.py data/<scan-dir> --id strip1 --stage all

Work dirs live in tools/cache/recon/<id>/ (git-ignored). The sparse model is
aligned to a local ENU frame (metres) whose origin is the mean geotag, so the
outputs drop into the app exactly like the Skydio coverage mesh:
"recon": { file, origin: {lat, lon, alt_msl}, yaw_deg: 0 } (frame is already
east/north/up). Corrupt photos are skipped.

Tools: colmap 4.x (brew), OpenMVS binaries (DensifyPointCloud, ReconstructMesh,
TextureMesh — built from source, see --openmvs-bin), brush_app (cargo).
"""
import argparse, json, os, re, shutil, struct, subprocess, sys, time
from pathlib import Path
import numpy as np
from PIL import Image
from pyproj import Transformer

REPO = Path(__file__).resolve().parent.parent
FLIGHTS = REPO / "static" / "flights"
CACHE = REPO / "tools" / "cache" / "recon"
site = json.loads((REPO / "static/farm/site.json").read_text())
to_wgs = Transformer.from_crs(f"+proj=aeqd +lat_0={site['lat']} +lon_0={site['lon']} +datum=WGS84 +units=m +no_defs", "EPSG:4326", always_xy=True)

def sh(cmd, log=None, **kw):
    print("$", " ".join(map(str, cmd))[:200], flush=True)
    t = time.time()
    with open(log, "a") if log else open(os.devnull, "w") as f:
        r = subprocess.run([str(c) for c in cmd], stdout=f if log else None, stderr=subprocess.STDOUT if log else None, **kw)
    print(f"  -> exit {r.returncode} in {time.time() - t:.0f}s", flush=True)
    if r.returncode: sys.exit(f"failed: {cmd[0]} (see {log})")

def good_photos(D):
    names = []
    for p in sorted(D.glob("S*.JPG")):
        try: Image.open(p).verify(); names.append(p.name)
        except Exception: print("  skip corrupt", p.name)
    return names

def geotags(D, names):
    rows = [l.strip().split(",") for l in (D / "Pix4D_geolocation.csv").read_text().splitlines() if l.strip()]
    csv = {r[0]: list(map(float, r[1:4])) for r in rows}  # lat, lon, alt
    return {n: csv[n] for n in names if n in csv}

# ---------------------------------------------------------------- SfM
def stage_sfm(D, W, a):
    img = W / "images"; img.mkdir(parents=True, exist_ok=True)
    names = good_photos(D)
    for n in names:
        dst = img / n
        if not dst.exists(): os.symlink((D / n).resolve(), dst)
    db = W / "database.db"; log = W / "colmap.log"
    tags = geotags(D, names)
    # ENU reference for model_aligner: origin = mean geotag
    lat0 = float(np.mean([v[0] for v in tags.values()])); lon0 = float(np.mean([v[1] for v in tags.values()]))
    (W / "geo.txt").write_text("".join(f"{n} {v[0]} {v[1]} {v[2]}\n" for n, v in tags.items()))
    (W / "origin.json").write_text(json.dumps(dict(lat=lat0, lon=lon0)))
    if not db.exists():
        sh(["colmap", "feature_extractor", "--database_path", db, "--image_path", img,
            "--ImageReader.camera_model", "OPENCV", "--ImageReader.single_camera", "1",
            "--FeatureExtraction.use_gpu", "0", "--FeatureExtraction.max_image_size", str(a.max_image_size),
            "--FeatureExtraction.num_threads", str(a.threads)], log)
        # GPS-aware matching: only pairs that are physically close
        sh(["colmap", "spatial_matcher", "--database_path", db, "--FeatureMatching.use_gpu", "0",
            "--SpatialMatching.max_num_neighbors", "40", "--SpatialMatching.max_distance", "25",
            "--FeatureMatching.num_threads", str(a.threads)], log)
    sparse = W / "sparse"; sparse.mkdir(exist_ok=True)
    if not (sparse / "0" / "images.bin").exists():
        sh(["colmap", "mapper", "--database_path", db, "--image_path", img, "--output_path", sparse,
            "--Mapper.ba_refine_principal_point", "1", "--Mapper.num_threads", str(a.threads)], log)
    # pick the largest model, align to ENU metres
    models = sorted(sparse.glob("[0-9]*"), key=lambda p: (p / "images.bin").stat().st_size, reverse=True)
    best = models[0]; print("models:", [m.name for m in models], "-> using", best.name)
    enu = W / "sparse_enu"; enu.mkdir(exist_ok=True)
    sh(["colmap", "model_aligner", "--input_path", best, "--output_path", enu, "--ref_images_path", W / "geo.txt",
        "--ref_is_gps", "1", "--alignment_type", "enu", "--alignment_max_error", "3"], log)
    sh(["colmap", "model_converter", "--input_path", enu, "--output_path", enu, "--output_type", "TXT"], log)
    report_sparse(enu, tags, lat0, lon0)

def read_images_txt(enu):
    poses = {}
    for line in (enu / "images.txt").read_text().splitlines():
        if line.startswith("#") or not line.strip(): continue
        p = line.split()
        if len(p) >= 10 and p[-1].upper().endswith(".JPG"):
            q = np.array(list(map(float, p[1:5]))); t = np.array(list(map(float, p[5:8])))
            # camera centre C = -R^T t
            w, x, y, z = q
            R = np.array([[1 - 2*(y*y + z*z), 2*(x*y - z*w), 2*(x*z + y*w)],
                          [2*(x*y + z*w), 1 - 2*(x*x + z*z), 2*(y*z - x*w)],
                          [2*(x*z - y*w), 2*(y*z + x*w), 1 - 2*(x*x + y*y)]])
            poses[p[-1]] = -R.T @ t
    return poses

def report_sparse(enu, tags, lat0, lon0):
    poses = read_images_txt(enu)
    R = 6378137; d2r = np.pi / 180
    err = []
    for n, C in poses.items():
        if n not in tags: continue
        lat, lon, alt = tags[n]
        e = (lon - lon0) * d2r * R * np.cos(lat0 * d2r); nn = (lat - lat0) * d2r * R
        err.append(np.linalg.norm(C[:2] - [e, nn]))
    # COLMAP's ENU origin is not necessarily the mean geotag: measure the offset
    # (model coords -> metres east/north/up of the mean geotag) and store it.
    diffs = []
    for n, C in poses.items():
        if n not in tags: continue
        lat, lon, alt = tags[n]
        e = (lon - lon0) * d2r * R * np.cos(lat0 * d2r); nn = (lat - lat0) * d2r * R
        diffs.append([e - C[0], nn - C[1], alt - C[2]])
    off = np.median(np.array(diffs), axis=0)
    err = [np.linalg.norm((C[:2] + off[:2]) - [(tags[n][1] - lon0) * d2r * R * np.cos(lat0 * d2r), (tags[n][0] - lat0) * d2r * R]) for n, C in poses.items() if n in tags]
    zs = [C[2] + off[2] for C in poses.values()]
    print(f"registered {len(poses)}/{len(tags)} images; horizontal residual vs geotags {np.mean(err):.2f} m (median {np.median(err):.2f}); camera z {min(zs):.1f}..{max(zs):.1f} m MSL")
    print(f"ENU origin {lat0:.7f}, {lon0:.7f}; model offset (e, n, up) = {np.round(off, 2).tolist()} m")
    W = enu.parent
    (W / "origin.json").write_text(json.dumps(dict(lat=lat0, lon=lon0, offset_m=[float(v) for v in off])))

# ---------------------------------------------------------------- mesh (OpenMVS)
def stage_mesh(D, W, a, fid):
    B = Path(a.openmvs_bin)
    enu = W / "sparse_enu"; mvs = W / "mvs"; mvs.mkdir(exist_ok=True); log = W / "openmvs.log"
    # OpenMVS wants undistorted images from COLMAP
    und = W / "undistorted"
    if not (und / "sparse").exists():
        sh(["colmap", "image_undistorter", "--image_path", W / "images", "--input_path", enu, "--output_path", und,
            "--output_type", "COLMAP", "--max_image_size", str(a.max_image_size)], log)
    scene = mvs / "scene.mvs"
    if not scene.exists():
        sh([B / "InterfaceCOLMAP", "-i", und, "-o", scene, "--image-folder", und / "images"], log, cwd=mvs)
    dense = mvs / "scene_dense.mvs"
    if not dense.exists():
        sh([B / "DensifyPointCloud", scene, "-o", dense, "--resolution-level", "2", "--number-views-fuse", "3",
            "--max-threads", str(a.threads)], log, cwd=mvs)
    meshf = mvs / "scene_dense_mesh.mvs"
    if not meshf.exists():
        sh([B / "ReconstructMesh", dense, "-o", meshf, "--decimate", "0.5", "--max-threads", str(a.threads)], log, cwd=mvs)
    tex = mvs / "scene_dense_mesh_texture.mvs"
    if not (mvs / "scene_dense_mesh_texture.glb").exists():
        sh([B / "TextureMesh", meshf, "-o", tex, "--export-type", "glb", "--max-texture-size", "8192",
            "--max-threads", str(a.threads)], log, cwd=mvs)
    out = FLIGHTS / fid; out.mkdir(exist_ok=True)
    shutil.copy(mvs / "scene_dense_mesh_texture.glb", out / "recon.glb")
    register(fid, "recon", f"./flights/{fid}/recon.glb", W)
    print("wrote", out / "recon.glb", (out / "recon.glb").stat().st_size // 1024, "KB")

# ---------------------------------------------------------------- splat (Brush)
def stage_splat(D, W, a, fid):
    enu = W / "sparse_enu"; ds = W / "brush"; ds.mkdir(exist_ok=True); log = W / "brush.log"
    # Brush reads a COLMAP dataset: images/ + sparse/0/{cameras,images,points3D}.bin
    sp = ds / "sparse" / "0"; sp.mkdir(parents=True, exist_ok=True)
    for f in ("cameras.bin", "images.bin", "points3D.bin"): shutil.copy(enu / f, sp / f)
    if not (ds / "images").exists(): os.symlink((W / "images").resolve(), ds / "images")
    outd = ds / "out"; outd.mkdir(exist_ok=True)
    sh([a.brush_bin, ds, "--total-steps", str(a.splat_steps), "--max-resolution", str(a.splat_res),
        "--export-path", outd, "--export-every", str(a.splat_steps), "--export-name", "splat.ply"], log)
    ply = sorted(outd.glob("*.ply"), key=lambda p: p.stat().st_mtime)[-1]
    out = FLIGHTS / fid; out.mkdir(exist_ok=True)
    shutil.copy(ply, out / "splat.ply")
    register(fid, "splat", f"./flights/{fid}/splat.ply", W)
    print("wrote", out / "splat.ply", (out / "splat.ply").stat().st_size // 1024, "KB")

def register(fid, key, file, W):
    o = json.loads((W / "origin.json").read_text())
    fj = FLIGHTS / f"{fid}.json"; flight = json.loads(fj.read_text())
    flight[key] = dict(file=file, origin=dict(lat=o["lat"], lon=o["lon"], alt_msl=0.0), offset_m=o.get("offset_m", [0, 0, 0]),
                       yaw_deg=0.0, frame="enu_msl")
    fj.write_text(json.dumps(flight))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("scan_dir"); ap.add_argument("--id", required=True)
    ap.add_argument("--stage", default="all", choices=["sfm", "mesh", "splat", "all"])
    ap.add_argument("--max-image-size", type=int, default=2400)
    ap.add_argument("--threads", type=int, default=max(1, (os.cpu_count() or 4) - 2))
    ap.add_argument("--openmvs-bin", default=str(REPO / "tools/cache/openmvs/build/bin"))
    ap.add_argument("--brush-bin", default=os.environ.get("BRUSH_BIN", str(Path.home() / ".cargo/bin/brush_app")))
    ap.add_argument("--splat-steps", type=int, default=30000); ap.add_argument("--splat-res", type=int, default=1600)
    a = ap.parse_args()
    D = Path(a.scan_dir); W = CACHE / a.id; W.mkdir(parents=True, exist_ok=True)
    if a.stage in ("sfm", "all"): stage_sfm(D, W, a)
    if a.stage in ("mesh", "all"): stage_mesh(D, W, a, a.id)
    if a.stage in ("splat", "all"): stage_splat(D, W, a, a.id)

if __name__ == "__main__":
    main()
