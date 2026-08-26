# UCSC Farm — drone flights (XR)

WebXR visualization of the UC Santa Cruz Farm (CASFS): a satellite-draped
lidar terrain model with drone flight paths. Hover (mouse) or point (VR
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
- `uv run tools/gen_flights.py` — three **synthetic** sample missions
  (`static/flights/`). Sample "images" are NAIP crops under the drone.
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
