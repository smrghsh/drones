# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow", "pyproj"]
# ///
"""Import a textured, georeferenced OBJ scan (e.g. a building photogrammetry
export in UTM metres) as a "recon" flight record the viewer can load.

    uv run tools/import_obj.py data/slaughterhouse/obj/Mesh.obj \
        --id slaughterhouse --name "Historic slaughterhouse" [--crs EPSG:32610]
        [--texture-size 8192] [--quality 85] [--part-mb 24]

Pipeline (all local, key-free):
  1. parse the OBJ (v / vt / f, one material group per texture atlas)
  2. reproject the vertex CRS to WGS84 for the record origin; positions become
     ENU metres about the footprint centre with the original (orthometric)
     heights kept, i.e. the viewer's "enu_msl" frame (offset_m = 0)
  3. weld (vertex, uv) pairs into glTF vertices, one primitive per texture
  4. write a GLB: KHR_materials_unlit (photo textures already carry their
     lighting) + EXT_texture_webp textures resized to --texture-size
  5. `npx @gltf-transform/cli meshopt` for quantised, meshopt-compressed geometry
     (no simplification — the detail is the point)
  6. split the GLB into --part-mb segments (tools/chunk_assets.py) so GitHub
     Pages can serve it without LFS; the app reassembles them (fetchChunked)
  7. write static/flights/<id>.json and register it in static/flights/index.json

The record has no trajectory (it's a scan of a building, not a flight), so the
viewer shows it as a model-only Flight. Placement can be tuned live from the
lil-gui "Placement" folder (#debug) and pasted back into the record's `recon`
spec (offset_m / yaw_deg).
"""
import argparse, json, struct, subprocess, sys, time
from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image
from pyproj import Transformer

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "tools"))
from chunk_assets import chunk  # noqa: E402

Image.MAX_IMAGE_PIXELS = None


def log(*a):
    print(time.strftime("%H:%M:%S"), *a, flush=True)


# ---------------------------------------------------------------- OBJ
def parse_obj(path: Path):
    """Returns (positions[N,3] float64, uvs[M,2] float32, groups=[(material, faces[K,3,2] int)])
    where faces hold (vertex index, uv index), 0-based."""
    log(f"reading {path} ({path.stat().st_size/1e6:.0f} MB)")
    text = path.read_text(errors="replace")
    lines = text.split("\n")
    v, vt, groups = [], [], []
    material, faces = None, []
    mtllib = None
    for line in lines:
        if line.startswith("v "):
            v.append(line[2:])
        elif line.startswith("vt "):
            vt.append(line[3:])
        elif line.startswith("f "):
            faces.append(line[2:])
        elif line.startswith("usemtl "):
            if faces:
                groups.append((material, faces)); faces = []
            material = line[7:].strip()
        elif line.startswith("mtllib "):
            mtllib = line[7:].strip()
    if faces:
        groups.append((material, faces))
    log(f"  {len(v)} vertices, {len(vt)} uvs, {sum(len(f) for _, f in groups)} faces, {len(groups)} material groups")
    positions = np.array(" ".join(v).split(), dtype=np.float64).reshape(-1, 3)
    uvs = np.array(" ".join(vt).split(), dtype=np.float64).reshape(-1, 2)[:, :2].astype(np.float32)
    out = []
    for material, fl in groups:
        # "a/b c/d e/f" (v/vt) — normals are ignored if present ("a/b/c")
        toks = " ".join(fl).replace("/", " ").split()
        per = len(fl[0].split()[0].split("/"))
        idx = np.array(toks, dtype=np.int64).reshape(-1, 3, per)
        if per == 1:
            raise SystemExit("OBJ has no texture coordinates")
        f = np.stack([idx[:, :, 0], idx[:, :, 1]], axis=-1)
        f[f > 0] -= 1  # OBJ is 1-based; negative indices are relative (rare)
        neg = f < 0
        if neg.any():
            f[..., 0][neg[..., 0]] += len(positions)
            f[..., 1][neg[..., 1]] += len(uvs)
        out.append((material, f))
    return positions, uvs, out, mtllib


def parse_mtl(path: Path):
    """material name -> diffuse texture filename"""
    tex, cur = {}, None
    for line in path.read_text(errors="replace").splitlines():
        line = line.strip()
        if line.startswith("newmtl "):
            cur = line[7:].strip()
        elif line.startswith("map_Kd ") and cur:
            tex[cur] = line.split()[-1]
    return tex


# ---------------------------------------------------------------- textures
def encode_texture(path: Path, max_size: int, quality: int):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    if max(w, h) > max_size:
        s = max_size / max(w, h)
        im = im.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)
    buf = BytesIO()
    im.save(buf, "WEBP", quality=quality, method=4)
    data = buf.getvalue()
    log(f"  {path.name}: {w}x{h} -> {im.size[0]}x{im.size[1]} webp {len(data)/1e6:.1f} MB")
    return data, im.size


