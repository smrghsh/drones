# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow", "trimesh"]
# ///
"""Reconstruct a flight with Apple Object Capture instead of COLMAP/OpenMVS.

    uv run tools/recon_mac.py --id tomato2d --scan data/<scan-dir> \
        --videos data/S1010983.MP4 [--stage frames|mesh|publish|all] [--detail medium]

macOS-only replacement for reconstruct.py's sfm+mesh stages: RealityKit
PhotogrammetrySession (tools/objcap.swift, compiled on first use) does SfM and
meshing on-device in minutes. Inputs are the geotagged photos of a Skydio scan
export plus, optionally, sharp frames pulled from flight videos:

  frames   score every video frame for sharpness (Laplacian variance on a
           cheap 480px grayscale decode), keep the sharpest per --frame-window
           seconds, re-extract those frames at full resolution.
  mesh     symlink scan photos (every --scan-every'th) + frames into one image
           set, run objcap -> model.obj (usdz fallback) + per-image poses.
  publish  similarity-fit (Umeyama) the poses of the geotagged photos against
           their geotags -> model-to-ENU-metres transform; bake it into the
           mesh and write static/flights/<id>/recon.glb (meshopt+webp via
           gltf-transform), registered in the flight JSON like reconstruct.py:
           "recon": { file, origin, offset_m, yaw_deg: 0, frame: "enu_msl" }.

Work dir: tools/cache/recon_mac/<id>/ (git-ignored). Needs ffmpeg + Xcode CLT;
falls back to Blender for usdz->glb if Apple refuses the .obj output request.
"""
import argparse, json, math, os, shutil, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import numpy as np

REPO = Path(__file__).resolve().parent.parent
FLIGHTS = REPO / "static" / "flights"
CACHE = REPO / "tools" / "cache" / "recon_mac"
EARTH_R, D2R = 6378137.0, math.pi / 180

def sh(cmd, **kw):
    print("$", " ".join(map(str, cmd))[:180], flush=True)
    subprocess.run([str(c) for c in cmd], check=True, **kw)

# ---------------------------------------------------------------- frames
def probe(video):
    j = json.loads(subprocess.run(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", str(video)],
                                  capture_output=True, text=True, check=True).stdout)
    v = next(s for s in j["streams"] if s["codec_type"] == "video" and s["codec_name"] != "mjpeg")
    return float(j["format"]["duration"]), int(v["width"]), int(v["height"])

def sharpness_scores(video, scan_fps, w, h):
    """(t, Laplacian variance) for every scored frame, via a cheap grayscale decode."""
    sw = 480; sh_ = max(2, round(h * sw / w / 2) * 2)
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-hwaccel", "videotoolbox", "-i", str(video),
                          "-vf", f"fps={scan_fps},scale={sw}:{sh_},format=gray", "-f", "rawvideo", "-"],
                         stdout=subprocess.PIPE)
    scores, i, n = [], 0, sw * sh_
    while chunk := p.stdout.read(n):
        if len(chunk) < n: break
        f = np.frombuffer(chunk, np.uint8).reshape(sh_, sw).astype(np.float32)
        lap = -4 * f[1:-1, 1:-1] + f[:-2, 1:-1] + f[2:, 1:-1] + f[1:-1, :-2] + f[1:-1, 2:]
        scores.append((i / scan_fps, float(lap.var())))
        i += 1
    p.wait()
    return scores

def stage_frames(a, W):
    img = W / "images"; img.mkdir(parents=True, exist_ok=True)
    for vi, video in enumerate(a.videos):
        video = Path(video)
        dur, w, h = probe(video)
        scores = sharpness_scores(video, a.scan_fps, w, h)
        best = {}
        for t, s in scores:
            k = int(t / a.frame_window)
            if k not in best or s > best[k][1]: best[k] = (t, s)
        picks = sorted(t for t, _ in best.values())
        print(f"{video.name}: {dur:.0f}s, scored {len(scores)} frames -> {len(picks)} sharp picks")
        def grab(j_t):
            j, t = j_t
            out = img / f"v{vi}_{j:04d}.jpg"
            if not out.exists():
                subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", str(video),
                                "-frames:v", "1", "-q:v", "2", str(out)], check=True)
        with ThreadPoolExecutor(4) as ex:
            list(ex.map(grab, enumerate(picks)))

