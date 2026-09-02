# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Import an air-quality sensor log (CSV from the "sankie" sensor pod) as a flight.

    uv run tools/import_airlog.py data/sankie-log.csv --site sankie [--id sankie] [--name "..."]

Expected columns (extra ones are carried through untouched):
    Millis, GPS_Timestamp, Lat, Lon, Altitude_m, SIV,
    BME_Temp_C, BME_Hum_pct, Press_hPa, Gas_Ohm, IAQ,
    SCD_CO2, SCD_Temp_C, SCD_Hum_pct, SHT_Temp_C, SHT_Hum_pct, CH*_V, CH*_mA

Rows without a GPS fix (Lat == 0) are dropped. Sensor readings that the pod
reports as 0 when it has no fresh value (SCD_CO2, IAQ) are stored as null so the
voxel/colour code can ignore them instead of averaging in zeros.

Writes static/<site>/flights/<id>.json — the same waypoint/sample shape as the
Skydio importers plus `kind: "airlog"` and a `metrics` table describing the
sensor channels — and registers it in static/<site>/flights/index.json.
"""
import argparse, csv, json
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# channel -> (label, unit, "no value" sentinel is 0?)
METRICS = {
    "gas_ohm":  ("BME680 gas resistance", "Ω", True),
    "iaq":      ("IAQ index", "", True),
    "co2":      ("CO₂ (SCD)", "ppm", True),
    "temp_c":   ("Temperature (BME)", "°C", False),
    "hum_pct":  ("Humidity (BME)", "%", False),
    "press_hpa":("Pressure", "hPa", True),
}
COLS = {"gas_ohm": "Gas_Ohm", "iaq": "IAQ", "co2": "SCD_CO2", "temp_c": "BME_Temp_C",
        "hum_pct": "BME_Hum_pct", "press_hpa": "Press_hPa"}

def num(v):
    try: return float(v)
    except (TypeError, ValueError): return None

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("csv", type=Path)
    ap.add_argument("--site", required=True, help="site id (static/<site>/)")
    ap.add_argument("--id", default=None)
    ap.add_argument("--name", default=None)
    args = ap.parse_args()
    fid = args.id or args.csv.stem.replace("-log", "")
    rows = [r for r in csv.DictReader(args.csv.open()) if num(r.get("Lat")) and num(r.get("Lon"))]
    if not rows: raise SystemExit("no rows with a GPS fix")
    t0 = datetime.fromisoformat(rows[0]["GPS_Timestamp"]).replace(tzinfo=timezone.utc)
    t1 = datetime.fromisoformat(rows[-1]["GPS_Timestamp"]).replace(tzinfo=timezone.utc)
    samples, waypoints = [], []
    for i, r in enumerate(rows):
        ts = datetime.fromisoformat(r["GPS_Timestamp"]).replace(tzinfo=timezone.utc)
        t = round((ts - t0).total_seconds(), 1)
        s = dict(id=i, t=t, utc=ts.timestamp(), lat=float(r["Lat"]), lon=float(r["Lon"]),
                 alt_msl=float(r["Altitude_m"]), siv=int(float(r.get("SIV") or 0)))
        for k, col in COLS.items():
            v = num(r.get(col))
            if v is not None and METRICS[k][2] and v == 0: v = None
            s[k] = v
        s["sht_temp_c"] = num(r.get("SHT_Temp_C")); s["sht_hum_pct"] = num(r.get("SHT_Hum_pct"))
        s["scd_temp_c"] = num(r.get("SCD_Temp_C")) or None
        s["batt_v"] = num(r.get("CH1_V"))
        samples.append(s)
        waypoints.append(dict(lat=s["lat"], lon=s["lon"], alt_msl=s["alt_msl"], t=t))
    metrics = {k: dict(label=l, unit=u) for k, (l, u, _) in METRICS.items()}
    for k in metrics:
        vals = [s[k] for s in samples if s[k] is not None]
        metrics[k].update(min=min(vals) if vals else None, max=max(vals) if vals else None, count=len(vals))
    flight = dict(
        id=fid, name=args.name or f"{fid} — air-quality sensor log",
        drone="sensor pod", camera="BME680 · SCD4x · SHT", date=t0.isoformat(),
        kind="airlog", start_utc=t0.timestamp(), end_utc=t1.timestamp(),
        duration_s=round((t1 - t0).total_seconds(), 1),
        panel_fields=["t", "lat", "lon", "alt_msl", "gas_ohm", "co2", "iaq", "temp_c", "hum_pct", "press_hpa", "siv"],
        metrics=metrics, waypoints=waypoints, samples=samples,
    )
    out = REPO / "static" / args.site / "flights"
    out.mkdir(parents=True, exist_ok=True)
    (out / f"{fid}.json").write_text(json.dumps(flight, separators=(",", ":")))
    idx_path = out / "index.json"
    index = json.loads(idx_path.read_text()) if idx_path.exists() else []
    index = [e for e in index if e["id"] != fid]
    index.append(dict(id=fid, name=flight["name"], file=f"./{args.site}/flights/{fid}.json"))
    idx_path.write_text(json.dumps(index, indent=2))
    print(f"wrote {out / (fid + '.json')}: {len(samples)} samples, {flight['duration_s']} s")
    for k, m in metrics.items(): print(f"  {k:10s} {m['count']:4d} valid  {m['min']} .. {m['max']} {m['unit']}")

if __name__ == "__main__":
    main()
