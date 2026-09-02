import * as THREE from "three";
import { Experience } from "brahma-xr";
import Track from "./Track.js";
import FlightPath from "./FlightPath.js";
import VideoPath from "./VideoPath.js";
import FlightModel from "./FlightModel.js";
import VoxelField from "./VoxelField.js";
import { hideLegend } from "./colormap.js";

/**
 * One flight, standardised: a metadata record, a FlightPath (trajectory +
 * interactivity) and, when the record carries constructed 3D data, a
 * FlightModel (coverage mesh / photogrammetry / splat). Everything a flight
 * renders hangs off this Group, so `world.model.add(flight)` is the whole
 * integration.
 *
 * Dumping data in:
 *
 *   const flight = await Flight.load("./flights/strip1.json", ctx); // any importer JSON
 *   const flight = Flight.from(record, ctx);                        // already-parsed record
 *   // or construct a record inline from any point source:
 *   Flight.from({ id: "x", name: "X", kind: "survey", samples: rows }, ctx);
 *
 * The record shape (written by tools/import_*.py) is: `id`, `name`, `kind`
 * ("scan" | "video" | "airlog" | …), one of `track` / `samples` / `waypoints`
 * (an array of `{ lat, lon, alt_msl, …any numeric channels }` — see Track),
 * and optionally `mesh`/`recon`/`splat` (georeferenced 3D assets), `ortho`
 * (terrain drape), `metrics` (labels/units for sensor channels) and `voxels`
 * (`{ size_m, channel, opacity }` — bin the samples into a VoxelField of
 * colour-coded cubes along the path, shown by default; the sensor-pod air
 * quality logs use this).
 *
 * `ctx` = `{ panel, videoPanel, color }` — shared UI panels plus this
 * flight's colour.
 *
 * The flight owns its lil-gui folder (`addGui`): World only adds one
 * visibility checkbox per flight, and the flight shows/hides its own options
 * folder (path styling, colour-by-channel, 3D model, video playback) as its
 * visibility changes.
 */
export default class Flight extends THREE.Group {
  /**
   * @param {object} record flight record (see class doc)
   * @param {object} ctx
   * @param {object} ctx.panel shared SamplePanel
   * @param {object} [ctx.videoPanel] shared VideoPanel (video flights)
   * @param {THREE.ColorRepresentation} [ctx.color] path colour
   */
  constructor(record, { panel, videoPanel, color = 0xffb347 } = {}) {
    super();
    this.experience = new Experience();
    this.record = record;
    this.kind = record.kind;
    this.name = record.id; // (Object3D.id is reserved — the flight id lives on record.id / name)
    this.color = new THREE.Color(color);
    this.orthoOnTerrain = true;

    const isScan = record.kind === "scan";
    this.uiScale = record.kind === "video" ? 0.25 : isScan ? 0.2 : 1;
    this.track = Track.from(record.track ?? record.samples ?? record.waypoints ?? []);
    this.path =
      record.kind === "video"
        ? new VideoPath({ flight: record, track: this.track, panel: videoPanel ?? panel, color: this.color })
        : new FlightPath({
            flight: record,
            track: this.track,
            panel,
            color: this.color,
            uiScale: this.uiScale,
            coneRadius: isScan ? 0.003 : 0.012,
          });
    this.add(this.path);

    /** @type {FlightModel|null} */
    this.model = null;
    if (record.mesh) {
      this.model = new FlightModel(this);
      this.add(this.model);
    }

    /** @type {VoxelField|null} colour-coded cubes along the path (record.voxels) */
    this.voxels = null;
    this.voxelsOn = true;
    this.colorKey = null;
    if (record.voxels && record.kind !== "video") {
      const opts = typeof record.voxels === "object" ? record.voxels : {};
      this.voxels = new VoxelField({ flight: record, track: this.track, color: this.color, ...opts });
      this.add(this.voxels);
      // the field's channel is the flight's initial "Colour by" so line, cubes and legend agree
      if (opts.channel && this.track.channel(opts.channel)) this.setColorBy(opts.channel);
    }
  }

  /** Build a Flight from an already-parsed record. */
  static from(record, ctx) {
    return new Flight(record, ctx);
  }

  /**
   * Fetch a flight record (any importer's JSON) and build the Flight.
   * `extra` merges over the record — the flights index uses it to switch on
   * options such as `voxels` without editing the importer output.
   */
  static async load(url, ctx, extra = null) {
    const record = await fetch(url).then((r) => {
      if (!r.ok) throw new Error(`${url}: ${r.status}`);
      return r.json();
    });
    return Flight.from(extra ? { ...record, ...extra } : record, ctx);
  }

  /** Show/hide the whole flight (path, model, voxels, in-scene menu, gui folder). */
  setVisible(v) {
    this.visible = v;
    this.path.setActive(v, this.path.emphasis);
    this.model?.setVisible(v);
    if (this.folder) (v ? this.folder.show() : this.folder.hide());
  }

