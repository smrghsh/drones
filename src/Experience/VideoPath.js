/** Video-path rendering, playback interaction, and FPV time interpolation. */
import * as THREE from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { Experience } from "brahma-xr";
import { project, toLocalMetres, metresToScene, METERS_PER_UNIT } from "./domain.js";

// Skydio 2+ 16:9 video field of view (approx.) — used for the ground swath.
const HFOV = THREE.MathUtils.degToRad(75);
const VFOV = 2 * Math.atan(Math.tan(HFOV / 2) * 9 / 16);
const SWATH_MAX_M = 15; // cap footprint rays that never meet the ground (horizon shots)

/**
 * A flight video placed on its (interpolated) trajectory. The path is cut
 * into `segment_s`-second pieces; hovering a piece highlights it (line +
 * glow tube + ground swath) and plays that clip in the VideoPanel, with a
 * drone marker riding the segment in sync. Implements brahma's isPath
 * contract like FlightPath, so it works with the mouse and VR controllers.
 */
export default class VideoPath extends THREE.Group {
  constructor(flight, panel, color) {
    super();
    this.experience = new Experience();
    this.flight = flight;
    this.panel = panel;
    this.isPath = true;
    this.name = flight.id;
    this.color = new THREE.Color(color);
    this.dim = this.color.clone().multiplyScalar(0.35);
    this.hover = false;
    this.segment = -1; // highlighted segment index
    this.remoteSegment = -1; // what another user is hovering (via callout)
    this.playAll = false;
    this.swathOn = true;
    this.uiScale = 0.25;

    // 1 Hz track -> scene points
    this.track = flight.track;
    this.points = this.track.map((p) => project(p.lat, p.lon, p.alt_msl));
    const positions = [], colors = [];
    for (const p of this.points) positions.push(p.x, p.y, p.z);
    for (let i = 0; i < this.points.length; i++) colors.push(this.dim.r, this.dim.g, this.dim.b);
    this.geometry = new LineGeometry();
    this.geometry.setPositions(positions);
    this.geometry.setColors(colors);
    this.colors = colors;
    this.material = new LineMaterial({ vertexColors: true, linewidth: 4, transparent: true, opacity: 0.95, dashed: false });
    this.line = new Line2(this.geometry, this.material);
    this.line.computeLineDistances();
    this.line.renderOrder = 2;
    this.add(this.line);

    // segment tick marks: a small ring at every segment boundary
    const seg = flight.segment_s;
    const nSeg = flight.chunks.length;
    const tick = new THREE.TorusGeometry(0.006, 0.0015, 6, 16);
    this.ticks = new THREE.InstancedMesh(tick, new THREE.MeshBasicMaterial({ color: this.color, transparent: true, opacity: 0.7 }), nSeg + 1);
    const m = new THREE.Matrix4();
    for (let k = 0; k <= nSeg; k++) {
      const p = this.pointAt(Math.min(k * seg, flight.duration_s));
      m.makeRotationX(Math.PI / 2).setPosition(p);
      this.ticks.setMatrixAt(k, m);
    }
    this.ticks.raycast = () => {};
    this.ticks.renderOrder = 2;
    this.add(this.ticks);

    // hover marker (pointer) + drone marker (playhead)
    this.marker = new THREE.Mesh(new THREE.SphereGeometry(0.02 * this.uiScale, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    this.marker.visible = false;
    this.add(this.marker);
    this.drone = this.makeDrone();
    this.drone.visible = false;
    this.add(this.drone);

    // glow tubes: local highlight and remote user's highlight
    this.glow = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: this.color, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.glow.raycast = () => {};
    this.glow.renderOrder = 3;
    this.glow.visible = false;
    this.add(this.glow);
    this.remoteGlow = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.remoteGlow.raycast = () => {};
    this.remoteGlow.renderOrder = 3;
    this.remoteGlow.visible = false;
    this.add(this.remoteGlow);

    // ground swath: union of camera footprints over the segment
    this.swath = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: this.color, transparent: true, opacity: 0.1, depthWrite: false, depthTest: false, side: THREE.DoubleSide }));
    this.swath.raycast = () => {};
    this.swath.renderOrder = 3;
    this.swath.visible = false;
    this.add(this.swath);

