# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow", "pyproj"]
# ///
"""Generate synthetic sample drone missions over the farm.

Reads static/farm/{site.json,height.png,imagery.jpg}; writes
static/flights/index.json, static/flights/<id>.json and per-sample placeholder
images (NAIP crops under the drone) in static/flights/<id>/NNN.jpg.

Real flight logs should be converted to the same JSON shape:
  { id, name, drone, camera, date,
    samples:[{id,t,lat,lon,alt_msl,alt_agl,heading,gimbal_pitch,image,notes}] }
  (the samples are the trajectory; the app also accepts `track` or `waypoints` arrays)
Run:  uv run tools/gen_flights.py
"""
import json, math, shutil
from pathlib import Path
import numpy as np
from PIL import Image
from pyproj import Transformer

REPO = Path(__file__).resolve().parent.parent
FARM = REPO / "static" / "farm"
OUT = REPO / "static" / "flights"
site = json.loads((FARM / "site.json").read_text())
S = site["size_m"]
crs = f"+proj=aeqd +lat_0={site['lat']} +lon_0={site['lon']} +datum=WGS84 +units=m +no_defs"
to_wgs = Transformer.from_crs(crs, "EPSG:4326", always_xy=True)

h = np.asarray(Image.open(FARM / "height.png")).astype(np.float64)
Z = h[..., 0] * 256 + h[..., 1] + h[..., 2] / 256 - 32768
img = Image.open(FARM / "imagery.jpg")
IPX = img.size[0]

def ground(e, n):
    px = (e + S / 2) / S * (Z.shape[1] - 1); py = (S / 2 - n) / S * (Z.shape[0] - 1)
    i, j = int(np.clip(py, 0, Z.shape[0] - 1)), int(np.clip(px, 0, Z.shape[1] - 1))
    return float(Z[i, j])

def crop(e, n, heading, footprint_m, path):
    cx = (e + S / 2) / S * IPX; cy = (S / 2 - n) / S * IPX
    r = footprint_m / S * IPX
    box = img.crop((int(cx - r), int(cy - r), int(cx + r), int(cy + r)))
    box = box.rotate(heading, resample=Image.BILINEAR)   # camera points along heading -> north-up crop rotated
    w = box.size[0]; c = int(w * 0.2929 / 2)
    box = box.crop((c, c, w - c, w - c)).resize((320, 240))
    box.save(path, quality=80)

def lawnmower(x0, x1, y0, y1, legs, speed=6.0):
    pts = []
    for k in range(legs):
        y = y0 + (y1 - y0) * k / (legs - 1)
        xs = (x0, x1) if k % 2 == 0 else (x1, x0)
        pts += [(xs[0], y), (xs[1], y)]
    return densify(pts, 8.0), speed

def orbit(cx, cy, r, n=48, speed=5.0):
    return [(cx + r * math.cos(2 * math.pi * i / n), cy + r * math.sin(2 * math.pi * i / n)) for i in range(n + 1)], speed

def transect(p0, p1, speed=10.0):
    return densify([p0, p1], 15.0), speed

def densify(pts, step):
    out = []
    for (a, b) in zip(pts, pts[1:]):
        d = math.dist(a, b); k = max(1, int(d / step))
        out += [(a[0] + (b[0] - a[0]) * i / k, a[1] + (b[1] - a[1]) * i / k) for i in range(k)]
    out.append(pts[-1]); return out

MISSIONS = [
    dict(id="survey-fields", name="Survey A — Field rows (lawnmower)", drone="DJI Mavic 3M", camera="RGB 20MP + multispectral",
         date="2026-04-14T09:20:00-07:00", agl=60, path=lawnmower(-230, 140, -60, 200, 8), sample_every=45, notes="Pre-planting soil survey"),
    dict(id="orbit-greenhouse", name="Orbit — Greenhouses & barn", drone="DJI Mavic 3M", camera="RGB 20MP",
         date="2026-05-02T16:05:00-07:00", agl=40, path=orbit(-90, 140, 90), sample_every=60, notes="Photogrammetry orbit, 80% overlap"),
    dict(id="transect-meadow", name="Transect — Arboretum → Great Meadow", drone="Wingtra One", camera="Sony RX1R II",
         date="2026-06-21T07:45:00-07:00", agl=100, path=transect((-560, -140), (560, 220)), sample_every=90, notes="Cross-site vegetation transect"),
]

def main():
    if OUT.exists(): shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    index = []
    for m in MISSIONS:
        pts, speed = m["path"]
        # smooth AGL: follow ground with a little lag
        wps, samples, t, dist = [], [], 0.0, 0.0
        gz = [ground(e, n) for e, n in pts]
        base = np.convolve(np.pad(gz, 4, mode="edge"), np.ones(9) / 9, mode="valid")
        (OUT / m["id"]).mkdir()
        next_sample, sid = 0.0, 0
        for i, (e, n) in enumerate(pts):
            if i > 0:
                d = math.dist(pts[i - 1], pts[i]); dist += d; t += d / speed
            lon, lat = to_wgs.transform(e, n)
            alt = float(base[i] + m["agl"])
            wps.append(dict(lat=round(lat, 7), lon=round(lon, 7), alt_msl=round(alt, 1), t=round(t, 1)))
            if dist >= next_sample:
                nxt = pts[min(i + 1, len(pts) - 1)]; prv = pts[max(i - 1, 0)]
                heading = (math.degrees(math.atan2(nxt[0] - prv[0], nxt[1] - prv[1])) + 360) % 360
                fn = f"{m['id']}/{sid:03d}.jpg"
                crop(e, n, heading, m["agl"] * 0.9, OUT / fn)
                samples.append(dict(id=f"{m['id']}-{sid:03d}", t=round(t, 1), lat=round(lat, 7), lon=round(lon, 7),
                                    alt_msl=round(alt, 1), alt_agl=round(alt - gz[i], 1), heading=round(heading, 1),
                                    gimbal_pitch=-90.0 if "survey" in m["id"] or "transect" in m["id"] else -35.0,
                                    battery=round(96 - 0.055 * t, 1), image=f"./flights/{fn}",
                                    notes=m["notes"]))
                sid += 1; next_sample += m["sample_every"]
        flight = dict(id=m["id"], name=m["name"], drone=m["drone"], camera=m["camera"], date=m["date"],
                      agl_m=m["agl"], samples=samples)
        (OUT / f"{m['id']}.json").write_text(json.dumps(flight))
        index.append(dict(id=m["id"], name=m["name"], file=f"./flights/{m['id']}.json"))
        print(m["id"], len(wps), "points", len(samples), "samples")
    (OUT / "index.json").write_text(json.dumps(index, indent=2))

if __name__ == "__main__":
    main()
