# UCSC Farm — drone flights (XR)

WebXR visualization of the UC Santa Cruz Farm (CASFS): a satellite-draped
lidar terrain model (1 m farm-wide, 0.35 m under the scans) with real Skydio
3D-scan flights, their videos, and three 3D models per scan (Skydio coverage
mesh, our photogrammetry mesh, a Gaussian splat) switched from an in-scene menu. Hover (mouse) or point (VR
controller) at a path to open a sample panel — metadata fields plus the image
captured at the nearest sample — and at the ground to read lat/lon + elevation.
Built on [brahma-xr](https://github.com/smrghsh/brahma) via `create-brahma-xr`.

Select any flight path to make it the target of the viewer-following **FPV Ride
Path** controls. Start carries the desktop camera or complete VR rig along the
geolocated trajectory; Pause freezes it in place, Resume continues, and Stop
returns the viewer to the exact pre-ride pose. VR head movement and pointing
remain live during a ride, while grab locomotion is temporarily disabled. The
default **Comfort horizon** follows heading while keeping the horizon level to
reduce pitch-induced cybersickness; turn it off for the full drone trajectory.

**Live:** https://smrghsh.github.io/drones/ (append `#debug` for the control panel)

## Run

```sh
npm install
npm run dev            # https://localhost:5173  (accept the self-signed cert)
NO_SSL=1 npm run dev   # plain http — handy on desktop
npx brahma-xr-server   # optional multiplayer relay
npm run build          # -> docs/ (GitHub Pages)
```

For a headset, run the default HTTPS server (without `NO_SSL`), open the LAN
URL printed by Vite in the headset browser, accept the development certificate,
and press **Enter VR**. The flower-bed splat uses a 180K-Gaussian interactive
asset by default; `#debug` → Terrain → Flower detail can switch to balanced
500K or detailed 1.5M versions for comparison. The app swaps back to the fast asset whenever an
immersive session begins.

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

- `uv run tools/import_autel_photos.py data/<photo-dir> --id <id> --name <name>`
  imports an externally supplied Autel geotagged survey as a path with selectable
  thumbnails. `uv run tools/bake_autel_ortho.py data/<photo-dir> --id <id>` then
  makes a lightweight GPS/yaw-aligned terrain preview. This preview makes the
  survey photography visible in XR, but is not a bundle-adjusted scientific
  orthomosaic; use `reconstruct.py` for a registered mesh or Gaussian splat.

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
footprint overlay. **Ride speed** and the ride transport controls mirror the
in-scene Start / Pause / Stop controls. Hovering a video segment also lights up the scan photos
captured in that window, and the hovered segment is shared with other users
in the session (brahma callout relay).

## FPV ride (Issue #11)

Choose a mission from **Flights → Sample path**, or select a path directly in
the scene. Then use **FPV ride → Start / resume** in the debug panel or the
viewer-following Start / Pause / Stop controls. Every imported scan, photo
mission, and video trajectory can be ridden. **Speed ×** ranges from 0.25× to
4×; 1× follows the recorded timing. Stop restores the exact camera/VR-rig pose
from before the ride.

While riding on desktop, drag anywhere on the 3D view with the mouse or one
finger to look freely through 360° without leaving the path. In VR, the
camera group carries the complete rig while headset tracking remains active,
so turning your head controls the view independently of travel direction.

In a headset, start with **Comfort horizon** enabled and a low speed. Stop if
you feel discomfort; the full-pitch mode can create stronger vection and is
more likely to cause cybersickness.

## Topography controls

The desktop controls are in `#debug` → **Terrain**. In VR, the same scientific
controls are attached to the non-dominant-hand menu. They change rendering
only; they do not modify the source data.

### Shape / model

- **Detailed 3DEP LiDAR** uses the 0.35 m DSM patch beneath the scans and the
  1 m farm-wide DSM outside it. This is the best option for seeing beds, rows,
  bushes, and other small relief. During movement and VR, the renderer uses a
  lighter display grid for responsiveness while elevation queries still use
  the original raster data.
- **Farm-wide 3DEP LiDAR** uses only the 1 m DSM across the farm. It is lighter
  and more consistent at large scale, but contains less plant-level detail.
- **Flat reference** removes terrain relief so horizontal footprints and paths
  are easier to compare. Vertical × cannot create relief while this model is
  selected because every terrain height is intentionally flat.

### Texture / source

- **Survey orthos + NAIP** shows flight orthomosaics inside their valid
  coverage masks and USDA NAIP imagery everywhere else.
- **NAIP 2022** shows only the USDA NAIP 2022 aerial image, without survey
  orthomosaics.
- **Elevation tint** replaces photographic imagery with a color ramp based on
  elevation, making terrain height changes easier to read.

### Flower detail

- **Interactive / VR (180K)** loads the fastest Gaussian-splat variant. This
  is the default and is recommended for navigation and headsets.
- **Balanced (500K)** keeps more plant and flower detail at a moderate GPU and
  memory cost.
- **Desktop detail (1.5M)** loads the highest-detail splat and is intended for
  close inspection on a capable desktop. It can reduce frame rate in VR.

Only scans that provide these quality variants can switch between all three;
a scan with one native splat continues to use that available asset.

### Vertical ×

**Vertical ×** scales vertical offsets from 0.5× to 6× around the site's
reference elevation (`z_center`). A value of **1×** is true scale. Terrain,
flight paths, Gaussian splats, and meshes are scaled together so registered
data remains aligned. It also updates terrain lighting so exaggerated slopes
shade correctly. The desktop slider and VR menu display the same current
value.

### Imagery mix

**Imagery mix** blends between the elevation tint and the currently selected
imagery source: **0** is elevation color only, **1** is imagery only, and an
intermediate value combines them. This is a fine adjustment independent of
Texture / source; selecting a texture preset again restores that preset's
intended appearance.

### Data provenance

- Terrain: USGS 3DEP Santa Cruz County 2020 DSM, 1 m farm-wide and 0.35 m in
  the detailed patch.
- Base imagery: USDA NAIP 2022 aerial imagery at 0.6 m resolution.
- Survey imagery: capture-specific flight orthomosaics; their processing and
  registration metadata is stored in the corresponding flight JSON.
- Coordinates: local east-north-up (ENU); elevations are metres above mean sea
  level (MSL).

## Roadmap

- `S1009741.MP4` (June 21, 4K) has no scan bracketing it — needs a Skydio flight log, or `--pin`

- Ortho quality: occlusion-aware / multi-photo blending (currently best-centred photo wins, no seam feathering)
- Gaussian splat at a sample point (Spark `SplatMesh`, as in `coral`)
- Hand-tracking input (see `datacenter`)
