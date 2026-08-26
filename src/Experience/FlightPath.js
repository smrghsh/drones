import * as THREE from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Experience } from "brahma-xr";
import { project, METERS_PER_UNIT, settings } from "./domain.js";

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
    this.experience.renderer.instance.xr.addEventListener("sessionstart", () => this.setResolution());
    this.experience.renderer.instance.xr.addEventListener("sessionend", () => this.setResolution());
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
      this.add(anchor);
      this.updateMatrixWorld(true);
      this.meshBounds = new THREE.Box3().setFromObject(mesh); // world space
      this.dispatchEvent({ type: "meshloaded" });
    });
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
    this.material.opacity = 0.95 * (emphasis < 1 ? 0.35 : 1);
    this.samples.material.transparent = true;
    this.samples.material.opacity = emphasis < 1 ? 0.35 : 1;
    this.samples.material.needsUpdate = true;
  }
}
