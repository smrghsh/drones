# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "pystac-client",
#   "planetary-computer",
#   "rasterio",
#   "numpy",
#   "pillow",
#   "scipy",
#   "pyproj",
# ]
# ///
"""One-shot geodata prep for the drones web app (UC Santa Cruz Farm).

Fetches NAIP aerial imagery (0.6 m) and 3DEP lidar DSM (1 m) from Microsoft
Planetary Computer -- anonymously signed, no API keys -- and reprojects both
into a local azimuthal-equidistant grid centred on the site, so the runtime
projection is a plain tangent plane: x = east metres, z = -north metres.

Writes:
    static/farm/imagery.jpg   IMG_PX x IMG_PX true-color
    static/farm/height.png    HGT_PX x HGT_PX RGB Terrarium-encoded elevation
    static/farm/site.json     centre, extent, elevation range, grid sizes

Run:  uv run tools/prep_farm.py
Raw downloads are cached in tools/cache/ so re-runs work offline.
"""
from __future__ import annotations

import json
from pathlib import Path

import numpy as np

REPO = Path(__file__).resolve().parent.parent
CACHE = Path(__file__).resolve().parent / "cache"
OUT = REPO / "static" / "farm"
STAC_URL = "https://planetarycomputer.microsoft.com/api/stac/v1"

SITE = {
    "name": "UC Santa Cruz Farm (CASFS)",
    "lat": 36.9826,
    "lon": -122.0552,
    "size_m": 1200.0,      # square extent, metres
}
IMG_PX = 2048
HGT_PX = 513

def local_crs():
    return (f"+proj=aeqd +lat_0={SITE['lat']} +lon_0={SITE['lon']} "
            "+datum=WGS84 +units=m +no_defs")

def grid_transform(px):
    from rasterio.transform import from_origin
    half = SITE["size_m"] / 2
    res = SITE["size_m"] / px
    return from_origin(-half, half, res, res)

def bbox_wgs84(pad_m=100):
    from pyproj import Transformer
    t = Transformer.from_crs(local_crs(), "EPSG:4326", always_xy=True)
    h = SITE["size_m"] / 2 + pad_m
    xs, ys = zip(*[t.transform(x, y) for x, y in ((-h, -h), (h, -h), (h, h), (-h, h))])
    return [min(xs), min(ys), max(xs), max(ys)]

def catalog():
    import planetary_computer, pystac_client
    return pystac_client.Client.open(STAC_URL, modifier=planetary_computer.sign_inplace)

def warp_to_grid(href, bands, px, resampling, nodata=None):
    """Reproject `bands` (1-based) of a COG onto our local grid; returns (n,px,px) float32."""
    import rasterio
    from rasterio.warp import reproject
    from rasterio.enums import Resampling
    dst = np.full((len(bands), px, px), np.nan, np.float32)
    with rasterio.open(href) as src:
        for i, b in enumerate(bands):
            reproject(
                rasterio.band(src, b), dst[i],
                dst_transform=grid_transform(px), dst_crs=local_crs(),
                src_nodata=src.nodata if nodata is None else nodata,
                dst_nodata=np.nan,
                resampling=getattr(Resampling, resampling),
            )
    return dst

def fetch_naip():
    npz = CACHE / "naip.npz"
    if npz.exists():
        return np.load(npz)["rgb"]
    items = list(catalog().search(collections=["naip"], bbox=bbox_wgs84()).items())
    if not items:
        raise RuntimeError("no NAIP items")
    items.sort(key=lambda it: it.datetime, reverse=True)
    newest_date = items[0].datetime.date()
    same = [it for it in items if it.datetime.date() == newest_date]
    print(f"naip: {len(items)} items, using {len(same)} from {newest_date}")
    acc = np.full((3, IMG_PX, IMG_PX), np.nan, np.float32)
    for it in same:
        arr = warp_to_grid(it.assets["image"].href, [1, 2, 3], IMG_PX, "bilinear")
        mask = np.isnan(acc[0]) & ~np.isnan(arr[0])
        acc[:, mask] = arr[:, mask]
        print(f"naip:   {it.id} -> {100*(~np.isnan(acc[0])).mean():.0f}% covered")
    rgb = np.nan_to_num(acc, nan=0).astype(np.uint8)
    CACHE.mkdir(parents=True, exist_ok=True)
    np.savez_compressed(npz, rgb=rgb)
    return rgb

def fetch_dsm():
    npz = CACHE / "dsm.npz"
    if npz.exists():
        return np.load(npz)["z"]
    cat = catalog()
    for coll, asset in (("3dep-lidar-dsm", "data"), ("3dep-seamless", "data")):
        items = list(cat.search(collections=[coll], bbox=bbox_wgs84()).items())
        if coll == "3dep-seamless":
            items = [it for it in items if it.properties.get("gsd") == 10]
        if not items:
            print(f"dsm: no {coll} items"); continue
        items.sort(key=lambda it: str(it.properties.get("end_datetime") or it.datetime or ""), reverse=True)
        print(f"dsm: {len(items)} {coll} items")
        acc = np.full((1, HGT_PX, HGT_PX), np.nan, np.float32)
        for it in items:
            arr = warp_to_grid(it.assets[asset].href, [1], HGT_PX, "bilinear")
            arr[arr < -1000] = np.nan
            mask = np.isnan(acc[0]) & ~np.isnan(arr[0])
            acc[:, mask] = arr[:, mask]
            print(f"dsm:   {it.id} -> {100*(~np.isnan(acc[0])).mean():.0f}% covered")
            if not np.isnan(acc).any():
                break
        z = acc[0]
        if np.isnan(z).mean() > 0.5:
            print(f"dsm: {coll} too sparse, trying next"); continue
        z = np.where(np.isnan(z), np.nanmedian(z), z)
        CACHE.mkdir(parents=True, exist_ok=True)
        np.savez_compressed(npz, z=z)
        return z
    raise RuntimeError("no elevation source")

def terrarium(z):
    v = (z + 32768.0) * 256.0
    r = np.floor(v / 65536) ; g = np.floor((v - r * 65536) / 256) ; b = np.floor(v - r * 65536 - g * 256)
    return np.stack([r, g, b], -1).clip(0, 255).astype(np.uint8)

def main():
    from PIL import Image
    from scipy.ndimage import median_filter, gaussian_filter
    OUT.mkdir(parents=True, exist_ok=True)
    rgb = fetch_naip()
    Image.fromarray(np.moveaxis(rgb, 0, -1)).save(OUT / "imagery.jpg", quality=88)
    z = fetch_dsm()
    z = median_filter(z, size=5)          # knock down lidar speckle
    z = gaussian_filter(z, sigma=1.2)     # soften tree crowns (2.3 m cells)
    Image.fromarray(terrarium(z)).save(OUT / "height.png", optimize=True)
    site = {**SITE, "img_px": IMG_PX, "hgt_px": HGT_PX,
            "z_min": float(z.min()), "z_max": float(z.max()), "z_center": float(z[HGT_PX//2, HGT_PX//2]),
            "encoding": "terrarium: z = (R*256 + G + B/256) - 32768",
            "frame": "x = east metres, z = -north metres from centre (aeqd)"}
    (OUT / "site.json").write_text(json.dumps(site, indent=2))
    print("wrote", OUT, f"z {site['z_min']:.1f}..{site['z_max']:.1f} m")

if __name__ == "__main__":
    main()
