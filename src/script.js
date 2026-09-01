/** App entry point with one renderer-driven update loop for desktop and WebXR. */
import "./style.css";
import { Experience } from "brahma-xr";
import World from "./Experience/World.js";
import sources from "./Experience/sources.js";

const experience = new Experience({
  canvas: document.querySelector("canvas.webgl"),
  sources,
  camera: {
    position: [-22, 18, 22],
    lookAt: [0, 0.75, 0],
    orbit: { damping: true },
  },
  locomotion: { floors: [0] },
  debug: true,
  networking: {
    // Run a server in another terminal with: npx brahma-xr-server
    // Testing from a headset? See "On a headset" in the README.
    url: import.meta.env.VITE_BRAHMA_SERVER ?? "ws://localhost:8080",
    room: "ucsc-farm-drones",
  },
});

experience.world = new World();
window.experience = experience; // handy for console debugging / automation
installAnimationLoop(experience);

// Loading overlay — hides once every source in sources.js has loaded
// (World hides the #loading overlay once terrain + flights are fetched.)
experience.camera.controls.target.set(0, 0.75, 0);

// Join the shared session
const joinButton = document.getElementById("join");
joinButton.addEventListener("click", () => {
  experience.join();
  joinButton.style.display = "none";
});

// Vite HMR: tear down cleanly so hot reloads don't leak render loops
// or leave ghost users in the room
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    experience.destroy();
  });
}

/**
 * brahma's Time loop uses window.requestAnimationFrame, which browsers may
 * pause during an immersive session. Drive Time from Three's animation loop
 * so World.update(), VR menu input, and FPV motion run on every XR frame too.
 */
function installAnimationLoop(app) {
  app.time.stop();
  let previousFrame = performance.now();

  app.renderer.instance.setAnimationLoop((frameTime) => {
    const now = Number.isFinite(frameTime) ? frameTime : performance.now();
    app.time.delta = Math.min(Math.max(now - previousFrame, 0), 100);
    app.time.current = Date.now();
    app.time.elapsed = app.time.current - app.time.start;
    previousFrame = now;

    app.controller.update();
    app.time.trigger("tick");
    if (app.networking?.canSendEmbodiment) {
      app.networking.sendEmbodiment(
        app.camera.instance.matrixWorld,
        app.controller.controller1.matrixWorld,
        app.controller.controller2.matrixWorld,
      );
    }
    app.renderer.instance.render(app.scene, app.camera.instance);
  });
}

