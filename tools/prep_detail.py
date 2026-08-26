# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow", "laspy[lazrs]>=2.5", "pyproj", "scipy", "requests"]
# ///
"""High-resolution terrain patch under the scans from the USGS 3DEP lidar
*point cloud* (COPC, key-free via Planetary Computer's public blob URLs).

    uv run tools/prep_detail.py [--size 400] [--gsd 0.5] [--center lat,lon]

The farm-wide terrain (prep_farm.py) is a 1 m DSM raster. Here we pull the raw
Santa Cruz County 2020 points (~8-20 pts/m^2) inside a window centred on the
scans, keep the highest return per cell (a DSM: canopy + crops + buildings),
fill gaps from neighbours, and write:

    static/farm/detail_height.png   terrarium-encoded 16-bit-ish heights
    static/farm/detail.json         {center e/n metres, size_m, gsd_m, px}

The app drapes the same imagery / orthos on it and cuts the coarse terrain
away inside its footprint (see Terrain.js).
"""
import argparse, io, json, math
from pathlib import Path
import numpy as np, requests, laspy
from PIL import Image
from pyproj import Transformer, CRS
from scipy import ndimage

REPO = Path(__file__).resolve().parent.parent
site = json.loads((REPO / "static/farm/site.json").read_text())
STAC = "https://planetarycomputer.microsoft.com/api/stac/v1/search"
AEQD = f"+proj=aeqd +lat_0={site['lat']} +lon_0={site['lon']} +datum=WGS84 +units=m +no_defs"

def scan_centre():
    """Mean of the scan flights' sample positions (lat, lon)."""
    idx = json.loads((REPO / "static/flights/index.json").read_text())
    pts = []
    for e in idx:
        f = json.loads((REPO / "static/flights" / f"{e['id']}.json").read_text())
        if f.get("kind") == "scan": pts += [(s["lat"], s["lon"]) for s in f["samples"]]
    return float(np.mean([p[0] for p in pts])), float(np.mean([p[1] for p in pts]))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--size", type=float, default=400.0); ap.add_argument("--gsd", type=float, default=0.5)
    ap.add_argument("--center", help="lat,lon (default: centroid of the scans)")
    a = ap.parse_args()
    lat, lon = map(float, a.center.split(",")) if a.center else scan_centre()
    to_local = Transformer.from_crs("EPSG:4326", AEQD, always_xy=True)
    ce, cn = to_local.transform(lon, lat)
    half = a.size / 2
    print(f"window {a.size:.0f} m @ {a.gsd} m centred {lat:.6f},{lon:.6f} (site E {ce:.1f} N {cn:.1f})")

    # bbox in WGS84 for the STAC query
    to_wgs = Transformer.from_crs(AEQD, "EPSG:4326", always_xy=True)
    lons, lats = zip(*[to_wgs.transform(ce + dx, cn + dy) for dx in (-half, half) for dy in (-half, half)])
    bbox = [min(lons), min(lats), max(lons), max(lats)]
    r = requests.post(STAC, json={"collections": ["3dep-lidar-copc"], "bbox": bbox, "limit": 20}).json()
    items = [f for f in r["features"] if "SantaCruzCounty_2020" in f["id"]] or r["features"]
    print("COPC items:", [f["id"] for f in items])

    W = int(round(a.size / a.gsd)); H = W
    zmax = np.full((H, W), -np.inf, np.float32); count = np.zeros((H, W), np.int32)
    # the blob container is not public: sign with a Planetary Computer SAS token (anonymous, no key)
    tok = requests.get("https://planetarycomputer.microsoft.com/api/sas/v1/token/usgslidareuwest/usgs-3dep-copc").json()["token"]
    for f in items:
        href = f["assets"]["data"]["href"] + "?" + tok
        with laspy.copc.CopcReader.open(href) as rd:
            crs = rd.header.parse_crs()
            t = Transformer.from_crs(crs, AEQD, always_xy=True)
            # window corners -> source CRS (a projected CRS, metres/feet)
            inv = Transformer.from_crs(AEQD, crs, always_xy=True)
            xs, ys = zip(*[inv.transform(ce + dx, cn + dy) for dx in (-half, half) for dy in (-half, half)])
            q = laspy.copc.Bounds(mins=np.array([min(xs), min(ys)]), maxs=np.array([max(xs), max(ys)]))
            pts = rd.query(q)
            if len(pts) == 0: print("  ", f["id"], "no points in window"); continue
            x, y, z = np.asarray(pts.x), np.asarray(pts.y), np.asarray(pts.z)
            cls = np.asarray(pts.classification)
            keep = ~np.isin(cls, [7, 18])  # drop noise
            e, n, up = t.transform(x[keep], y[keep], z[keep])
            up = np.asarray(up)
            # vertical units: pyproj converts if the CRS has a vertical axis; if the
            # numbers look like feet, fix them
            if np.nanmedian(up) > 1000: up = up * 0.3048
            col = ((np.asarray(e) - (ce - half)) / a.gsd).astype(int); row = ((cn + half - np.asarray(n)) / a.gsd).astype(int)
            ok = (col >= 0) & (col < W) & (row >= 0) & (row < H)
            np.maximum.at(zmax, (row[ok], col[ok]), up[ok].astype(np.float32)); np.add.at(count, (row[ok], col[ok]), 1)
            print(f"   {f['id']}: {ok.sum():,} points in window, CRS {crs.name}")
    empty = ~np.isfinite(zmax)
    print(f"cells with points: {(~empty).mean()*100:.1f}% ; mean density {count[~empty].mean():.1f} pts/cell")
    # fill holes by nearest neighbour then light smoothing of the filled cells only
    idx = ndimage.distance_transform_edt(empty, return_distances=False, return_indices=True)
    filled = zmax[tuple(idx)]
    sm = ndimage.uniform_filter(filled, 3)
    dsm = np.where(empty, sm, zmax)
    # sanity vs the coarse DSM's range
    print(f"height range {dsm.min():.1f}..{dsm.max():.1f} m (site {site['z_min']:.0f}..{site['z_max']:.0f})")
    v = np.clip((dsm + 32768.0) * 256.0, 0, 2**24 - 1)
    R = np.floor(v / 65536); G = np.floor((v - R * 65536) / 256); B = v - R * 65536 - G * 256
    png = np.stack([R, G, B], -1).astype(np.uint8)
    out = REPO / "static/farm"
    Image.fromarray(png).save(out / "detail_height.png", optimize=True)
    meta = dict(center_e=ce, center_n=cn, lat=lat, lon=lon, size_m=a.size, gsd_m=a.gsd, px=W,
                z_min=float(dsm.min()), z_max=float(dsm.max()), source="USGS 3DEP CA_SantaCruzCounty_2020 COPC, max return per cell",
                encoding=site["encoding"])
    (out / "detail.json").write_text(json.dumps(meta, indent=2))
    print("wrote", out / "detail_height.png", (out / "detail_height.png").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