# ---------------------------------------------------------------- GLB
def pad4(b: bytes, fill=b"\x00"):
    return b + fill * (-len(b) % 4)


def write_glb(out: Path, prims, textures, name):
    """prims: [(positions f32[N,3], uvs f32[N,2], indices u32[K], texture index)]
    textures: [(webp bytes, (w, h))]"""
    bin_parts, views, accessors, images, gtextures, materials, primitives = [], [], [], [], [], [], []
    offset = 0

    def add_view(data: bytes, target=None):
        nonlocal offset
        data = pad4(data)
        views.append({"buffer": 0, "byteOffset": offset, "byteLength": len(data), **({"target": target} if target else {})})
        bin_parts.append(data); offset += len(data)
        return len(views) - 1

    for i, (data, (w, h)) in enumerate(textures):
        images.append({"bufferView": add_view(data), "mimeType": "image/webp", "name": f"tex{i}"})
        gtextures.append({"sampler": 0, "extensions": {"EXT_texture_webp": {"source": i}}})
        materials.append({
            "name": f"tex{i}",
            "pbrMetallicRoughness": {"baseColorTexture": {"index": i}, "metallicFactor": 0.0, "roughnessFactor": 1.0},
            "extensions": {"KHR_materials_unlit": {}},
            "doubleSided": True,
        })
    for pos, uv, idx, ti in prims:
        pv = add_view(pos.astype(np.float32).tobytes(), 34962)
        accessors.append({"bufferView": pv, "componentType": 5126, "count": len(pos), "type": "VEC3",
                          "min": pos.min(0).tolist(), "max": pos.max(0).tolist()})
        uvv = add_view(uv.astype(np.float32).tobytes(), 34962)
        accessors.append({"bufferView": uvv, "componentType": 5126, "count": len(uv), "type": "VEC2"})
        iv = add_view(idx.astype(np.uint32).tobytes(), 34963)
        accessors.append({"bufferView": iv, "componentType": 5125, "count": len(idx), "type": "SCALAR"})
        primitives.append({"attributes": {"POSITION": len(accessors) - 3, "TEXCOORD_0": len(accessors) - 2},
                           "indices": len(accessors) - 1, "material": ti, "mode": 4})
    gltf = {
        "asset": {"version": "2.0", "generator": "drones/tools/import_obj.py"},
        "extensionsUsed": ["KHR_materials_unlit", "EXT_texture_webp"],
        "extensionsRequired": ["EXT_texture_webp"],
        "scene": 0, "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0, "name": name}],
        "meshes": [{"name": name, "primitives": primitives}],
        "materials": materials, "textures": gtextures, "images": images,
        "samplers": [{"magFilter": 9729, "minFilter": 9987, "wrapS": 33071, "wrapT": 33071}],
        "accessors": accessors, "bufferViews": views,
        "buffers": [{"byteLength": offset}],
    }
    js = pad4(json.dumps(gltf, separators=(",", ":")).encode(), b" ")
    bin_ = b"".join(bin_parts)
    total = 12 + 8 + len(js) + 8 + len(bin_)
    with out.open("wb") as f:
        f.write(struct.pack("<4sII", b"glTF", 2, total))
        f.write(struct.pack("<II", len(js), 0x4E4F534A)); f.write(js)
        f.write(struct.pack("<II", len(bin_), 0x004E4942)); f.write(bin_)
    log(f"  wrote {out} ({total/1e6:.1f} MB)")


def weld(positions, uvs, faces):
    """(vertex, uv) corner pairs -> unique glTF vertices + triangle indices."""
    vi = faces[:, :, 0].reshape(-1)
    ti = faces[:, :, 1].reshape(-1)
    uv = uvs[ti]
    # weld on vertex index + quantised uv value (atlases repeat identical vt rows per face)
    key = np.stack([vi, np.round(uv[:, 0] * 65535).astype(np.int64), np.round(uv[:, 1] * 65535).astype(np.int64)], 1)
    uniq, inverse = np.unique(key, axis=0, return_inverse=True)
    inverse = inverse.reshape(-1)
    pos = positions[uniq[:, 0]]
    out_uv = np.stack([uniq[:, 1] / 65535.0, 1.0 - uniq[:, 2] / 65535.0], 1).astype(np.float32)  # glTF: v down
    return pos, out_uv, inverse.astype(np.uint32)


