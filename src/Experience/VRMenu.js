/** Left-controller VR menu with its own right-trigger raycast and direct choice pages. */
import * as THREE from "three";
import { Experience } from "brahma-xr";

const WIDTH = 768;
const HEIGHT = 78;
const PLANE_WIDTH = 0.72;
const PLANE_HEIGHT = PLANE_WIDTH * HEIGHT / WIDTH;
const ROW_GAP = 0.007;
const SIDE_GAP = 0.03;
const FONT = "system-ui, sans-serif";
const INFO_FONT_PX = 22;
const INFO_LINE_PX = 28;
const INFO_PAD_X = 26;
const INFO_PAD_Y = 22;
const INFO_NUMBER_W = 34;

// Shared scratch context, only used to measure text while laying out the info panel.
const measureContext = document.createElement("canvas").getContext("2d");

/** VR counterpart to the desktop controls; squeeze/grip is never consumed here. */
export default class VRMenu extends THREE.Group {
  constructor(world) {
    super();
    this.experience = new Experience();
    this.world = world;
    this.items = [];
    this.page = "main";
    this.sideFlight = null;
    this.flightIds = "";
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

    // Flight details column, to the right of the button column (same tilt as a child).
    this.sidePanel = new THREE.Group();
    this.sidePanel.position.x = PLANE_WIDTH + SIDE_GAP;
    this.sidePanel.visible = false;
    this.add(this.sidePanel);

    this.onRightTriggerStart = () => {
      this.rightTriggerActive = true;
      this.selectHovered();
    };
    this.onRightTriggerEnd = () => {
      this.rightTriggerActive = false;
      this.triggerArmed = true;
      this.wasTriggerPressed = false;
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
      this.button("site", "Site", () => this.world.cycleSite(), () => this.world.siteLabel(), () => this.world.sites.length > 1),
      this.button("chooseFlight", "Select flight", () => this.showPage("flights"), () => this.world.activeFlightLabel()),
      this.button("start", "Start / resume FPV", () => this.world.startRide(), null, () => this.world.ride.state !== "playing" && this.world.flights.length > 0),
      this.button("pause", "Pause FPV", () => this.world.pauseRide(), null, () => this.world.ride.state === "playing"),
      this.button("stop", "Stop / return", () => this.world.stopRide(), null, () => this.world.ride.state !== "inactive"),
      this.button("speed", "Ride speed", () => this.world.cycleRideSpeed(), () => `${this.world.ride.speed.toFixed(2).replace(/0$/, "")}×`),
      this.button("view", "World Scaling", () => this.world.cycleViewMode(), () => this.world.viewPresetLabel()),
      this.info([
        "Move: hold the RIGHT GRIP (squeeze) and pull — the world drags along with your hand (4× amplified). Release to stop. Press A to return to the start point. Moving is off while riding FPV.",
        "Select: point the RIGHT controller at a button on this menu and pull the INDEX TRIGGER.",
        "Other site: press \"Site\" at the top — it cycles between the UCSC farm and Sankritya Rai's pollution investigation.",
        "FPV: press \"Select flight\", pick a flight, then \"Start / resume FPV\". \"Pause FPV\" and \"Stop / return\" control the ride; \"Ride speed\" cycles playback speed.",
      ]),
    ];
  }

  flightDefinitions() {
    return [
      this.title("SELECT FLIGHT"),
      ...this.world.flights.map((flight) => this.button(
        `flight:${flight.record.id}`,
        flight.record.name,
        () => {
          this.world.selectFlightForRide(flight);
          this.openSidePanel(flight);
        },
        () => (flight.path && this.world.ride.path === flight.path) || this.sideFlight === flight
          ? "SELECTED"
          : flight.visible ? "" : "HIDDEN",
      )),
      this.button("back", "← Back to controls", () => this.showPage("main")),
      this.hint("Pick a flight — its details open on the right"),
    ];
  }

