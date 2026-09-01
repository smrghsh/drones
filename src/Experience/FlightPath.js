/** Flight-path rendering plus time interpolation used by the FPV ride. */
import * as THREE from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Experience } from "brahma-xr";
import { project, METERS_PER_UNIT, settings } from "./domain.js";
import ScanMenu from "./ScanMenu.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { fetchChunked } from "./chunked.js";

/**
 * One drone mission: a fat line through the waypoints plus sample markers.
 * Implements brahma's "isPath" contract so Pointer hands us hover points
 * (setSphere) and precise pointOnLine selections (onSelect) on desktop + VR.
 */
export default class FlightPath extends THREE.Group {
  constructor(flight, panel, color) {
    super();
    this.experience = new Experience();
    this.flight = flight;
    this.panel = panel;
    this.isPath = true;
    this.name = flight.id;
    this.color = new THREE.Color(color);
    this.hover = false;

    const positions = [];
    for (const w of flight.waypoints) {
      const p = project(w.lat, w.lon, w.alt_msl);
      positions.push(p.x, p.y, p.z);
    }
    const geometry = new LineGeometry();
    geometry.setPositions(positions);
    this.material = new LineMaterial({
      color: this.color,
      linewidth: 3,
      transparent: true,
      opacity: 0.95,
    });
    this.line = new Line2(geometry, this.material);
    this.line.computeLineDistances();
    this.line.renderOrder = 2;
    this.add(this.line);

    // sample points: small cones pointing where the camera looked
    this.samplePositions = flight.samples.map((s) => project(s.lat, s.lon, s.alt_msl));
    const isScan = flight.kind === "scan";
    const r = isScan ? 0.003 : 0.012;
    const cone = new THREE.ConeGeometry(r, r * 2.5, 8);
    cone.translate(0, -r * 1.25, 0); // tip at the camera position, body along -Y (view direction)
    cone.rotateX(Math.PI); // ConeGeometry points +Y; we want the base to trail behind
    const inst = new THREE.InstancedMesh(cone, new THREE.MeshBasicMaterial({ color: this.color }), flight.samples.length);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3();
    flight.samples.forEach((s, i) => {
      const h = THREE.MathUtils.degToRad(s.heading ?? 0), pch = THREE.MathUtils.degToRad(s.gimbal_pitch ?? -90);
      dir.set(Math.sin(h) * Math.cos(pch), Math.sin(pch), -Math.cos(h) * Math.cos(pch)); // heading cw from N, pitch <0 = down
      q.setFromUnitVectors(up, dir.negate()); // cone geometry's +Y (after flip) must face -dir
      m.compose(this.samplePositions[i], q, new THREE.Vector3(1, 1, 1));
      inst.setMatrixAt(i, m);
    });
    inst.renderOrder = 2;
    this.samples = inst;
    this.add(inst);
    this.highlightWindow(null);

    // 3D representations of a scan: Skydio coverage mesh (shipped with the
    // export), our own photogrammetry mesh and Gaussian splat (tools/reconstruct.py)
    this.reps = {};
    this.representation = "coverage";
    this.orthoOnTerrain = true;
    this.loading = null;
    if (flight.mesh) this.loadMesh(flight.mesh);

    // hover marker + panel scale, sized to the mission's footprint
    this.uiScale = isScan ? 0.2 : 1;
    this.marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.02 * this.uiScale, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    this.marker.visible = false;
    this.add(this.marker);

    this.setResolution();
    this.experience.on("resize", () => this.setResolution());
    this.experience.renderer.instance.xr.addEventListener("sessionstart", () => { this.setResolution(); this.setSplatQuality("fast"); });
    this.experience.renderer.instance.xr.addEventListener("sessionend", () => { this.setResolution(); this.setSplatQuality(this.preferredSplatQuality ?? "fast"); });
    this.experience.selectableObjects.push(this);
  }