# ---------------------------------------------------------------- mesh
def geotags(scan_dir):
    csv = {}
    for line in (Path(scan_dir) / "Pix4D_geolocation.csv").read_text().splitlines():
        p = line.strip().split(",")
        if len(p) >= 4: csv[p[0]] = (float(p[1]), float(p[2]), float(p[3]))  # lat, lon, alt MSL
    return csv

def objcap_bin():
    src, bin = REPO / "tools/objcap.swift", CACHE / "objcap"
    if not bin.exists() or bin.stat().st_mtime < src.stat().st_mtime:
        sh(["xcrun", "swiftc", "-O", "-parse-as-library", src, "-o", bin])
    return bin

def stage_mesh(a, W):
    img = W / "images"; img.mkdir(parents=True, exist_ok=True)
    if a.scan:
        for i, n in enumerate(sorted(geotags(a.scan))):
            if i % a.scan_every: continue
            dst = img / n
            if not dst.exists(): os.symlink((Path(a.scan) / n).resolve(), dst)
    n_img = len(list(img.iterdir()))
    print(f"photogrammetry: {n_img} images, detail={a.detail}")
    for out in (W / "model.obj", W / "model.usdz"):  # Apple may refuse obj; usdz + Blender is the fallback
        try:
            sh([objcap_bin(), img, out, a.detail, W / "poses.json"])
            return
        except subprocess.CalledProcessError:
            print(f"objcap failed for {out.name}" + ("; retrying as usdz" if out.suffix == ".obj" else ""))
    sys.exit("photogrammetry failed")

# ---------------------------------------------------------------- publish
def umeyama(src, dst):
    """Similarity transform (s, R, t): dst ≈ s·R·src + t."""
    mu_s, mu_d = src.mean(0), dst.mean(0)
    S, D = src - mu_s, dst - mu_d
    C = D.T @ S / len(src)
    U, sig, Vt = np.linalg.svd(C)
    d = np.sign(np.linalg.det(U @ Vt)) or 1.0
    R = U @ np.diag([1, 1, d]) @ Vt
    s = (sig * [1, 1, d]).sum() / (S ** 2).sum() * len(src)
    return s, R, mu_d - s * R @ mu_s

def model_glb(W):
    obj, usdz, glb = W / "model.obj", W / "model.usdz", W / "model_raw.glb"
    if obj.exists(): return obj
    if glb.exists(): return glb
    # a .usdz is an uncompressed zip; Blender < 4.0 only reads the inner .usdc
    import zipfile
    ext = W / "usd"; ext.mkdir(exist_ok=True)
    with zipfile.ZipFile(usdz) as z: z.extractall(ext)
    usd = next(p for p in ext.rglob("*.usd*") if p.suffix in (".usd", ".usda", ".usdc"))
    blender = shutil.which("blender") or "/Applications/Blender.app/Contents/MacOS/Blender"
    expr = (f"import bpy; bpy.ops.wm.read_factory_settings(use_empty=True); "
            f"bpy.ops.wm.usd_import(filepath='{usd}'); "
            f"bpy.ops.export_scene.gltf(filepath='{glb}', export_format='GLB')")
    sh([blender, "-b", "--python-expr", expr])
    return glb

