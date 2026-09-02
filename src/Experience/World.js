/** World wiring for terrain, flights, viewpoints, and the comfort-aware FPV ride. */
import * as THREE from "three";
import { Experience, Environment } from "brahma-xr";
import { setSite, MODEL_Y, settings } from "./domain.js";
import Sky from "./Sky.js";
import Stars from "./Stars.js";
import Terrain from "./Terrain.js";
import Flight from "./Flight.js";
import SamplePanel from "./SamplePanel.js";
import VideoPanel from "./VideoPanel.js";
import RideControls from "./RideControls.js";
import VRMenu from "./VRMenu.js";

const PATH_COLORS = [0xffb347, 0x5ec8ff, 0xff6b9d, 0x9dff6b];
const VIEW_PRESETS = [
  { label: "Human scale", mode: "human", zoom: 1 },
  { label: "Table diorama", mode: "table", zoom: 1 },
  { label: "Drone overview", mode: "fly", zoom: 1 },
  { label: "Close-up", mode: "fly", zoom: 0.45 },
  { label: "High altitude", mode: "fly", zoom: 2.2 },
];

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
    this.viewPresetIndex = 2;
    /** @type {Flight[]} */
    this.flights = [];
    this.ride = { state: "inactive", path: null, time: 0, speed: 1, comfort: true, saved: null };
    this._ridePoint = new THREE.Vector3();
    this._rideAhead = new THREE.Vector3();
    this._rideDirection = new THREE.Vector3();
    this._rideForward = new THREE.Vector3(0, 0, -1);
    this._rideOffset = new THREE.Vector3();
    this._rideLookEuler = new THREE.Euler(0, 0, 0, "YXZ");
    this._rideLookAbort = null;
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

    const index = await fetch("./flights/index.json").then((r) => r.json());
    const ctx = { panel: this.panel, videoPanel: this.videoPanel };
    this.flights = await Promise.all(
      index.map((f, i) => Flight.load(f.file, { ...ctx, color: PATH_COLORS[i % PATH_COLORS.length] })),
    );
    for (const f of this.flights) this.model.add(f);
    this.updateEmphasis();
    this.refreshOrthos();

    this.vrMenu = new VRMenu(this);
    this.scene.add(this.vrMenu);

    this.setDebug();
    document.getElementById("loading").style.display = "none";
    requestAnimationFrame(() => this.focus(null));
    return this;
  }

  /** Set view modes: 'table', 'human', or 'fly' with camera zoom distance multiplier */
  setViewMode(mode, zoomFactor = 1.0) {
    const preset = VIEW_PRESETS.findIndex((entry) => entry.mode === mode && entry.zoom === zoomFactor);
    if (preset >= 0) this.viewPresetIndex = preset;
    const vExag = this.params?.exaggeration ?? 1.0;
    const cam = this.experience.camera;
    const moveDesktopCamera = !this.experience.isXRActive();

    if (mode === "table") {
      // 1.2m tabletop diorama
      this.currentScale = 0.05;
      this.model.scale.set(0.05, 0.05 * vExag, 0.05);
      this.model.position.set(0, 0.85, -0.8);
      this.model.updateMatrixWorld(true);

      if (moveDesktopCamera && cam?.controls) {
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

      if (moveDesktopCamera && cam?.controls) {
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
      if (moveDesktopCamera) this.focus(null, zoomFactor);
    }
    this.vrMenu?.refresh();
  }

  viewPresetLabel() {
    return VIEW_PRESETS[this.viewPresetIndex]?.label ?? "Drone overview";
  }

  cycleViewMode() {
    this.viewPresetIndex = (this.viewPresetIndex + 1) % VIEW_PRESETS.length;
    const preset = VIEW_PRESETS[this.viewPresetIndex];
    this.setViewMode(preset.mode, preset.zoom);
  }

  /** Toggle one flight (from the Flight Selector) and resolve hover ownership. */
  setFlightVisible(flight, v) {
    if (!v && flight.path && this.ride.path === flight.path) {
      this.stopRide();
      this.ride.path = null;
      this.rideControls?.setVisible(false);
    }
    flight.setVisible(v);
    this.updateEmphasis();
    this.refreshOrthos();
    this.vrMenu?.refresh();
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

  // ---- FPV ride -----------------------------------------------------------
  /** Make any flight path available to the FPV transport controls. */
  setRideTarget(path) {
    if (!path?.ridePointAt || (this.ride.state !== "inactive" && this.ride.path !== path)) return;
    this.ride.path = path;
    this.rideControls?.setVisible(true);
    this.rideControls?.refresh();
    this.vrMenu?.refresh();
  }

  /** VR menu flight chooser: show the flight and make it the ride target. */
  selectFlightForRide(flight) {
    if (!flight.visible) this.setFlightVisible(flight, true);
    this.setRideTarget(flight.path);
  }

  activeFlightLabel() {
    const path = this.ride.path;
    return path ? this.flights.find((f) => f.path === path)?.record.name ?? path.flight.name : "None yet";
  }

  /** The scan Flight menus act on: the ride target's (or its parent scan), else the first visible scan. */
  activeScan() {
    let f = this.ride.path ? this.flights.find((entry) => entry.path === this.ride.path) : null;
    if (f?.kind === "video") f = this.flights.find((entry) => entry.record.id === f.record.scan);
    return f?.kind === "scan" ? f : this.flights.find((entry) => entry.visible && entry.kind === "scan");
  }

  activeScanModelLabel() {
    const scan = this.activeScan();
    if (!scan) return "No scan";
    if (!scan.model) return "No 3D model";
    return ({ coverage: "Coverage mesh", recon: "Photogrammetry", splat: "Gaussian splat", none: "Terrain only" })[scan.model.representation] ?? "No 3D model";
  }

  cycleActiveScanModel() {
    const scan = this.activeScan();
    if (!scan?.model) return;
    const options = ["coverage"];
    if (scan.record.recon) options.push("recon");
    if (scan.record.splat) options.push("splat");
    options.push("none");
    const index = options.indexOf(scan.model.representation);
    scan.model.setRepresentation(options[(index + 1) % options.length]);
    this.vrMenu?.refresh();
  }

  toggleActiveScanOrtho() {
    const scan = this.activeScan();
    if (!scan?.record.ortho) return;
    scan.setOrthoOnTerrain(!scan.orthoOnTerrain);
    this.vrMenu?.refresh();
  }

  setRideSpeed(speed) {
    this.ride.speed = THREE.MathUtils.clamp(Number(speed) || 1, 0.25, 4);
    if (this.params) this.params.rideSpeed = this.ride.speed;
    this.rideSpeedControl?.updateDisplay();
    this.vrMenu?.refresh();
  }

  cycleRideSpeed() {
    const options = [0.25, 0.5, 1, 2, 4];
    const index = options.indexOf(this.ride.speed);
    this.setRideSpeed(options[(index + 1) % options.length]);
  }

  setRideComfort(comfort) {
    this.ride.comfort = Boolean(comfort);
    if (this.params) this.params.rideComfort = this.ride.comfort;
    this.rideComfortControl?.updateDisplay();
    this.vrMenu?.refresh();
  }

  toggleRideComfort() {
    this.setRideComfort(!this.ride.comfort);
  }

  rideDuration(path = this.ride.path) {
    if (!path) return 0;
    return typeof path.rideDuration === "function"
      ? path.rideDuration()
      : Math.max(0, Number(path.flight.duration_s) || 0);
  }

  startRide() {
    const ride = this.ride;
    if (!ride.path) {
      const flight = this.flights.find((f) => f.visible && f.path?.ridePointAt) ?? this.flights[0];
      if (flight) this.selectFlightForRide(flight);
    }
    const path = ride.path;
    if (!path || !this.rideDuration(path) || ride.state === "playing") return;
    if (ride.state === "paused") {
      ride.state = "playing";
      this.rideControls.refresh();
      this.vrMenu?.refresh();
      return;
    }

    const group = this.experience.cameraGroup;
    const camera = this.experience.camera;
    const locomotion = this.experience.controller?.locomotion;
    ride.saved = {
      groupPosition: group.position.clone(),
      groupQuaternion: group.quaternion.clone(),
      cameraPosition: camera.instance.position.clone(),
      cameraQuaternion: camera.instance.quaternion.clone(),
      controlsEnabled: camera.controls?.enabled,
      locomotionUpdate: locomotion?.update,
      canvasCursor: this.experience.canvas.style.cursor,
      canvasTouchAction: this.experience.canvas.style.touchAction,
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
      this._rideLookEuler.set(0, 0, 0);
      this.enableRideLook();
    }
    if (camera.controls) camera.controls.enabled = false;
    if (locomotion) locomotion.update = () => {};
    ride.state = "playing";
    this.updateRidePose();
    this.rideControls.refresh();
    this.vrMenu?.refresh();
  }

  pauseRide() {
    if (this.ride.state !== "playing") return;
    this.ride.state = "paused";
    this.rideControls.refresh();
    this.vrMenu?.refresh();
  }

  /** Let desktop and touch riders look freely while the rig follows the path. */
  enableRideLook() {
    this._rideLookAbort?.abort();
    const canvas = this.experience.canvas;
    const abort = new AbortController();
    let pointerId = null, lastX = 0, lastY = 0;
    const finish = (event) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      canvas.style.cursor = "grab";
    };

    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", (event) => {
      if (this.ride.state === "inactive" || this.ride.xr || event.button !== 0) return;
      pointerId = event.pointerId;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture?.(pointerId);
      canvas.style.cursor = "grabbing";
      event.preventDefault();
    }, { signal: abort.signal });
    canvas.addEventListener("pointermove", (event) => {
      if (event.pointerId !== pointerId) return;
      const dx = event.clientX - lastX, dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      this._rideLookEuler.y -= dx * 0.004;
      this._rideLookEuler.x = THREE.MathUtils.clamp(
        this._rideLookEuler.x - dy * 0.004,
        -Math.PI / 2 + 0.02,
        Math.PI / 2 - 0.02,
      );
      this.applyRideLook();
      event.preventDefault();
    }, { signal: abort.signal });
    canvas.addEventListener("pointerup", finish, { signal: abort.signal });
    canvas.addEventListener("pointercancel", finish, { signal: abort.signal });
    this._rideLookAbort = abort;
  }

  applyRideLook() {
    if (!this.ride.xr) this.experience.camera.instance.quaternion.setFromEuler(this._rideLookEuler);
  }

  disableRideLook(saved) {
    this._rideLookAbort?.abort();
    this._rideLookAbort = null;
    this.experience.canvas.style.cursor = saved?.canvasCursor ?? "";
    this.experience.canvas.style.touchAction = saved?.canvasTouchAction ?? "";
  }

  stopRide() {
    const ride = this.ride;
    if (ride.state === "inactive") return;
    const saved = ride.saved, group = this.experience.cameraGroup, camera = this.experience.camera;
    if (saved) {
      group.position.copy(saved.groupPosition);
      group.quaternion.copy(saved.groupQuaternion);
      camera.instance.position.copy(saved.cameraPosition);
      camera.instance.quaternion.copy(saved.cameraQuaternion);
      if (camera.controls) {
        camera.controls.enabled = saved.controlsEnabled;
        camera.controls.update();
      }
      if (this.experience.controller?.locomotion && saved.locomotionUpdate) {
        this.experience.controller.locomotion.update = saved.locomotionUpdate;
      }
    }
    this.disableRideLook(saved);
    ride.state = "inactive";
    ride.time = 0;
    ride.saved = null;
    this.rideControls.refresh();
    this.vrMenu?.refresh();
  }

  /** Put the desktop camera or complete XR rig at the drone's interpolated pose. */
  updateRidePose() {
    const ride = this.ride, path = ride.path, duration = this.rideDuration(path);
    if (!path || ride.state === "inactive" || !duration) return;
    const t = THREE.MathUtils.clamp(ride.time, 0, duration);
    path.localToWorld(path.ridePointAt(t, this._ridePoint));
    path.localToWorld(path.ridePointAt(Math.min(t + 0.5, duration), this._rideAhead));
    this._rideDirection.subVectors(this._rideAhead, this._ridePoint);
    if (this._rideDirection.lengthSq() < 1e-8 && t > 0) {
      path.localToWorld(path.ridePointAt(Math.max(0, t - 0.5), this._rideAhead));
      this._rideDirection.subVectors(this._ridePoint, this._rideAhead);
    }
    if (ride.comfort) this._rideDirection.y = 0;
    if (this._rideDirection.lengthSq() < 1e-8) this._rideDirection.set(0, 0, -1);
    this._rideDirection.normalize();

    const group = this.experience.cameraGroup;
    group.quaternion.setFromUnitVectors(this._rideForward, this._rideDirection);
    this._ridePoint.y += 0.01;
    if (ride.xr) {
      this._rideOffset.copy(ride.anchor).applyQuaternion(group.quaternion);
      group.position.copy(this._ridePoint).sub(this._rideOffset);
    } else {
      group.position.copy(this._ridePoint);
      this.applyRideLook();
    }
    group.updateMatrixWorld(true);
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
    const value = THREE.MathUtils.clamp(Number(v) || 1, 0.5, 6);
    settings.verticalExaggeration = value;
    this.model.scale.y = this.currentScale * value;
    this.terrain.setExaggeration(value);
    for (const p of [this.panel, this.videoPanel]) {
      p.scale.set(p.baseScale, p.baseScale / value, p.baseScale);
    }
    if (this.params) this.params.exaggeration = value;
    this.exaggerationControl?.updateDisplay();
    this.vrMenu?.refresh();
  }

  cycleExaggeration() {
    const options = [0.5, 1, 1.5, 2, 3, 4, 5, 6];
    const current = this.params?.exaggeration ?? 1;
    const index = options.indexOf(current);
    this.setExaggeration(options[(index + 1) % options.length]);
  }

  setImageryMix(value) {
    const mix = THREE.MathUtils.clamp(Number(value), 0, 1);
    this.terrain.uniforms.uImageryMix.value = mix;
    if (this.params) this.params.imagery = mix;
    this.imageryControl?.updateDisplay();
    this.vrMenu?.refresh();
  }

  cycleImageryMix() {
    const options = [0, 0.25, 0.5, 0.75, 1];
    const current = this.params?.imagery ?? 1;
    const index = options.indexOf(current);
    this.setImageryMix(options[(index + 1) % options.length]);
  }

  /** Global toggle over every video flight's ground swath (VR menu). */
  setGroundSwath(on) {
    const enabled = Boolean(on);
    if (this.params) this.params.swath = enabled;
    for (const f of this.flights.filter((entry) => entry.kind === "video")) {
      f.path.swathOn = enabled;
      f.path.swath.visible = enabled && f.path.segment >= 0;
      if (f.guiState) { f.guiState.swath = enabled; f.refreshGui(); }
    }
    this.vrMenu?.refresh();
  }

  toggleGroundSwath() {
    this.setGroundSwath(!this.params?.swath);
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
    // params exist even without #debug — the VR menu reads and writes them
    this.params = { exaggeration: 1.0, imagery: 1.0, swath: true, rideSpeed: 1, rideComfort: true };
    if (!this.debug.active) return;
    const ui = this.debug.ui;

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

    const fpv = ui.addFolder("FPV ride");
    this.rideSpeedControl = fpv.add(this.params, "rideSpeed", 0.25, 4, 0.25).name("Speed ×")
      .onChange((speed) => this.setRideSpeed(speed));
    this.rideComfortControl = fpv.add(this.params, "rideComfort").name("Comfort horizon")
      .onChange((comfort) => this.setRideComfort(comfort));
    fpv.add({ start: () => this.startRide() }, "start").name("Start / resume");
    fpv.add({ pause: () => this.pauseRide() }, "pause").name("Pause");
    fpv.add({ stop: () => this.stopRide() }, "stop").name("Stop / return");

    const t = ui.addFolder("Terrain");
    this.exaggerationControl = t.add(this.params, "exaggeration", 0.5, 6, 0.1).name("Vertical ×")
      .onChange((v) => this.setExaggeration(v));
    this.imageryControl = t.add(this.params, "imagery", 0, 1, 0.05).name("Imagery mix")
      .onChange((v) => this.setImageryMix(v));
  }

  update() {
    if (this.ride.state === "playing") {
      this.ride.time += this.experience.time.delta * 0.001 * this.ride.speed;
      if (this.ride.time >= this.rideDuration()) this.stopRide();
      else this.updateRidePose();
    }
    this.panel?.update();
    this.videoPanel?.update();
    for (const f of this.flights) f.update();
    this.rideControls?.update();
    this.vrMenu?.update();
  }
}