  /** Right-hand column: parameters and 3D-model choices for one flight. */
  sideDefinitions(flight) {
    const record = flight.record;
    const definitions = [this.title(record.name, 1)];
    const rows = [
      ["Kind", capitalize(record.kind)],
      ["Drone", record.drone],
      ["Camera", record.camera],
      ["Date", formatDate(record.date)],
      ["Duration", formatDuration(record)],
      ["Samples", flight.track?.length > 0 ? String(flight.track.length) : null],
      ["Source", record.provenance?.source ?? (flight.kind === "video" ? record.source : null)],
    ];
    for (const [label, value] of rows) if (value) definitions.push(this.param(label, value));

    // Videos share their parent scan's model.
    const scan = flight.kind === "video"
      ? this.world.flights.find((entry) => entry.record.id === record.scan) ?? null
      : flight;
    definitions.push(this.title("3D MODEL", 1));
    if (!scan?.model) {
      definitions.push(this.hint("No 3D model for this flight", 1));
    } else {
      const models = [["coverage", "Coverage mesh"]];
      if (scan.record.recon) models.push(["recon", "Photogrammetry mesh"]);
      if (scan.record.splat) models.push(["splat", "Gaussian splat"]);
      models.push(["none", "Terrain only"]);
      definitions.push(...models.map(([key, label]) => this.button(
        `model:${key}`,
        label,
        () => scan.model.setRepresentation(key),
        () => scan.model.representation === key ? "SELECTED" : "",
        null,
        1,
      )));
    }
    if (scan?.record.ortho) {
      definitions.push(this.button(
        "modelOrtho",
        "Ortho on terrain",
        () => scan.setOrthoOnTerrain(!scan.orthoOnTerrain),
        () => scan.orthoOnTerrain ? "ON" : "OFF",
        null,
        1,
      ));
    }
    return definitions;
  }

  title(label, column = 0) {
    return { key: "title", label, column };
  }

  hint(label, column = 0) {
    return { key: "hint", label, column };
  }

  /** Non-interactive "label … value" row. */
  param(label, value, column = 1) {
    return { key: "param", label, value, column };
  }

  /** Numbered multi-paragraph panel; its canvas height follows the wrapped text. */
  info(paragraphs, column = 0) {
    measureContext.font = `${INFO_FONT_PX}px ${FONT}`;
    const maxWidth = WIDTH - INFO_PAD_X * 2 - INFO_NUMBER_W;
    const lines = [];
    paragraphs.forEach((paragraph, index) => {
      if (index > 0) lines.push({ text: "", gap: true });
      wrapText(measureContext, paragraph, maxWidth).forEach((text, lineIndex) => {
        lines.push({ text, number: lineIndex === 0 ? `${index + 1}.` : "" });
      });
    });
    const height = INFO_PAD_Y * 2 + lines.reduce((sum, line) => sum + (line.gap ? INFO_LINE_PX * 0.35 : INFO_LINE_PX), 0);
    return { key: "info", label: "", lines, height: Math.ceil(height), column };
  }

  button(key, label, action, value = null, enabled = null, column = 0) {
    return { key, label, action, value, enabled, column };
  }

  showPage(page) {
    if (page !== "flights") this.sideFlight = null;
    this.clearItems();
    this.page = page;
    const definitions = page === "flights" ? this.flightDefinitions() : this.mainDefinitions();
    if (page === "flights" && this.sideFlight) definitions.push(...this.sideDefinitions(this.sideFlight));
    this.flightIds = this.world.flights.map((flight) => flight.record.id).join();

    // Stack each column by cumulative height (rows may declare their own canvas height).
    const cursors = [0, 0];
    for (const definition of definitions) {
      const column = definition.column ?? 0;
      const height = definition.height ?? HEIGHT;
      const planeHeight = PLANE_WIDTH * height / WIDTH;
      this.addItem(definition, column, PLANE_HEIGHT / 2 - cursors[column] - planeHeight / 2);
      cursors[column] += planeHeight + ROW_GAP;
    }
    this.sidePanel.visible = cursors[1] > 0;
    this.refresh();
  }

  openSidePanel(flight) {
    this.sideFlight = flight;
    this.showPage("flights");
  }

  clearItems() {
    const selectable = this.experience.selectableObjects;
    for (const item of this.items) {
      const index = selectable.indexOf(item.mesh);
      if (index >= 0) selectable.splice(index, 1);
      item.mesh.removeFromParent();
      item.mesh.geometry.dispose();
      item.mesh.material.dispose();
      item.texture.dispose();
    }
    this.items = [];
    this.hoveredItem = null;
    this.sidePanel.visible = false;
  }