  /** Paint the path and voxel field by a Track channel ("none"/null = flat colour). */
  setColorBy(key) {
    this.colorKey = !key || key === "none" ? null : key;
    this.path.colorBy(this.colorKey);
    this.voxels?.colorBy(this.colorKey);
    if (this.guiState) this.guiState.colorBy = this.colorKey ?? "none";
  }

  /** Show/hide the voxel field (the flight's own visibility still gates it). */
  setVoxelsVisible(v) {
    this.voxelsOn = v;
    if (this.voxels) this.voxels.visible = v;
  }

  /** Take the flight out of the scene for good (site switch): pointer set, GPU buffers, legend. */
  dispose() {
    this.path.setActive(false, this.path.emphasis);
    this.path.dispose?.();
    this.model?.setVisible(false);
    this.model?.dispose?.();
    this.voxels?.dispose();
    if (this.colorKey) hideLegend();
    this.folder?.destroy();
    this.folder = null;
    this.clear();
  }

  /** Emphasis < 1 draws the path subdued and not hoverable (see FlightPath). */
  setEmphasis(e) {
    this.path.setActive(this.visible, e);
  }

  /** Drape this flight's orthomosaic on the terrain (when the record has one). */
  setOrthoOnTerrain(v) {
    this.orthoOnTerrain = v;
    this.experience.world?.refreshOrthos();
    this.model?.menu?.refresh();
    this.refreshGui();
  }

  /** World-space bounding box, for camera focusing. */
  bounds() {
    return this.path.bounds();
  }

  /**
   * Build this flight's options folder under `parent` (lil-gui). The folder
   * follows the flight's visibility; World only owns the checkbox.
   */
  addGui(parent) {
    const record = this.record, path = this.path;
    const s = (this.guiState = {
      focus: () => this.experience.world?.focus(path),
      lineWidth: path.linewidth,
      samples: true,
      colorBy: this.colorKey ?? "none",
      voxels: this.voxelsOn,
      voxelSize: this.voxels?.sizeM ?? 10,
      voxelOpacity: this.voxels?.opacity ?? 0.6,
      representation: this.model?.representation ?? "none",
      orthoTerrain: this.orthoOnTerrain,
      playAll: false,
      swath: true,
    });
    const f = (this.folder = parent.addFolder(record.name));
    f.close();
    f.add(s, "focus").name("Focus camera");
    f.add(s, "lineWidth", 1, 8, 0.5).name("Line width").onChange((w) => path.setLineWidth(w));
    if (path.samples) f.add(s, "samples").name("Sample markers").onChange((v) => path.setConesVisible(v));
    if (record.kind !== "video") {
      // the video line's colours are owned by segment highlighting
      const channels = { "Path colour": "none", Altitude: "alt" };
      for (const [k, m] of Object.entries(record.metrics ?? {})) channels[m.label || k] = k;
      f.add(s, "colorBy", channels).name("Colour by").onChange((k) => this.setColorBy(k));
    }
    if (this.voxels) {
      f.add(s, "voxels").name("Voxels").onChange((v) => this.setVoxelsVisible(v));
      f.add(s, "voxelSize", 4, 60, 1).name("Voxel size (m)").onFinishChange((m) => this.voxels.setSize(m));
      f.add(s, "voxelOpacity", 0.1, 1, 0.05).name("Voxel opacity").onChange((o) => this.voxels.setOpacity(o));
    }
    if (this.model) {
      const opts = { "Coverage mesh (Skydio)": "coverage" };
      if (record.recon) opts["Photogrammetry mesh"] = "recon";
      if (record.splat) opts["Gaussian splat"] = "splat";
      opts["Terrain only"] = "none";
      f.add(s, "representation", opts).name("3D model").onChange((k) => this.model.setRepresentation(k));
    }
    if (record.ortho) f.add(s, "orthoTerrain").name("Ortho on terrain").onChange((v) => this.setOrthoOnTerrain(v));
    if (record.kind === "video") {
      f.add(s, "playAll").name("Play whole flight (when pinned)").onChange((v) => (path.playAll = v));
      f.add(s, "swath").name("Ground swath").onChange((v) => {
        path.swathOn = v;
        path.swath.visible = v && path.segment >= 0;
      });
    }
    if (!this.visible) f.hide();
    return f;
  }

  /** Sync the gui folder (and VR menu) after an option changed elsewhere (menu, remote user). */
  refreshGui() {
    this.experience.world?.vrMenu?.refresh();
    if (!this.folder) return;
    this.guiState.representation = this.model?.representation ?? "none";
    this.guiState.orthoTerrain = this.orthoOnTerrain;
    for (const c of this.folder.controllersRecursive()) c.updateDisplay();
  }

  /** Per-frame work (in-scene menu billboarding). */
  update() {
    this.model?.update();
  }
}
