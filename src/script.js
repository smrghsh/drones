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
