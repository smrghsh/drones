import * as THREE from "three";
import { Experience } from "brahma-xr";
import Track from "./Track.js";
import FlightPath from "./FlightPath.js";
import VideoPath from "./VideoPath.js";
import FlightModel from "./FlightModel.js";

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
 * (terrain drape) and `metrics` (labels/units for sensor channels).
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
    /** @type {FlightPath|null} null for model-only records (a building scan with no trajectory) */
    this.path = null;
    if (this.track.length > 0) {
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
    }

    /** @type {FlightModel|null} */
    this.model = null;
    if (record.mesh || record.recon || record.splat) {
      this.model = new FlightModel(this);
      this.add(this.model);
    }
  }

  /** Build a Flight from an already-parsed record. */
  static from(record, ctx) {
    return new Flight(record, ctx);
  }

  /** Fetch a flight record (any importer's JSON) and build the Flight. */
  static async load(url, ctx) {
    const record = await fetch(url).then((r) => {
      if (!r.ok) throw new Error(`${url}: ${r.status}`);
      return r.json();
    });
    return Flight.from(record, ctx);
  }

  /** Show/hide the whole flight (path, model, in-scene menu, gui folder). */
  setVisible(v) {
    this.visible = v;
    this.path?.setActive(v, this.path.emphasis);
    this.model?.setVisible(v);
    if (this.folder) (v ? this.folder.show() : this.folder.hide());
  }

  /** Emphasis < 1 draws the path subdued and not hoverable (see FlightPath). */
  setEmphasis(e) {
    this.path?.setActive(this.visible, e);
  }

  /** Drape this flight's orthomosaic on the terrain (when the record has one). */
  setOrthoOnTerrain(v) {
    this.orthoOnTerrain = v;
    this.experience.world?.refreshOrthos();
    this.model?.menu?.refresh();
    this.refreshGui();
  }

  /** World-space bounding box (trajectory, or the model for path-less scans), for camera focusing. */
  bounds() {
    return this.path ? this.path.bounds() : this.model?.bounds() ?? new THREE.Box3().setFromObject(this);
  }

  /**
   * Build this flight's options folder under `parent` (lil-gui). The folder
   * follows the flight's visibility; World only owns the checkbox.
   */
  addGui(parent) {
    const record = this.record, path = this.path;
    const s = (this.guiState = {
      focus: () => this.experience.world?.focus(this),
      lineWidth: path?.linewidth ?? 3,
      samples: true,
      colorBy: "none",
      representation: this.model?.representation ?? "none",
      orthoTerrain: this.orthoOnTerrain,
      playAll: false,
      swath: true,
    });
    const f = (this.folder = parent.addFolder(record.name));
    f.close();
    f.add(s, "focus").name("Focus camera");
    if (path) f.add(s, "lineWidth", 1, 8, 0.5).name("Line width").onChange((w) => path.setLineWidth(w));
    if (path?.samples) f.add(s, "samples").name("Sample markers").onChange((v) => path.setConesVisible(v));
    if (path && record.kind !== "video") {
      // the video line's colours are owned by segment highlighting
      const channels = { "Path colour": "none", Altitude: "alt" };
      for (const [k, m] of Object.entries(record.metrics ?? {})) channels[m.label || k] = k;
      f.add(s, "colorBy", channels).name("Colour by").onChange((k) => path.colorBy(k));
    }
    if (this.model) {
      const opts = {};
      if (record.mesh) opts["Coverage mesh (Skydio)"] = "coverage";
      if (record.recon) opts["Photogrammetry mesh"] = "recon";
      if (record.splat) opts["Gaussian splat"] = "splat";
      opts["Terrain only"] = "none";
      f.add(s, "representation", opts).name("3D model").onChange((k) => this.model.setRepresentation(k));
      this.addPlacementGui(f);
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

  /**
   * "Placement" sub-folder: nudge a georeferenced asset (recon / splat) in
   * ENU metres + yaw, live, and print the resulting spec so it can be pasted
   * back into the flight JSON. Handy for fitting externally produced scans
   * (a building OBJ in UTM) against the lidar terrain and orthos.
   */
  addPlacementGui(parent) {
    const keys = ["recon", "splat"].filter((k) => this.record[k]);
    if (!keys.length) return;
    const spec = this.record[keys[0]];
    const o = spec.offset_m ?? [0, 0, 0];
    const p = (this.placementState = { east: o[0], north: o[1], up: o[2], yaw: spec.yaw_deg ?? 0, scale: spec.scale ?? 1 });
    const f = parent.addFolder("Placement (" + keys.join(" + ") + ")");
    f.close();
    const apply = () => {
      for (const k of keys) this.model.setPlacement(k, { offset_m: [p.east, p.north, p.up], yaw_deg: p.yaw, scale: p.scale });
    };
    f.add(p, "east", -50, 50, 0.05).name("East (m)").onChange(apply);
    f.add(p, "north", -50, 50, 0.05).name("North (m)").onChange(apply);
    f.add(p, "up", -30, 30, 0.05).name("Up (m)").onChange(apply);
    f.add(p, "yaw", -180, 180, 0.1).name("Yaw ccw (\u00b0)").onChange(apply);
    f.add(p, "scale", 0.5, 2, 0.001).name("Scale").onChange(apply);
    f.add({ print: () => {
      const out = {};
      for (const k of keys) out[k] = { origin: this.record[k].origin, offset_m: [p.east, p.north, p.up], yaw_deg: p.yaw, ...(p.scale !== 1 ? { scale: p.scale } : {}) };
      const text = JSON.stringify(out, null, 2);
      console.log(`placement for ${this.record.id} (paste into static/flights/${this.record.id}.json):\n${text}`);
      navigator.clipboard?.writeText(text).catch(() => {});
    } }, "print").name("Copy placement JSON");
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
