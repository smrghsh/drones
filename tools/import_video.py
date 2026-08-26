# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow"]
# ///
"""Import a Skydio flight video as a hover-to-play flight in static/flights/.

    uv run tools/import_video.py data/101SKYDO/S1010004.LRV --scan strip1 --id strip1-v1 [--name "..."]
    uv run tools/import_video.py video.mp4 --pin 36.9838,-122.0567,150      # no trajectory source

Skydio videos carry no GPS track (just one static "location" tag), but the
scan photos shot while a video was recording have microsecond geotags
(see import_skydio.py: each sample has "utc"). The video's absolute start is
creation_time - duration (Skydio/Android stamps the file when recording
*ends* - verified against photo content), so the drone's pose at any video
time is interpolated from the scan's samples. Writes:

    static/flights/<id>.json            kind "video": 1 Hz track + segment list
    static/flights/<id>/chunks/NNN.mp4  keyframe-aligned <segment>-second clips
                                        (540p H.264, faststart, ~1-3 MB each)
    static/flights/<id>/posters/NNN.jpg 5x2 contact strip (1 fps) per clip

Needs ffmpeg/ffprobe on PATH. Full-size videos stay in data/ (git-ignored).
"""
import argparse, json, math, re, subprocess, sys
from datetime import datetime, timezone
from pathlib import Path
import numpy as np

REPO = Path(__file__).resolve().parent.parent
FLIGHTS = REPO / "static" / "flights"

def probe(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", str(path)],
                         capture_output=True, text=True, check=True).stdout
    j = json.loads(out); v = next(s for s in j["streams"] if s["codec_type"] == "video" and s["codec_name"] != "mjpeg")
    tags = j["format"].get("tags", {})
    ct = tags.get("creation_time") or v.get("tags", {}).get("creation_time")
    end = datetime.fromisoformat(ct.replace("Z", "+00:00")).timestamp() if ct else None
    loc = tags.get("location", ""); m = re.match(r"([+-][\d.]+)([+-][\d.]+)", loc)
    return dict(duration=float(j["format"]["duration"]), end_utc=end, width=int(v["width"]), height=int(v["height"]),
                fps=eval(v.get("r_frame_rate", "30/1")), location=(float(m[1]), float(m[2])) if m else None,
                model=tags.get("com.android.model", ""), size=int(j["format"]["size"]))

def lerp_angle(a, b, f):
    d = (b - a + 180) % 360 - 180
    return (a + d * f) % 360

def build_track(samples, start, duration, hz=1.0):
    """Interpolate lat/lon/alt/heading/pitch at `hz` from scan samples (sorted by utc)."""
    S = sorted((s for s in samples if s.get("utc")), key=lambda s: s["utc"])
    T = np.array([s["utc"] for s in S])
    lat = np.array([s["lat"] for s in S]); lon = np.array([s["lon"] for s in S]); alt = np.array([s["alt_msl"] for s in S])
    hd = np.array([s.get("heading") or 0 for s in S]); pt = np.array([s.get("gimbal_pitch") or 0 for s in S])
    track = []
    n = int(math.floor(duration * hz)) + 1
    for i in range(n):
        t = i / hz; u = start + t
        extrap = u < T[0] or u > T[-1]
        k = int(np.clip(np.searchsorted(T, u) - 1, 0, len(T) - 2))
        f = float(np.clip((u - T[k]) / max(T[k + 1] - T[k], 1e-6), 0, 1))
        track.append(dict(
            t=round(t, 2), utc=round(u, 3), lat=round(float(lat[k] + (lat[k + 1] - lat[k]) * f), 7),
            lon=round(float(lon[k] + (lon[k + 1] - lon[k]) * f), 7), alt_msl=round(float(alt[k] + (alt[k + 1] - alt[k]) * f), 2),
            heading=round(lerp_angle(hd[k], hd[k + 1], f), 1), pitch=round(float(pt[k] + (pt[k + 1] - pt[k]) * f), 1),
            extrap=bool(extrap), photo=S[k]["id"] if not extrap else None))
    return track, (float(T[0]), float(T[-1]))

def encode_chunks(src, out, seg, height, crf, maxrate, duration):
    """One ffmpeg run per chunk (input-side seek + re-encode = frame-accurate 10 s cuts)."""
    chunks = out / "chunks"; chunks.mkdir(parents=True, exist_ok=True)
    for f in chunks.glob("*.mp4"): f.unlink()
    n = math.ceil(duration / seg)
    for i in range(n):
        cmd = ["ffmpeg", "-v", "error", "-y", "-ss", str(i * seg), "-t", str(seg), "-i", str(src), "-an",
               "-vf", f"scale=-2:{height}", "-c:v", "libx264", "-preset", "medium", "-crf", str(crf),
               "-maxrate", maxrate, "-bufsize", "3M", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.0",
               "-g", "30", "-movflags", "+faststart", str(chunks / f"{i:03d}.mp4")]
        subprocess.run(cmd, check=True)
        print(f"  chunk {i + 1}/{n}", end="\r", flush=True)
    print()
    return sorted(chunks.glob("*.mp4"))

