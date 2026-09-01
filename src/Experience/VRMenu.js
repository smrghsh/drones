/** Left-controller VR menu with its own right-trigger raycast and direct choice pages. */
import * as THREE from "three";
import { Experience } from "brahma-xr";

const WIDTH = 768;
const HEIGHT = 78;
const PLANE_WIDTH = 0.72;
const PLANE_HEIGHT = PLANE_WIDTH * HEIGHT / WIDTH;

/** VR counterpart to the desktop controls; squeeze/grip is never consumed here. */
export default class VRMenu extends THREE.Group {
  constructor(world) {
    super();
    this.experience = new Experience();
    this.world = world;
    this.items = [];
    this.page = "main";
    this.hoveredItem = null;
    this.triggerArmed = true;
    this.rightTriggerActive = false;
    this.wasTriggerPressed = false;
    this.boundRightController = null;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = 0.001;
    this.raycaster.far = 10;
    this.rayRotation = new THREE.Matrix4();
    this.rayDirection = new THREE.Vector3();
    this.visible = false;

    this.onRightTriggerStart = () => {
      this.rightTriggerActive = true;
      this.selectHovered();
    };
    this.onRightTriggerEnd = () => {
      this.rightTriggerActive = false;
    };

    // Wrist-mounted list just above and forward of the left controller.
    this.position.set(0.055, 0.105, -0.16);
    this.rotation.set(-0.5, 0, 0);
    this.scale.setScalar(0.34);
    this.showPage("main");

    const xr = this.experience.renderer.instance.xr;
    xr.addEventListener("sessionstart", () => this.setVisible(true));
    xr.addEventListener("sessionend", () => this.setVisible(false));
    if (xr.isPresenting) this.setVisible(true);
  }

  mainDefinitions() {
    return [
      this.title("VR CONTROLS"),
      this.button("chooseFlight", "Choose exact flight…", () => this.showPage("flights"), () => this.world.activeFlightLabel()),
      this.button("chooseModel", "Choose scan model…", () => this.showPage("models"), () => this.world.activeScanModelLabel(), () => Boolean(this.world.activeScan())),
      this.button("ortho", "Ortho on terrain", () => this.world.toggleActiveScanOrtho(), () => this.world.activeScan()?.orthoOnTerrain ? "ON" : "OFF", () => Boolean(this.world.activeScan()?.flight.ortho)),
      this.button("start", "Start / resume FPV", () => this.world.startRide(), null, () => this.world.ride.state !== "playing" && this.world.paths.some((path) => typeof path.pointAt === "function")),
      this.button("pause", "Pause FPV", () => this.world.pauseRide(), null, () => this.world.ride.state === "playing"),
      this.button("stop", "Stop / return", () => this.world.stopRide(), null, () => this.world.ride.state !== "inactive"),
      this.button("speed", "Ride speed", () => this.world.cycleRideSpeed(), () => `${this.world.ride.speed.toFixed(2).replace(/0$/, "")}×`),
      this.button("comfort", "Comfort horizon", () => this.world.toggleRideComfort(), () => this.world.ride.comfort ? "ON" : "OFF"),
      this.button("swath", "Ground swath", () => this.world.toggleGroundSwath(), () => this.world.params?.swath ? "ON" : "OFF"),
      this.button("view", "View scale", () => this.world.cycleViewMode(), () => this.world.viewPresetLabel()),
      this.button("vertical", "Vertical exaggeration", () => this.world.cycleExaggeration(), () => `${(this.world.params?.exaggeration ?? 1).toFixed(1)}×`),
      this.button("imagery", "Imagery mix", () => this.world.cycleImageryMix(), () => (this.world.params?.imagery ?? 1).toFixed(2)),
      this.hint("Aim RIGHT ray · INDEX TRIGGER selects"),
    ];
  }

  flightDefinitions() {
    return [
      this.title("CHOOSE EXACT FLIGHT"),
      ...this.world.paths.map((path) => this.button(
        `flight:${path.flight.id}`,
        path.flight.name,
        () => {
          this.world.setActiveFlight(path.flight.id);
          this.world.setRideTarget(path);
          this.showPage("main");
        },
        () => this.world.params?.flight === path.flight.id ? "SELECTED" : "",
      )),
      this.button("back", "← Back to controls", () => this.showPage("main")),
      this.hint("Choose one route, then Start FPV"),
    ];
  }

  modelDefinitions() {
    const scan = this.world.activeScan();
    const definitions = [this.title(scan ? `MODEL · ${scan.flight.name}` : "CHOOSE SCAN MODEL")];
    if (!scan) {
      definitions.push(this.hint("Choose a scan flight first"));
    } else {
      const models = [["coverage", "Coverage mesh"]];
      if (scan.flight.recon) models.push(["recon", "Photogrammetry mesh"]);
      if (scan.flight.splat) models.push(["splat", "Gaussian splat"]);
      models.push(["none", "Terrain only"]);
      definitions.push(...models.map(([key, label]) => this.button(
        `model:${key}`,
        label,
        () => scan.setRepresentation(key),
        () => scan.representation === key ? "SELECTED" : "",
      )));
      if (scan.flight.ortho) {
        definitions.push(this.button(
          "modelOrtho",
          "Ortho on terrain",
          () => scan.setOrthoOnTerrain(!scan.orthoOnTerrain),
          () => scan.orthoOnTerrain ? "ON" : "OFF",
        ));
      }
    }
    definitions.push(this.button("back", "← Back to controls", () => this.showPage("main")));
    definitions.push(this.hint("Right INDEX TRIGGER selects"));
    return definitions;
  }

