import * as THREE from "three";
import { Experience } from "brahma-xr";

const W = 360, H = 64;

/** Viewer-following, pointer-selectable controls for riding a video path. */
export default class RideControls extends THREE.Group {
  constructor(world) {
    super();
    this.experience = new Experience();
    this.world = world;
    this.items = [];
    this.visible = false;
    this._camPos = new THREE.Vector3();
    this._camQuat = new THREE.Quaternion();
    this._forward = new THREE.Vector3();
    this.build();
  }

  build() {
    const defs = [
      ["start", () => this.world.startRide()],
      ["pause", () => this.world.pauseRide()],
      ["stop", () => this.world.stopRide()],
    ];
    defs.forEach(([key, action], i) => {
      const canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = H;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.34, 0.06),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false }),
      );
      mesh.position.x = (i - 1) * 0.36;
      mesh.renderOrder = 1001;
      mesh.selectable = true;
      const item = { key, action, mesh, canvas, texture, ctx: canvas.getContext("2d"), hover: false };
      mesh.onHover = () => { item.hover = true; this.draw(item); };
      mesh.onUnhover = () => { item.hover = false; this.draw(item); };
      mesh.onSelect = () => { if (this.enabled(item)) item.action(); };
      this.items.push(item);
      this.add(mesh);
      this.draw(item);
    });
  }

  enabled(item) {
    const state = this.world.ride.state;
    if (item.key === "start") return state !== "playing";
    if (item.key === "pause") return state === "playing";
    return state !== "inactive";
  }

  label(item) {
    if (item.key === "start") return this.world.ride.state === "paused" ? "Resume" : "Start ride";
    if (item.key === "pause") return "Pause";
    return "Stop";
  }

  draw(item) {
    const c = item.ctx, enabled = this.enabled(item);
    c.clearRect(0, 0, W, H);
    c.fillStyle = item.hover && enabled ? "rgba(46,60,90,0.98)" : "rgba(14,18,28,0.92)";
    rounded(c, 0, 0, W, H, 15); c.fill();
    c.strokeStyle = enabled ? "#5ec8ff" : "#465066";
    c.lineWidth = 4; rounded(c, 2, 2, W - 4, H - 4, 13); c.stroke();
    c.fillStyle = enabled ? "#f2f5fa" : "#778095";
    c.font = "bold 25px system-ui, sans-serif"; c.textAlign = "center";
    c.fillText(this.label(item), W / 2, 41);
    item.texture.needsUpdate = true;
  }

  refresh() { for (const item of this.items) this.draw(item); }

  setVisible(visible) {
    this.visible = visible;
    const selectable = this.experience.selectableObjects;
    for (const item of this.items) {
      const i = selectable.indexOf(item.mesh);
      if (visible && i < 0) selectable.push(item.mesh);
      if (!visible && i >= 0) selectable.splice(i, 1);
    }
  }

  update() {
    if (!this.visible) return;
    const xr = this.experience.renderer.instance.xr;
    const cam = xr.isPresenting ? xr.getCamera(this.experience.camera.instance) : this.experience.camera.instance;
    cam.getWorldPosition(this._camPos);
    cam.getWorldQuaternion(this._camQuat);
    this._forward.set(0, 0, -1).applyQuaternion(this._camQuat);
    this.position.copy(this._camPos).addScaledVector(this._forward, 0.7).add(new THREE.Vector3(0, -0.24, 0));
    this.quaternion.copy(this._camQuat);
  }
}

function rounded(c, x, y, w, h, r) {
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r); c.closePath();
}
