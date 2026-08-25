import * as THREE from "three";
import { Experience, Environment } from "brahma-xr";
import { setSite, MODEL_Y } from "./domain.js";
import Terrain from "./Terrain.js";
import FlightPath from "./FlightPath.js";
import SamplePanel from "./SamplePanel.js";

const PATH_COLORS = [0xffb347, 0x5ec8ff, 0xff6b9d, 0x9dff6b];

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.environment = new Environment("#0b0f1a");
    this.model = new THREE.Group(); // everything geo lives here
    this.model.position.y = MODEL_Y;
    this.scene.add(this.model);

    this.paths = [];
    this.ready = this.load();
  }

  async load() {
    const site = await fetch("./farm/site.json").then((r) => r.json());
    setSite(site);

    this.terrain = new Terrain();
    this.model.add(this.terrain);
    await this.terrain.load();

    this.panel = new SamplePanel();
    this.model.add(this.panel);

    const index = await fetch("./flights/index.json").then((r) => r.json());
    const flights = await Promise.all(index.map((f) => fetch(f.file).then((r) => r.json())));
    flights.forEach((flight, i) => {
      const path = new FlightPath(flight, this.panel, PATH_COLORS[i % PATH_COLORS.length]);
      this.model.add(path);
      this.paths.push(path);
    });

    this.setDebug();
    document.getElementById("loading").style.display = "none";
    // Frame the default flight once everything (incl. the camera rig) has settled.
    requestAnimationFrame(() => this.setActiveFlight(this.params?.flight ?? "All"));
    return this;
  }

  setActiveFlight(id) {
    for (const p of this.paths) p.setActive(id === "All" || p.flight.id === id);
    const target = this.paths.find((p) => p.flight.id === id);
    this.focus(target);
    this.applyCutout(target);
  }

  /** Let an active scan mesh show through the (coarser) lidar terrain. */
  applyCutout(path) {
    const fp = path?.meshFootprint();
    this.terrain.setCutout(fp);
    if (path?.flight.mesh && !fp) path.addEventListener("meshloaded", () => this.applyCutout(path), { once: true });
  }

  /** Move the orbit camera to frame a path (or the whole model when none). */
  focus(path) {
    const cam = this.experience.camera;
    this.model.updateMatrixWorld(true);
    const box = path ? path.bounds() : new THREE.Box3().setFromObject(this.terrain.mesh);
    const center = box.getCenter(new THREE.Vector3());
    const radius = Math.max(box.getSize(new THREE.Vector3()).length() * 0.5, 0.15);
    const dir = new THREE.Vector3(-0.6, 0.55, 0.6).normalize(); // from the south-west, elevated
    cam.controls.target.copy(center);
    cam.instance.position.copy(center).addScaledVector(dir, radius * 1.7);
    cam.instance.lookAt(center);
    cam.controls.update();
  }

  setDebug() {
    if (!this.debug.active) return;
    const ui = this.debug.ui;
    const f = ui.addFolder("Flights");
    const options = { All: "All" };
    for (const p of this.paths) options[p.flight.name] = p.flight.id;
    const first = this.paths.find((p) => p.flight.kind === "scan")?.flight.id ?? "All";
    this.params = { flight: first, exaggeration: 1.0, imagery: 1.0 };
    this.setActiveFlight(first);
    f.add(this.params, "flight", options).name("Sample path").onChange((v) => this.setActiveFlight(v));
    f.add({ unpin: () => this.panel.setPinned(false) }, "unpin").name("Unpin panel");
    const t = ui.addFolder("Terrain");
    t.add(this.params, "exaggeration", 0.5, 4, 0.1).name("Vertical ×").onChange((v) => {
      this.terrain.setExaggeration(v);
      // paths are baked in scene units; rebuild positions on change
      for (const p of this.paths) p.scale.y = v;
    });
    t.add(this.params, "imagery", 0, 1, 0.05).name("Imagery mix").onChange((v) => {
      this.terrain.uniforms.uImageryMix.value = v;
    });
  }

  update() {
    this.panel?.update();
  }
}
