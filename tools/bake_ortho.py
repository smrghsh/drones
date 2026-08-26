# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow", "pyproj", "scipy"]
# ///
"""Bake an orthomosaic from a Skydio 3D Scan's photos onto its coverage mesh.

    uv run tools/bake_ortho.py data/<scan-dir> --id test2 [--gsd 0.025]

For every texel of a top-down grid over the scan: look up the mesh height,
project the 3D point into each candidate photo (GPS-frame pose + calibrated
intrinsics + radial dewarp from the XMP), and take the colour from the photo
where it lands closest to the image centre. Writes:

    static/flights/<id>/ortho.jpg
    and adds "ortho": { file, bounds_m: {e_min, n_min, e_max, n_max} } (site-local
    metres) to static/flights/<id>.json
"""
import argparse, json, re, struct
from pathlib import Path
import numpy as np
from PIL import Image
from pyproj import Transformer
from scipy.interpolate import LinearNDInterpolator

REPO = Path(__file__).resolve().parent.parent
site = json.loads((REPO / "static/farm/site.json").read_text())
CRS = f"+proj=aeqd +lat_0={site['lat']} +lon_0={site['lon']} +datum=WGS84 +units=m +no_defs"
to_local = Transformer.from_crs("EPSG:4326", CRS, always_xy=True)

def xmp(path):
    b = Path(path).read_bytes(); i = b.find(b"<x:xmpmeta"); j = b.find(b"</x:xmpmeta>")
    x = b[i:j].decode("utf-8", "ignore")
    def vec(tag, ns="drone-skydio-3dscan"):
        m = re.search(rf"<{ns}:{tag}[^>]*>(.*?)</{ns}:{tag}>", x, re.S)
        return {k: float(v) for k, v in re.findall(rf"<{ns}:(\w)>([-\d.e]+)</{ns}:\1>", m.group(1))}
    def scalar(tag, ns="drone-skydio-3dscan"):
        return float(re.search(rf"<{ns}:{tag}>([-\d.e]+)</{ns}:{tag}>", x).group(1))
    p, q = vec("GpsFrameCameraPosition"), vec("GpsFrameCameraOrientationQuat")
    f, c = vec("CalibratedFocalLength", "drone-skydio"), vec("CalibratedOpticalCenter", "drone-skydio")
    k = [float(v) for v in re.search(r"<drone-skydio:DewarpData>([^<]+)<", x).group(1).split(",")]
    lin = (scalar("GpsLinearizationPointLatitude"), scalar("GpsLinearizationPointLongitude"), scalar("GpsLinearizationPointAltitude"))
    return dict(C=np.array([p["X"], p["Y"], p["Z"]]), q=np.array([q["X"], q["Y"], q["Z"], q["W"]]),
                fx=f["X"], fy=f["Y"], cx=c["X"], cy=c["Y"], k=k, lin=lin)

def quat_to_R(q):
    x, y, z, w = q / np.linalg.norm(q)
    return np.array([[1 - 2*(y*y + z*z), 2*(x*y - z*w), 2*(x*z + y*w)],
                     [2*(x*y + z*w), 1 - 2*(x*x + z*z), 2*(y*z - x*w)],
                     [2*(x*z - y*w), 2*(y*z + x*w), 1 - 2*(x*x + y*y)]])

