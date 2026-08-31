import * as THREE from "three";
import { Experience, Environment } from "brahma-xr";
import { setSite, MODEL_Y, settings } from "./domain.js";
import Stars from "./Stars.js";
import Terrain from "./Terrain.js";
import FlightPath from "./FlightPath.js";
import SamplePanel from "./SamplePanel.js";
import VideoPath from "./VideoPath.js";
import VideoPanel from "./VideoPanel.js";

const PATH_COLORS = [0xffb347, 0x5ec8ff, 0xff6b9d, 0x9dff6b];

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.environment = new Environment("#0b0f1a");
    this.stars = new Stars();
    this.model = new THREE.Group();
    this.model.position.y = MODEL_Y;
    this.scene.add(this.model);

    this.currentScale = 1.0;
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
    this.videoPanel = new VideoPanel();
    this.model.add(this.videoPanel);

    const index = await fetch("./flights/index.json").then((r) => r.json());
    const flights = await Promise.all(index.map((f) => fetch(f.file).then((r) => r.json())));
    flights.forEach((flight, i) => {
      const color = PATH_COLORS[i % PATH_COLORS.length];
      const path = flight.kind === "video"
        ? new VideoPath(flight, this.videoPanel, color)
        : new FlightPath(flight, this.panel, color);
      this.model.add(path);
      this.paths.push(path);
    });

    this.setDebug();
    document.getElementById("loading").style.display = "none";
    requestAnimationFrame(() => this.setActiveFlight(this.params?.flight ?? "All"));
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

  setActiveFlight(id) {
    const target = this.paths.find((p) => p.flight.id === id);
    const family = new Set([id, target?.flight.scan]);
    for (const p of this.paths) if (p.flight.scan === id) family.add(p.flight.id);
    for (const p of this.paths) {
      const isVideo = p.flight.kind === "video";
      const show = id === "All" || family.has(p.flight.id);
      const emphasis = id === "All" ? (isVideo ? 0.5 : 1) : p.flight.id === id ? 1 : 0.5;
      p.setActive(show, emphasis);
    }
    this.focus(target);
    this.refreshOrthos();
  }

  onModelChanged(path) {
    if (!this.params || !this.modelControls?.[path.flight.id]) return;
    this.params["model_" + path.flight.id] = path.representation;
    this.params["orthoTerrain_" + path.flight.id] = path.orthoOnTerrain;
    for (const c of this.modelControls[path.flight.id]) c.updateDisplay();
  }

  refreshOrthos() {
    this.terrain.setOrthos(
      this.paths
        .filter((p) => p.visible && p.flight.ortho)
        .map((p) => ({ spec: p.flight.ortho, onTerrain: p.orthoOnTerrain }))
    );
  }

  onVideoSegment(videoPath, k) {
    const scan = this.paths.find((p) => p.flight.id === videoPath.flight.scan);
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
      const scan = this.paths.find((p) => p.flight.id === pl.menu);
      if (scan) { 
        if (pl.representation !== scan.representation) scan.setRepresentation(pl.representation); 
        if (pl.orthoTerrain !== scan.orthoOnTerrain) scan.setOrthoOnTerrain(pl.orthoTerrain); 
      }
      return;
    }
    if (!pl?.video) return;
    const path = this.paths.find((p) => p.flight.id === pl.video);
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

    const first = "All";
    this.params = { flight: first, exaggeration: 1.0, imagery: 1.0, playAll: false, swath: true };

    const z = ui.addFolder("Scale & Perspectives");
    z.add({ human: () => this.setViewMode("human") }, "human").name("🚶 Human Scale (Walking)");
    z.add({ table: () => this.setViewMode("table") }, "table").name("🪑 Table Diorama (0.05x)");
    z.add({ drone: () => this.setViewMode("fly", 1.0) }, "drone").name("🚁 Drone Overview (1.0x)");
    z.add({ zoomIn: () => this.setViewMode("fly", 0.45) }, "zoomIn").name("🔍 Zoom Close-Up (2.2x Closer)");
    z.add({ zoomFar: () => this.setViewMode("fly", 2.2) }, "zoomFar").name("🌐 High Altitude Overview");

    const f = ui.addFolder("Flights");
    const options = { All: "All" };
    for (const p of this.paths) options[p.flight.name] = p.flight.id;
    this.setActiveFlight(first);
    f.add(this.params, "flight", options).name("Sample path").onChange((v) => this.setActiveFlight(v));
    f.add({ unpin: () => { this.panel.setPinned(false); this.videoPanel.setPinned(false); } }, "unpin").name("Unpin panel");

    const scans = this.paths.filter((p) => p.flight.kind === "scan");
    this.modelControls = {};
    if (scans.length) {
      const m = ui.addFolder("Scan models");
      for (const p of scans) {
        const opts = { "Coverage mesh (Skydio)": "coverage" };
        if (p.flight.recon) opts["Photogrammetry mesh"] = "recon";
        if (p.flight.splat) opts["Gaussian splat"] = "splat";
        opts["Terrain only"] = "none";
        this.params["model_" + p.flight.id] = p.representation;
        this.params["orthoTerrain_" + p.flight.id] = p.orthoOnTerrain;
        const short = p.flight.name.replace(/ — .*/, "");
        this.modelControls[p.flight.id] = [
          m.add(this.params, "model_" + p.flight.id, opts).name(short + " · model").onChange((v) => p.setRepresentation(v)),
          m.add(this.params, "orthoTerrain_" + p.flight.id).name(short + " · ortho on terrain").onChange((v) => p.setOrthoOnTerrain(v)),
        ];
      }
    }

    const videos = this.paths.filter((p) => p.flight.kind === "video");
    if (videos.length) {
      const v = ui.addFolder("Videos");
      v.add(this.params, "playAll").name("Play whole flight (when pinned)").onChange((on) => videos.forEach((p) => (p.playAll = on)));
      v.add(this.params, "swath").name("Ground swath").onChange((on) => videos.forEach((p) => { p.swathOn = on; p.swath.visible = on && p.segment >= 0; }));
    }

    const t = ui.addFolder("Terrain");
    t.add(this.params, "exaggeration", 0.5, 6, 0.1).name("Vertical ×").onChange((v) => this.setExaggeration(v));
    t.add(this.params, "imagery", 0, 1, 0.05).name("Imagery mix").onChange((v) => {
      this.terrain.uniforms.uImageryMix.value = v;
    });
  }

  update() {
    this.panel?.update();
    this.videoPanel?.update();
    for (const p of this.paths) p.menu?.update();
  }
}