  /** Photogrammetry / scan mesh in the flight's local gravity-aligned frame. */
  loadMesh(spec) {
    new GLTFLoader().load(spec.file, (gltf) => {
      const mesh = gltf.scene;
      mesh.traverse((o) => {
        if (o.isMesh) {
          // Skydio coverage meshes carry near-black coverage flags as vertex
          // colours, so shade by normals with a neutral tint instead.
          // Drawn over the terrain: the scan is the finer ground truth and the
          // lidar DSM (with crops on it) would otherwise bury most of it.
          // Skydio coverage meshes carry no RGB, so drape the aerial imagery.
          o.material = this.experience.world.terrain.drapeMaterial();
          o.renderOrder = 1;
          o.raycast = () => {};
        }
      });
      // Skydio's glTF root node already converts its z-up local frame to
      // glTF y-up, i.e. local (x, y, z) -> (x, z, -y) == our scene frame
      // (x=E, y=up, z=-N) before yaw. A ccw yaw about local z (metres, ENU)
      // is the same rotation about scene +y.
      const yawed = new THREE.Group();
      yawed.rotation.y = THREE.MathUtils.degToRad(spec.yaw_deg);
      yawed.add(mesh);
      const anchor = new THREE.Group();
      anchor.position.copy(project(spec.origin.lat, spec.origin.lon, spec.origin.alt_msl));
      anchor.scale.setScalar(1 / METERS_PER_UNIT); // vertical exaggeration is applied on World.model
      anchor.add(yawed);
      this.mesh = anchor;
      this.reps.coverage = anchor;
      anchor.visible = this.representation === "coverage";
      this.add(anchor);
      this.updateMatrixWorld(true);
      this.meshBounds = new THREE.Box3().setFromObject(mesh); // world space
      this.placeMenu();
      this.dispatchEvent({ type: "meshloaded" });
    });
  }

  /** In-scene menu beside the scan (needs the coverage mesh bounds to know where "beside" is). */
  placeMenu() {
    if (this.flight.kind !== "scan") return;
    if (!this.menu) { this.menu = new ScanMenu(this); this.add(this.menu); this.menu.setVisible(this.visible); }
    const box = this.meshBounds ?? this.bounds();
    const local = this.worldToLocal(new THREE.Vector3(box.max.x, box.max.y, box.min.z)); // NE corner, top
    this.menu.position.copy(local).add(new THREE.Vector3(0.12 * this.uiScale, 0.35 * this.uiScale, 0));
  }

  /** Anchor group for a georeferenced asset: ENU metres about origin (lat, lon, alt 0 = MSL). */
  anchorFor(spec) {
    const anchor = new THREE.Group();
    anchor.position.copy(project(spec.origin.lat, spec.origin.lon, spec.origin.alt_msl ?? 0));
    anchor.scale.setScalar(1 / METERS_PER_UNIT);
    const inner = new THREE.Group();
    const o = spec.offset_m ?? [0, 0, 0];
    inner.position.set(o[0], o[2], -o[1]); // (e, n, up) -> scene (x, y, -z)
    inner.rotation.y = THREE.MathUtils.degToRad(spec.yaw_deg ?? 0);
    anchor.add(inner);
    anchor.inner = inner;
    return anchor;
  }