def read_glb_positions(path):
    b = path.read_bytes()
    jl, = struct.unpack_from("<I", b, 12); g = json.loads(b[20:20 + jl]); bin_ = b[20 + jl + 8:]
    acc = g["accessors"][g["meshes"][0]["primitives"][0]["attributes"]["POSITION"]]
    bv = g["bufferViews"][acc["bufferView"]]
    off = bv.get("byteOffset", 0) + acc.get("byteOffset", 0)
    return np.frombuffer(bin_, np.float32, acc["count"] * 3, off).reshape(-1, 3).astype(np.float64)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("scan_dir"); ap.add_argument("--id", required=True)
    ap.add_argument("--gsd", type=float, default=0.025); ap.add_argument("--max-dist", type=float, default=12.0)
    a = ap.parse_args()
    D = Path(a.scan_dir); fid = a.id
    fjson = REPO / "static/flights" / f"{fid}.json"; flight = json.loads(fjson.read_text())

    photos = sorted(D.glob("S*.JPG"))
    cams = {p.name: xmp(p) for p in photos}
    lin = next(iter(cams.values()))["lin"]
    lin_e, lin_n = to_local.transform(lin[1], lin[0])
    print(f"{len(cams)} photos; GPS frame origin {lin[0]:.6f},{lin[1]:.6f} @ {lin[2]:.2f} m -> site E {lin_e:.1f} N {lin_n:.1f}")

    # --- camera axis convention self-check --------------------------------
    # GpsFrameCameraOrientationQuat is OpenCV-style: z = optical axis, x = right,
    # y = down. On a nadir photo R@z must point down (0,0,-1).
    c0 = cams[photos[len(photos) // 2].name]; R0 = quat_to_R(c0["q"])
    print("optical-axis check: R@z =", np.round(R0 @ [0, 0, 1], 2), "(expect ~[0,0,-1] for nadir)")

    # --- mesh vertices: map frame -> GPS ENU frame ---------------------------
    m = flight["mesh"]; yaw = np.radians(m["yaw_deg"])
    o_e, o_n = to_local.transform(m["origin"]["lon"], m["origin"]["lat"])
    V = read_glb_positions(REPO / "static/flights" / fid / "mesh.glb")
    Rz = np.array([[np.cos(yaw), -np.sin(yaw)], [np.sin(yaw), np.cos(yaw)]])
    en = V[:, :2] @ Rz.T + np.array([o_e - lin_e, o_n - lin_n])
    up = V[:, 2] + (m["origin"]["alt_msl"] - lin[2])
    P3 = np.column_stack([en, up])

    # --- ortho grid over the camera footprint -------------------------------
    Cs = np.array([c["C"] for c in cams.values()])
    pad = 6.0
    e0, e1 = Cs[:, 0].min() - pad, Cs[:, 0].max() + pad
    n0, n1 = Cs[:, 1].min() - pad, Cs[:, 1].max() + pad
    W, H = int((e1 - e0) / a.gsd), int((n1 - n0) / a.gsd)
    es = e0 + (np.arange(W) + 0.5) * a.gsd; ns = n1 - (np.arange(H) + 0.5) * a.gsd  # row 0 = north
    EE, NN = np.meshgrid(es, ns)
    print(f"ortho {W}x{H} @ {a.gsd*100:.1f} cm; interpolating mesh height...")
    Z = LinearNDInterpolator(P3[:, :2], P3[:, 2])(EE, NN)
    valid = ~np.isnan(Z)
    print(f"  {valid.mean()*100:.0f}% of texels over the mesh")

    ortho = np.zeros((H, W, 3), np.uint8); best = np.full((H, W), np.inf)
    SCALE = 0.5  # sample photos at half resolution (2028x1520): still ~1 mm/px at 3 m
    for i, (name, c) in enumerate(cams.items()):
        R = quat_to_R(c["q"]); C = c["C"]
        # candidate texels: within max-dist horizontally
        r = a.max_dist
        cols = slice(max(0, int((C[0] - r - e0) / a.gsd)), min(W, int((C[0] + r - e0) / a.gsd)))
        rows = slice(max(0, int((n1 - C[1] - r) / a.gsd)), min(H, int((n1 - C[1] + r) / a.gsd)))
        sub = valid[rows, cols]
        if not sub.any(): continue
        Pw = np.stack([EE[rows, cols][sub], NN[rows, cols][sub], Z[rows, cols][sub]], -1)
        pc = (Pw - C) @ R  # world -> camera (R^T applied to rows)
        depth = pc[:, 2]; ok = depth > 0.3
        xn = pc[:, 0] / np.where(ok, depth, 1); yn = pc[:, 1] / np.where(ok, depth, 1)  # x right, y down
        r2 = xn * xn + yn * yn; k1, k2, k3 = c["k"]
        f = 1 + k1 * r2 + k2 * r2**2 + k3 * r2**3
        u = c["cx"] + c["fx"] * xn * f; v = c["cy"] + c["fy"] * yn * f
        Wimg, Himg = 4056, 3040
        ok &= (u >= 0) & (u < Wimg - 1) & (v >= 0) & (v < Himg - 1)
        if not ok.any(): continue
        score = np.where(ok, r2 + 0.02 * depth, np.inf)
        cur = best[rows, cols][sub]
        better = score < cur
        if not better.any(): continue
        try:
            im = Image.open(D / name); im.draft("RGB", (Wimg // 2, Himg // 2)); im = im.convert("RGB")
        except Exception:
            print(f"  ! {name}: corrupt JPEG, skipped"); continue
        if im.size != (Wimg // 2, Himg // 2): im = im.resize((Wimg // 2, Himg // 2))
        px = np.asarray(im)
        ui = np.clip((u[better] * SCALE).astype(int), 0, px.shape[1] - 1); vi = np.clip((v[better] * SCALE).astype(int), 0, px.shape[0] - 1)
        # scatter back
        rr, cc = np.nonzero(sub); rr = rr[better] + rows.start; cc = cc[better] + cols.start
        ortho[rr, cc] = px[vi, ui]; best[rr, cc] = score[better]
        if i % 40 == 0: print(f"  {i}/{len(cams)} {name}: {better.sum()} texels")
    covered = np.isfinite(best)
    print(f"covered {covered.mean()*100:.0f}% of grid, {covered[valid].mean()*100:.0f}% of mesh texels")
    # alpha-less JPEG: fill uncovered with mid grey (shader falls back by bounds only)
    out_dir = REPO / "static/flights" / fid
    Image.fromarray(ortho).save(out_dir / "ortho.jpg", quality=85)
    Image.fromarray((covered * 255).astype(np.uint8)).resize((W // 4, H // 4)).save(out_dir / "ortho_mask.png")
    flight["ortho"] = dict(file=f"./flights/{fid}/ortho.jpg", mask=f"./flights/{fid}/ortho_mask.png",
                           bounds_m=dict(e_min=e0 + lin_e, e_max=e1 + lin_e, n_min=n0 + lin_n, n_max=n1 + lin_n),
                           gsd_m=a.gsd, px=[W, H])
    fjson.write_text(json.dumps(flight))
    print("wrote", out_dir / "ortho.jpg", (out_dir / "ortho.jpg").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
