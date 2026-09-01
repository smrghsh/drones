/** Left-controller VR menu; only the right index trigger can activate its rows. */
import * as THREE from "three";
import { Experience } from "brahma-xr";

const WIDTH = 768;
const HEIGHT = 78;
const PLANE_WIDTH = 0.72;
const PLANE_HEIGHT = PLANE_WIDTH * HEIGHT / WIDTH;

/** Compact VR counterpart to the desktop debug controls. */
export default class VRMenu extends THREE.Group {
  constructor(world) {
    super();
    this.experience = new Experience();
    this.world = world;
    this.items = [];
    this.triggerArmed = true;
    this.visible = false;

    // Sit just above and forward of the left controller like a wrist-mounted list.
    this.position.set(0.055, 0.105, -0.16);
    this.rotation.set(-0.5, 0, 0);
    this.scale.setScalar(0.34);
    this.build();

    const xr = this.experience.renderer.instance.xr;
    xr.addEventListener("sessionstart", () => this.setVisible(true));
    xr.addEventListener("sessionend", () => this.setVisible(false));
    if (xr.isPresenting) this.setVisible(true);
  }

  build() {
    const defs = [
      ["title", "VR CONTROLS", null],
      ["flight", "Flight path", () => this.world.cycleActiveFlight()],
      ["view", "View scale", () => this.world.cycleViewMode()],
      ["model", "Scan model", () => this.world.cycleActiveScanModel()],
      ["ortho", "Ortho on terrain", () => this.world.toggleActiveScanOrtho()],
      ["start", "Start / resume FPV", () => this.world.startRide()],
      ["pause", "Pause FPV", () => this.world.pauseRide()],
      ["stop", "Stop / return", () => this.world.stopRide()],
      ["speed", "Ride speed", () => this.world.cycleRideSpeed()],
      ["comfort", "Comfort horizon", () => this.world.toggleRideComfort()],
      ["swath", "Ground swath", () => this.world.toggleGroundSwath()],
      ["vertical", "Vertical exaggeration", () => this.world.cycleExaggeration()],
      ["imagery", "Imagery mix", () => this.world.cycleImageryMix()],
      ["hint", "Aim RIGHT controller · INDEX TRIGGER selects", null],
    ];

    defs.forEach(([key, label, action], index) => {
      const canvas = document.createElement("canvas");
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        }),
      );
      mesh.position.y = -index * (PLANE_HEIGHT + 0.007);
      mesh.renderOrder = 1100;
      mesh.frustumCulled = false;
      const item = {
        key,
        label,
        action,
        mesh,
        texture,
        context: canvas.getContext("2d"),
        hover: false,
      };
      if (action) {
        mesh.selectable = true;
        mesh.onHover = () => { item.hover = true; this.draw(item); };
        mesh.onUnhover = () => { item.hover = false; this.draw(item); };
        mesh.onSelect = () => this.activate(item);
      }
      this.items.push(item);
      this.add(mesh);
      this.draw(item);
    });
  }

  enabled(item) {
    const state = this.world.ride.state;
    if (item.key === "start") return Boolean(this.world.ride.path) && state !== "playing";
    if (item.key === "pause") return state === "playing";
    if (item.key === "stop") return state !== "inactive";
    if (item.key === "model") return Boolean(this.world.activeScan());
    if (item.key === "ortho") return Boolean(this.world.activeScan()?.flight.ortho);
    return true;
  }

  value(item) {
    const world = this.world;
    if (item.key === "flight") return world.activeFlightLabel();
    if (item.key === "view") return world.viewPresetLabel();
    if (item.key === "model") return world.activeScanModelLabel();
    if (item.key === "ortho") return world.activeScan()?.orthoOnTerrain ? "ON" : "OFF";
    if (item.key === "speed") return `${world.ride.speed.toFixed(2).replace(/0$/, "")}×`;
    if (item.key === "comfort") return world.ride.comfort ? "ON" : "OFF";
    if (item.key === "swath") return world.params?.swath ? "ON" : "OFF";
    if (item.key === "vertical") return `${(world.params?.exaggeration ?? 1).toFixed(1)}×`;
    if (item.key === "imagery") return (world.params?.imagery ?? 1).toFixed(2);
    return "";
  }

  activate(item) {
    const trigger = this.experience.controller?.rightController?.padControls?.primaryTrigger;
    // Face buttons can also invoke brahma's generic pointer. Reject them here:
    // this wrist menu is deliberately index-trigger-only; squeeze remains locomotion.
    if (!trigger?.isPressed || !this.triggerArmed || !this.enabled(item)) return;
    this.triggerArmed = false;
    item.action();
    this.refresh();
  }

  draw(item) {
    const context = item.context;
    const enabled = this.enabled(item);
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = item.hover && enabled ? "rgba(41,74,108,0.98)" : "rgba(10,17,27,0.96)";
    rounded(context, 0, 0, WIDTH, HEIGHT, 15);
    context.fill();
    context.strokeStyle = enabled && item.action ? "#66d9ff" : "#3d4b5f";
    context.lineWidth = item.hover && enabled ? 5 : 3;
    rounded(context, 2, 2, WIDTH - 4, HEIGHT - 4, 13);
    context.stroke();

    const value = this.value(item);
    if (value) {
      context.fillStyle = enabled ? "#91e5ff" : "#647083";
      context.font = "bold 25px system-ui, sans-serif";
      context.textAlign = "right";
      context.fillText(shorten(value, 25), WIDTH - 22, 50);
    }
    context.textAlign = "left";
    context.fillStyle = item.key === "title" ? "#91e5ff" : enabled ? "#f3f7fb" : "#778294";
    context.font = item.key === "title"
      ? "bold 27px system-ui, sans-serif"
      : item.key === "hint" ? "20px system-ui, sans-serif" : "24px system-ui, sans-serif";
    context.fillText(shorten(item.label, 31), 22, 50);
    item.texture.needsUpdate = true;
  }

  refresh() {
    for (const item of this.items) this.draw(item);
  }

  setVisible(visible) {
    this.visible = visible;
    const selectable = this.experience.selectableObjects;
    for (const item of this.items.filter((entry) => entry.action)) {
      const index = selectable.indexOf(item.mesh);
      if (visible && index < 0) selectable.push(item.mesh);
      if (!visible && index >= 0) selectable.splice(index, 1);
    }
  }

  update() {
    if (!this.visible) return;
    const leftController = this.experience.controller?.leftController;
    if (leftController && this.parent !== leftController) leftController.add(this);
    const trigger = this.experience.controller?.rightController?.padControls?.primaryTrigger;
    if (!trigger?.isPressed) this.triggerArmed = true;
  }
}

function shorten(value, maximum) {
  const text = String(value ?? "");
  return text.length <= maximum ? text : `${text.slice(0, maximum - 1)}…`;
}

function rounded(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}
