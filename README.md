# UCSC Farm — drone flights (XR)

WebXR visualization of the UC Santa Cruz Farm (CASFS): a satellite-draped
lidar terrain model (1 m farm-wide, 0.35 m under the scans) with real Skydio
3D-scan flights, their videos, and three 3D models per scan (Skydio coverage
mesh, our photogrammetry mesh, a Gaussian splat) switched from an in-scene menu. Hover (mouse) or point (VR
controller) at a path to open a sample panel — metadata fields plus the image
captured at the nearest sample — and at the ground to read lat/lon + elevation.
Built on [brahma-xr](https://github.com/smrghsh/brahma) via `create-brahma-xr`.

**Live:** https://smrghsh.github.io/drones/ (append `#debug` for the control panel)

## Run

```sh
npm install
npm run dev            # https://localhost:5173  (accept the self-signed cert)
NO_SSL=1 npm run dev   # plain http — handy on desktop
npx brahma-xr-server   # optional multiplayer relay
npm run build          # -> docs/ (GitHub Pages)
```

## Data (no API keys)

Everything is baked once into `static/` by two scripts — see `tools/`:

- `uv run tools/prep_farm.py` — NAIP 0.6 m aerial imagery (2022) and the
  Santa Cruz County 2020 lidar DSM (3DEP, 1 m) from Microsoft Planetary
  Computer (anonymously signed STAC), reprojected into a local tangent plane
  centred on the farm → `static/farm/{imagery.jpg,height.png,site.json}`.
- `uv run tools/prep_detail.py [--gsd 0.35]` — **high-resolution terrain patch**
  under the scans from the USGS 3DEP lidar *point cloud* (COPC via Planetary
  Computer, anonymously signed): highest return per cell → `static/farm/detail_height.png`
  + `detail.json`. The app carves the coarse terrain out inside the patch.
- `uv run tools/gen_flights.py` — three **synthetic** sample missions (no longer
  shipped; handy for testing the flight JSON shape).
- `uv run tools/import_skydio.py data/<scan-dir>` — imports a real **Skydio
  3D Scan** export (Pix4D geolocation CSV + photos + `scan_output.pbuf` +
  `coverage_within_params.gltf`): every photo becomes a sample with a
  480×360 thumbnail, the coverage mesh becomes `mesh.glb`, and the scan's
  local frame is recovered by fitting pbuf camera poses to the geotags
  (yaw + origin, ~0.7 m residual). Raw exports live in `data/` (git-ignored).
- `uv run tools/bake_ortho.py data/<scan-dir> --id <id>` — bakes a **2.5 cm
  orthomosaic** from the scan's own photos (GPS-frame camera poses, calibrated
  intrinsics and radial dewarp from the Skydio XMP; OpenCV camera axes) over
  the coverage mesh's height. The app drapes it on the mesh *and* the terrain
  inside its footprint (`ortho.jpg` + coverage mask); NAIP shows elsewhere.

- `uv run tools/import_video.py data/<dir>/<video> --scan <id> --id <vid>` —
  imports a **flight video**. Skydio MP4/LRV files carry no GPS track, but a
  video recorded *during* a 3D scan is bracketed by the scan's geotagged
  photos (µs capture clock in the XMP): start = `creation_time − duration`
  (verified against photo content), pose interpolated at 1 Hz from the scan
  samples. The video is re-encoded into 10 s, 540p, keyframe-aligned chunks
  (`chunks/NNN.mp4`, ≤ ~2.5 MB each, so GitHub Pages serves them instantly)
  plus a 1 fps contact strip per chunk. `--pin lat,lon,alt` places a video
  with no trajectory source. The chunk/poster dirs under `static/` are
  git-ignored (only the built copies in `docs/` are committed, ~130 MB per
  video) — on a fresh clone, re-run the importer from `data/` before
  `npm run build`, since the build empties `docs/`. Corrupt photos (a handful per SD card) are
  tolerated by both importers: XMP is read from raw bytes and the embedded
  preview stands in for the thumbnail.

- `uv run tools/reconstruct.py data/<scan-dir> --id <id> --stage all` — our own
  **3D reconstruction** of a scan from its photos: COLMAP 4 SfM (CPU SIFT,
  GPS-spatial matching, ENU-aligned to the geotags), OpenMVS dense cloud →
  mesh → texture (`recon.glb`), and a Brush Gaussian splat (`splat.ply`,
  rendered with Spark). Each output is registered on the flight JSON with its
  ENU origin/offset so it drops into the same frame as the coverage mesh.
  Outputs are packed for the web (meshopt + WebP mesh ≈ 25 MB, pruned splat
  → SOG ≈ 20 MB) and split into <5 MB `.partNN` files by
  `tools/chunk_assets.py` (`src/Experience/chunked.js` reassembles them; the
  unsplit originals are git-ignored). Needs `colmap` (brew), OpenMVS built in
  `tools/cache/openmvs/build/bin` (from source, `-DOpenCV_DIR` → opencv@4,
  needs nanoflann/TinyEXIF/TinyNPY), and `brush_app` (cargo, tagged release,
  `--locked`; set `BRUSH_BIN`). On an M2 Max: SfM ~30 min, dense mesh ~1.5 h,
  splat ~1 h per scan (much longer if the machine is busy).

Real flight logs of other kinds should be converted to the same JSON shape
(documented in `gen_flights.py`); the app reads `flights/index.json`.

## Code map

- `src/Experience/domain.js` — scene-scale contract (100 m/unit, lat/lon ⇄ scene)
- `src/Experience/Terrain.js` — heightfield + imagery shader, `heightAt()`, hover probe
- `src/Experience/FlightPath.js` — fat line + sample markers; brahma `isPath` hover/select
- `src/Experience/SamplePanel.js` — canvas-textured info card (fields + image)
- `src/Experience/VideoPath.js` — video flight: path cut into 10 s segments; hover a segment to
  light it up (line, glow tube, ground swath = union of camera footprints) and play its clip,
  with a drone marker riding the segment in sync. Shares the scan's trajectory, so the
  selected flight owns the hover and its relatives are drawn subdued.
- `src/Experience/VideoPanel.js` — SamplePanel with a `<video>` well, progress bar, contact strip
- `src/Experience/ScanMenu.js` — in-scene menu beside each scan: coverage / photogrammetry / splat /
  terrain-only, plus "ortho on terrain" (off = no doubled flower beds under a floating mesh)
- `src/Experience/World.js` — wiring + lil-gui (flight dropdown, terrain sliders)

## Debug panel

`#debug` (on by default in `script.js` for now): **Flights → Sample path**
switches between missions (a scan brings the videos shot during it and vice
versa); click / trigger pins the panel. **Videos → Play whole flight** makes a
pinned clip auto-advance through the segments; **Ground swath** toggles the
footprint overlay. Hovering a video segment also lights up the scan photos
captured in that window, and the hovered segment is shared with other users
in the session (brahma callout relay).

## Roadmap

- `S1009741.MP4` (June 21, 4K) has no scan bracketing it — needs a Skydio flight log, or `--pin`

- Ortho quality: occlusion-aware / multi-photo blending (currently best-centred photo wins, no seam feathering)
- Gaussian splat at a sample point (Spark `SplatMesh`, as in `coral`)
- Hand-tracking input (see `datacenter`)
