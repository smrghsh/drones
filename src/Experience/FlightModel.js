import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { Experience } from "brahma-xr";
import { project, METERS_PER_UNIT } from "./domain.js";
import { fetchChunked } from "./chunked.js";
import ScanMenu from "./ScanMenu.js";

/**
 * The constructed 3D data of a Flight — everything that isn't the trajectory.
 * Manages the scan's representations and switches between them lazily:
 *
 *  - "coverage": Skydio coverage mesh shipped with the export (loaded eagerly)
 *  - "recon":    our photogrammetry mesh (tools/reconstruct.py, meshopt glb)
 *  - "splat":    Gaussian splat (Spark), with a lighter model swapped in for VR
 *  - "none":     terrain only
 *
 * Handles its own options via the in-scene ScanMenu (and mirrors them to the
 * Flight's lil-gui folder). Every representation is anchored by
 * origin lat/lon/alt + yaw, so any georeferenced asset drops in.
 */
export default class FlightModel extends THREE.Group {
  /** @param {import("./Flight.js").default} flight the Flight that owns this model */
  constructor(flight) {
    super();
    this.experience = new Experience();
    this.host = flight;
    this.record = flight.record;
    this.color = flight.color;
    this.uiScale = flight.uiScale;
    this.name = this.record.id + "-model";

    this.reps = {};
    this.representation = "coverage";
    this.loading = null;
    if (this.record.mesh) this.loadCoverage(this.record.mesh);

    const xr = this.experience.renderer.instance.xr;
    xr.addEventListener("sessionstart", () => this.setSplatQuality("fast"));
    xr.addEventListener("sessionend", () => this.setSplatQuality(this.preferredSplatQuality ?? "fast"));
  }

  /** Options of the Flight's ortho drape (lives on the Flight; the menu edits it here). */
  get orthoOnTerrain() {
    return this.host.orthoOnTerrain;
  }
  setOrthoOnTerrain(v) {
    this.host.setOrthoOnTerrain(v);
  }

  /** Skydio coverage mesh in the flight's local gravity-aligned frame. */
  loadCoverage(spec) {
    new GLTFLoader().load(spec.file, (gltf) => {
      const mesh = gltf.scene;
      mesh.traverse((o) => {
        if (o.isMesh) {
          // Skydio coverage meshes carry near-black coverage flags as vertex
          // colours and no RGB, so drape the aerial imagery instead.
          // Drawn over the terrain: the scan is the finer ground truth and the
          // lidar DSM (with crops on it) would otherwise bury most of it.
          o.material = this.experience.world.terrain.drapeMaterial();
          o.renderOrder = 1;
          o.raycast = () => {};
        }
      });
      // Skydio's glTF root node already converts its z-up local frame to
      // glTF y-up, i.e. local (x, y, z) -> (x, z, -y) == our scene frame
      // (x=E, y=up, z=-N) before yaw. A ccw yaw about local z (metres, ENU)
      // is the same rotation about scene +y.
      const yawed = new THREE.Group();
      yawed.rotation.y = THREE.MathUtils.degToRad(spec.yaw_deg);
      yawed.add(mesh);
      const anchor = new THREE.Group();
      anchor.position.copy(project(spec.origin.lat, spec.origin.lon, spec.origin.alt_msl));
      anchor.scale.setScalar(1 / METERS_PER_UNIT); // vertical exaggeration is applied on World.model
      anchor.add(yawed);
      this.reps.coverage = anchor;
      anchor.visible = this.representation === "coverage";
      this.add(anchor);
      this.updateMatrixWorld(true);
      this.meshBounds = new THREE.Box3().setFromObject(mesh); // world space
      this.placeMenu();
      this.dispatchEvent({ type: "meshloaded" });
    });
  }

  /** In-scene menu beside the scan (needs the coverage mesh bounds to know where "beside" is). */
  placeMenu() {
    if (!this.menu) { this.menu = new ScanMenu(this); this.add(this.menu); this.menu.setVisible(this.host.visible); }
    const box = this.meshBounds ?? this.host.bounds();
    const local = this.worldToLocal(new THREE.Vector3(box.max.x, box.max.y, box.min.z)); // NE corner, top
    this.menu.position.copy(local).add(new THREE.Vector3(0.12 * this.uiScale, 0.35 * this.uiScale, 0));
  }

