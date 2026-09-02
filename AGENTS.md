# Agent notes — brahma starter

This app is built on **brahma-xr**: multi-user WebXR with a plain WebSocket
relay. There is **no WebRTC** anywhere — do not add TURN/STUN/RTCPeerConnection
config; the networking is a simple star-topology relay (`brahma-xr-server`).

## Architecture (Bruno Simon Experience pattern)

- `Experience` is a **singleton** provided by brahma-xr. `new Experience()`
  anywhere returns the one instance created in `src/script.js`. It owns:
  `scene`, `camera`, `renderer`, `sizes`, `time`, `resources`, `pointer`,
  `controller`, `user`, `debug`, and (after `join()`) `networking`.
- `src/Experience/World.js` is the app's content. `experience.world.update()`
  runs every frame. **Make changes here.**
- `src/Experience/sources.js` declares preloaded assets:
  `{ name, type, path }` with type `gltfModel | glbModel | texture |
  cubeTexture | font | exr | simulationData` (raw text fetch — CSV/JSON).
  Files go in `static/`. Read them from `experience.resources.items.<name>`
  after the `"ready"` event.
- Selectable objects: construct `Selectable` (from brahma-xr) or set
  `.selectable = true` and implement `onHover/onUnhover/onSelect` — the
  shared `experience.pointer` raycasts mouse (desktop) and controllers (XR).

## Flights

All flight data is standardised as `Flight` instances (`src/Experience/Flight.js`):
a metadata record + a `FlightPath` (trajectory + its own interactivity; `VideoPath`
subclass for videos) + an optional `FlightModel` (coverage mesh / photogrammetry /
splat). Trajectories are stored columnar in `Track` (typed arrays; every numeric
field in the source records becomes a channel that can be painted along the line
via `path.colorBy(key)`). To add a flight from any source, write a record with
`id`/`name`/`kind` and a `track`/`samples`/`waypoints` array of
`{ lat, lon, alt_msl, ... }` (see the JSDoc in Flight.js), register it in the
site's flights index, and `World` does the rest — including the lil-gui
"Flight Selector" (a visibility checkbox per flight; each flight owns its options
folder and shows/hides it with its visibility). An optional `voxels` block on the
record (`{ size_m, channel, opacity }`, also accepted on the index entry) adds a
`VoxelField`: the samples binned into cubes coloured by a channel, shown by
default with the path painted to match (`flight.setColorBy(key)` drives both).

## Sites

`static/sites.json` lists sites (`id`, `name`, `dir`, `flights` index); each
`dir` holds `site.json` + `imagery.jpg` + `height.png` from
`tools/prep_farm.py --site <id> --lat … --lon …`. `World.loadSite(id)` swaps the
terrain and flights in place (the `?site=` param, the top-left `<select>`, the
debug "Site" dropdown and the VR menu all call it). Nothing geo may cache the
site: read `getSite()` / `siteUrl()` from `domain.js` at load time.

## Verify loop (this is your test)

1. `npm run dev` (app) and `npx brahma-xr-server` (relay) in two terminals.
2. Open https://localhost:5173 in **two tabs**, click **Join Session** in both.
3. Each tab must show the other's colored avatar (head + two hands), and it
   must disappear when the other tab closes.

## Conventions

- Vite app: `root src/`, assets in `static/`, build output in `docs/`
  (GitHub Pages). HTTPS in dev because WebXR requires a secure context.
- Multiplayer messages: the server assigns your name/color (`welcome`), poses
  are three 4x4 matrices, and `networking.sendCalloutUpdate(visible,
  position, payload)` shares an app-defined annotation — implement
  `onCalloutUpdate(data)` on World to receive it.
- Keep the vocabulary: Experience, World, Networking, Interlocutors,
  Controller. Don't introduce new architectural layers.
