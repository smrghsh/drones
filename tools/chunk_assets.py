# /// script
# requires-python = ">=3.11"
# ///
"""Split large web assets into <5 MB parts (GitHub-friendly, no LFS).

    uv run tools/chunk_assets.py                 # every static/flights/*/{recon.glb,splat.sog}
    uv run tools/chunk_assets.py path/to/file    # one file

Writes <file>.part00, .part01, ... next to the original plus <file>.parts.json
{ "size", "parts", "part_bytes" }. The original stays for local dev but is
git-ignored (see .gitignore); the app's fetchChunked() reassembles the parts
when the manifest exists (src/Experience/chunked.js).
"""
import json, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
PART = 4_500_000  # bytes; comfortably under the 5 MB rule

def chunk(path: Path):
    data = path.read_bytes()
    for old in path.parent.glob(path.name + ".part*"): old.unlink()
    n = 0
    for i in range(0, len(data), PART):
        (path.parent / f"{path.name}.part{n:02d}").write_bytes(data[i:i + PART]); n += 1
    (path.parent / f"{path.name}.parts.json").write_text(json.dumps(dict(size=len(data), parts=n, part_bytes=PART)))
    print(f"{path.relative_to(REPO)}: {len(data)/1e6:.1f} MB -> {n} parts")

def main():
    files = [Path(a).resolve() for a in sys.argv[1:]] or [p for pat in ("recon.glb", "splat.sog") for p in (REPO / "static/flights").glob(f"*/{pat}")]
    for f in files:
        if f.stat().st_size > 5_000_000: chunk(f)
        else:
            for old in f.parent.glob(f.name + ".part*"): old.unlink()
            print(f"{f.relative_to(REPO)}: {f.stat().st_size/1e6:.1f} MB, no chunking needed")

if __name__ == "__main__":
    main()