  /** Switch the scan's 3D model: "coverage" | "recon" | "splat" | "none". Loads lazily. */
  async setRepresentation(key) {
    this.representation = key;
    for (const [k, g] of Object.entries(this.reps)) g.visible = k === key;
    this.menu?.refresh();
    this.experience.world?.onModelChanged?.(this);
    if (key === "none" || this.reps[key]) return;
    const spec = this.flight[key];
    if (!spec) return;
    this.loading = key; this.menu?.refresh();
    const anchor = this.anchorFor(spec);
    try {
      if (key === "recon") {
        // meshopt-compressed glb (tools/reconstruct.py -> gltf-transform), possibly split into <5 MB parts
        const buf = await fetchChunked(spec.file);
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.parseAsync(buf, spec.file.replace(/[^/]*$/, ""));
        const m = gltf.scene;
        if (spec.frame?.startsWith("enu")) m.rotation.x = -Math.PI / 2; // z-up ENU -> y-up
        m.traverse((o) => { if (o.isMesh) { o.raycast = () => {}; o.material.side = THREE.DoubleSide; o.renderOrder = 1; } });
        anchor.inner.add(m);
      } else if (key === "splat") {
        const quality = this.flight.splat_fast ? "fast" : this.flight.splat_vr ? "vr" : "desktop";
        const qualitySpec = quality === "fast" ? this.flight.splat_fast : quality === "vr" ? this.flight.splat_vr : spec;
        const splat = await this.makeSplat(qualitySpec);
        this.splatMesh = splat; this.splatQuality = quality; this.splatAnchor = anchor;
        anchor.inner.add(splat);
      }
    } catch (e) {
      console.error(`failed to load ${key} for ${this.flight.id}`, e);
      this.loading = null; this.representation = "coverage"; this.reps.coverage && (this.reps.coverage.visible = true); this.menu?.refresh();
      return;
    }
    this.reps[key] = anchor;
    this.add(anchor);
    this.loading = null;
    anchor.visible = this.representation === key; // user may have switched meanwhile
    this.menu?.refresh();
  }

  async makeSplat(spec) {
    const { SplatMesh, SplatFileType } = await import("./spark.module.js");
    const bytes = new Uint8Array(await fetchChunked(spec.file));
    const type = spec.file.endsWith(".sog") ? SplatFileType.PCSOGSZIP : spec.file.endsWith(".spz") ? SplatFileType.SPZ : SplatFileType.PLY;
    const splat = new SplatMesh({ fileBytes: bytes, fileType: type, blurAmount: 0.12, maxStdDev: 2.45, minAlpha: 1 / 255 });
    if (spec.frame?.startsWith("enu")) splat.rotation.x = -Math.PI / 2;
    splat.raycast = () => {};
    return splat;
  }

  /** Full detail on desktop; a 500K-splat model for stereo headset rendering. */
  async setSplatQuality(quality) {
    if (!this.flight.splat_vr || !this.splatMesh || this.splatQuality === quality) return;
    this.pendingSplatQuality = quality;
    const spec = quality === "fast" ? (this.flight.splat_fast ?? this.flight.splat_vr) : quality === "vr" ? this.flight.splat_vr : this.flight.splat;
    try {
      const next = await this.makeSplat(spec);
      if (this.pendingSplatQuality !== quality) { next.dispose?.(); return; }
      const old = this.splatMesh;
      this.splatAnchor.inner.remove(old);
      this.splatAnchor.inner.add(next);
      this.splatMesh = next; this.splatQuality = quality;
      old.dispose?.();
    } catch (error) {
      console.error(`failed to switch splat quality to ${quality}`, error);
    }
  }

  setOrthoOnTerrain(v) {
    this.orthoOnTerrain = v;
    this.experience.world?.refreshOrthos();
    this.menu?.refresh();
    this.experience.world?.onModelChanged?.(this);
  }


  /**
   * Brighten the sample markers captured between utc0 and utc1 (a video
   * segment); everything else keeps the path colour. null clears.
   */
  highlightWindow(utc0, utc1) {
    const inst = this.samples, n = this.flight.samples.length;
    const hot = new THREE.Color(0xffffff), base = this.color, dimmed = this.color.clone().multiplyScalar(0.45);
    const active = utc0 != null;
    let count = 0;
    for (let i = 0; i < n; i++) {
      const u = this.flight.samples[i].utc;
      const on = active && u != null && u >= utc0 && u <= utc1;
      if (on) count++;
      inst.setColorAt(i, on ? hot : active ? dimmed : base);
    }
    inst.instanceColor.needsUpdate = true;
    return count;
  }

  /** World-space bounding box of the path, for camera focusing. */
  bounds() {
    const box = new THREE.Box3().setFromPoints(this.samplePositions);
    return box.applyMatrix4(this.matrixWorld);
  }

  setResolution() {
    const r = this.experience.renderer.instance;
    const s = new THREE.Vector2();
    r.getDrawingBufferSize(s);
    this.material.resolution.copy(s);
  }

