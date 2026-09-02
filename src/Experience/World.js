import * as THREE from "three";
import { Experience, Environment } from "brahma-xr";
import { setSite, MODEL_Y, settings } from "./domain.js";
import Sky from "./Sky.js";
import Stars from "./Stars.js";
import Terrain from "./Terrain.js";
import Flight from "./Flight.js";
import SamplePanel from "./SamplePanel.js";
import VideoPanel from "./VideoPanel.js";

const PATH_COLORS = [0xffb347, 0x5ec8ff, 0xff6b9d, 0x9dff6b];

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.environment = new Environment("#0b0f1a");
    this.sky = new Sky();
    this.stars = new Stars();
    this.stars.particles.visible = false; // hide starfield now that daytime sky is active
    this.model = new THREE.Group(); // everything geo lives here
    this.model.position.y = MODEL_Y;
    this.scene.add(this.model);

    this.currentScale = 1.0;
    /** @type {Flight[]} */
    this.flights = [];
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
    this.videoPanel = new VideoPanel();
    this.model.add(this.videoPanel);

    const index = await fetch("./flights/index.json").then((r) => r.json());
    const ctx = { panel: this.panel, videoPanel: this.videoPanel };
    this.flights = await Promise.all(
      index.map((f, i) => Flight.load(f.file, { ...ctx, color: PATH_COLORS[i % PATH_COLORS.length] })),
    );
    for (const f of this.flights) this.model.add(f);
    this.updateEmphasis();
    this.refreshOrthos();

    this.setDebug();
    document.getElementById("loading").style.display = "none";
    requestAnimationFrame(() => this.focus(null));
    return this;
  }

  /** Set view modes: 'table', 'human', or 'fly' with camera zoom distance multiplier */
  setViewMode(mode, zoomFactor = 1.0) {
    const vExag = this.params?.exaggeration ?? 1.0;
    const cam = this.experience.camera;

    if (mode === "table") {
      // 1.2m tabletop diorama
      this.currentScale = 0.05;
      this.model.scale.set(0.05, 0.05 * vExag, 0.05);
      this.model.position.set(0, 0.85, -0.8);
      this.model.updateMatrixWorld(true);

      if (cam?.controls) {
        cam.controls.target.set(0, 0.85, -0.8);
        cam.instance.position.set(0, 1.4, 0.2);
        cam.instance.lookAt(0, 0.85, -0.8);
        cam.controls.update();
      }
    } else if (mode === "human") {
      // 1:1 true scale, grounded, camera at 1.7m human eye height
      this.currentScale = 1.0;
      this.model.scale.set(1.0, 1.0, 1.0);
      this.model.position.set(0, 0, 0);
      this.model.updateMatrixWorld(true);

      if (cam?.controls) {
        const box = new THREE.Box3().setFromObject(this.terrain.mesh);
        const center = box.getCenter(new THREE.Vector3());

        cam.instance.position.set(center.x, center.y + 1.7, center.z + 5.0);
        cam.controls.target.set(center.x, center.y + 1.6, center.z);
        cam.instance.lookAt(cam.controls.target);
        cam.controls.update();
      }
    } else {
      // Normal fly scale at MODEL_Y
      this.currentScale = 1.0;
      this.model.scale.set(1.0, vExag, 1.0);
      this.model.position.set(0, MODEL_Y, 0);
      this.model.updateMatrixWorld(true);
      // zoomFactor < 1.0 moves closer, > 1.0 moves further
      this.focus(null, zoomFactor);
    }
  }

  /** Toggle one flight (from the Flight Selector) and resolve hover ownership. */
  setFlightVisible(flight, v) {
    flight.setVisible(v);
    this.updateEmphasis();
    this.refreshOrthos();
  }

  /**
   * A video shares its scan's trajectory, so only one of them can own the
   * hover: while the scan is visible its videos draw subdued and unselectable.
   */
  updateEmphasis() {
    for (const f of this.flights) {
      const scanShown =
        f.kind === "video" && this.flights.some((s) => s.record.id === f.record.scan && s.visible);
      f.setEmphasis(scanShown ? 0.5 : 1);
    }
  }

  refreshOrthos() {
    this.terrain.setOrthos(
      this.flights
        .filter((f) => f.visible && f.record.ortho)
        .map((f) => ({ spec: f.record.ortho, onTerrain: f.orthoOnTerrain }))
    );
  }

  onVideoSegment(videoPath, k) {
    const scan = this.flights.find((f) => f.record.id === videoPath.flight.scan)?.path;
    if (!scan?.highlightWindow) return;
    if (k < 0) { scan.highlightWindow(null); return; }
    const c = videoPath.flight.chunks[k], u0 = videoPath.flight.start_utc;
    scan.highlightWindow(u0 + c.t0, u0 + c.t1);
  }

  onCalloutUpdate(data) {
    const pl = data?.payload;
    if (pl?.viewMode) {
      this.setViewMode(pl.viewMode, pl.zoomFactor);
      return;
    }
    if (pl?.menu) {
      const model = this.flights.find((f) => f.record.id === pl.menu)?.model;
      if (model) {
        if (pl.representation !== model.representation) model.setRepresentation(pl.representation);
        if (pl.orthoTerrain !== model.orthoOnTerrain) model.setOrthoOnTerrain(pl.orthoTerrain);
      }
      return;
    }
    if (!pl?.video) return;
    const path = this.flights.find((f) => f.record.id === pl.video)?.path;
    path?.setRemoteSegment?.(data.visible ? pl.segment : -1);
  }

  setExaggeration(v) {
    settings.verticalExaggeration = v;
    this.model.scale.y = this.currentScale * v;
    this.terrain.setExaggeration(v);
    for (const p of [this.panel, this.videoPanel]) {
      p.scale.set(p.baseScale, p.baseScale / v, p.baseScale);
    }
  }

  focus(path, zoomFactor = 1.0) {
    const cam = this.experience.camera;
    if (!cam?.controls) return;

    this.model.updateMatrixWorld(true);
    const box = path ? path.bounds() : new THREE.Box3().setFromObject(this.terrain.mesh);
    const center = box.getCenter(new THREE.Vector3());
    const radius = Math.max(box.getSize(new THREE.Vector3()).length() * 0.5, 0.15);
    const dir = new THREE.Vector3(-0.6, 0.55, 0.6).normalize();

    cam.controls.target.copy(center);
    // Applying zoomFactor to distance directly changes proximity to terrain
    cam.instance.position.copy(center).addScaledVector(dir, radius * 1.7 * zoomFactor);
    cam.instance.lookAt(center);
    cam.controls.update();
  }

  setDebug() {
    if (!this.debug.active) return;
    const ui = this.debug.ui;

    this.params = { exaggeration: 1.0, imagery: 1.0 };

    const z = ui.addFolder("Scale & Perspectives");
    z.add({ human: () => this.setViewMode("human") }, "human").name("🚶 Human Scale (Walking)");
    z.add({ table: () => this.setViewMode("table") }, "table").name("🪑 Table Diorama (0.05x)");
    z.add({ drone: () => this.setViewMode("fly", 1.0) }, "drone").name("🚁 Drone Overview (1.0x)");
    z.add({ zoomIn: () => this.setViewMode("fly", 0.45) }, "zoomIn").name("🔍 Zoom Close-Up (2.2x Closer)");
    z.add({ zoomFar: () => this.setViewMode("fly", 2.2) }, "zoomFar").name("🌐 High Altitude Overview");

    // Flight Selector: one checkbox per flight; each visible flight shows its
    // own options folder (built by the Flight itself) right below.
    const f = ui.addFolder("Flight Selector");
    f.add({ unpin: () => { this.panel.setPinned(false); this.videoPanel.setPinned(false); } }, "unpin").name("Unpin panel");
    for (const fl of this.flights) {
      this.params["show_" + fl.record.id] = fl.visible;
      f.add(this.params, "show_" + fl.record.id).name(fl.record.name).onChange((v) => this.setFlightVisible(fl, v));
    }
    for (const fl of this.flights) fl.addGui(f);

    const t = ui.addFolder("Terrain");
    t.add(this.params, "exaggeration", 0.5, 6, 0.1).name("Vertical ×").onChange((v) => this.setExaggeration(v));
    t.add(this.params, "imagery", 0, 1, 0.05).name("Imagery mix").onChange((v) => {
      this.terrain.uniforms.uImageryMix.value = v;
    });
  }

  update() {
    this.panel?.update();
    this.videoPanel?.update();
    for (const f of this.flights) f.update();
  }
}
