# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow"]
# ///
"""Import a geotagged Autel photo survey as a selectable VR flight path.

The source photographs remain in data/. The generated flight contains small
thumbnails plus GPS/orientation metadata; a later reconstruction can register
a mesh or Gaussian splat on the same flight id.
"""
import argparse, json, re
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image

REPO = Path(__file__).resolve().parent.parent
FLIGHTS = REPO / "static" / "flights"
SITE = json.loads((REPO / "static" / "farm" / "site.json").read_text())


def degrees(value, ref):
    d, m, s = (float(v) for v in value)
    result = d + m / 60 + s / 3600
    return -result if ref in ("S", "W") else result


def metadata(path):
    with Image.open(path) as image:
        exif = image.getexif()
        gps = exif.get_ifd(34853)
        lat = degrees(gps[2], gps[1]); lon = degrees(gps[4], gps[3])
        captured = datetime.strptime(exif.get(306), "%Y:%m:%d %H:%M:%S").replace(tzinfo=timezone.utc)
    raw = path.read_bytes()
    start = raw.find(b"<x:xmpmeta"); end = raw.find(b"</x:xmpmeta>")
    xmp = raw[start:end].decode("utf-8", "ignore") if start >= 0 else ""
    def tag(name, default=0):
        match = re.search(rf'Camera:{name}="([^"]+)"', xmp)
        return float(match.group(1)) if match else default
    agl = tag("AboveGroundAltitude")
    # The EXIF altitude is ellipsoidal. Ground MSL + embedded AGL gives a
    # stable table-scale placement until the PPK observations are processed.
    alt_msl = SITE["z_center"] + agl
    return dict(lat=lat, lon=lon, alt_msl=alt_msl, alt_agl=agl,
                heading=tag("Yaw"), gimbal_pitch=-tag("Pitch"), roll=tag("Roll"),
                captured=captured)


def thumbnail(src, dst):
    with Image.open(src) as image:
        image.thumbnail((480, 360))
        image.convert("RGB").save(dst, quality=78)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("photo_dir")
    parser.add_argument("--id", required=True)
    parser.add_argument("--name", required=True)
    args = parser.parse_args()
    source = Path(args.photo_dir)
    photos = sorted(source.glob("*.JPG"))
    if not photos:
        raise SystemExit(f"no JPG photographs found in {source}")
    out = FLIGHTS / args.id; out.mkdir(parents=True, exist_ok=True)
    records = []
    for i, photo in enumerate(photos):
        record = metadata(photo); record["source"] = photo.name; record["index"] = i
        thumb = out / f"{i:03d}.jpg"
        if not thumb.exists(): thumbnail(photo, thumb)
        records.append(record)
        if i % 50 == 0: print(f"  {i}/{len(photos)}")
    records.sort(key=lambda r: (r["captured"], r["source"]))
    start = records[0]["captured"]
    waypoints, samples = [], []
    for i, record in enumerate(records):
        t = (record["captured"] - start).total_seconds()
        common = dict(t=round(t, 1), lat=round(record["lat"], 7), lon=round(record["lon"], 7),
                      alt_msl=round(record["alt_msl"], 2))
        waypoints.append(common)
        samples.append(dict(id=record["source"].removesuffix(".JPG"), **common,
            utc=record["captured"].timestamp(), alt_agl=round(record["alt_agl"], 2),
            heading=round(record["heading"], 1), gimbal_pitch=round(record["gimbal_pitch"], 1),
            roll=round(record["roll"], 1), source=record["source"],
            image=f"./flights/{args.id}/{record['index']:03d}.jpg",
            notes="Externally supplied geotagged photo survey"))
    flight = dict(id=args.id, name=args.name, kind="scan", drone="Autel survey",
        camera="Autel XL705", date=start.isoformat(), start_utc=start.timestamp(),
        end_utc=records[-1]["captured"].timestamp(), agl_m=None,
        provenance=dict(source="External contributor", capture_date=start.date().isoformat(),
                        processing="EXIF GPS + XMP camera orientation; altitude provisional from AGL"),
        panel_fields=["id", "t", "lat", "lon", "alt_msl", "alt_agl", "heading", "gimbal_pitch", "source"],
        waypoints=waypoints, samples=samples)
    (FLIGHTS / f"{args.id}.json").write_text(json.dumps(flight))
    index_path = FLIGHTS / "index.json"; index = json.loads(index_path.read_text())
    index = [entry for entry in index if entry["id"] != args.id]
    index.append(dict(id=args.id, name=args.name, file=f"./flights/{args.id}.json"))
    index_path.write_text(json.dumps(index, indent=2) + "\n")
    print(f"wrote {args.id}: {len(samples)} geolocated photographs")


if __name__ == "__main__":
    main()
