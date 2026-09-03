/**
 * Non-dominant-hand XR controls for terrain shape, texture source and exaggeration.
 * The embedded key identifies USGS 3DEP/USDA NAIP provenance and measured-vs-derived data.
 * Canvas-textured buttons are lightweight and use brahma-xr's existing selectable pointer API.
 */
import * as THREE from "three";
import { Experience } from "brahma-xr";

const W = 720, H = 86;

/** Non-dominant-hand terrain controls plus scientific provenance in XR. */
export default class TopographyMenu extends THREE.Group {
  constructor(world) {
    super();
    this.experience = new Experience();
    this.world = world;
    this.items = [];
    this.visible = false;
    this.position.set(0.08, 0.08, -0.16);
    this.rotation.set(-0.35, 0, 0);
    this.scale.setScalar(0.42);
    this.build();
    const xr = this.experience.renderer.instance.xr;
    xr.addEventListener("sessionstart", () => this.setVisible(true));
    xr.addEventListener("sessionend", () => this.setVisible(false));
  }

  build() {
    const defs = [
      ["title", "TOPOGRAPHY · left-hand menu", null],
      ["shape", "Shape", () => this.world.cycleTerrainShape()],
      ["texture", "Texture / source", () => this.world.cycleTerrainTexture()],
      ["vertical", "Vertical exaggeration", () => this.world.cycleExaggeration()],
      ["key", "KEY · terrain color = selected source", null],
      ["lidar", "SHAPE · USGS 3DEP Santa Cruz County 2020\n1 m farm DSM · 0.35 m detailed DSM", null],
      ["imagery", "TEXTURE · USDA NAIP 2022 aerial imagery · 0.6 m\nSurvey orthos: flight photos, capture-specific", null],
      ["note", "PROVENANCE · local ENU frame, elevation in metres MSL\nGenerated assets record their processing method in flight JSON", null],
    ];
    defs.forEach(([key, label, action], i) => {
      const canvas = document.createElement("canvas"); canvas.width = W; canvas.height = H;
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.086),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false }));
      mesh.position.y = -i * 0.092; mesh.renderOrder = 1002;
      const item = { key, label, action, mesh, canvas, texture, ctx: canvas.getContext("2d"), hover: false };
      if (action) {
        mesh.selectable = true;
        mesh.onHover = () => { item.hover = true; this.draw(item); };
        mesh.onUnhover = () => { item.hover = false; this.draw(item); };
        mesh.onSelect = () => {
          if (this.world.blocksControlSelectionForPing()) return;
          action();
          this.refresh();
        };
      }
      this.items.push(item); this.add(mesh); this.draw(item);
    });
  }

  value(item) {
    const state = this.world.topography;
    if (item.key === "shape") return this.world.terrainShapeLabel(state.shape);
    if (item.key === "texture") return this.world.terrainTextureLabel(state.texture);
    if (item.key === "vertical") return `${state.exaggeration.toFixed(1)}×`;
    return "";
  }

  draw(item) {
    const c = item.ctx; c.clearRect(0, 0, W, H);
    c.fillStyle = item.hover ? "rgba(46,60,90,0.98)" : "rgba(14,18,28,0.94)";
    rounded(c, 0, 0, W, H, 14); c.fill();
    c.strokeStyle = item.action ? "#5ec8ff" : "#465066"; c.lineWidth = item.action ? 3 : 2;
    rounded(c, 2, 2, W - 4, H - 4, 12); c.stroke();
    const value = this.value(item);
    if (value) {
      c.fillStyle = "#8edcff"; c.font = "bold 25px system-ui"; c.textAlign = "right";
      c.fillText(value, W - 24, 52); c.textAlign = "left";
    }
    c.fillStyle = item.key === "title" ? "#8edcff" : "#f2f5fa";
    c.font = `${item.key === "title" ? "bold " : ""}${item.label.includes("\n") ? 20 : 24}px system-ui`;
    item.label.split("\n").forEach((line, i) => c.fillText(line, 24, 35 + i * 27));
    item.texture.needsUpdate = true;
  }

  refresh() { this.items.forEach((item) => this.draw(item)); }

  setVisible(visible) {
    this.visible = visible;
    const list = this.experience.selectableObjects;
    for (const item of this.items.filter((i) => i.action)) {
      const index = list.indexOf(item.mesh);
      if (visible && index < 0) list.push(item.mesh);
      if (!visible && index >= 0) list.splice(index, 1);
    }
  }

  update() {
    if (!this.visible) return;
    const hand = this.experience.controller?.leftController;
    if (hand && this.parent !== hand) hand.add(this);
  }
}

function rounded(c, x, y, w, h, r) {
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x + w, y + h, r);
  c.arcTo(x, y, x + w, y, r); c.closePath();
}
