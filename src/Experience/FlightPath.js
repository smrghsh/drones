import * as THREE from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { Experience } from "brahma-xr";
import { turbo, metricRange, showLegend, hideLegend } from "./colormap.js";

/**
 * The trajectory of one Flight: a screen-space fat line through the track,
 * plus an instanced cone per sample showing where the camera looked.
 *
 * Owns its own interactivity — implements brahma's "isPath" contract so the
 * shared Pointer hands it hover points (setSphere) and precise pointOnLine
 * selections (onSelect) on desktop and in VR; hovering shows the nearest
 * sample in the SamplePanel. The LineMaterial is screen-space (fat lines), so
 * the path reads at any world scale (table diorama to 1:1); the only shader
 * bookkeeping it needs is the drawing-buffer resolution, wired here.
 *
 * The line is vertex-coloured, so any Track channel can be painted along it
 * (`colorBy("co2")`) with the shared turbo colour map and HTML legend.
 */
export default class FlightPath extends THREE.Group {
  /**
   * @param {object} opts
   * @param {object} opts.flight the flight record (metadata JSON)
   * @param {import("./Track.js").default} opts.track trajectory + channels
   * @param {object} opts.panel SamplePanel (or VideoPanel for subclasses)
   * @param {THREE.ColorRepresentation} opts.color path colour
   * @param {number} [opts.uiScale=1] marker/panel scale for small missions
   * @param {number} [opts.linewidth=3] base line width (px)
   * @param {number} [opts.coneRadius=0.012] sample cone size (0 = no cones)
   */
  constructor({ flight, track, panel, color, uiScale = 1, linewidth = 3, coneRadius = 0.012 }) {
    super();
    this.experience = new Experience();
    this.flight = flight;
    this.track = track;
    this.panel = panel;
    this.isPath = true;
    this.name = flight.id + "-path";
    this.color = new THREE.Color(color);
    this.uiScale = uiScale;
    this.linewidth = linewidth;
    this.hover = false;
    this.emphasis = 1;
    this.colorKey = null;

    // fat line through the track, vertex-coloured so channels can paint it
    this.positions = track.positions();
    this._colors = new Float32Array(this.positions.length);
    this.geometry = new LineGeometry();
    this.geometry.setPositions(this.positions);
    this.material = new LineMaterial({ vertexColors: true, linewidth, transparent: true, opacity: 0.95 });
    this.line = new Line2(this.geometry, this.material);
    this.line.computeLineDistances();
    this.line.renderOrder = 2;
    this.add(this.line);
    this.paint(() => this.color);

    if (coneRadius > 0) this.buildCones(coneRadius);

    // hover marker, sized to the mission's footprint
    this.marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.02 * uiScale, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    this.marker.visible = false;
    this.add(this.marker);

    this.setResolution();
    this.experience.on("resize", () => this.setResolution());
    const xr = this.experience.renderer.instance.xr;
    xr.addEventListener("sessionstart", () => this.setResolution());
    xr.addEventListener("sessionend", () => this.setResolution());
    this.experience.selectableObjects.push(this);
  }

