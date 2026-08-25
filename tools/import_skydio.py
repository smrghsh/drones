# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow", "pyproj"]
# ///
"""Import a Skydio 3D Scan export into static/flights/.

    uv run tools/import_skydio.py data/<scan-dir> [--id my-scan] [--name "..."]

Reads Pix4D_geolocation.csv (lat, lon, alt MSL, omega, phi, kappa), per-photo
XMP (yaw/pitch/roll, capture time), scan_output.pbuf (local camera positions,
used to recover the scan's local frame) and coverage_within_params.gltf (the
vertex-coloured scan mesh). Writes:

    static/flights/<id>.json          same shape as gen_flights.py, plus "mesh"
    static/flights/<id>/NNN.jpg       480x360 thumbnails (full-res stays in data/)
    static/flights/<id>/mesh.glb      scan mesh, local frame (z-up, metres)

"mesh": { file, origin: {lat, lon, alt_msl}, yaw_deg } — the local frame is
gravity-aligned; yaw_deg rotates local +x toward east (fit by Procrustes against
the geotags). The importer registers the flight in static/flights/index.json.
"""
import argparse, base64, json, re, struct, sys
from pathlib import Path
import numpy as np
from PIL import Image
from pyproj import Transformer

REPO = Path(__file__).resolve().parent.parent
FLIGHTS = REPO / "static" / "flights"
site = json.loads((REPO / "static/farm/site.json").read_text())
CRS = f"+proj=aeqd +lat_0={site['lat']} +lon_0={site['lon']} +datum=WGS84 +units=m +no_defs"
to_local = Transformer.from_crs("EPSG:4326", CRS, always_xy=True)
to_wgs = Transformer.from_crs(CRS, "EPSG:4326", always_xy=True)

def xmp_tags(path):
    x = Image.open(path).info.get("xmp", b"").decode("utf-8", "ignore")
    return dict(re.findall(r'drone-skydio:(\w+)="([^"]*)"', x))