  addItem(definition, column, y) {
    const height = definition.height ?? HEIGHT;
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = height;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_WIDTH * height / WIDTH),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    );
    mesh.position.y = y;
    mesh.renderOrder = 1100;
    mesh.frustumCulled = false;
    const item = {
      ...definition,
      height,
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
    (column === 1 ? this.sidePanel : this).add(mesh);
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
    const height = item.height;
    const enabled = this.isEnabled(item);
    context.clearRect(0, 0, WIDTH, height);
    context.fillStyle = item.hover && enabled ? "rgba(41,92,126,0.99)" : "rgba(10,17,27,0.96)";
    rounded(context, 0, 0, WIDTH, height, 15);
    context.fill();
    context.strokeStyle = enabled && item.action ? item.hover ? "#b8f2ff" : "#66d9ff" : "#3d4b5f";
    context.lineWidth = item.hover && enabled ? 7 : 3;
    rounded(context, 2, 2, WIDTH - 4, height - 4, 13);
    context.stroke();

    if (item.key === "info") {
      this.drawInfo(item);
      item.texture.needsUpdate = true;
      return;
    }

    const value = typeof item.value === "function" ? item.value() : item.value;
    let valueWidth = 0;
    if (value) {
      const isParam = item.key === "param";
      context.fillStyle = isParam ? "#f3f7fb" : enabled ? "#91e5ff" : "#647083";
      context.textAlign = "right";
      const text = fitText(context, String(value), WIDTH * 0.55, isParam ? "" : "bold", 25, 17);
      context.fillText(text, WIDTH - 22, 50);
      valueWidth = context.measureText(text).width + 18;
    }
    context.textAlign = "left";
    context.fillStyle = item.key === "title" ? "#91e5ff"
      : item.key === "param" ? "#9aa7b8"
      : enabled ? "#f3f7fb" : "#778294";
    const [weight, size] = item.key === "title" ? ["bold", 27] : item.key === "hint" ? ["", 20] : ["", 24];
    const label = fitText(context, item.label, WIDTH - 44 - valueWidth, weight, size, 16);
    context.fillText(label, 22, 50);
    item.texture.needsUpdate = true;
  }

  drawInfo(item) {
    const context = item.context;
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
    let y = INFO_PAD_Y + INFO_FONT_PX;
    for (const line of item.lines) {
      if (line.gap) { y += INFO_LINE_PX * 0.35; continue; }
      if (line.number) {
        context.fillStyle = "#91e5ff";
        context.font = `bold ${INFO_FONT_PX}px ${FONT}`;
        context.fillText(line.number, INFO_PAD_X, y);
      }
      context.fillStyle = "#e6edf5";
      context.font = `${INFO_FONT_PX}px ${FONT}`;
      context.fillText(line.text, INFO_PAD_X + INFO_NUMBER_W, y);
      y += INFO_LINE_PX;
    }
  }

  refresh() {
    // Site switches replace world.flights; rebuild a stale flights page (and drop its side panel).
    if (this.page === "flights") {
      const ids = this.world.flights.map((flight) => flight.record.id).join();
      if (ids !== this.flightIds) {
        if (this.sideFlight && !this.world.flights.includes(this.sideFlight)) this.sideFlight = null;
        this.showPage("flights");
        return;
      }
    }
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

/** Set the context font, shrinking from `px` toward `minPx` until `text` fits; ellipsize as a last resort. */
function fitText(context, text, maxWidth, weight, px, minPx) {
  const value = String(text ?? "");
  for (let size = px; size >= minPx; size--) {
    context.font = `${weight ? `${weight} ` : ""}${size}px ${FONT}`;
    if (context.measureText(value).width <= maxWidth) return value;
  }
  let short = value;
  while (short.length > 1 && context.measureText(`${short}…`).width > maxWidth) short = short.slice(0, -1);
  return `${short}…`;
}

/** Greedy word wrap using the context's current font. */
function wrapText(context, text, maxWidth) {
  const lines = [];
  let line = "";
  for (const word of String(text).split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function capitalize(text) {
  const value = String(text ?? "");
  return value ? value[0].toUpperCase() + value.slice(1) : "";
}

/** Records carry either ISO dates or EXIF-style "2026:08:26T20-43-40…" stamps; keep just the day. */
function formatDate(date) {
  if (!date) return null;
  return String(date).slice(0, 10).replace(/:/g, "-");
}

function formatDuration(record) {
  let seconds = Number(record.duration_s);
  if (!Number.isFinite(seconds) && Number.isFinite(record.start_utc) && Number.isFinite(record.end_utc)) {
    seconds = record.end_utc - record.start_utc;
  }
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const whole = Math.round(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
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
