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
