# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow"]
# ///
"""Bake a lightweight orthophoto preview from an imported Autel survey.

This is a flat-ground, GPS/yaw placement intended for interactive terrain
draping. It is not a substitute for a bundle-adjusted photogrammetry product.
Run import_autel_photos.py first so the flight JSON contains one sample per
source photograph.
"""
import argparse
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image

REPO = Path(__file__).resolve().parent.parent
FLIGHTS = REPO / "static" / "flights"
SITE = json.loads((REPO / "static" / "farm" / "site.json").read_text())
R = 6_378_137.0


def local_metres(lat, lon):
    north = math.radians(lat - SITE["lat"]) * R
    east = math.radians(lon - SITE["lon"]) * R * math.cos(math.radians(SITE["lat"]))
    return east, north


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("photo_dir", help="directory containing the original JPG files")
    parser.add_argument("--id", required=True, help="already-imported flight id")
    parser.add_argument("--gsd", type=float, default=0.20, help="output metres per pixel")
    parser.add_argument("--pitch-limit", type=float, default=8.0,
                        help="maximum absolute Autel nadir pitch value")
    args = parser.parse_args()

    source = Path(args.photo_dir)
    flight_path = FLIGHTS / f"{args.id}.json"
    flight = json.loads(flight_path.read_text())
    # Autel's survey metadata uses pitch ~= 0 for nadir and ~= 90 for oblique.
    samples = [s for s in flight["samples"]
               if abs(float(s.get("gimbal_pitch", 999))) <= args.pitch_limit
               and float(s.get("alt_agl", 0)) > 5]
    if not samples:
        raise SystemExit("no downward-looking photographs found")

    # XL705 calibration embedded in this dataset: 13.1328 x 8.7552 mm sensor,
    # 10.570008 mm focal length. Each image is placed using its GPS, AGL and yaw.
    sensor_w, sensor_h, focal = 13.1328, 8.7552, 10.570008
    tan_x = sensor_w / (2 * focal)
    tan_y = sensor_h / (2 * focal)
    placed = []
    for sample in samples:
        e, n = local_metres(sample["lat"], sample["lon"])
        width = 2 * sample["alt_agl"] * tan_x
        height = 2 * sample["alt_agl"] * tan_y
        placed.append((sample, e, n, width, height))

    margin = max(math.hypot(w, h) / 2 for _, _, _, w, h in placed) + 2
    e_min = math.floor((min(x[1] for x in placed) - margin) / args.gsd) * args.gsd
    e_max = math.ceil((max(x[1] for x in placed) + margin) / args.gsd) * args.gsd
    n_min = math.floor((min(x[2] for x in placed) - margin) / args.gsd) * args.gsd
    n_max = math.ceil((max(x[2] for x in placed) + margin) / args.gsd) * args.gsd
    out_w = math.ceil((e_max - e_min) / args.gsd)
    out_h = math.ceil((n_max - n_min) / args.gsd)
    if out_w * out_h > 30_000_000:
        raise SystemExit(f"output would be {out_w}x{out_h}; choose a larger --gsd")

    # GPS positions are not bundle-adjusted. Averaging overlaps would therefore
    # ghost roads and bushes. Keep the most central view at each pixel instead;
    # this stays sharp while the feather score pushes seams toward image edges.
    result = np.zeros((out_h, out_w, 3), dtype=np.uint8)
    best_weight = np.zeros((out_h, out_w), dtype=np.float32)
    used = 0
    for i, (sample, e, n, width_m, height_m) in enumerate(placed):
        path = source / sample["source"]
        if not path.exists():
            continue
        w = max(16, round(width_m / args.gsd)); h = max(16, round(height_m / args.gsd))
        with Image.open(path) as image:
            image.draft("RGB", (w * 2, h * 2))
            tile = image.convert("RGB").resize((w, h), Image.Resampling.LANCZOS)

        # Image top points along camera yaw; canvas top is north. PIL positive
        # rotation is counter-clockwise, while yaw is clockwise from north.
        tile = tile.rotate(-float(sample.get("heading", 0)), Image.Resampling.BICUBIC,
                           expand=True, fillcolor=(0, 0, 0))
        arr = np.asarray(tile, dtype=np.float32)
        valid = np.any(arr > 2, axis=2)
        yy, xx = np.mgrid[0:arr.shape[0], 0:arr.shape[1]]
        edge = np.minimum.reduce((xx + 1, yy + 1, arr.shape[1] - xx, arr.shape[0] - yy)).astype(np.float32)
        feather = np.clip(edge / max(8, min(w, h) * 0.12), 0, 1) ** 2 * valid

        cx = round((e - e_min) / args.gsd)
        cy = round((n_max - n) / args.gsd)
        x0 = cx - arr.shape[1] // 2; y0 = cy - arr.shape[0] // 2
        x1 = x0 + arr.shape[1]; y1 = y0 + arr.shape[0]
        dx0 = max(0, -x0); dy0 = max(0, -y0)
        dx1 = arr.shape[1] - max(0, x1 - out_w); dy1 = arr.shape[0] - max(0, y1 - out_h)
        x0 = max(0, x0); y0 = max(0, y0); x1 = min(out_w, x1); y1 = min(out_h, y1)
        if x0 >= x1 or y0 >= y1:
            continue
        a = arr[dy0:dy1, dx0:dx1].astype(np.uint8); f = feather[dy0:dy1, dx0:dx1]
        old = best_weight[y0:y1, x0:x1]
        take = f > old
        result[y0:y1, x0:x1][take] = a[take]
        old[take] = f[take]
        used += 1
        if i % 50 == 0:
            print(f"  composited {i}/{len(placed)}")

    valid = best_weight > 0.05
    mask = np.where(valid, 255, 0).astype(np.uint8)
    out_dir = FLIGHTS / args.id
    out_dir.mkdir(parents=True, exist_ok=True)
    Image.fromarray(result, "RGB").save(out_dir / "ortho.jpg", quality=88, optimize=True)
    Image.fromarray(mask, "L").save(out_dir / "ortho_mask.png", optimize=True)

    flight["ortho"] = {
        "file": f"./flights/{args.id}/ortho.jpg",
        "mask": f"./flights/{args.id}/ortho_mask.png",
        "bounds_m": {"e_min": e_min, "n_min": n_min, "e_max": e_max, "n_max": n_max},
        "gsd_m": args.gsd,
        "px": [out_w, out_h],
        "method": "GPS/yaw flat-ground preview; not bundle adjusted",
        "source_images": used,
    }
    flight_path.write_text(json.dumps(flight))
    print(f"wrote {out_dir / 'ortho.jpg'}: {out_w}x{out_h}, {used} photographs")


if __name__ == "__main__":
    main()