  title(label) {
    return { key: "title", label };
  }

  hint(label) {
    return { key: "hint", label };
  }

  button(key, label, action, value = null, enabled = null) {
    return { key, label, action, value, enabled };
  }

  showPage(page) {
    this.clearItems();
    this.page = page;
    const definitions = page === "flights"
      ? this.flightDefinitions()
      : page === "models" ? this.modelDefinitions() : this.mainDefinitions();
    definitions.forEach((definition, index) => this.addItem(definition, index));
    this.refresh();
  }

  clearItems() {
    const selectable = this.experience.selectableObjects;
    for (const item of this.items) {
      const index = selectable.indexOf(item.mesh);
      if (index >= 0) selectable.splice(index, 1);
      this.remove(item.mesh);
      item.mesh.geometry.dispose();
      item.mesh.material.dispose();
      item.texture.dispose();
    }
    this.items = [];
    this.hoveredItem = null;
  }

  addItem(definition, index) {
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
      ...definition,
      mesh,
      texture,
      context: canvas.getContext("2d"),
      hover: false,
    };

    if (item.action) {
      // Keep the row in brahma's pointer list so it blocks scene objects behind
      // it. Selection itself is handled by this menu's dedicated trigger ray.
      mesh.selectable = true;
      mesh.onHover = () => this.setHovered(item);
      mesh.onUnhover = () => { if (this.hoveredItem === item) this.setHovered(null); };
      mesh.onSelect = () => {};
      if (this.visible) this.experience.selectableObjects.push(mesh);
    }
    this.items.push(item);
    this.add(mesh);
  }

  isEnabled(item) {
    return item.enabled ? Boolean(item.enabled()) : true;
  }

  setHovered(item) {
    if (this.hoveredItem === item) return;
    const previous = this.hoveredItem;
    this.hoveredItem = item;
    if (previous) { previous.hover = false; this.draw(previous); }
    if (item) { item.hover = true; this.draw(item); }
  }

  selectHovered() {
    const item = this.hoveredItem;
    if (!item?.action || !this.triggerArmed || !this.isEnabled(item)) return;
    this.triggerArmed = false;
    item.action();
    this.experience.controller?.rightController?.padControls?.pulse(35, 0.25);
    this.refresh();
  }

  draw(item) {
    const context = item.context;
    const enabled = this.isEnabled(item);
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = item.hover && enabled ? "rgba(41,92,126,0.99)" : "rgba(10,17,27,0.96)";
    rounded(context, 0, 0, WIDTH, HEIGHT, 15);
    context.fill();
    context.strokeStyle = enabled && item.action ? item.hover ? "#b8f2ff" : "#66d9ff" : "#3d4b5f";
    context.lineWidth = item.hover && enabled ? 7 : 3;
    rounded(context, 2, 2, WIDTH - 4, HEIGHT - 4, 13);
    context.stroke();

    const value = typeof item.value === "function" ? item.value() : item.value;
    if (value) {
      context.fillStyle = enabled ? "#91e5ff" : "#647083";
      context.font = "bold 25px system-ui, sans-serif";
      context.textAlign = "right";
      context.fillText(shorten(value, 24), WIDTH - 22, 50);
    }
    context.textAlign = "left";
    context.fillStyle = item.key === "title" ? "#91e5ff" : enabled ? "#f3f7fb" : "#778294";
    context.font = item.key === "title"
      ? "bold 27px system-ui, sans-serif"
      : item.key === "hint" ? "20px system-ui, sans-serif" : "24px system-ui, sans-serif";
    context.fillText(shorten(item.label, value ? 27 : 44), 22, 50);
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
    if (!visible) this.setHovered(null);
  }

  bindRightController(rightController) {
    if (!rightController || this.boundRightController === rightController) return;
    this.boundRightController?.removeEventListener("selectstart", this.onRightTriggerStart);
    this.boundRightController?.removeEventListener("selectend", this.onRightTriggerEnd);
    this.boundRightController = rightController;
    // select = index trigger. No squeeze listeners are registered here.
    rightController.addEventListener("selectstart", this.onRightTriggerStart);
    rightController.addEventListener("selectend", this.onRightTriggerEnd);
  }

  updateRay(rightController) {
    if (!rightController) return;
    // World matrices may otherwise be one render behind because controller
    // input runs before the renderer's matrix update in brahma-xr.
    rightController.updateWorldMatrix(true, false);
    this.updateWorldMatrix(true, true);
    this.rayRotation.identity().extractRotation(rightController.matrixWorld);
    this.raycaster.ray.origin.setFromMatrixPosition(rightController.matrixWorld);
    this.rayDirection.set(0, 0, -1).applyMatrix4(this.rayRotation).normalize();
    this.raycaster.ray.direction.copy(this.rayDirection);
    const meshes = this.items.filter((item) => item.action).map((item) => item.mesh);
    const hit = this.raycaster.intersectObjects(meshes, false)[0];
    this.setHovered(hit ? this.items.find((item) => item.mesh === hit.object) : null);
  }

  update() {
    if (!this.visible) return;
    const controller = this.experience.controller;
    const leftController = controller?.leftController;
    if (leftController && this.parent !== leftController) leftController.add(this);
    const rightController = controller?.rightController;
    this.bindRightController(rightController);
    this.updateRay(rightController);

    const trigger = rightController?.padControls?.primaryTrigger;
    const pressed = Boolean(this.rightTriggerActive || trigger?.isPressed);
    if (pressed && !this.wasTriggerPressed) this.selectHovered();
    if (!pressed) this.triggerArmed = true;
    this.wasTriggerPressed = pressed;
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