  /** Anchor group for a georeferenced asset: ENU metres about origin (lat, lon, alt 0 = MSL). */
  anchorFor(spec) {
    const anchor = new THREE.Group();
    anchor.position.copy(project(spec.origin.lat, spec.origin.lon, spec.origin.alt_msl ?? 0));
    anchor.scale.setScalar(1 / METERS_PER_UNIT);
    const inner = new THREE.Group();
    const o = spec.offset_m ?? [0, 0, 0];
    inner.position.set(o[0], o[2], -o[1]); // (e, n, up) -> scene (x, y, -z)
    inner.rotation.y = THREE.MathUtils.degToRad(spec.yaw_deg ?? 0);
    anchor.add(inner);
    anchor.inner = inner;
    return anchor;
  }

  /** Switch the 3D representation: "coverage" | "recon" | "splat" | "none". Loads lazily. */
  async setRepresentation(key) {
    this.representation = key;
    for (const [k, g] of Object.entries(this.reps)) g.visible = k === key;
    this.onChanged();
    if (key === "none" || this.reps[key]) return;
    const spec = this.record[key];
    if (!spec) return;
    this.loading = key;
    this.menu?.refresh();
    const anchor = this.anchorFor(spec);
    try {
      if (key === "recon") {
        // meshopt-compressed glb (tools/reconstruct.py -> gltf-transform), possibly split into <5 MB parts
        const buf = await fetchChunked(spec.file);
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.parseAsync(buf, spec.file.replace(/[^/]*$/, ""));
        const m = gltf.scene;
        if (spec.frame?.startsWith("enu")) m.rotation.x = -Math.PI / 2; // z-up ENU -> y-up
        m.traverse((o) => { if (o.isMesh) { o.raycast = () => {}; o.material.side = THREE.DoubleSide; o.renderOrder = 1; } });
        anchor.inner.add(m);
      } else if (key === "splat") {
        const quality = this.record.splat_fast ? "fast" : this.record.splat_vr ? "vr" : "desktop";
        const qualitySpec = quality === "fast" ? this.record.splat_fast : quality === "vr" ? this.record.splat_vr : spec;
        const splat = await this.makeSplat(qualitySpec);
        this.splatMesh = splat; this.splatQuality = quality; this.splatAnchor = anchor;
        anchor.inner.add(splat);
      }
    } catch (e) {
      console.error(`failed to load ${key} for ${this.record.id}`, e);
      this.loading = null;
      this.representation = "coverage";
      if (this.reps.coverage) this.reps.coverage.visible = true;
      this.onChanged();
      return;
    }
    this.reps[key] = anchor;
    this.add(anchor);
    this.loading = null;
    anchor.visible = this.representation === key; // user may have switched meanwhile
    this.menu?.refresh();
  }

  async makeSplat(spec) {
    const { SplatMesh, SplatFileType } = await import("./spark.module.js");
    const bytes = new Uint8Array(await fetchChunked(spec.file));
    const type = spec.file.endsWith(".sog") ? SplatFileType.PCSOGSZIP : spec.file.endsWith(".spz") ? SplatFileType.SPZ : SplatFileType.PLY;
    const splat = new SplatMesh({ fileBytes: bytes, fileType: type, blurAmount: 0.12, maxStdDev: 2.45, minAlpha: 1 / 255 });
    if (spec.frame?.startsWith("enu")) splat.rotation.x = -Math.PI / 2;
    splat.raycast = () => {};
    return splat;
  }

  /** Full detail on desktop; a 500K-splat model for stereo headset rendering. */
  async setSplatQuality(quality) {
    if (!this.record.splat_vr || !this.splatMesh || this.splatQuality === quality) return;
    this.pendingSplatQuality = quality;
    const spec = quality === "fast" ? (this.record.splat_fast ?? this.record.splat_vr) : quality === "vr" ? this.record.splat_vr : this.record.splat;
    try {
      const next = await this.makeSplat(spec);
      if (this.pendingSplatQuality !== quality) { next.dispose?.(); return; }
      const old = this.splatMesh;
      this.splatAnchor.inner.remove(old);
      this.splatAnchor.inner.add(next);
      this.splatMesh = next; this.splatQuality = quality;
      old.dispose?.();
    } catch (error) {
      console.error(`failed to switch splat quality to ${quality}`, error);
    }
  }

  /** Options changed (locally or remotely): sync the in-scene menu and the gui folder. */
  onChanged() {
    this.menu?.refresh();
    this.host.refreshGui();
  }

  setVisible(v) {
    this.visible = v;
    this.menu?.setVisible(v);
  }

  update() {
    this.menu?.update();
  }
}
