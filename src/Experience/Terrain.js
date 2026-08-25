import * as THREE from "three";
import { Experience } from "brahma-xr";
import { METERS_PER_UNIT, settings, getSite, sceneToMetres, fromLocalMetres } from "./domain.js";

const vertexShader = /* glsl */ `
uniform float uZCenter;
uniform float uHeightScale;
varying vec2 vUv;
varying float vHeight;
varying vec2 vXZ;
void main(){
  vUv = uv;
  vHeight = position.z / uHeightScale + uZCenter;  // vertices are displaced on the CPU
  vXZ = vec2(position.x, -position.y);             // model-frame x/z (plane is rotated -PI/2 about X)
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Shared by the terrain and the drape material: aerial imagery, overridden by a
// high-res orthomosaic wherever one is loaded and covers the texel.
const groundGlsl = /* glsl */ `
uniform sampler2D uImagery;
uniform sampler2D uOrtho;
uniform sampler2D uOrthoMask;
uniform float uOrthoOn;
uniform vec2 uOrthoMin;   // model-frame xz
uniform vec2 uOrthoMax;
vec3 groundColor(vec2 xz, vec2 uvImagery){
  vec3 col = texture2D(uImagery, uvImagery).rgb;
  if (uOrthoOn > 0.5 && all(greaterThan(xz, uOrthoMin)) && all(lessThan(xz, uOrthoMax))) {
    vec2 t = (xz - uOrthoMin) / (uOrthoMax - uOrthoMin);
    vec2 ouv = vec2(t.x, 1.0 - t.y);   // ortho row 0 = north = min z
    if (texture2D(uOrthoMask, ouv).r > 0.9) col = texture2D(uOrtho, ouv).rgb;
  }
  return col;
}`;

const fragmentShader = groundGlsl + /* glsl */ `
uniform sampler2D uHeight;
uniform float uTexel;
uniform float uMetresPerTexel;
uniform float uExaggeration;
uniform vec3 uSun;
uniform float uImageryMix;
uniform vec2 uCutMin;   // model-frame xz window that fades out (scan mesh footprint)
uniform vec2 uCutMax;
uniform float uCutAlpha;
varying vec2 vUv;
varying float vHeight;
varying vec2 vXZ;
float decode(vec3 c){ return (c.r*255.0*256.0 + c.g*255.0 + c.b*255.0/256.0) - 32768.0; }
void main(){
  float zl = decode(texture2D(uHeight, vUv - vec2(uTexel,0.0)).rgb);
  float zr = decode(texture2D(uHeight, vUv + vec2(uTexel,0.0)).rgb);
  float zd = decode(texture2D(uHeight, vUv - vec2(0.0,uTexel)).rgb);
  float zu = decode(texture2D(uHeight, vUv + vec2(0.0,uTexel)).rgb);
  vec3 n = normalize(vec3(-(zr-zl)*uExaggeration, -(zu-zd)*uExaggeration, 2.0*uMetresPerTexel));
  float light = 0.45 + 0.65 * max(dot(n, normalize(uSun)), 0.0);
  vec3 img = groundColor(vXZ, vUv);
  vec3 hyps = mix(vec3(0.16,0.24,0.14), vec3(0.75,0.68,0.5), smoothstep(80.0, 175.0, vHeight));
  vec3 col = mix(hyps, img, uImageryMix) * light;
  bool inCut = all(greaterThan(vXZ, uCutMin)) && all(lessThan(vXZ, uCutMax));
  gl_FragColor = vec4(col, inCut ? uCutAlpha : 1.0);
  #include <colorspace_fragment>
}`;

const drapeVertex = /* glsl */ `
uniform vec3 uModelOrigin; // world position of the model group
uniform float uSize;       // terrain edge length, scene units
varying vec2 vUv;
varying vec2 vXZ;
varying vec3 vNormalW;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec3 mp = wp.xyz - uModelOrigin;
  vXZ = mp.xz;
  vUv = vec2(mp.x / uSize + 0.5, 0.5 - mp.z / uSize);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const drapeFragment = groundGlsl + /* glsl */ `
uniform vec3 uSun;
varying vec2 vUv;
varying vec2 vXZ;
varying vec3 vNormalW;
void main(){
  vec3 n = normalize(vNormalW);
  if (!gl_FrontFacing) n = -n;
  float light = 0.5 + 0.6 * max(dot(n, normalize(uSun)), 0.0);
  vec3 col = groundColor(vXZ, vUv) * light;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

/** Satellite-draped heightfield of the farm. Also answers heightAt(e, n). */
export default class Terrain extends THREE.Group {
  constructor() {
    super();
    this.experience = new Experience();
    this.site = getSite();
    this.size = this.site.size_m / METERS_PER_UNIT;
    this.setProbe();
  }

  // ---- hover probe: lat/lon + elevation under the pointer ----------------
  // Uses brahma Pointer's "isPath" contract so we get continuous setSphere()
  // updates while the ray sweeps across the ground.
  setProbe() {
    this.isPath = true;
    this.name = "terrain";
    this.marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0x5ec8ff, depthTest: false }),
    );
    this.marker.renderOrder = 997;
    this.marker.visible = false;
    this.add(this.marker);

    this.labelCanvas = document.createElement("canvas");
    this.labelCanvas.width = 640;
    this.labelCanvas.height = 160;
    this.labelCtx = this.labelCanvas.getContext("2d");
    this.labelTex = new THREE.CanvasTexture(this.labelCanvas);
    this.labelTex.colorSpace = THREE.SRGBColorSpace;
    this.label = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: this.labelTex, transparent: true, depthTest: false }),
    );
    this.label.scale.set(1.2, 0.3, 1);
    this.label.center.set(0.5, -0.25); // hang above the marker
    this.label.renderOrder = 997;
    this.label.visible = false;
    this.marker.add(this.label);
  }
  onHover() {
    this.hover = true;
    this.marker.visible = true;
    this.label.visible = true;
  }
  onUnhover() {
    this.hover = false;
    this.marker.visible = false;
    this.label.visible = false;
  }
  setSphere(worldPoint) {
    const local = this.worldToLocal(worldPoint.clone());
    this.marker.position.copy(local);
    const xr = this.experience.renderer.instance.xr;
    const cam = xr.isPresenting ? xr.getCamera() : this.experience.camera.instance;
    const d = cam.getWorldPosition(new THREE.Vector3()).distanceTo(worldPoint);
    const k = THREE.MathUtils.clamp(d * 0.18, 0.05, 1.2);
    this.label.scale.set(k, k / 4, 1);
    this.marker.scale.setScalar(THREE.MathUtils.clamp(d * 0.15, 0.1, 1));
    const { e, n } = sceneToMetres(local);
    const { lat, lon } = fromLocalMetres(e, n);
    const msl = this.heightAt(e, n);
    const c = this.labelCtx, W = this.labelCanvas.width, H = this.labelCanvas.height;
    c.clearRect(0, 0, W, H);
    c.fillStyle = "rgba(14,18,28,0.9)";
    c.beginPath(); c.roundRect(0, 0, W, H, 24); c.fill();
    c.strokeStyle = "#5ec8ff"; c.lineWidth = 4; c.beginPath(); c.roundRect(2, 2, W - 4, H - 4, 22); c.stroke();
    c.fillStyle = "#7f8aa3"; c.font = "22px system-ui, sans-serif"; c.fillText("TERRAIN", 28, 44);
    c.fillStyle = "#f2f5fa"; c.font = "34px system-ui, sans-serif";
    c.fillText(`${lat.toFixed(6)}, ${lon.toFixed(6)}`, 28, 88);
    c.fillText(`${msl.toFixed(1)} m MSL`, 28, 132);
    c.fillStyle = "#7f8aa3"; c.font = "22px system-ui, sans-serif";
    c.fillText(`E ${e.toFixed(0)} m  N ${n.toFixed(0)} m`, 330, 132);
    this.labelTex.needsUpdate = true;
  }
  onSelect() {}
  hideSphere() {}

  async load() {
    const [heightBmp, imagery] = await Promise.all([
      fetch("./farm/height.png")
        .then((r) => r.blob())
        .then((b) =>
          createImageBitmap(b, { colorSpaceConversion: "none", premultiplyAlpha: "none" }),
        ),
      new THREE.TextureLoader().loadAsync("./farm/imagery.jpg"),
    ]);

    // CPU copy for heightAt()
    const c = new OffscreenCanvas(heightBmp.width, heightBmp.height);
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(heightBmp, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    this.hw = c.width;
    this.hh = c.height;
    this.heights = new Float32Array(this.hw * this.hh);
    for (let i = 0; i < this.heights.length; i++) {
      this.heights[i] = d[i * 4] * 256 + d[i * 4 + 1] + d[i * 4 + 2] / 256 - 32768;
    }

    const heightTex = new THREE.CanvasTexture(c);
    heightTex.colorSpace = THREE.NoColorSpace;
    heightTex.minFilter = THREE.LinearFilter;
    heightTex.magFilter = THREE.LinearFilter;
    heightTex.generateMipmaps = false;
    imagery.colorSpace = THREE.SRGBColorSpace;
    imagery.anisotropy = this.experience.renderer.instance.capabilities.getMaxAnisotropy();

    this.uniforms = {
      uHeight: { value: heightTex },
      uImagery: { value: imagery },
      uHeightScale: { value: 1 / METERS_PER_UNIT },
      uZCenter: { value: this.site.z_center },
      uTexel: { value: 1 / this.hw },
      uMetresPerTexel: { value: this.site.size_m / (this.hw - 1) },
      uExaggeration: { value: settings.verticalExaggeration },
      uSun: { value: new THREE.Vector3(-0.4, 0.8, 0.5) },
      uImageryMix: { value: 1.0 },
      uCutMin: { value: new THREE.Vector2(1, 1) },
      uCutMax: { value: new THREE.Vector2(0, 0) },
      uCutAlpha: { value: 0.8 },
      uOrtho: { value: null },
      uOrthoMask: { value: null },
      uOrthoOn: { value: 0 },
      uOrthoMin: { value: new THREE.Vector2() },
      uOrthoMax: { value: new THREE.Vector2() },
    };
    const seg = this.hw - 1;
    const geom = new THREE.PlaneGeometry(this.size, this.size, seg, seg);
    // Displace on the CPU so raycasts hit the real surface (grid == texels).
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, (this.heights[i] - this.site.z_center) / METERS_PER_UNIT);
    }
    pos.needsUpdate = true;
    geom.computeBoundingSphere();
    this.mesh = new THREE.Mesh(
      geom,
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: this.uniforms, transparent: true }),
    );
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.scale.z = settings.verticalExaggeration;
    this.add(this.mesh);
    this.marker.raycast = () => {};
    this.label.raycast = () => {};
    this.experience.selectableObjects.push(this);

    // A thin skirt/base so the model reads as a slab from below
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(this.size, 0.02, this.size),
      new THREE.MeshBasicMaterial({ color: 0x1c2230 }),
    );
    base.position.y = ((this.site.z_min - this.site.z_center) / METERS_PER_UNIT) * settings.verticalExaggeration - 0.02;
    base.raycast = () => {};
    this.base = base;
    this.add(base);
    return this;
  }

  /** Material that drapes the aerial imagery onto any mesh placed in the model frame. */
  drapeMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader: drapeVertex,
      fragmentShader: drapeFragment,
      uniforms: {
        uImagery: this.uniforms.uImagery,
        uOrtho: this.uniforms.uOrtho,
        uOrthoMask: this.uniforms.uOrthoMask,
        uOrthoOn: this.uniforms.uOrthoOn,
        uOrthoMin: this.uniforms.uOrthoMin,
        uOrthoMax: this.uniforms.uOrthoMax,
        uSun: this.uniforms.uSun,
        uSize: { value: this.size },
        uModelOrigin: { value: this.parent.getWorldPosition(new THREE.Vector3()) },
      },
      side: THREE.DoubleSide,
      depthTest: false,
    });
  }

  /**
   * Show a baked orthomosaic (see tools/bake_ortho.py) inside its footprint.
   * spec.bounds_m is in site-local metres (e/n); textures are shared uniforms
   * so the drape material picks them up too. Pass null to disable.
   */
  async setOrtho(spec) {
    if (!spec) {
      this.uniforms.uOrthoOn.value = 0;
      return;
    }
    if (this.orthoSpec !== spec) {
      const loader = new THREE.TextureLoader();
      const [tex, mask] = await Promise.all([loader.loadAsync(spec.file), loader.loadAsync(spec.mask)]);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = this.experience.renderer.instance.capabilities.getMaxAnisotropy();
      mask.colorSpace = THREE.NoColorSpace;
      mask.minFilter = mask.magFilter = THREE.NearestFilter;
      mask.generateMipmaps = false;
      this.uniforms.uOrtho.value = tex;
      this.uniforms.uOrthoMask.value = mask;
      const b = spec.bounds_m;
      this.uniforms.uOrthoMin.value.set(b.e_min / METERS_PER_UNIT, -b.n_max / METERS_PER_UNIT);
      this.uniforms.uOrthoMax.value.set(b.e_max / METERS_PER_UNIT, -b.n_min / METERS_PER_UNIT);
      this.orthoSpec = spec;
    }
    this.uniforms.uOrthoOn.value = 1;
  }

  /** Fade the terrain inside a model-frame xz box (null clears). */
  setCutout(box) {
    if (!box) {
      this.uniforms.uCutMin.value.set(1, 1);
      this.uniforms.uCutMax.value.set(0, 0);
      return;
    }
    const pad = 3 / METERS_PER_UNIT;
    this.uniforms.uCutMin.value.set(box.min.x - pad, box.min.z - pad);
    this.uniforms.uCutMax.value.set(box.max.x + pad, box.max.z + pad);
  }

  setExaggeration(v) {
    settings.verticalExaggeration = v;
    if (!this.uniforms) return;
    this.uniforms.uExaggeration.value = v;
    this.mesh.scale.z = v;
    this.base.position.y = ((this.site.z_min - this.site.z_center) / METERS_PER_UNIT) * v - 0.02;
  }

  /** Ground elevation (m MSL) at local metres east/north; bilinear. */
  heightAt(e, n) {
    if (!this.heights) return this.site.z_center;
    const S = this.site.size_m;
    const fx = THREE.MathUtils.clamp(((e + S / 2) / S) * (this.hw - 1), 0, this.hw - 1.001);
    const fy = THREE.MathUtils.clamp(((S / 2 - n) / S) * (this.hh - 1), 0, this.hh - 1.001);
    const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
    const h = (x, y) => this.heights[y * this.hw + x];
    return (
      (h(x0, y0) * (1 - tx) + h(x0 + 1, y0) * tx) * (1 - ty) +
      (h(x0, y0 + 1) * (1 - tx) + h(x0 + 1, y0 + 1) * tx) * ty
    );
  }
}