  // ---- brahma Pointer contract -------------------------------------------
  onHover() {
    this.hover = true;
    this.material.linewidth = 5;
    this.marker.visible = true;
  }
  onUnhover() {
    this.hover = false;
    this.material.linewidth = 3;
    this.marker.visible = false;
    this.panel.hide();
  }
  setSphere(worldPoint) {
    this.marker.position.copy(this.worldToLocal(worldPoint.clone()));
    const s = this.nearestSample(this.marker.position);
    if (!this.panel.pinned) this.panel.show(s.sample, this.flight, this.localToWorld(s.position.clone()), this.uiScale);
  }
  onSelect(worldPoint) {
    this.experience.world?.setRideTarget?.(this);
    if (this.panel.pinned) {
      this.panel.setPinned(false);
      if (worldPoint) this.setSphere(worldPoint);
    } else {
      if (worldPoint) this.setSphere(worldPoint);
      this.panel.setPinned(true);
    }
  }
  hideSphere() {}

  nearestSample(localPoint) {
    let best = 0, bd = Infinity;
    this.samplePositions.forEach((p, i) => {
      const d = p.distanceToSquared(localPoint);
      if (d < bd) { bd = d; best = i; }
    });
    return { sample: this.flight.samples[best], position: this.samplePositions[best], index: best };
  }

  /** Seconds available to ride, derived from capture timestamps when present. */
  rideDuration() {
    const samples = this.flight.samples;
    if (samples.length < 2) return 0;
    const elapsed = Number(samples.at(-1).utc) - Number(samples[0].utc);
    return Number.isFinite(elapsed) && elapsed > 0 ? elapsed : samples.length - 1;
  }

  /** Interpolate a local scene point at `seconds` into this mission. */
  pointAt(seconds, target = new THREE.Vector3()) {
    const samples = this.flight.samples;
    if (!samples.length) return target.set(0, 0, 0);
    if (samples.length === 1) return target.copy(this.samplePositions[0]);

    const duration = this.rideDuration();
    const elapsed = THREE.MathUtils.clamp(Number(seconds) || 0, 0, duration);
    const firstUtc = Number(samples[0].utc);
    const timestampsValid = Number.isFinite(firstUtc)
      && Number.isFinite(Number(samples.at(-1).utc))
      && Number(samples.at(-1).utc) > firstUtc;

    let upper = 1;
    if (timestampsValid) {
      const utc = firstUtc + elapsed;
      let low = 1, high = samples.length - 1;
      while (low < high) {
        const middle = (low + high) >> 1;
        if (Number(samples[middle].utc) < utc) low = middle + 1;
        else high = middle;
      }
      upper = low;
      const a = Number(samples[upper - 1].utc), b = Number(samples[upper].utc);
      const alpha = b > a ? (utc - a) / (b - a) : 0;
      return target.copy(this.samplePositions[upper - 1]).lerp(this.samplePositions[upper], alpha);
    }

    const position = duration > 0 ? elapsed / duration * (samples.length - 1) : 0;
    upper = Math.min(Math.floor(position) + 1, samples.length - 1);
    return target.copy(this.samplePositions[upper - 1]).lerp(this.samplePositions[upper], position - (upper - 1));
  }

  /**
   * Show/hide; `emphasis` < 1 draws the path subdued and takes it out of the
   * pointer's selectable set (a video recorded during this scan shares its
   * trajectory, so only one of them can own the hover at a time).
   */
  setActive(active, emphasis = 1) {
    this.visible = active;
    const selectable = active && emphasis >= 1;
    const list = this.experience.selectableObjects;
    const i = list.indexOf(this);
    if (selectable && i < 0) list.push(this);
    if (!selectable && i >= 0) list.splice(i, 1);
    if (!selectable && this.hover) this.onUnhover();
    this.menu?.setVisible(active);
    this.material.opacity = 0.95 * (emphasis < 1 ? 0.35 : 1);
    this.samples.material.transparent = true;
    this.samples.material.opacity = emphasis < 1 ? 0.35 : 1;
    this.samples.material.needsUpdate = true;
  }
}
