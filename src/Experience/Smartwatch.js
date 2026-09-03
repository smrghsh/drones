/**
 * Virtual wristwatch on the RIGHT controller (XR sessions only): local time,
 * head heading, viewer altitude / lat / lon, and a minimap of the site
 * imagery with the visible flight paths and the viewer's position.
 * Purely informational — it is not selectable and never raycast.
 */
import * as THREE from "three";
import { Experience } from "brahma-xr";
import { getSite, siteUrl, sceneToMetres, fromLocalMetres, METERS_PER_UNIT } from "./domain.js";

const WIDTH = 512;
const HEIGHT = 640;
const PLANE_WIDTH = 0.072;
const PLANE_HEIGHT = PLANE_WIDTH * HEIGHT / WIDTH; // 0.09
const MAP = 400; // minimap edge in canvas px
const MAP_X = (WIDTH - MAP) / 2;
const MAP_Y = HEIGHT - MAP - 24;
const REDRAW_MS = 100; // ~10 Hz
const MAX_PATH_POINTS = 400;
const COMPASS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

export default class Smartwatch extends THREE.Group {
  constructor(world) {
    super();
    this.experience = new Experience();
    this.world = world;
    this.visible = false;
    this.lastDraw = -Infinity;
    this.mapImage = null; // HTMLImageElement / ImageBitmap of the site imagery
    this.mapSiteDir = null;
    this.mapFlights = null; // flights array identity the layer was built for
    this.mapFlightCount = 0;
    this.mapDirty = true;

    this.canvas = document.createElement("canvas");
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.context = this.canvas.getContext("2d");
    this.layer = document.createElement("canvas"); // cached imagery + paths
    this.layer.width = MAP;
    this.layer.height = MAP;
    this.layerContext = this.layer.getContext("2d");

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT),
      new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, depthTest: false, depthWrite: false }),
    );
    this.mesh.renderOrder = 1200;
    this.mesh.frustumCulled = false;
    this.add(this.mesh);

    // Back of the right hand: behind and above the grip, face tilted up and
    // back toward the eyes, top of the dial pointing along the forearm.
    this.position.set(-0.03, 0.05, 0.08);
    this.rotation.set(-1.1, 0, 0.2);

    this._p = new THREE.Vector3();
    this._q = new THREE.Quaternion();
    this._mq = new THREE.Quaternion();
    this._s = new THREE.Vector3();
    this._fwd = new THREE.Vector3();

    const xr = this.experience.renderer.instance.xr;
    xr.addEventListener("sessionstart", () => { this.visible = true; });
    xr.addEventListener("sessionend", () => { this.visible = false; });
    if (xr.isPresenting) this.visible = true;

    this.setSite();
    this.drawFace();
  }

  /** (Re)load the minimap imagery for the current site; safe to call any time. */
  setSite() {
    this.mapDirty = true;
    this.mapFlights = null;
    const site = getSite();
    const dir = site?.dir ?? null;
    if (!dir) return;
    this.mapSiteDir = dir;
    const loaded = this.world?.terrain?.uniforms?.uImagery?.value?.image;
    if (loaded && (loaded.width > 0 || loaded.naturalWidth > 0)) {
      this.mapImage = loaded;
      return;
    }
    this.mapImage = null;
    const image = new Image();
    image.onload = () => {
      if (this.mapSiteDir !== dir) return; // site changed while loading
      this.mapImage = image;
      this.mapDirty = true;
    };
    image.onerror = () => {};
    image.src = siteUrl("imagery.jpg");
  }

  update() {
    if (!this.visible) return;
    const rightController = this.experience.controller?.rightController;
    if (rightController && this.parent !== rightController) rightController.add(this);
    const elapsed = this.experience.time?.elapsed ?? performance.now();
    if (elapsed - this.lastDraw < REDRAW_MS) return;
    this.lastDraw = elapsed;
    this.drawFace();
  }

  /** Viewer state in the model frame: position (scene units, unexaggerated) and heading in degrees. */
  readViewer() {
    const renderer = this.experience.renderer?.instance;
    const xr = renderer?.xr;
    const base = this.experience.camera?.instance;
    const cam = xr?.isPresenting ? xr.getCamera(base) : base;
    const model = this.world?.model;
    if (!cam || !model) return null;
    cam.matrixWorld.decompose(this._p, this._q, this._s);
    // model.matrixWorld includes the vertical exaggeration (scale.y), so the
    // local point is already in the unexaggerated model frame.
    const local = model.worldToLocal(this._p.clone());
    model.getWorldQuaternion(this._mq).invert();
    this._fwd.set(0, 0, -1).applyQuaternion(this._q).applyQuaternion(this._mq);
    let heading = Math.atan2(this._fwd.x, -this._fwd.z) * 180 / Math.PI; // east = +x, north = -z
    if (!Number.isFinite(heading)) heading = 0;
    heading = (heading + 360) % 360;
    return { local, heading };
  }

  drawFace() {
    const c = this.context;
    const site = getSite();
    const viewer = this.readViewer();

    c.clearRect(0, 0, WIDTH, HEIGHT);
    c.fillStyle = "rgba(6,10,16,0.97)";
    rounded(c, 0, 0, WIDTH, HEIGHT, 56);
    c.fill();
    c.strokeStyle = "#3a4656";
    c.lineWidth = 10;
    rounded(c, 5, 5, WIDTH - 10, HEIGHT - 10, 52);
    c.stroke();
    c.strokeStyle = "#66d9ff";
    c.lineWidth = 2;
    rounded(c, 14, 14, WIDTH - 28, HEIGHT - 28, 46);
    c.stroke();

    // Time
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    c.fillStyle = "#f3f7fb";
    c.font = "bold 74px system-ui, sans-serif";
    c.textAlign = "center";
    c.textBaseline = "alphabetic";
    c.fillText(`${hh}:${mm}:${ss}`, WIDTH / 2, 92);

    // Heading
    const heading = viewer?.heading ?? 0;
    const label = COMPASS[Math.round(heading / 22.5) % 16];
    c.fillStyle = "#91e5ff";
    c.font = "bold 40px system-ui, sans-serif";
    c.fillText(viewer ? `${label} ${Math.round(heading)}°` : "—", WIDTH / 2, 142);

    // Altitude / lat / lon
    let altText = "ALT — m", latText = "—", lonText = "—";
    if (viewer && site) {
      try {
        const { e, n, up } = sceneToMetres(viewer.local);
        const { lat, lon } = fromLocalMetres(e, n);
        const alt = Number.isFinite(site.z_center) ? up + site.z_center : up;
        altText = `ALT ${Math.round(alt)} m${Number.isFinite(site.z_center) ? "" : " AGL"}`;
        latText = `${Math.abs(lat).toFixed(5)}°${lat >= 0 ? "N" : "S"}`;
        lonText = `${Math.abs(lon).toFixed(5)}°${lon >= 0 ? "E" : "W"}`;
      } catch { /* site partially loaded */ }
    }
    c.fillStyle = "#f3f7fb";
    c.font = "bold 30px system-ui, sans-serif";
    c.textAlign = "left";
    c.fillText(altText, 34, 188);
    c.font = "28px system-ui, sans-serif";
    c.textAlign = "right";
    c.fillText(latText, WIDTH - 34, 178);
    c.fillText(lonText, WIDTH - 34, 208);

    // Minimap
    this.ensureMapLayer();
    c.save();
    rounded(c, MAP_X, MAP_Y, MAP, MAP, 18);
    c.clip();
    c.fillStyle = "#151c26";
    c.fillRect(MAP_X, MAP_Y, MAP, MAP);
    c.drawImage(this.layer, MAP_X, MAP_Y);
    if (viewer && site) {
      const size = siteSize(site);
      const px = MAP_X + (viewer.local.x * METERS_PER_UNIT / size + 0.5) * MAP;
      const py = MAP_Y + (viewer.local.z * METERS_PER_UNIT / size + 0.5) * MAP;
      const x = THREE.MathUtils.clamp(px, MAP_X + 8, MAP_X + MAP - 8);
      const y = THREE.MathUtils.clamp(py, MAP_Y + 8, MAP_Y + MAP - 8);
      const a = viewer.heading * Math.PI / 180; // 0 = north = up the map
      c.save();
      c.translate(x, y);
      c.rotate(a);
      c.fillStyle = "rgba(102,217,255,0.35)";
      c.beginPath();
      c.moveTo(0, 0);
      c.arc(0, 0, 34, -Math.PI / 2 - 0.45, -Math.PI / 2 + 0.45);
      c.closePath();
      c.fill();
      c.fillStyle = "#ffffff";
      c.beginPath();
      c.moveTo(0, -14);
      c.lineTo(7, 6);
      c.lineTo(-7, 6);
      c.closePath();
      c.fill();
      c.restore();
      c.strokeStyle = "#0b1118";
      c.lineWidth = 2;
      c.fillStyle = "#66d9ff";
      c.beginPath();
      c.arc(x, y, 6, 0, Math.PI * 2);
      c.fill();
      c.stroke();
    }
    c.restore();
    c.strokeStyle = "#3a4656";
    c.lineWidth = 3;
    rounded(c, MAP_X, MAP_Y, MAP, MAP, 18);
    c.stroke();

    // Site name and north arrow
    const name = site?.name ?? this.world?.siteLabel?.() ?? "";
    c.fillStyle = "rgba(6,10,16,0.75)";
    c.fillRect(MAP_X + 2, MAP_Y + 2, MAP - 4, 30);
    c.fillStyle = "#f3f7fb";
    c.font = "bold 20px system-ui, sans-serif";
    c.textAlign = "left";
    c.fillText(shorten(name, 30), MAP_X + 12, MAP_Y + 24);
    c.textAlign = "center";
    c.fillStyle = "#ffffff";
    c.font = "bold 22px system-ui, sans-serif";
    c.fillText("N", MAP_X + MAP - 22, MAP_Y + 64);
    c.beginPath();
    c.moveTo(MAP_X + MAP - 22, MAP_Y + 38);
    c.lineTo(MAP_X + MAP - 15, MAP_Y + 48);
    c.lineTo(MAP_X + MAP - 29, MAP_Y + 48);
    c.closePath();
    c.fill();

    this.texture.needsUpdate = true;
  }

  /** Rebuild the cached imagery + flight-path layer when the site or flights change. */
  ensureMapLayer() {
    const flights = this.world?.flights ?? [];
    const site = getSite();
    if (site?.dir && site.dir !== this.mapSiteDir) this.setSite();
    const visibleKey = flights.map((f) => (f.visible ? 1 : 0)).join("");
    const changed = this.mapDirty || flights !== this.mapFlights || flights.length !== this.mapFlightCount
      || visibleKey !== this.mapVisibleKey;
    if (!changed) return;
    this.mapDirty = false;
    this.mapFlights = flights;
    this.mapFlightCount = flights.length;
    this.mapVisibleKey = visibleKey;

    const l = this.layerContext;
    l.clearRect(0, 0, MAP, MAP);
    l.fillStyle = "#151c26";
    l.fillRect(0, 0, MAP, MAP);
    if (this.mapImage) {
      try { l.drawImage(this.mapImage, 0, 0, MAP, MAP); } catch { /* image not decodable yet */ }
    }
    if (!site) return;
    const size = siteSize(site);
    l.lineWidth = 3;
    l.lineJoin = "round";
    l.lineCap = "round";
    for (const flight of flights) {
      if (!flight?.visible) continue;
      const positions = flight.path?.positions ?? flight.track?.positions?.();
      if (!positions || positions.length < 3) continue;
      const n = positions.length / 3;
      const step = Math.max(1, Math.ceil(n / MAX_PATH_POINTS));
      l.strokeStyle = `#${(flight.color ?? flight.path?.color ?? new THREE.Color(0xffb347)).getHexString()}`;
      l.beginPath();
      let first = true;
      for (let i = 0; i < n; i += step) {
        const x = (positions[i * 3] * METERS_PER_UNIT / size + 0.5) * MAP;
        const y = (positions[i * 3 + 2] * METERS_PER_UNIT / size + 0.5) * MAP;
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
        if (first) { l.moveTo(x, y); first = false; } else l.lineTo(x, y);
      }
      if (step > 1 && n > 1) {
        const last = n - 1;
        l.lineTo((positions[last * 3] * METERS_PER_UNIT / size + 0.5) * MAP, (positions[last * 3 + 2] * METERS_PER_UNIT / size + 0.5) * MAP);
      }
      l.stroke();
    }
  }

  dispose() {
    this.parent?.remove(this);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.texture.dispose();
  }
}

/** Site square edge in metres (site.json `size_m`), with fallbacks. */
function siteSize(site) {
  const size = Number(site?.size_m ?? site?.size ?? site?.extent_m ?? site?.extent);
  return Number.isFinite(size) && size > 0 ? size : 1200;
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
