/**
 * Application content wiring for flights, terrain, menus, provenance and ride controls.
 * Topography settings are shared by desktop debug UI and the non-dominant-hand XR menu.
 * Performance: detailed splats pause only during active navigation and return at rest.
 */
import * as THREE from "three";
import { Experience, Environment } from "brahma-xr";
import { setSite, MODEL_Y, settings } from "./domain.js";
import Stars from "./Stars.js";
import Terrain from "./Terrain.js";
import FlightPath from "./FlightPath.js";
import SamplePanel from "./SamplePanel.js";
import VideoPath from "./VideoPath.js";
import VideoPanel from "./VideoPanel.js";
import RideControls from "./RideControls.js";
import TopographyMenu from "./TopographyMenu.js";

const PATH_COLORS = [0xffb347, 0x5ec8ff, 0xff6b9d, 0x9dff6b];

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.environment = new Environment("#0b0f1a");
    this.stars = new Stars();
    this.model = new THREE.Group(); // everything geo lives here
    this.model.position.y = MODEL_Y;
    this.scene.add(this.model);

    this.paths = [];
    this.ride = { state: "inactive", path: null, time: 0, speed: 1, saved: null };
    this._ridePoint = new THREE.Vector3();
    this._rideAhead = new THREE.Vector3();
    this._rideDirection = new THREE.Vector3();
    this._rideOffset = new THREE.Vector3();
    this.splatQuality = "fast";
    this.topography = { shape: "detail", texture: "survey", exaggeration: 1 };
    this.experience.on("resize", () => this.applyRenderScale());
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
    this.rideControls = new RideControls(this);
    this.scene.add(this.rideControls);
    this.topographyMenu = new TopographyMenu(this);
    this.scene.add(this.topographyMenu);

    const index = await fetch("./flights/index.json").then((r) => r.json());
    const flights = await Promise.all(index.map((f) => fetch(f.file).then((r) => r.json())));
    for (const flight of flights) {
      if (flight.id === "strip1" && flight.splat) {
        flight.splat_vr = { ...flight.splat, file: "./flights/strip1/splat-vr.sog", splats: 500000 };
        flight.splat_fast = { ...flight.splat, file: "./flights/strip1/splat-fast.sog", splats: 180000 };
      }
    }
    flights.forEach((flight, i) => {
      const color = PATH_COLORS[i % PATH_COLORS.length];
      const path = flight.kind === "video"
        ? new VideoPath(flight, this.videoPanel, color)
        : new FlightPath(flight, this.panel, color);
      this.model.add(path);
      this.paths.push(path);
    });

    // The current flower-bed scan has a detailed 3D Gaussian splat. Prefer it
    // over the flat coverage mesh so foliage reads as volume when entering VR.
    // Scans with reconstructed splats start in that representation so flowers,
    // bushes and crop rows read as actual volume instead of a brown coverage mesh.
    await Promise.all(this.paths
      .filter((path) => path.flight.kind === "scan" && path.flight.splat)
      .map((path) => path.setRepresentation("splat")));

    this.setDebug();
    this.applyRenderScale();
    document.getElementById("loading").style.display = "none";
    // Frame the default flight once everything (incl. the camera rig) has settled.
    requestAnimationFrame(() => this.setActiveFlight(this.params?.flight ?? "All"));
    return this;
  }

  setActiveFlight(id) {
    // A scan brings the videos recorded during it; a video brings its scan.
    // Videos share their scan's trajectory, so only one of them owns the hover:
    // the selected flight is emphasised (hoverable), its relatives are subdued.
    const target = this.paths.find((p) => p.flight.id === id);
    if (this.ride.state !== "inactive" && target !== this.ride.path) this.stopRide();
    if (target?.flight.kind === "video") this.setRideTarget(target);
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

  setRideTarget(path) {
    if (path?.flight.kind !== "video" || (this.ride.state !== "inactive" && this.ride.path !== path)) return;
    this.ride.path = path;
    this.rideControls?.setVisible(true);
    this.rideControls?.refresh();
  }

  startRide() {
    const ride = this.ride, path = ride.path;
    if (!path || ride.state === "playing") return;
    if (ride.state === "paused") {
      ride.state = "playing";
      this.rideControls.refresh();
      return;
    }
    const group = this.experience.cameraGroup;
    const camera = this.experience.camera;
    const locomotion = this.experience.controller?.locomotion;
    ride.saved = {
      groupPosition: group.position.clone(), groupQuaternion: group.quaternion.clone(),
      cameraPosition: camera.instance.position.clone(), cameraQuaternion: camera.instance.quaternion.clone(),
      controlsEnabled: camera.controls.enabled,
      locomotionUpdate: locomotion?.update,
    };
    ride.xr = this.experience.isXRActive();
    ride.time = 0;
    ride.anchor = new THREE.Vector3();
    if (ride.xr) {
      group.updateMatrixWorld(true);
      const xrCamera = this.experience.renderer.instance.xr.getCamera(camera.instance);
      xrCamera.getWorldPosition(ride.anchor);
      group.worldToLocal(ride.anchor);
    } else {
      camera.instance.position.set(0, 0, 0);
      camera.instance.quaternion.identity();
    }
    camera.controls.enabled = false;
    if (locomotion) locomotion.update = () => {};
    ride.state = "playing";
    this.updateRidePose();
    this.rideControls.refresh();
  }

  pauseRide() {
    if (this.ride.state !== "playing") return;
    this.ride.state = "paused";
    this.rideControls.refresh();
  }

  stopRide() {
    const ride = this.ride;
    if (ride.state === "inactive") return;
    const saved = ride.saved, group = this.experience.cameraGroup, camera = this.experience.camera;
    if (saved) {
      group.position.copy(saved.groupPosition); group.quaternion.copy(saved.groupQuaternion);
      camera.instance.position.copy(saved.cameraPosition); camera.instance.quaternion.copy(saved.cameraQuaternion);
      camera.controls.enabled = saved.controlsEnabled;
      if (this.experience.controller?.locomotion && saved.locomotionUpdate) {
        this.experience.controller.locomotion.update = saved.locomotionUpdate;
      }
      camera.controls.update();
    }
    ride.state = "inactive"; ride.time = 0; ride.saved = null;
    this.rideControls.refresh();
  }

  updateRidePose() {
    const ride = this.ride, path = ride.path;
    if (!path || ride.state === "inactive") return;
    const t = THREE.MathUtils.clamp(ride.time, 0, path.flight.duration_s);
    path.localToWorld(path.pointAt(t, this._ridePoint));
    path.localToWorld(path.pointAt(Math.min(t + 1, path.flight.duration_s), this._rideAhead));
    this._rideDirection.subVectors(this._rideAhead, this._ridePoint);
    if (this._rideDirection.lengthSq() < 1e-8 && t > 0) {
      path.localToWorld(path.pointAt(Math.max(0, t - 1), this._rideAhead));
      this._rideDirection.subVectors(this._ridePoint, this._rideAhead);
    }
    this._rideDirection.y = 0;
    if (this._rideDirection.lengthSq() < 1e-8) this._rideDirection.set(0, 0, -1);
    this._rideDirection.normalize();
    const group = this.experience.cameraGroup;
    group.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.atan2(-this._rideDirection.x, -this._rideDirection.z));
    this._ridePoint.y += 0.04;
    if (ride.xr) {
      this._rideOffset.copy(ride.anchor).applyQuaternion(group.quaternion);
      group.position.copy(this._ridePoint).sub(this._rideOffset);
    } else group.position.copy(this._ridePoint);
    group.updateMatrixWorld(true);
  }

  /** A scan's model/ortho state changed (menu, dropdown or another user): keep the dropdowns in sync. */
  onModelChanged(path) {
    if (!this.params || !this.modelControls?.[path.flight.id]) return;
    this.params["model_" + path.flight.id] = path.representation;
    this.params["orthoTerrain_" + path.flight.id] = path.orthoOnTerrain;
    for (const c of this.modelControls[path.flight.id]) c.updateDisplay();
  }

  /** Orthomosaics of the scans showing; each scan's menu decides whether it also drapes the terrain. */
  refreshOrthos() {
    this.terrain.setOrthos(this.paths.filter((p) => p.visible && p.flight.ortho).map((p) => ({ spec: p.flight.ortho, onTerrain: p.orthoOnTerrain })));
  }

  /** A video segment was highlighted (k = -1: cleared): light up the scan photos shot during it. */
  onVideoSegment(videoPath, k) {
    const scan = this.paths.find((p) => p.flight.id === videoPath.flight.scan);
    if (!scan?.highlightWindow) return;
    if (k < 0) { scan.highlightWindow(null); return; }
    const c = videoPath.flight.chunks[k], u0 = videoPath.flight.start_utc;
    scan.highlightWindow(u0 + c.t0, u0 + c.t1);
  }

  /** Another user's hovered video segment (brahma callout relay). */
  onCalloutUpdate(data) {
    const pl = data?.payload;
    if (pl?.menu) { // another user switched a scan's model
      const scan = this.paths.find((p) => p.flight.id === pl.menu);
      if (scan) { if (pl.representation !== scan.representation) scan.setRepresentation(pl.representation); if (pl.orthoTerrain !== scan.orthoOnTerrain) scan.setOrthoOnTerrain(pl.orthoTerrain); }
      return;
    }
    if (!pl?.video) return;
    const path = this.paths.find((p) => p.flight.id === pl.video);
    path?.setRemoteSegment?.(data.visible ? pl.segment : -1);
  }


  /** Scale relief of everything geo (terrain, paths, scan meshes) about model y=0. */
  setExaggeration(v) {
    // Both lil-gui and the XR menu can call this method. Normalize the value
    // once so the scene scale and both control displays cannot drift apart.
    const value = THREE.MathUtils.clamp(Number(v) || 1, 0.5, 6);
    this.topography.exaggeration = value;
    settings.verticalExaggeration = value;
    this.model.scale.y = value;
    this.terrain.setExaggeration(value);
    for (const p of [this.panel, this.videoPanel]) p.scale.set(p.baseScale, p.baseScale / value, p.baseScale);
    if (this.params) this.params.exaggeration = value;
    this.exaggerationControl?.updateDisplay();
    this.topographyMenu?.refresh();
  }

  terrainShapeLabel(mode) { return ({ detail: "Detailed LiDAR", coarse: "Farm-wide LiDAR", flat: "Flat reference" })[mode]; }
  terrainTextureLabel(mode) { return ({ survey: "Survey + NAIP", satellite: "NAIP 2022", elevation: "Elevation tint" })[mode]; }
  setTerrainShape(mode) { this.topography.shape = mode; this.terrain.setShapeMode(mode); this.topographyMenu?.refresh(); }
  setTerrainTexture(mode) { this.topography.texture = mode; this.terrain.setTextureMode(mode); this.refreshOrthos(); this.topographyMenu?.refresh(); }
  cycleTerrainShape() { const v = ["detail", "coarse", "flat"], i = v.indexOf(this.topography.shape); this.setTerrainShape(v[(i + 1) % v.length]); }
  cycleTerrainTexture() { const v = ["survey", "satellite", "elevation"], i = v.indexOf(this.topography.texture); this.setTerrainTexture(v[(i + 1) % v.length]); }
  cycleExaggeration() { const v = [1, 1.5, 2, 3, 5], i = v.indexOf(this.topography.exaggeration); this.setExaggeration(v[(i + 1) % v.length]); }

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
    const first = "All"; // every scan visible; pick one (or a video) in the dropdown to hover it
    this.params = { flight: first, terrainShape: "detail", terrainTexture: "survey", exaggeration: 1.0, imagery: 1.0, playAll: false, swath: true, rideSpeed: 1, splatQuality: "fast" };
    this.setActiveFlight(first);
    f.add(this.params, "flight", options).name("Sample path").onChange((v) => this.setActiveFlight(v));
    f.add({ unpin: () => { this.panel.setPinned(false); this.videoPanel.setPinned(false); } }, "unpin").name("Unpin panel");
    // one "Model" dropdown per scan, mirroring the in-scene ScanMenu
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
      v.add(this.params, "rideSpeed", 0.25, 4, 0.25).name("Ride speed ×").onChange((speed) => (this.ride.speed = speed));
      v.add({ start: () => this.startRide() }, "start").name("Start / resume ride");
      v.add({ pause: () => this.pauseRide() }, "pause").name("Pause ride");
      v.add({ stop: () => this.stopRide() }, "stop").name("Stop ride");
    }
    const t = ui.addFolder("Terrain");
    t.add(this.params, "terrainShape", { "Detailed 3DEP LiDAR": "detail", "Farm-wide 3DEP LiDAR": "coarse", "Flat reference": "flat" })
      .name("Shape / model").onChange((mode) => this.setTerrainShape(mode));
    t.add(this.params, "terrainTexture", { "Survey orthos + NAIP": "survey", "NAIP 2022": "satellite", "Elevation tint": "elevation" })
      .name("Texture / source").onChange((mode) => this.setTerrainTexture(mode));
    t.add(this.params, "splatQuality", { "Interactive / VR (180K)": "fast", "Balanced (500K)": "vr", "Desktop detail (1.5M)": "desktop" })
      .name("Flower detail").onChange((quality) => this.setSplatQuality(quality));
    this.exaggerationControl = t.add(this.params, "exaggeration", 0.5, 6, 0.1)
      .name("Vertical ×").onChange((v) => this.setExaggeration(v));
    t.add(this.params, "imagery", 0, 1, 0.05).name("Imagery mix").onChange((v) => {
      this.terrain.uniforms.uImageryMix.value = v;
    });
    const provenance = ui.addFolder("Data provenance");
    const sources = { terrain: "USGS 3DEP · Santa Cruz County 2020", detail: "DSM · 1 m farm / 0.35 m detail", imagerySource: "USDA NAIP 2022 · 0.6 m aerial", coordinates: "Local ENU · elevation metres MSL" };
    provenance.add(sources, "terrain").name("Terrain").disable();
    provenance.add(sources, "detail").name("Resolution").disable();
    provenance.add(sources, "imagerySource").name("Imagery").disable();
    provenance.add(sources, "coordinates").name("Reference").disable();
  }

  update() {
    this.terrain?.update();
    // Gaussian sorting is the main camera-motion cost when multiple scans are
    // visible. Hide only during navigation; full plant detail returns at rest.
    for (const path of this.paths) {
      if (path.reps?.splat) path.reps.splat.visible = path.representation === "splat" && !this.terrain.isNavigating;
    }
    if (this.ride.state === "playing") {
      this.ride.time += this.experience.time.delta * 0.001 * this.ride.speed;
      if (this.ride.time >= this.ride.path.flight.duration_s) this.stopRide();
      else this.updateRidePose();
    }
    this.panel?.update();
    this.videoPanel?.update();
    this.rideControls?.update();
    this.topographyMenu?.update();
    for (const p of this.paths) p.menu?.update();
  }

  setSplatQuality(quality) {
    this.splatQuality = quality;
    for (const path of this.paths.filter((p) => p.flight.splat)) {
      path.preferredSplatQuality = quality;
      path.setSplatQuality(quality);
    }
    this.applyRenderScale();
  }

  applyRenderScale() {
    const cap = this.splatQuality === "desktop" ? 2 : this.splatQuality === "vr" ? 1.25 : 1;
    this.experience.renderer.instance.setPixelRatio(Math.min(this.experience.sizes.pixelRatio, cap));
  }
}