  /** Small cones at every sample, tip at the camera, body along the view direction. */
  buildCones(r) {
    const n = this.track.length;
    const heading = this.track.channel("heading"), pitch = this.track.channel("gimbal_pitch");
    const cone = new THREE.ConeGeometry(r, r * 2.5, 8);
    cone.translate(0, -r * 1.25, 0); // tip at the camera position, body along -Y (view direction)
    cone.rotateX(Math.PI); // ConeGeometry points +Y; we want the base to trail behind
    const inst = new THREE.InstancedMesh(cone, new THREE.MeshBasicMaterial({ color: 0xffffff }), n);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
    const up = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3(), p = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      const h = THREE.MathUtils.degToRad(nanFallback(heading?.[i], 0));
      const pch = THREE.MathUtils.degToRad(nanFallback(pitch?.[i], -90));
      dir.set(Math.sin(h) * Math.cos(pch), Math.sin(pch), -Math.cos(h) * Math.cos(pch)); // heading cw from N, pitch <0 = down
      q.setFromUnitVectors(up, dir.negate()); // cone geometry's +Y (after flip) must face -dir
      m.compose(this.track.position(i, p), q, one);
      inst.setMatrixAt(i, m);
      inst.setColorAt(i, this.color);
    }
    inst.renderOrder = 2;
    this.samples = inst;
    this.add(inst);
  }

  // ---- painting -----------------------------------------------------------
  /** Recolour the line: `fn(i, out)` returns the colour for point i. */
  paint(fn) {
    const n = this.track.length, colors = this._colors, c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      const col = fn(i, c) ?? c;
      colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
    }
    this.geometry.setColors(colors);
  }

  /**
   * Paint the line by a Track channel through the turbo colour map (robust
   * 2..98 percentile range, HTML legend). `"alt"` colours by altitude;
   * null/"none" restores the flat path colour.
   */
  colorBy(key) {
    this.colorKey = !key || key === "none" ? null : key;
    if (!this.colorKey) {
      this.paint(() => this.color);
      hideLegend();
      return;
    }
    const vals = this.track.channel(key);
    if (!vals) return;
    const { lo, hi } = metricRange(vals);
    const missing = new THREE.Color(0x3a4150);
    this.paint((i, out) => (Number.isFinite(vals[i]) ? turbo((vals[i] - lo) / (hi - lo), out) : missing));
    if (this.visible) {
      const meta = key === "alt" ? { label: "Altitude", unit: "m MSL" } : this.flight.metrics?.[key] ?? { label: key, unit: "" };
      showLegend({ key, label: meta.label, unit: meta.unit, lo, hi });
    }
  }

  /** Base line width in pixels (hover adds 2). */
  setLineWidth(w) {
    this.linewidth = w;
    this.material.linewidth = this.hover ? w + 2 : w;
  }

  /** Show/hide the per-sample cones. */
  setConesVisible(v) {
    if (this.samples) this.samples.visible = v;
  }

  /**
   * Brighten the sample cones captured between utc0 and utc1 (a video
   * segment); everything else keeps the path colour. null clears.
   */
  highlightWindow(utc0, utc1) {
    if (!this.samples) return 0;
    const utc = this.track.channel("utc");
    const hot = new THREE.Color(0xffffff), dimmed = this.color.clone().multiplyScalar(0.45);
    const active = utc0 != null;
    let count = 0;
    for (let i = 0; i < this.track.length; i++) {
      const u = utc?.[i];
      const on = active && Number.isFinite(u) && u >= utc0 && u <= utc1;
      if (on) count++;
      this.samples.setColorAt(i, on ? hot : active ? dimmed : this.color);
    }
    this.samples.instanceColor.needsUpdate = true;
    return count;
  }

  // ---- polyline helpers (shared with VideoPath) ---------------------------
  /** Scene point at fractional index t (linear between points). */
  pointAt(t, target = new THREE.Vector3()) {
    const P = this.positions, n = this.track.length;
    const i = Math.min(Math.max(Math.floor(t), 0), n - 2);
    const f = THREE.MathUtils.clamp(t - i, 0, 1);
    const a = i * 3;
    return target.set(
      P[a] + (P[a + 3] - P[a]) * f,
      P[a + 1] + (P[a + 4] - P[a + 1]) * f,
      P[a + 2] + (P[a + 5] - P[a + 2]) * f,
    );
  }

  /** Fractional index of the closest point on the polyline to a local point. */
  timeAt(localPoint) {
    let bt = 0, bd = Infinity;
    const a = new THREE.Vector3(), b = new THREE.Vector3(), ab = new THREE.Vector3(), ap = new THREE.Vector3(), q = new THREE.Vector3();
    for (let i = 0; i < this.track.length - 1; i++) {
      this.track.position(i, a); this.track.position(i + 1, b);
      ab.subVectors(b, a); ap.subVectors(localPoint, a);
      const L = ab.lengthSq();
      const f = L > 1e-12 ? THREE.MathUtils.clamp(ap.dot(ab) / L, 0, 1) : 0;
      const d = q.copy(a).addScaledVector(ab, f).distanceToSquared(localPoint);
      if (d < bd) { bd = d; bt = i + f; }
    }
    return bt;
  }

  /** Nearest sample to a local-frame point. */
  nearestSample(localPoint) {
    const P = this.positions;
    let best = 0, bd = Infinity;
    for (let i = 0; i < this.track.length; i++) {
      const a = i * 3;
      const dx = P[a] - localPoint.x, dy = P[a + 1] - localPoint.y, dz = P[a + 2] - localPoint.z;
      const d = dx * dx + dy * dy + dz * dz;
      if (d < bd) { bd = d; best = i; }
    }
    return { sample: this.track.record(best), position: this.track.position(best), index: best };
  }

  /** World-space bounding box of the path, for camera focusing. */
  bounds() {
    const box = new THREE.Box3().setFromArray(this.positions);
    return box.applyMatrix4(this.matrixWorld);
  }

  setResolution() {
    const s = new THREE.Vector2();
    this.experience.renderer.instance.getDrawingBufferSize(s);
    this.material.resolution.copy(s);
  }

  // ---- brahma Pointer contract -------------------------------------------
  onHover() {
    this.hover = true;
    this.material.linewidth = this.linewidth + 2;
    this.marker.visible = true;
  }
  onUnhover() {
    this.hover = false;
    this.material.linewidth = this.linewidth;
    this.marker.visible = false;
    this.panel.hide();
  }
  setSphere(worldPoint) {
    this.marker.position.copy(this.worldToLocal(worldPoint.clone()));
    const s = this.nearestSample(this.marker.position);
    if (!this.panel.pinned) this.panel.show(s.sample, this.flight, this.localToWorld(s.position.clone()), this.uiScale);
  }
  onSelect(worldPoint) {
    if (this.panel.pinned) {
      this.panel.setPinned(false);
      if (worldPoint) this.setSphere(worldPoint);
    } else {
      if (worldPoint) this.setSphere(worldPoint);
      this.panel.setPinned(true);
    }
  }
  hideSphere() {}

  /**
   * Show/hide; `emphasis` < 1 draws the path subdued and takes it out of the
   * pointer's selectable set (a video recorded during a scan shares its
   * trajectory, so only one of them can own the hover at a time).
   */
  setActive(active, emphasis = 1) {
    this.visible = active;
    this.emphasis = emphasis;
    const selectable = active && emphasis >= 1;
    const list = this.experience.selectableObjects;
    const i = list.indexOf(this);
    if (selectable && i < 0) list.push(this);
    if (!selectable && i >= 0) list.splice(i, 1);
    if (!selectable && this.hover) this.onUnhover();
    this.material.opacity = 0.95 * (emphasis < 1 ? 0.35 : 1);
    if (this.samples) {
      this.samples.material.transparent = true;
      this.samples.material.opacity = emphasis < 1 ? 0.35 : 1;
      this.samples.material.needsUpdate = true;
    }
    if (this.colorKey) active ? this.colorBy(this.colorKey) : hideLegend(); // keep the legend in sync
  }
}

function nanFallback(v, d) {
  return Number.isFinite(v) ? v : d;
}
