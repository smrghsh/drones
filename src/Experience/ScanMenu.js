import * as THREE from "three";
import { Experience } from "brahma-xr";

const W = 512, ROW = 56, PAD = 14;

/**
 * Small in-scene menu floating beside a scan: one button per representation
 * (Skydio coverage mesh / our photogrammetry mesh / Gaussian splat / terrain
 * only) plus a toggle for draping the orthomosaic on the terrain. Buttons are
 * brahma `selectable` planes, so they work with the mouse and VR controllers.
 * Billboards (yaw only) toward the viewer.
 */
export default class ScanMenu extends THREE.Group {
  /** @param {import("./FlightModel.js").default} model the scan model this menu drives */
  constructor(model) {
    super();
    this.experience = new Experience();
    this.model = model;
    this.items = []; // { key, label, kind: "radio"|"toggle", mesh, canvas, ctx, texture }
    this.rows = new THREE.Group();
    this.add(this.rows);
    this.scale.setScalar(model.uiScale * 0.9);
    this.hoverKey = null;
    this._camPos = new THREE.Vector3();
    this.build();
  }

  build() {
    const f = this.model.record;
    const reps = [];
    if (f.mesh) reps.push(["coverage", "Coverage mesh (Skydio)"]);
    if (f.recon) reps.push(["recon", "Photogrammetry mesh"]);
    if (f.splat) reps.push(["splat", "Gaussian splat"]);
    reps.push(["none", "Terrain only"]);
    const defs = [
      ["title", f.name.replace(/ — .*/, ""), "title"],
      ...reps.map(([k, l]) => [k, l, "radio"]),
      ...(f.ortho ? [["orthoTerrain", "Ortho on terrain", "toggle"]] : []),
    ];
    const height = (ROW * 0.6) / W; // scene height of a row for width 0.6
    defs.forEach(([key, label, kind], i) => {
      const canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = ROW;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6, height),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false }),
      );
      mesh.renderOrder = 996;
      mesh.position.y = -i * (height + 0.004);
      const item = { key, label, kind, mesh, canvas, ctx: canvas.getContext("2d"), texture };
      if (kind !== "title") {
        mesh.selectable = true;
        mesh.onHover = () => { this.hoverKey = key; this.draw(item); };
        mesh.onUnhover = () => { if (this.hoverKey === key) this.hoverKey = null; this.draw(item); };
        mesh.onSelect = () => this.activate(item);
        this.experience.selectableObjects.push(mesh);
      }
      this.rows.add(mesh);
      this.items.push(item);
      this.draw(item);
    });
  }

  activate(item) {
    if (item.kind === "radio") this.model.setRepresentation(item.key);
    else if (item.key === "orthoTerrain") this.model.setOrthoOnTerrain(!this.model.orthoOnTerrain);
    this.refresh();
    this.experience.networking?.sendCalloutUpdate(true, this.getWorldPosition(new THREE.Vector3()),
      { menu: this.model.record.id, representation: this.model.representation, orthoTerrain: this.model.orthoOnTerrain });
  }

  refresh() { for (const it of this.items) this.draw(it); }

  draw(it) {
    const c = it.ctx;
    c.clearRect(0, 0, W, ROW);
    if (it.kind === "title") {
      c.fillStyle = "rgba(14,18,28,0.92)"; roundRect(c, 0, 0, W, ROW, 14); c.fill();
      c.fillStyle = "#" + this.model.color.getHexString(); c.font = "bold 26px system-ui, sans-serif";
      c.fillText(it.label, PAD + 4, 37);
      c.fillStyle = "#7f8aa3"; c.font = "18px system-ui, sans-serif"; c.textAlign = "right";
      c.fillText("3D model", W - PAD - 4, 36); c.textAlign = "left";
    } else {
      const on = it.kind === "radio" ? this.model.representation === it.key : this.model.orthoOnTerrain;
      const hot = this.hoverKey === it.key;
      const loading = it.kind === "radio" && this.model.loading === it.key;
      c.fillStyle = hot ? "rgba(46,60,90,0.95)" : "rgba(14,18,28,0.9)"; roundRect(c, 0, 0, W, ROW, 14); c.fill();
      if (on) { c.strokeStyle = "#" + this.model.color.getHexString(); c.lineWidth = 4; roundRect(c, 2, 2, W - 4, ROW - 4, 12); c.stroke(); }
      // indicator
      c.strokeStyle = on ? "#" + this.model.color.getHexString() : "#7f8aa3"; c.lineWidth = 3;
      if (it.kind === "radio") { c.beginPath(); c.arc(PAD + 14, ROW / 2, 10, 0, Math.PI * 2); c.stroke(); if (on) { c.fillStyle = c.strokeStyle; c.beginPath(); c.arc(PAD + 14, ROW / 2, 5, 0, Math.PI * 2); c.fill(); } }
      else { roundRect(c, PAD + 2, ROW / 2 - 11, 24, 22, 5); c.stroke(); if (on) { c.fillStyle = c.strokeStyle; roundRect(c, PAD + 7, ROW / 2 - 6, 14, 12, 3); c.fill(); } }
      c.fillStyle = on ? "#f2f5fa" : "#c9d1e0"; c.font = `${on ? "bold " : ""}24px system-ui, sans-serif`;
      c.fillText(it.label + (loading ? "  …loading" : ""), PAD + 40, 36);
    }
    it.texture.needsUpdate = true;
  }

  setVisible(v) {
    this.visible = v;
    const list = this.experience.selectableObjects;
    for (const it of this.items) {
      if (it.kind === "title") continue;
      const i = list.indexOf(it.mesh);
      if (v && i < 0) list.push(it.mesh);
      if (!v && i >= 0) list.splice(i, 1);
    }
  }

  update() {
    if (!this.visible) return;
    const xr = this.experience.renderer.instance.xr;
    const cam = xr.isPresenting ? xr.getCamera() : this.experience.camera.instance;
    cam.getWorldPosition(this._camPos);
    this._camPos.y = this.getWorldPosition(new THREE.Vector3()).y;
    this.lookAt(this._camPos);
  }
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