def stage_publish(a, W, fid):
    import trimesh
    poses = json.loads((W / "poses.json").read_text())
    tags = geotags(a.scan)
    names = [n for n in poses if n in tags]
    if len(names) < 4: sys.exit(f"only {len(names)} geotagged images have poses — cannot georeference")
    lat0 = float(np.mean([tags[n][0] for n in names])); lon0 = float(np.mean([tags[n][1] for n in names]))
    enu = np.array([[(tags[n][1] - lon0) * D2R * EARTH_R * math.cos(lat0 * D2R),
                     (tags[n][0] - lat0) * D2R * EARTH_R, tags[n][2]] for n in names])
    mdl = np.array([poses[n]["t"] for n in names])
    s, R, t = umeyama(mdl, enu)
    resid = np.linalg.norm((s * mdl @ R.T + t) - enu, axis=1)
    print(f"georef: {len(names)} poses, scale {s:.4f}, residual mean {resid.mean():.2f} m (median {np.median(resid):.2f})")

    scene = trimesh.load(model_glb(W))
    # unit sanity: mesh and poses must share the model frame (Blender can rescale on USD import)
    ext_mesh = np.ptp(scene.bounds, axis=0).max(); ext_pose = np.ptp(mdl, axis=0).max()
    ratio = ext_mesh / ext_pose
    for f in (100.0, 0.01):
        if 0.5 < ratio / f < 2.0:
            print(f"unit mismatch (mesh/poses extent ratio {ratio:.3g}) — rescaling mesh by {1 / f}")
            scene.apply_scale(1 / f); ratio /= f
    if not 0.2 < ratio < 20: sys.exit(f"mesh extent {ext_mesh:.3g} vs pose extent {ext_pose:.3g} — frames disagree, aborting")
    T = np.eye(4); T[:3, :3] = s * R; T[:3, 3] = t
    if isinstance(scene, trimesh.Scene): scene.apply_transform(T)
    else: scene.apply_transform(T); scene = trimesh.Scene(scene)
    raw = W / "recon_raw.glb"; raw.write_bytes(scene.export(file_type="glb"))
    opt = W / "recon_opt.glb"
    sh(["npx", "-y", "@gltf-transform/cli", "optimize", raw, opt,
        "--compress", "meshopt", "--texture-compress", "webp", "--texture-size", "4096"])
    out = FLIGHTS / fid; out.mkdir(exist_ok=True)
    shutil.copy(opt, out / "recon.glb")
    fj = FLIGHTS / f"{fid}.json"; flight = json.loads(fj.read_text())
    flight["recon"] = dict(file=f"./flights/{fid}/recon.glb", origin=dict(lat=lat0, lon=lon0, alt_msl=0.0),
                           offset_m=[0, 0, 0], yaw_deg=0.0, frame="enu_msl")
    fj.write_text(json.dumps(flight))
    sh(["uv", "run", REPO / "tools/chunk_assets.py", out / "recon.glb"])
    print("wrote", out / "recon.glb", (out / "recon.glb").stat().st_size // 1024, "KB")

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--id", required=True, help="flight id (static/flights/<id>.json must exist)")
    ap.add_argument("--scan", required=True, help="Skydio export dir with geotagged photos (georeference source)")
    ap.add_argument("--videos", nargs="*", default=[], help="flight videos to mine for sharp frames")
    ap.add_argument("--stage", default="all", choices=["frames", "mesh", "publish", "all"])
    ap.add_argument("--detail", default="medium", choices=["preview", "reduced", "medium", "full", "raw"])
    ap.add_argument("--frame-window", type=float, default=2.0, help="seconds per selected video frame")
    ap.add_argument("--scan-fps", type=float, default=6.0, help="sharpness-scoring decode rate")
    ap.add_argument("--scan-every", type=int, default=1, help="use every Nth scan photo")
    a = ap.parse_args()
    W = CACHE / a.id; W.mkdir(parents=True, exist_ok=True)
    if a.stage in ("frames", "all") and a.videos: stage_frames(a, W)
    if a.stage in ("mesh", "all"): stage_mesh(a, W)
    if a.stage in ("publish", "all"): stage_publish(a, W, a.id)

if __name__ == "__main__":
    main()