    this.setResolution();
    this.experience.on("resize", () => this.setResolution());
    this.experience.renderer.instance.xr.addEventListener("sessionstart", () => this.setResolution());
    this.experience.renderer.instance.xr.addEventListener("sessionend", () => this.setResolution());
    this.experience.selectableObjects.push(this);
  }

  makeDrone() {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.008, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    g.add(body);
    // view cone: apex at the camera, opening along +Z of the group (we aim the group)
    const cone = new THREE.ConeGeometry(0.02, 0.05, 12, 1, true);
    cone.rotateX(-Math.PI / 2); // axis +Y -> +Z
    cone.translate(0, 0, 0.025); // apex at origin, base at z=0.05
    const view = new THREE.Mesh(cone, new THREE.MeshBasicMaterial({ color: this.color, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false }));
    g.add(view);
    g.traverse((o) => (o.raycast = () => {}));
    g.renderOrder = 4;
    return g;
  }

  // ---- trajectory helpers -------------------------------------------------
  /** Scene point at video time t (linear between the 1 Hz samples). */
  pointAt(t, target = new THREE.Vector3()) {
    const i = Math.min(Math.max(Math.floor(t), 0), this.points.length - 2);
    const f = THREE.MathUtils.clamp(t - i, 0, 1);
    return target.copy(this.points[i]).lerp(this.points[i + 1], f);
  }
  /** Track record (heading/pitch/lat/lon...) nearest to t. */
  recordAt(t) {
    return this.track[Math.min(Math.max(Math.round(t), 0), this.track.length - 1)];
  }
  /** ENU forward vector of the camera for a track record. */
  forward(rec, target = new THREE.Vector3()) {
    const h = THREE.MathUtils.degToRad(rec.heading ?? 0), p = THREE.MathUtils.degToRad(rec.pitch ?? -20);
    return target.set(Math.sin(h) * Math.cos(p), Math.cos(h) * Math.cos(p), Math.sin(p)); // (e, n, up)
  }
  /** Video time of the closest point on the polyline to a local-frame point. */
  timeAt(localPoint) {
    let bt = 0, bd = Infinity;
    const a = new THREE.Vector3(), ab = new THREE.Vector3(), ap = new THREE.Vector3(), q = new THREE.Vector3();
    for (let i = 0; i < this.points.length - 1; i++) {
      a.copy(this.points[i]); ab.subVectors(this.points[i + 1], a); ap.subVectors(localPoint, a);
      const L = ab.lengthSq();
      const f = L > 1e-12 ? THREE.MathUtils.clamp(ap.dot(ab) / L, 0, 1) : 0;
      const d = q.copy(a).addScaledVector(ab, f).distanceToSquared(localPoint);
      if (d < bd) { bd = d; bt = i + f; }
    }
    return Math.min(bt, this.flight.duration_s);
  }
  segmentOf(t) {
    return Math.min(Math.floor(t / this.flight.segment_s), this.flight.chunks.length - 1);
  }

  // ---- highlight --------------------------------------------------------------
  setSegment(k, { broadcast = true } = {}) {
    if (k === this.segment) return;
    this.segment = k;
    const c = this.flight.chunks[k];
    const seg = this.flight.segment_s;
    // per-vertex colours: bright inside the segment, dim elsewhere
    for (let i = 0; i < this.points.length; i++) {
      const on = k >= 0 && i >= c.t0 && i <= Math.ceil(c.t1);
      const col = on ? this.color : (k >= 0 ? this.dim.clone().multiplyScalar(0.7) : this.dim);
      this.colors[i * 3] = col.r; this.colors[i * 3 + 1] = col.g; this.colors[i * 3 + 2] = col.b;
    }
    this.geometry.setColors(this.colors);
    this.material.linewidth = k >= 0 ? 6 : 4;
    if (k < 0) {
      this.glow.visible = this.swath.visible = this.drone.visible = false;
    } else {
      this.glow.geometry.dispose();
      this.glow.geometry = this.tubeFor(c.t0, c.t1, 0.006);
      this.glow.visible = true;
      this.swath.geometry.dispose();
      this.swath.geometry = this.swathFor(c.t0, c.t1);
      this.swath.visible = this.swathOn;
      this.setPlayhead(c.t0);
      this.drone.visible = true;
    }
    this.experience.world?.onVideoSegment?.(this, k);
    if (broadcast) this.broadcast();
    void seg;
  }

  setRemoteSegment(k) {
    if (k === this.remoteSegment) return;
    this.remoteSegment = k;
    if (k < 0) { this.remoteGlow.visible = false; return; }
    const c = this.flight.chunks[k];
    this.remoteGlow.geometry.dispose();
    this.remoteGlow.geometry = this.tubeFor(c.t0, c.t1, 0.009);
    this.remoteGlow.visible = true;
  }

  broadcast() {
    const net = this.experience.networking;
    if (!net) return;
    const k = this.segment;
    const p = k >= 0 ? this.localToWorld(this.pointAt(this.flight.chunks[k].t0)) : null;
    net.sendCalloutUpdate(k >= 0, p, { video: this.flight.id, segment: k });
  }

  tubeFor(t0, t1, radius) {
    const pts = [];
    for (let t = t0; t <= t1; t += 0.5) pts.push(this.pointAt(t));
    pts.push(this.pointAt(t1));
    if (pts.length < 2) pts.push(pts[0].clone().addScalar(1e-4));
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, Math.max(8, pts.length * 2), radius, 8, false);
  }

  /** Camera footprints projected on the terrain for every 1 Hz point in [t0, t1]. */
  swathFor(t0, t1) {
    const terrain = this.experience.world?.terrain;
    const tri = [];
    if (!terrain) return new THREE.BufferGeometry();
    const f = new THREE.Vector3(), r = new THREE.Vector3(), u = new THREE.Vector3(), d = new THREE.Vector3();
    const upv = new THREE.Vector3(0, 0, 1);
    const th = Math.tan(HFOV / 2), tv = Math.tan(VFOV / 2);
    for (let t = Math.ceil(t0); t <= Math.floor(t1); t++) {
      const rec = this.track[Math.min(t, this.track.length - 1)];
      const cam = toLocalMetres(rec.lat, rec.lon, rec.alt_msl); // e, n, up (rel. site z)
      this.forward(rec, f);
      r.crossVectors(f, upv); if (r.lengthSq() < 1e-6) r.set(1, 0, 0); r.normalize();
      u.crossVectors(r, f).normalize();
      const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => {
        d.copy(f).addScaledVector(r, sx * th).addScaledVector(u, sy * tv).normalize();
        return this.groundHit(terrain, cam, d);
      });
      const [a, b, c, e] = corners;
      tri.push(a, b, c, a, c, e);
    }
    const arr = new Float32Array(tri.length * 3);
    tri.forEach((p, i) => { arr[i * 3] = p.x; arr[i * 3 + 1] = p.y; arr[i * 3 + 2] = p.z; });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }

  /** March a ray (site-local metres) until it dips under the terrain; scene point slightly above ground. */
  groundHit(terrain, cam, d) {
    const site = terrain.site;
    let e = cam.e, n = cam.n, up = cam.up + site.z_center; // MSL
    for (let s = 0; s < SWATH_MAX_M; s += 0.5) {
      const ne = cam.e + d.x * s, nn = cam.n + d.y * s, nu = cam.up + site.z_center + d.z * s;
      const h = terrain.heightAt(ne, nn);
      if (h != null && nu <= h) { e = ne; n = nn; up = h; break; }
      e = ne; n = nn; up = nu;
      if (s + 0.5 >= SWATH_MAX_M) { const h2 = terrain.heightAt(ne, nn); if (h2 != null) up = h2; }
    }
    return metresToScene(e, n, up - site.z_center + 0.4);
  }

  /** Move the drone marker to video time t and aim its view cone. */
  setPlayhead(t) {
    this.playhead = t;
    this.pointAt(t, this.drone.position);
    const rec = this.recordAt(t);
    const f = this.forward(rec);
    const target = this.drone.position.clone().add(new THREE.Vector3(f.x, f.z, -f.y).multiplyScalar(0.1));
    this.drone.lookAt(target);
  }

  /** World-space bounding box of the path, for camera focusing. */
  bounds() {
    const box = new THREE.Box3().setFromPoints(this.points);
    return box.applyMatrix4(this.matrixWorld);
  }

  setResolution() {
    const s = new THREE.Vector2();
    this.experience.renderer.instance.getDrawingBufferSize(s);
    this.material.resolution.copy(s);
  }

  // ---- brahma Pointer contract -----------------------------------------------
  onHover() {
    this.hover = true;
    this.marker.visible = true;
  }
  onUnhover() {
    this.hover = false;
    this.marker.visible = false;
    if (!this.panel.pinned) {
      this.panel.hide();
      this.setSegment(-1);
    }
  }
  setSphere(worldPoint) {
    this.marker.position.copy(this.worldToLocal(worldPoint.clone()));
    if (this.panel.pinned) return;
    const t = this.timeAt(this.marker.position);
    const k = this.segmentOf(t);
    if (k !== this.segment) {
      this.setSegment(k);
      this.panel.showVideo(this, k, this.localToWorld(this.pointAt(this.flight.chunks[k].t0)), this.uiScale);
    }
  }
  onSelect(worldPoint) {
    if (this.experience.world?.tryPlacePing?.(worldPoint)) return;
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

  /** Called by the panel each frame while a clip plays. */
  onPlayback(k, tInChunk) {
    const c = this.flight.chunks[k];
    this.setPlayhead(Math.min(c.t0 + tInChunk, c.t1));
  }
  /** Clip ended: in play-all mode, step to the next segment. */
  onClipEnded(k) {
    if (!this.playAll) return false;
    const next = (k + 1) % this.flight.chunks.length;
    this.setSegment(next);
    this.panel.showVideo(this, next, this.localToWorld(this.pointAt(this.flight.chunks[next].t0)), this.uiScale);
    return true;
  }

  /** See FlightPath.setActive: emphasis < 1 = visible but subdued and not hoverable. */
  setActive(active, emphasis = 1) {
    this.visible = active;
    const selectable = active && emphasis >= 1;
    const list = this.experience.selectableObjects;
    const i = list.indexOf(this);
    if (selectable && i < 0) list.push(this);
    if (!selectable && i >= 0) list.splice(i, 1);
    this.material.opacity = selectable ? 0.95 : 0.4;
    this.ticks.material.opacity = selectable ? 0.7 : 0.25;
    if (!selectable) {
      if (this.hover) this.onUnhover();
      if (this.panel.path === this) { this.panel.setPinned(false); this.panel.hide(); }
      this.setSegment(-1);
    }
  }
}