def gltf_to_glb(src: Path, dst: Path):
    g = json.loads(src.read_text())
    blobs = []
    for b in g["buffers"]:
        uri = b["uri"]; assert uri.startswith("data:")
        blobs.append(base64.b64decode(uri.split(",", 1)[1]))
    # merge into one buffer, fix bufferViews
    bin_, offsets = bytearray(), []
    for blob in blobs:
        offsets.append(len(bin_)); bin_ += blob; bin_ += b"\0" * (-len(bin_) % 4)
    for bv in g["bufferViews"]:
        bv["byteOffset"] = bv.get("byteOffset", 0) + offsets[bv["buffer"]]; bv["buffer"] = 0
    g["buffers"] = [{"byteLength": len(bin_)}]
    js = json.dumps(g, separators=(",", ":")).encode(); js += b" " * (-len(js) % 4)
    with open(dst, "wb") as f:
        f.write(struct.pack("<III", 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(bin_)))
        f.write(struct.pack("<II", len(js), 0x4E4F534A)); f.write(js)
        f.write(struct.pack("<II", len(bin_), 0x004E4942)); f.write(bin_)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("scan_dir"); ap.add_argument("--id"); ap.add_argument("--name")
    a = ap.parse_args()
    D = Path(a.scan_dir)
    fid = a.id or re.sub(r"[^a-z0-9]+", "-", D.name.split("__")[0].lower()).strip("-")
    out = FLIGHTS / fid; out.mkdir(parents=True, exist_ok=True)

    rows = [l.strip().split(",") for l in (D / "Pix4D_geolocation.csv").read_text().splitlines() if l.strip()]
    csv = {r[0]: list(map(float, r[1:])) for r in rows}
    names = sorted(csv)

    # local frame from pbuf camera positions
    b = (D / "scan_output.pbuf").read_bytes(); pairs = []
    for m in re.finditer(rb"(S\d{7}\.JPG)", b):
        n = m.group(1).decode(); seg = b[m.end():m.end() + 3000]
        k = re.search(rb'global_map_t_camera\\?": \{\\?"data\\?": \[([^\]]+)\]', seg)
        if k and n in csv: pairs.append((n, [float(v) for v in k.group(1).split(b",")]))
    P = np.array([p[1] for p in pairs]); Q = np.array([to_local.transform(csv[n][1], csv[n][0]) for n, _ in pairs])
    pc = P[:, :2] - P[:, :2].mean(0); qc = Q - Q.mean(0)
    U, s, Vt = np.linalg.svd(pc.T @ qc); R = (U @ Vt).T
    if np.linalg.det(R) < 0: Vt[-1] *= -1; R = (U @ Vt).T
    yaw = float(np.degrees(np.arctan2(R[1, 0], R[0, 0])))
    t = Q.mean(0) - R @ P[:, :2].mean(0)
    z0 = float(np.mean([csv[n][2] - p[2] for n, p in pairs]))
    resid = float(np.linalg.norm((P[:, :2] @ R.T + t) - Q, axis=1).mean())
    lon0, lat0 = to_wgs.transform(t[0], t[1])
    print(f"frame: {len(pairs)} poses, yaw {yaw:.2f}°, origin {lat0:.6f},{lon0:.6f} @ {z0:.1f} m, resid {resid:.2f} m")

    # samples + waypoints
    tags = {n: xmp_tags(D / n) for n in names}
    t0 = min(int(tags[n].get("CaptureUtime", 0)) for n in names)
    date = None
    waypoints, samples = [], []
    for i, n in enumerate(names):
        lat, lon, alt, omega, phi, kappa = csv[n]
        tg = tags[n]; tsec = (int(tg.get("CaptureUtime", 0)) - t0) / 1e6
        waypoints.append(dict(lat=round(lat, 7), lon=round(lon, 7), alt_msl=round(alt, 2), t=round(tsec, 1)))
        thumb = out / f"{i:03d}.jpg"
        if not thumb.exists():
            im = Image.open(D / n); im.draft("RGB", (im.width // 8, im.height // 8))
            im.convert("RGB").resize((480, 360)).save(thumb, quality=78)
        samples.append(dict(
            id=n.replace(".JPG", ""), t=round(tsec, 1), lat=round(lat, 7), lon=round(lon, 7),
            alt_msl=round(alt, 2), alt_agl=None,
            heading=round(float(tg.get("Yaw", kappa)), 1), gimbal_pitch=round(float(tg.get("Pitch", 0)), 1),
            roll=round(float(tg.get("Roll", 0)), 1), omega=round(omega, 2), phi=round(phi, 2), kappa=round(kappa, 2),
            image=f"./flights/{fid}/{i:03d}.jpg", source=n, notes="Skydio 3D Scan"))
        if i % 50 == 0: print(f"  {i}/{len(names)}")
    gltf_to_glb(D / "coverage_within_params.gltf", out / "mesh.glb")

    dt = D.name.split("__")[1].replace("-", ":", 2).replace("+00-00", "+00:00") if "__" in D.name else ""
    flight = dict(
        id=fid, name=a.name or f"{D.name.split('__')[0]} — Skydio 3D Scan",
        drone="Skydio 2+", camera="Skydio 2+ 12MP", date=dt, agl_m=None, kind="scan",
        panel_fields=["id", "t", "lat", "lon", "alt_msl", "heading", "gimbal_pitch", "roll", "source"],
        mesh=dict(file=f"./flights/{fid}/mesh.glb", origin=dict(lat=lat0, lon=lon0, alt_msl=z0), yaw_deg=yaw,
                  fit_residual_m=resid, poses=len(pairs)),
        waypoints=waypoints, samples=samples)
    (FLIGHTS / f"{fid}.json").write_text(json.dumps(flight))
    idx_path = FLIGHTS / "index.json"; idx = json.loads(idx_path.read_text()) if idx_path.exists() else []
    idx = [e for e in idx if e["id"] != fid] + [dict(id=fid, name=flight["name"], file=f"./flights/{fid}.json")]
    idx_path.write_text(json.dumps(idx, indent=2))
    print("wrote", FLIGHTS / f"{fid}.json", len(samples), "samples; mesh", (out / "mesh.glb").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