# ---------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("obj", type=Path)
    ap.add_argument("--id", required=True, help="flight id (folder + json name under static/flights)")
    ap.add_argument("--name", required=True, help="display name")
    ap.add_argument("--crs", default="EPSG:32610", help="CRS of the OBJ vertices (default UTM 10N); heights are kept as-is (orthometric)")
    ap.add_argument("--texture-size", type=int, default=8192, help="max texture edge (default 8192)")
    ap.add_argument("--quality", type=int, default=85, help="WebP quality")
    ap.add_argument("--part-mb", type=float, default=24, help="segment size for the chunked GLB (MB)")
    ap.add_argument("--date", default=None, help="capture date (ISO) for the record")
    ap.add_argument("--source", default="External photogrammetry export (OBJ + SLPK)", help="provenance note")
    ap.add_argument("--no-meshopt", action="store_true", help="skip gltf-transform compression")
    a = ap.parse_args()

    out_dir = REPO / "static/flights" / a.id
    out_dir.mkdir(parents=True, exist_ok=True)

    positions, uvs, groups, mtllib = parse_obj(a.obj)
    tex_by_mtl = parse_mtl(a.obj.parent / (mtllib or a.obj.with_suffix(".mtl").name))

    # georeference: footprint centre -> WGS84; local ENU metres about it, heights unchanged
    lo, hi = positions.min(0), positions.max(0)
    ce, cn = (lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2
    to_wgs = Transformer.from_crs(a.crs, "EPSG:4326", always_xy=True)
    lon, lat = to_wgs.transform(ce, cn)
    local = positions - np.array([ce, cn, 0.0])
    log(f"  origin lat={lat:.7f} lon={lon:.7f}; footprint {hi[0]-lo[0]:.1f} x {hi[1]-lo[1]:.1f} m, z {lo[2]:.1f}..{hi[2]:.1f} m")

    # textures (one per material group that has faces)
    tex_files = []
    for material, _ in groups:
        tf = tex_by_mtl.get(material)
        if tf is None:
            raise SystemExit(f"material {material!r} has no map_Kd in the .mtl")
        if tf not in tex_files:
            tex_files.append(tf)
    log(f"encoding {len(tex_files)} textures (max {a.texture_size}px, q{a.quality})")
    textures = [encode_texture(a.obj.parent / tf, a.texture_size, a.quality) for tf in tex_files]

    log("welding vertices")
    prims, nverts = [], 0
    for material, faces in groups:
        pos, uv, idx = weld(local, uvs, faces)
        prims.append((pos, uv, idx, tex_files.index(tex_by_mtl[material])))
        nverts += len(pos)
        log(f"  {material}: {len(faces)} faces -> {len(pos)} vertices")

    raw = out_dir / "recon_raw.glb"
    glb = out_dir / "recon.glb"
    write_glb(raw, prims, textures, a.id)
    if a.no_meshopt:
        raw.replace(glb)
    else:
        log("gltf-transform meshopt")
        subprocess.run(["npx", "-y", "@gltf-transform/cli", "meshopt", str(raw), str(glb)], check=True)
        raw.unlink()
        log(f"  {glb.name}: {glb.stat().st_size/1e6:.1f} MB")

    parts = chunk(glb, int(a.part_mb * 1_000_000)) if glb.stat().st_size > a.part_mb * 1_000_000 else 0

    record = {
        "id": a.id,
        "name": a.name,
        "kind": "scan",
        "date": a.date,
        "provenance": {"source": a.source, "file": a.obj.name, "crs": a.crs, "processing": "tools/import_obj.py: OBJ -> unlit meshopt GLB, WebP textures"},
        "samples": [],
        "recon": {
            "file": f"./flights/{a.id}/recon.glb",
            "origin": {"lat": lat, "lon": lon, "alt_msl": 0.0},
            "offset_m": [0.0, 0.0, 0.0],
            "yaw_deg": 0.0,
            "frame": "enu_msl",
            "extent_m": {"e": [float(lo[0] - ce), float(hi[0] - ce)], "n": [float(lo[1] - cn), float(hi[1] - cn)], "z": [float(lo[2]), float(hi[2])]},
            "vertices": int(nverts),
            "faces": int(sum(len(f) for _, f in groups)),
            "textures": [{"file": tf, "px": list(sz)} for tf, (_, sz) in zip(tex_files, textures)],
            "bytes": glb.stat().st_size,
            "parts": parts,
        },
    }
    (REPO / "static/flights" / f"{a.id}.json").write_text(json.dumps(record, indent=2))
    index_path = REPO / "static/flights/index.json"
    index = json.loads(index_path.read_text())
    entry = {"id": a.id, "name": a.name, "file": f"./flights/{a.id}.json"}
    index = [e for e in index if e["id"] != a.id] + [entry]
    index_path.write_text(json.dumps(index, indent=2))
    log(f"done: static/flights/{a.id}.json registered in index.json")


if __name__ == "__main__":
    main()
