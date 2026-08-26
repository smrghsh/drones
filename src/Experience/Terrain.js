import * as THREE from "three";
import { Experience } from "brahma-xr";
import { METERS_PER_UNIT, settings, getSite, sceneToMetres, fromLocalMetres } from "./domain.js";

const vertexShader = /* glsl */ `
uniform float uZCenter;
uniform float uHeightScale;
uniform vec2 uOrigin;     // model-frame xz of this mesh's centre
uniform float uSiteSize;  // farm-wide imagery edge, scene units
varying vec2 vUv;
varying float vHeight;
varying vec2 vXZ;
varying vec2 vUvImagery;
void main(){
  vUv = uv;
  vHeight = position.z / uHeightScale + uZCenter;  // vertices are displaced on the CPU
  vXZ = uOrigin + vec2(position.x, -position.y);   // model-frame x/z (plane is rotated -PI/2 about X)
  vUvImagery = vec2(vXZ.x / uSiteSize + 0.5, 0.5 - vXZ.y / uSiteSize);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Shared by the terrain and the drape material: aerial imagery, overridden by a
// high-res orthomosaic wherever one is loaded and covers the texel.
const groundGlsl = /* glsl */ `
uniform sampler2D uImagery;
// Up to two orthomosaics (one per scan showing); later slot wins where they overlap.
uniform sampler2D uOrtho0;
uniform sampler2D uOrthoMask0;
uniform float uOrthoOn0;
uniform vec2 uOrthoMin0;   // model-frame xz
uniform vec2 uOrthoMax0;
uniform sampler2D uOrtho1;
uniform sampler2D uOrthoMask1;
uniform float uOrthoOn1;
uniform vec2 uOrthoMin1;
uniform vec2 uOrthoMax1;
bool orthoAt(sampler2D tex, sampler2D mask, float on, vec2 mn, vec2 mx, vec2 xz, inout vec3 col){
  if (on < 0.5 || any(lessThan(xz, mn)) || any(greaterThan(xz, mx))) return false;
  vec2 t = (xz - mn) / (mx - mn);
  vec2 ouv = vec2(t.x, 1.0 - t.y);   // ortho row 0 = north = min z
  if (texture2D(mask, ouv).r < 0.9) return false;
  col = texture2D(tex, ouv).rgb;
  return true;
}
// gate: (1,1) on draped meshes; the terrain passes its per-scan "ortho on terrain" flags
vec3 groundColor(vec2 xz, vec2 uvImagery, vec2 gate){
  vec3 col = texture2D(uImagery, uvImagery).rgb;
  if (!orthoAt(uOrtho1, uOrthoMask1, uOrthoOn1 * gate.y, uOrthoMin1, uOrthoMax1, xz, col))
    orthoAt(uOrtho0, uOrthoMask0, uOrthoOn0 * gate.x, uOrthoMin0, uOrthoMax0, xz, col);
  return col;
}`;

const fragmentShader = groundGlsl + /* glsl */ `
uniform sampler2D uHeight;
uniform float uTexel;
uniform float uMetresPerTexel;
uniform float uExaggeration;
uniform vec3 uSun;
uniform float uImageryMix;
uniform vec2 uOrthoGate;
uniform vec2 uCutMin;     // model-frame xz box carved out of this mesh (the detail patch lives there)
uniform vec2 uCutMax;
uniform sampler2D uImageryRef; // unused on the coarse mesh; keeps the uniform set uniform
varying vec2 vUv;
varying float vHeight;
varying vec2 vXZ;
varying vec2 vUvImagery;
float decode(vec3 c){ return (c.r*255.0*256.0 + c.g*255.0 + c.b*255.0/256.0) - 32768.0; }
void main(){
  if (all(greaterThan(vXZ, uCutMin)) && all(lessThan(vXZ, uCutMax))) discard;
  float zl = decode(texture2D(uHeight, vUv - vec2(uTexel,0.0)).rgb);
  float zr = decode(texture2D(uHeight, vUv + vec2(uTexel,0.0)).rgb);
  float zd = decode(texture2D(uHeight, vUv - vec2(0.0,uTexel)).rgb);
  float zu = decode(texture2D(uHeight, vUv + vec2(0.0,uTexel)).rgb);
  vec3 n = normalize(vec3(-(zr-zl)*uExaggeration, -(zu-zd)*uExaggeration, 2.0*uMetresPerTexel));
  float light = 0.45 + 0.65 * max(dot(n, normalize(uSun)), 0.0);
  vec3 img = groundColor(vXZ, vUvImagery, uOrthoGate);
  vec3 hyps = mix(vec3(0.16,0.24,0.14), vec3(0.75,0.68,0.5), smoothstep(80.0, 175.0, vHeight));
  vec3 col = mix(hyps, img, uImageryMix) * light;
  gl_FragColor = vec4(col, 1.0);
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
  vec3 sun = normalize(uSun);
  float ndl = dot(n, sun);
  float light = 0.32 + 0.85 * max(ndl, 0.0) + 0.15 * max(-n.y, 0.0);  // strong key light, faint bounce on under-faces
  vec3 col = groundColor(vXZ, vUv, vec2(1.0)) * light;
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
    const sy = settings.verticalExaggeration;
    this.label.scale.set(k, k / 4 / sy, 1);
    const ms = THREE.MathUtils.clamp(d * 0.15, 0.1, 1);
    this.marker.scale.set(ms, ms / sy, ms);
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
      uExaggeration: { value: 1 },
      uSun: { value: new THREE.Vector3(-0.6, 0.55, 0.45) }, // lowish sun so relief reads
      uImageryMix: { value: 1.0 },
      uOrthoGate: { value: new THREE.Vector2(1, 1) },
      uOrigin: { value: new THREE.Vector2(0, 0) },
      uSiteSize: { value: this.size },
      uCutMin: { value: new THREE.Vector2(1e9, 1e9) },
      uCutMax: { value: new THREE.Vector2(1e9, 1e9) },
      uOrtho0: { value: null }, uOrthoMask0: { value: null }, uOrthoOn0: { value: 0 },
      uOrthoMin0: { value: new THREE.Vector2() }, uOrthoMax0: { value: new THREE.Vector2() },
      uOrtho1: { value: null }, uOrthoMask1: { value: null }, uOrthoOn1: { value: 0 },
      uOrthoMin1: { value: new THREE.Vector2() }, uOrthoMax1: { value: new THREE.Vector2() },
    };
    this.orthoSlots = [null, null]; // spec loaded in each slot
    this.orthoTex = new Map(); // spec -> [tex, mask]
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
      // Opaque on purpose: scan meshes draw over it via renderOrder + depthTest:false,
      // which only works if the terrain isn't in three's (later) transparent pass.
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: this.uniforms }),
    );
    this.mesh.rotation.x = -Math.PI / 2;
    this.add(this.mesh);
    this.marker.raycast = () => {};
    this.label.raycast = () => {};
    this.experience.selectableObjects.push(this);

    // A thin skirt/base so the model reads as a slab from below
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(this.size, 0.02, this.size),
      new THREE.MeshBasicMaterial({ color: 0x1c2230 }),
    );
    base.position.y = (this.site.z_min - this.site.z_center) / METERS_PER_UNIT - 0.02;
    base.raycast = () => {};
    this.base = base;
    this.add(base);
    await this.loadDetail();
    return this;
  }

  /**
   * Nested high-resolution patch (tools/prep_detail.py: 3DEP lidar points
   * rasterised at ~0.35 m) under the scans. Same shader; the coarse mesh is
   * carved out inside its footprint and heightAt() prefers it.
   */
  async loadDetail() {
    const meta = await fetch("./farm/detail.json").then((r) => (r.ok ? r.json() : null)).catch(() => null);
    if (!meta) return;
    const bmp = await fetch("./farm/detail_height.png").then((r) => r.blob())
      .then((b) => createImageBitmap(b, { colorSpaceConversion: "none", premultiplyAlpha: "none" }));
    const c = new OffscreenCanvas(bmp.width, bmp.height);
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(bmp, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    const n = c.width;
    const heights = new Float32Array(n * n);
    for (let i = 0; i < heights.length; i++) heights[i] = d[i * 4] * 256 + d[i * 4 + 1] + d[i * 4 + 2] / 256 - 32768;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.NoColorSpace; tex.minFilter = tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false;
    const size = meta.size_m / METERS_PER_UNIT;
    const geom = new THREE.PlaneGeometry(size, size, n - 1, n - 1);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setZ(i, (heights[i] - this.site.z_center) / METERS_PER_UNIT);
    pos.needsUpdate = true; geom.computeBoundingSphere();
    const ox = meta.center_e / METERS_PER_UNIT, oz = -meta.center_n / METERS_PER_UNIT;
    const uniforms = {
      ...this.uniforms,
      uHeight: { value: tex }, uTexel: { value: 1 / n }, uMetresPerTexel: { value: meta.gsd_m },
      uOrigin: { value: new THREE.Vector2(ox, oz) },
      uCutMin: { value: new THREE.Vector2(1e9, 1e9) }, uCutMax: { value: new THREE.Vector2(1e9, 1e9) },
    };
    const mesh = new THREE.Mesh(geom, new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms }));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(ox, 0, oz);
    this.add(mesh);
    this.detail = { meta, heights, n, mesh, half: meta.size_m / 2 };
    // carve the coarse mesh (slightly inset so the seam is hidden under the patch edge)
    const inset = meta.gsd_m * 2 / METERS_PER_UNIT;
    this.uniforms.uCutMin.value.set(ox - size / 2 + inset, oz - size / 2 + inset);
    this.uniforms.uCutMax.value.set(ox + size / 2 - inset, oz + size / 2 - inset);
    console.log(`terrain detail: ${meta.size_m} m @ ${meta.gsd_m} m (${n}x${n})`);
  }

  /** Material that drapes the aerial imagery onto any mesh placed in the model frame. */
  drapeMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader: drapeVertex,
      fragmentShader: drapeFragment,
      uniforms: {
        uImagery: this.uniforms.uImagery,
        ...Object.fromEntries(["uOrtho", "uOrthoMask", "uOrthoOn", "uOrthoMin", "uOrthoMax"].flatMap((k) => [0, 1].map((i) => [k + i, this.uniforms[k + i]]))),
        uSun: this.uniforms.uSun,
        uSize: { value: this.size },
        uModelOrigin: { value: this.parent.getWorldPosition(new THREE.Vector3()) },
      },
      side: THREE.DoubleSide,
      depthTest: false,
    });
  }

  /**
   * Show up to two baked orthomosaics (see tools/bake_ortho.py) inside their
   * footprints. spec.bounds_m is in site-local metres (e/n); textures are
   * shared uniforms so the drape material picks them up too. Pass [] to disable.
   */
  async setOrthos(entries) {
    entries = entries.filter(Boolean).slice(0, 2);
    const loader = new THREE.TextureLoader();
    const gate = this.uniforms.uOrthoGate.value;
    for (let i = 0; i < 2; i++) {
      const spec = entries[i]?.spec ?? null;
      gate.setComponent(i, entries[i]?.onTerrain === false ? 0 : 1);
      if (!spec) { this.uniforms["uOrthoOn" + i].value = 0; this.orthoSlots[i] = null; continue; }
      if (this.orthoSlots[i] !== spec) {
        if (!this.orthoTex.has(spec)) {
          const [tex, mask] = await Promise.all([loader.loadAsync(spec.file), loader.loadAsync(spec.mask)]);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = this.experience.renderer.instance.capabilities.getMaxAnisotropy();
          mask.colorSpace = THREE.NoColorSpace;
          mask.minFilter = mask.magFilter = THREE.NearestFilter;
          mask.generateMipmaps = false;
          this.orthoTex.set(spec, [tex, mask]);
        }
        const [tex, mask] = this.orthoTex.get(spec);
        this.uniforms["uOrtho" + i].value = tex;
        this.uniforms["uOrthoMask" + i].value = mask;
        const b = spec.bounds_m;
        this.uniforms["uOrthoMin" + i].value.set(b.e_min / METERS_PER_UNIT, -b.n_max / METERS_PER_UNIT);
        this.uniforms["uOrthoMax" + i].value.set(b.e_max / METERS_PER_UNIT, -b.n_min / METERS_PER_UNIT);
        this.orthoSlots[i] = spec;
      }
      this.uniforms["uOrthoOn" + i].value = 1;
    }
  }

  /** Lighting only — geometry exaggeration is World.model.scale.y. */
  setExaggeration(v) {
    if (!this.uniforms) return;
    this.uniforms.uExaggeration.value = v;
  }

  /** Ground elevation (m MSL) at local metres east/north; bilinear. */
  heightAt(e, n) {
    if (!this.heights) return this.site.z_center;
    const D = this.detail;
    if (D && Math.abs(e - D.meta.center_e) < D.half && Math.abs(n - D.meta.center_n) < D.half) {
      const fx = THREE.MathUtils.clamp((e - (D.meta.center_e - D.half)) / D.meta.gsd_m, 0, D.n - 1.001);
      const fy = THREE.MathUtils.clamp(((D.meta.center_n + D.half) - n) / D.meta.gsd_m, 0, D.n - 1.001);
      const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
      const h = (x, y) => D.heights[y * D.n + x];
      return (h(x0, y0) * (1 - tx) + h(x0 + 1, y0) * tx) * (1 - ty) + (h(x0, y0 + 1) * (1 - tx) + h(x0 + 1, y0 + 1) * tx) * ty;
    }
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
