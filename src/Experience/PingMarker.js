/** Temporary sender-colored group ping rendered consistently across desktop and VR scales. */
import * as THREE from "three";
import { Experience } from "brahma-xr";

const LABEL_WIDTH = 512;
const LABEL_HEIGHT = 112;

export default class PingMarker extends THREE.Group {
  constructor({ id, sender, color, ttlMs }) {
    super();
    this.experience = new Experience();
    this.pingId = id;
    this.sender = sender;
    this.ttlMs = ttlMs;
    this.startedAt = performance.now();
    this._cameraPosition = new THREE.Vector3();
    this._worldPosition = new THREE.Vector3();
    this._parentScale = new THREE.Vector3(1, 1, 1);

    const cssColor = normalizeColor(color);
    const threeColor = new THREE.Color(cssColor);
    this.ringMaterial = new THREE.MeshBasicMaterial({
      color: threeColor,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.36, 48), this.ringMaterial);
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.renderOrder = 1200;

    this.beamMaterial = new THREE.MeshBasicMaterial({
      color: threeColor,
      transparent: true,
      opacity: 0.38,
      depthTest: false,
      depthWrite: false,
    });
    this.beam = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.1, 12), this.beamMaterial);
    this.beam.position.y = 0.55;
    this.beam.renderOrder = 1199;

    this.dotMaterial = new THREE.MeshBasicMaterial({
      color: threeColor,
      transparent: true,
      opacity: 1,
      depthTest: false,
      depthWrite: false,
    });
    this.dot = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), this.dotMaterial);
    this.dot.position.y = 1.1;
    this.dot.renderOrder = 1200;

    const canvas = document.createElement("canvas");
    canvas.width = LABEL_WIDTH;
    canvas.height = LABEL_HEIGHT;
    const context = canvas.getContext("2d");
    context.fillStyle = "rgba(10,17,27,0.94)";
    rounded(context, 0, 0, LABEL_WIDTH, LABEL_HEIGHT, 24);
    context.fill();
    context.strokeStyle = cssColor;
    context.lineWidth = 6;
    rounded(context, 3, 3, LABEL_WIDTH - 6, LABEL_HEIGHT - 6, 21);
    context.stroke();
    context.fillStyle = "#f3f7fb";
    context.font = "bold 38px system-ui, sans-serif";
    context.textAlign = "center";
    context.fillText(`PING · ${shorten(sender, 22)}`, LABEL_WIDTH / 2, 70);

    this.labelTexture = new THREE.CanvasTexture(canvas);
    this.labelTexture.colorSpace = THREE.SRGBColorSpace;
    this.labelMaterial = new THREE.SpriteMaterial({
      map: this.labelTexture,
      transparent: true,
      opacity: 1,
      depthTest: false,
      depthWrite: false,
    });
    this.label = new THREE.Sprite(this.labelMaterial);
    this.label.position.y = 1.42;
    this.label.scale.set(2.5, 0.55, 1);
    this.label.renderOrder = 1201;

    for (const object of [this.ring, this.beam, this.dot, this.label]) object.raycast = () => {};
    this.add(this.ring, this.beam, this.dot, this.label);
  }

  update(now = performance.now()) {
    const elapsed = now - this.startedAt;
    if (elapsed >= this.ttlMs) return false;
    const remaining = this.ttlMs - elapsed;
    const fade = remaining < 2000 ? remaining / 2000 : 1;
    const pulse = 1 + 0.18 * Math.sin(elapsed * 0.009);
    this.ring.scale.setScalar(pulse);
    this.dot.scale.setScalar(1 + 0.12 * Math.sin(elapsed * 0.012));
    this.ringMaterial.opacity = 0.95 * fade;
    this.beamMaterial.opacity = 0.38 * fade;
    this.dotMaterial.opacity = fade;
    this.labelMaterial.opacity = fade;

    const xr = this.experience.renderer.instance.xr;
    const camera = xr.isPresenting
      ? xr.getCamera(this.experience.camera.instance)
      : this.experience.camera.instance;
    camera.getWorldPosition(this._cameraPosition);
    this.getWorldPosition(this._worldPosition);
    const distance = this._cameraPosition.distanceTo(this._worldPosition);
    const visualScale = THREE.MathUtils.clamp(distance * 0.11, 0.3, 2.2);
    this.parent?.getWorldScale(this._parentScale);
    this.scale.set(
      visualScale / Math.max(Math.abs(this._parentScale.x), 1e-6),
      visualScale / Math.max(Math.abs(this._parentScale.y), 1e-6),
      visualScale / Math.max(Math.abs(this._parentScale.z), 1e-6),
    );
    return true;
  }

  dispose() {
    this.removeFromParent();
    this.ring.geometry.dispose();
    this.beam.geometry.dispose();
    this.dot.geometry.dispose();
    this.ringMaterial.dispose();
    this.beamMaterial.dispose();
    this.dotMaterial.dispose();
    this.labelMaterial.dispose();
    this.labelTexture.dispose();
  }
}

function normalizeColor(value) {
  const raw = String(value ?? "").trim();
  const color = raw.startsWith("#") ? raw : `#${raw}`;
  return /^#[0-9a-f]{6}$/i.test(color) ? color : "#5ec8ff";
}

function shorten(value, maximum) {
  const text = String(value ?? "User");
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
