import * as THREE from "three";
import { Experience } from "brahma-xr";

const W = 1024, H = 512;

/**
 * Floating info card: metadata fields on the left, image on the right.
 * One canvas texture, redrawn on show(); billboards toward the viewer.
 */
export default class SamplePanel extends THREE.Group {
  constructor() {
    super();
    this.experience = new Experience();
    this.canvas = document.createElement("canvas");
    this.canvas.width = W;
    this.canvas.height = H;
    this.ctx = this.canvas.getContext("2d");
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;

    const width = 1.2, height = width * (H / W);
    this.card = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, depthTest: false, depthWrite: false }),
    );
    this.card.renderOrder = 999;
    this.card.position.y = 0.22 + height / 2;
    this.add(this.card);

    this.stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.003, 0.003, 0.22, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, depthTest: false }),
    );
    this.stem.renderOrder = 998;
    this.stem.position.y = 0.11;
    this.add(this.stem);

    this.images = new Map();
    this.visible = false;
    this.pinned = false;
    this.current = null;
    this._camPos = new THREE.Vector3();
  }

  image(url) {
    if (!this.images.has(url)) {
      const img = new Image();
      img.onload = () => this.current?.image === url && this.draw(this.current, this.flight);
      img.src = url;
      this.images.set(url, img);
    }
    return this.images.get(url);
  }

  show(sample, flight, worldPoint) {
    this.current = sample;
    this.flight = flight;
    this.parent?.worldToLocal(this.position.copy(worldPoint));
    this.draw(sample, flight);
    this.visible = true;
  }

  hide() {
    if (this.pinned) return;
    this.visible = false;
    this.current = null;
  }

  draw(s, flight) {
    const c = this.ctx;
    c.clearRect(0, 0, W, H);
    c.fillStyle = "rgba(14,18,28,0.92)";
    roundRect(c, 0, 0, W, H, 28); c.fill();
    c.strokeStyle = this.pinned ? "#ffd166" : "#5ec8ff"; c.lineWidth = 6; roundRect(c, 3, 3, W - 6, H - 6, 26); c.stroke();

    c.fillStyle = "#5ec8ff"; c.font = "bold 30px system-ui, sans-serif";
    c.fillText(flight.name, 36, 56);
    c.fillStyle = "#c9d1e0"; c.font = "24px system-ui, sans-serif";
    c.fillText(`${flight.drone} · ${flight.camera}`, 36, 92);

    const fields = [
      ["Sample", s.id],
      ["Time", `t+${s.t}s  (${flight.date.slice(0, 10)})`],
      ["Lat / Lon", `${s.lat.toFixed(6)}, ${s.lon.toFixed(6)}`],
      ["Altitude", `${s.alt_msl} m MSL · ${s.alt_agl} m AGL`],
      ["Heading", `${s.heading}°   gimbal ${s.gimbal_pitch}°`],
      ["Battery", `${s.battery}%`],
      ["Notes", s.notes],
    ];
    let y = 138;
    for (const [k, v] of fields) {
      c.fillStyle = "#7f8aa3"; c.font = "18px system-ui, sans-serif"; c.fillText(k.toUpperCase(), 36, y);
      c.fillStyle = "#f2f5fa"; c.font = "24px system-ui, sans-serif"; c.fillText(String(v), 36, y + 26);
      y += 50;
    }

    // Image well
    const ix = 560, iy = 110, iw = 428, ih = 321;
    c.fillStyle = "#000"; roundRect(c, ix, iy, iw, ih, 12); c.fill();
    const img = this.image(s.image);
    if (img.complete && img.naturalWidth) {
      c.save(); roundRect(c, ix, iy, iw, ih, 12); c.clip(); c.drawImage(img, ix, iy, iw, ih); c.restore();
    } else {
      c.fillStyle = "#556"; c.font = "22px system-ui"; c.fillText("loading image…", ix + 130, iy + ih / 2);
    }
    c.fillStyle = "#7f8aa3"; c.font = "20px system-ui"; c.fillText(s.image.split("/").pop(), ix, iy + ih + 28);
    c.fillStyle = this.pinned ? "#ffd166" : "#7f8aa3";
    c.fillText(this.pinned ? "PINNED — click to release" : "click / trigger to pin", ix, H - 24);
    this.texture.needsUpdate = true;
  }

  setPinned(p) {
    this.pinned = p;
    if (this.current) this.draw(this.current, this.flight);
  }

  update() {
    if (!this.visible) return;
    const xr = this.experience.renderer.instance.xr;
    const cam = xr.isPresenting ? xr.getCamera() : this.experience.camera.instance;
    cam.getWorldPosition(this._camPos);
    this._camPos.y = this.getWorldPosition(new THREE.Vector3()).y; // yaw-only billboard
    this.lookAt(this._camPos);
  }
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
