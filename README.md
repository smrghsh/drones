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
  Real flight logs should be converted to the same JSON shape (documented in
  the script docstring) and dropped in; the app reads `flights/index.json`.

## Code map

- `src/Experience/domain.js` — scene-scale contract (100 m/unit, lat/lon ⇄ scene)
- `src/Experience/Terrain.js` — heightfield + imagery shader, `heightAt()`, hover probe
- `src/Experience/FlightPath.js` — fat line + sample markers; brahma `isPath` hover/select
- `src/Experience/SamplePanel.js` — canvas-textured info card (fields + image)
- `src/Experience/World.js` — wiring + lil-gui (flight dropdown, terrain sliders)

## Debug panel

`#debug` (on by default in `script.js` for now): **Flights → Sample path**
switches between missions; click / trigger pins the panel.

## Roadmap

- Photogrammetry mesh / Gaussian splat at a sample point (Spark `SplatMesh`, as in `coral`)
- Real flight logs + imagery
- Hand-tracking input (see `datacenter`)
