import * as THREE from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { Experience } from "brahma-xr";
import { project } from "./domain.js";

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
    this.add(this.line);

    // sample points
    this.samplePositions = flight.samples.map((s) => project(s.lat, s.lon, s.alt_msl));
    const inst = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.012, 10, 8),
      new THREE.MeshBasicMaterial({ color: this.color }),
      flight.samples.length,
    );
    const m = new THREE.Matrix4();
    this.samplePositions.forEach((p, i) => inst.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)));
    this.samples = inst;
    this.add(inst);

    // hover marker
    this.marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 16, 12),
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
    if (!this.panel.pinned) this.panel.show(s.sample, this.flight, this.localToWorld(s.position.clone()));
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

  setActive(active) {
    this.visible = active;
    const list = this.experience.selectableObjects;
    const i = list.indexOf(this);
    if (active && i < 0) list.push(this);
    if (!active && i >= 0) list.splice(i, 1);
    if (!active && this.hover) this.onUnhover();
  }
}
