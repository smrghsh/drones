/** World wiring for terrain, flights, viewpoints, and the comfort-aware FPV ride. */
import * as THREE from "three";
import { Experience, Environment } from "brahma-xr";
import { setSite, getSite, MODEL_Y, METERS_PER_UNIT, settings } from "./domain.js";
import { hideLegend } from "./colormap.js";
import Sky from "./Sky.js";
import Stars from "./Stars.js";
import Terrain from "./Terrain.js";
import Flight from "./Flight.js";
import SamplePanel from "./SamplePanel.js";
import VideoPanel from "./VideoPanel.js";
import VRMenu from "./VRMenu.js";
import Smartwatch from "./Smartwatch.js";

const PATH_COLORS = [0xffb347, 0x5ec8ff, 0xff6b9d, 0x9dff6b];
// Fallback when static/sites.json is missing: the original single-site layout.
const DEFAULT_SITES = [{ id: "farm", name: "UC Santa Cruz Farm", dir: "./farm", flights: "./flights/index.json" }];
// World scaling. `scale` is the model group's scale; one metre of XR space then
// spans METERS_PER_UNIT / scale metres of world, which is what the label says.
// `mode` picks the desktop camera treatment: "table" (look down at a diorama),
// "fly" (focus() on the terrain, `zoom` multiplies the distance) or "human"
// (eye height on the ground). `ground` drops the model so the terrain at the
// site centre sits at y = 0 — a 1:1 world you can stand on.
const ratio = (scale) => `${METERS_PER_UNIT / scale} m : 1 m`;
const VIEW_PRESETS = [
  { label: `${ratio(0.05)} · tabletop`, mode: "table", scale: 0.05, position: [0, 0.85, -0.8] },
  { label: `${ratio(1)} · overview`, mode: "fly", scale: 1, position: [0, MODEL_Y, 0], zoom: 1 },
  { label: `${ratio(4)} · close`, mode: "fly", scale: 4, position: [0, MODEL_Y, 0], zoom: 0.45 },
  { label: `${ratio(METERS_PER_UNIT)} · true scale`, mode: "human", scale: METERS_PER_UNIT, position: [0, 0, 0], ground: true },
];
const DEFAULT_VIEW_PRESET = 1;

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

    this.currentScale = VIEW_PRESETS[DEFAULT_VIEW_PRESET].scale;
    this.viewPresetIndex = DEFAULT_VIEW_PRESET;
    // brahma's camera defaults to far = 1000; at 1 m : 1 m the 1200 m site
    // would be clipped. WebXR's cameras inherit near/far from this one.
    const camera = this.experience.camera?.instance;
    if (camera && camera.far < 2000) {
      camera.far = 5000;
      camera.updateProjectionMatrix();
    }
    /** @type {{id:string, name:string, dir:string, flights:string}[]} static/sites.json */
    this.sites = [];
    /** the sites.json entry currently loaded */
    this.site = null;
    this.terrain = null;
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
    this.sites = await fetch("./sites.json")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null) ?? DEFAULT_SITES;

    // site-independent UI
    this.panel = new SamplePanel();
    this.model.add(this.panel);
    this.videoPanel = new VideoPanel();
    this.model.add(this.videoPanel);
    this.vrMenu = new VRMenu(this);
    this.scene.add(this.vrMenu);
    this.smartwatch = new Smartwatch(this);
    this.scene.add(this.smartwatch);
    this.setDebug();
    this.setupSiteSelect();

    // ?site=<id> picks the site; the first listed is the default
    const wanted = new URLSearchParams(location.search).get("site");
    await this.loadSite(this.sites.find((s) => s.id === wanted)?.id ?? this.sites[0].id);

    document.getElementById("loading").style.display = "none";
    return this;
  }

  // ---- sites ----------------------------------------------------------------
  /**
   * Swap the whole geo model for another site from static/sites.json: the
   * terrain (imagery + heightfield under the site's dir) and its flight index.
   * Everything geo — projections, terrain, flights, their gui folders, the FPV
   * ride, hover panels, legend — is torn down and rebuilt in place, so the XR
   * session (and the multi-user room) survives the switch.
   */
  async loadSite(id) {
    const entry = this.sites.find((s) => s.id === id);
    if (!entry || this.loadingSite) return;
    this.loadingSite = true;
    try {
      this.unloadSite();
      this.site = entry;
      const site = await fetch(`${entry.dir}/site.json`).then((r) => r.json());
      setSite({ ...site, id: entry.id, dir: entry.dir });

      this.terrain = new Terrain();
      this.model.add(this.terrain);
      await this.terrain.load();
      this.smartwatch?.setSite();
      this.terrain.setExaggeration(this.params?.exaggeration ?? 1);
      this.terrain.uniforms.uImageryMix.value = this.params?.imagery ?? 1;

      const index = await fetch(entry.flights).then((r) => (r.ok ? r.json() : []));
      const ctx = { panel: this.panel, videoPanel: this.videoPanel };
      this.flights = await Promise.all(
        index.map((f, i) =>
          Flight.load(f.file, { ...ctx, color: PATH_COLORS[i % PATH_COLORS.length] }, f.voxels != null ? { voxels: f.voxels } : null),
        ),
      );
      for (const f of this.flights) this.model.add(f);
      this.updateEmphasis();
      this.refreshOrthos();
      this.buildFlightGui();
      this.syncSiteUi();
      this.vrMenu?.refresh();
      requestAnimationFrame(() => this.focus(null));
    } finally {
      this.loadingSite = false;
    }
  }

  /** Remove the current site's terrain and flights (see loadSite). */
  unloadSite() {
    this.stopRide();
    this.ride.path = null;
    for (const p of [this.panel, this.videoPanel]) { p?.setPinned(false); p?.hide(); }
    for (const f of this.flights) { this.model.remove(f); f.dispose(); }
    this.flights = [];
    if (this.terrain) {
      this.model.remove(this.terrain);
      this.terrain.dispose();
      this.terrain = null;
    }
    hideLegend();
    this.flightFolder?.children.slice().forEach((c) => c.destroy());
  }

  siteLabel() {
    return this.site?.name ?? "";
  }

  /** Next site in sites.json (VR menu). */
  cycleSite() {
    if (this.sites.length < 2) return;
    const i = this.sites.findIndex((s) => s.id === this.site?.id);
    this.loadSite(this.sites[(i + 1) % this.sites.length].id);
  }

  /** The HTML <select id="site"> (always shown when there is more than one site). */
  setupSiteSelect() {
    const select = document.getElementById("site");
    if (!select) return;
    select.replaceChildren(...this.sites.map((s) => Object.assign(document.createElement("option"), { value: s.id, textContent: s.name })));
    select.hidden = this.sites.length < 2;
    select.addEventListener("change", () => this.loadSite(select.value));
  }

  /** Reflect the loaded site in the URL, title, <select> and lil-gui. */
  syncSiteUi() {
    const id = this.site?.id;
    const select = document.getElementById("site");
    if (select) select.value = id;
    if (this.params) { this.params.site = id; this.siteControl?.updateDisplay(); }
    document.title = `${this.site?.name ?? "Drone flights"} — drone flights`;
    const url = new URL(location.href);
    if (id === this.sites[0]?.id) url.searchParams.delete("site");
    else url.searchParams.set("site", id);
    history.replaceState(null, "", url);
  }

  /** (Re)populate the lil-gui Flight Selector for the loaded site's flights. */
  buildFlightGui() {
    const f = this.flightFolder;
    if (!f) return;
    f.add({ unpin: () => { this.panel.setPinned(false); this.videoPanel.setPinned(false); } }, "unpin").name("Unpin panel");
    for (const fl of this.flights) {
      this.params["show_" + fl.record.id] = fl.visible;
      f.add(this.params, "show_" + fl.record.id).name(fl.record.name).onChange((v) => this.setFlightVisible(fl, v));
    }
    for (const fl of this.flights) fl.addGui(f);
  }

  // ---- world scaling --------------------------------------------------------
  /** Apply VIEW_PRESETS[index]: scale + place the model, then seat the desktop camera. */
  applyPreset(index) {
    const preset = VIEW_PRESETS[index];
    if (!preset) return;
    this.viewPresetIndex = index;
    const vExag = this.params?.exaggeration ?? 1.0;
    const cam = this.experience.camera;
    const [x, y, z] = preset.position;

    this.currentScale = preset.scale;
    this.model.scale.set(preset.scale, preset.scale * vExag, preset.scale);
    this.model.position.set(x, y, z);
    if (preset.ground && this.terrain) {
      // terrain height at the site centre (model frame, before exaggeration)
      const groundUnits = (this.terrain.heightAt(0, 0) - (getSite()?.z_center ?? 0)) / METERS_PER_UNIT;
      this.model.position.y = y - groundUnits * preset.scale * vExag;
    }
    this.model.updateMatrixWorld(true);

    if (!this.experience.isXRActive() && cam?.controls) {
      if (preset.mode === "table") {
        cam.controls.target.set(x, y, z);
        cam.instance.position.set(x, y + 0.55, z + 1.0);
        cam.instance.lookAt(cam.controls.target);
        cam.controls.update();
      } else if (preset.mode === "human") {
        // eye height on the (grounded) site centre, looking north
        cam.instance.position.set(0, 1.7, 5.0);
        cam.controls.target.set(0, 1.6, 0);
        cam.instance.lookAt(cam.controls.target);
        cam.controls.update();
      } else {
        // zoom < 1 moves closer, > 1 further
        this.focus(null, preset.zoom ?? 1);
      }
    }
    this.vrMenu?.refresh();
  }

  /**
   * Legacy entry point (callouts, older callers): 'table' | 'fly' | 'human',
   * mapped to the nearest preset — by `scale` when given, else by the fly
   * `zoomFactor`, else the first preset of that mode.
   */
  setViewMode(mode, zoomFactor = 1.0, scale) {
    const candidates = VIEW_PRESETS.map((p, i) => [p, i]).filter(([p]) => p.mode === mode);
    if (!candidates.length) return;
    const [, index] =
      candidates.find(([p]) => scale != null && p.scale === scale) ??
      candidates.find(([p]) => (p.zoom ?? 1) === zoomFactor) ??
      candidates[0];
    this.applyPreset(index);
  }

  viewPresetLabel() {
    return VIEW_PRESETS[this.viewPresetIndex]?.label ?? VIEW_PRESETS[DEFAULT_VIEW_PRESET].label;
  }

  cycleViewMode() {
    this.applyPreset((this.viewPresetIndex + 1) % VIEW_PRESETS.length);
  }

  /** Toggle one flight (from the Flight Selector) and resolve hover ownership. */
  setFlightVisible(flight, v) {
    if (!v && flight.path && this.ride.path === flight.path) {
      this.stopRide();
      this.ride.path = null;
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
    this.terrain?.setOrthos(
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
    this.vrMenu?.refresh();
  }

  pauseRide() {
    if (this.ride.state !== "playing") return;
    this.ride.state = "paused";
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
      this.setViewMode(pl.viewMode, pl.zoomFactor, pl.scale);
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
    this.terrain?.setExaggeration(value);
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
    if (this.terrain?.uniforms) this.terrain.uniforms.uImageryMix.value = mix;
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
    if (!cam?.controls || (!path && !this.terrain)) return;

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
    this.params = { exaggeration: 1.0, imagery: 1.0, swath: true, rideSpeed: 1, rideComfort: true, site: this.sites[0]?.id };
    if (!this.debug.active) return;
    const ui = this.debug.ui;

    if (this.sites.length > 1) {
      this.siteControl = ui.add(this.params, "site", Object.fromEntries(this.sites.map((s) => [s.name, s.id])))
        .name("Site").onChange((id) => this.loadSite(id));
    }

    const z = ui.addFolder("Scale & Perspectives");
    VIEW_PRESETS.forEach((preset, i) => z.add({ p: () => this.applyPreset(i) }, "p").name(preset.label));

    // Flight Selector: one checkbox per flight; each visible flight shows its
    // own options folder (built by the Flight itself) right below. Filled by
    // buildFlightGui() whenever a site loads.
    this.flightFolder = ui.addFolder("Flight Selector");

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
    this.vrMenu?.update();
    this.smartwatch?.update();
  }
}