def poster(chunk, dst, seg):
    dst.parent.mkdir(exist_ok=True)
    cols = 5; rows = max(1, math.ceil(seg / cols))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(chunk), "-frames:v", "1",
                    "-vf", f"fps=1,scale=192:-2,tile={cols}x{rows}", "-q:v", "6", str(dst)], check=True)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video"); ap.add_argument("--id"); ap.add_argument("--name")
    ap.add_argument("--scan", help="flight id in static/flights whose samples give the trajectory")
    ap.add_argument("--pin", help="lat,lon,alt_msl: no trajectory - place as a static video pin")
    ap.add_argument("--start-utc", type=float, help="override start (unix s); default creation_time - duration")
    ap.add_argument("--segment", type=int, default=10); ap.add_argument("--height", type=int, default=540)
    ap.add_argument("--crf", type=int, default=28); ap.add_argument("--maxrate", default="1.6M")
    ap.add_argument("--skip-encode", action="store_true")
    a = ap.parse_args()
    src = Path(a.video); fid = a.id or src.stem.lower()
    out = FLIGHTS / fid; out.mkdir(parents=True, exist_ok=True)

    info = probe(src)
    start = a.start_utc if a.start_utc else info["end_utc"] - info["duration"]
    iso = lambda u: datetime.fromtimestamp(u, timezone.utc).isoformat(timespec="seconds")
    print(f"{src.name}: {info['width']}x{info['height']} {info['duration']:.1f}s, recorded {iso(start)} -> {iso(start + info['duration'])}")

    if a.scan:
        scan = json.loads((FLIGHTS / f"{a.scan}.json").read_text())
        track, (t0, t1) = build_track(scan["samples"], start, info["duration"])
        cov = sum(not p["extrap"] for p in track) / len(track)
        print(f"trajectory from scan '{a.scan}': photos cover {iso(t0)} -> {iso(t1)}; {cov*100:.0f}% of the video ({len(track)} points @1Hz)")
        if cov < 0.5: print("  ! less than half the video is inside the photo window - check --start-utc", file=sys.stderr)
    elif a.pin:
        lat, lon, alt = map(float, a.pin.split(","))
        track = [dict(t=0, utc=start, lat=lat, lon=lon, alt_msl=alt, heading=0, pitch=-20, extrap=True, photo=None),
                 dict(t=round(info["duration"], 2), utc=start + info["duration"], lat=lat, lon=lon, alt_msl=alt, heading=0, pitch=-20, extrap=True, photo=None)]
        print(f"static pin at {lat},{lon} @ {alt} m")
    else:
        sys.exit("need --scan <id> or --pin lat,lon,alt")

    if a.skip_encode:
        files = sorted((out / "chunks").glob("*.mp4"))
    else:
        print(f"encoding {a.segment}s chunks @ {a.height}p crf {a.crf} ...")
        files = encode_chunks(src, out, a.segment, a.height, a.crf, a.maxrate, info["duration"])
    chunks = []
    for f in files:
        i = int(f.stem); p = out / "posters" / f"{i:03d}.jpg"
        if not a.skip_encode or not p.exists(): poster(f, p, a.segment)
        d = probe(f)["duration"]
        chunks.append(dict(i=i, t0=i * a.segment, t1=round(min((i + 1) * a.segment, info["duration"]), 2), dur=round(d, 2),
                           file=f"./flights/{fid}/chunks/{i:03d}.mp4", poster=f"./flights/{fid}/posters/{i:03d}.jpg",
                           bytes=f.stat().st_size))
    big = [c for c in chunks if c["bytes"] > 5_000_000]
    total = sum(c["bytes"] for c in chunks)
    print(f"{len(chunks)} chunks, {total/1e6:.1f} MB total, largest {max(c['bytes'] for c in chunks)/1e6:.2f} MB" + (f"  ! {len(big)} over 5 MB" if big else ""))

    flight = dict(
        id=fid, name=a.name or f"{src.stem} — video", kind="video",
        drone=f"Skydio {info['model'] or '2+'}", camera=f"{info['width']}x{info['height']} @ {info['fps']:.0f} fps",
        date=iso(start), start_utc=round(start, 3), duration_s=round(info["duration"], 2), segment_s=a.segment,
        source=src.name, source_bytes=info["size"], scan=a.scan, location=info["location"],
        track=track, chunks=chunks)
    (FLIGHTS / f"{fid}.json").write_text(json.dumps(flight))
    idx_path = FLIGHTS / "index.json"; idx = json.loads(idx_path.read_text()) if idx_path.exists() else []
    idx = [e for e in idx if e["id"] != fid] + [dict(id=fid, name=flight["name"], file=f"./flights/{fid}.json")]
    idx_path.write_text(json.dumps(idx, indent=2))
    print("wrote", FLIGHTS / f"{fid}.json")

if __name__ == "__main__":
    main()
