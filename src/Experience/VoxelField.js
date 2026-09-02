import * as THREE from "three";
import { METERS_PER_UNIT } from "./domain.js";
import { turbo, metricRange } from "./colormap.js";

/**
 * A voxel field along a flight: the track's samples are binned into a 3D grid
 * of `size_m` cubes (axis-aligned in the site's tangent plane), each cell
 * averaging every Track channel that has readings inside it. The cubes draw as
 * one InstancedMesh coloured by a channel through the shared turbo colour map,
 * so a sensor log reads as a volume of colour around the trajectory rather
 * than a thin line.
 *
 * Enable it per flight with an optional `voxels` entry on the flight record
 * (or on its static/…/flights/index.json entry):
 *
 *   "voxels": { "size_m": 12, "channel": "gas_ohm", "opacity": 0.6 }
 *
 * `channel` is the Track channel shown by default (it also becomes the flight's
 * initial "Colour by"); `size_m` the cell edge in metres; `opacity` the cube
 * alpha. Cells with no reading of the shown channel draw in the "missing" grey
 * the path uses, so gaps in a sensor (the pod's CO₂ only updates every few
 * seconds) stay honest instead of averaging in zeros.
 */
export default class VoxelField extends THREE.Group {
  /**
   * @param {object} opts
   * @param {object} opts.flight the flight record (metrics give the legend labels)
   * @param {import("./Track.js").default} opts.track trajectory + channels
   * @param {THREE.ColorRepresentation} opts.color flat colour when no channel is shown
   * @param {number} [opts.size_m=10] cell edge, metres
   * @param {string|null} [opts.channel=null] channel to colour by initially
   * @param {number} [opts.opacity=0.6]
   * @param {number} [opts.gap=0.1] fraction of the cell left empty around each cube (0 = touching)
   */
  constructor({ flight, track, color, size_m = 10, channel = null, opacity = 0.6, gap = 0.1 }) {
    super();
    this.flight = flight;
    this.track = track;
    this.color = new THREE.Color(color);
    this.opacity = opacity;
    this.gap = gap;
    this.colorKey = null;
    this.name = flight.id + "-voxels";
    this.mesh = null;
    /** @type {{ix:number, iy:number, iz:number, n:number, sums:Object<string,number>, counts:Object<string,number>}[]} */
    this.cells = [];
    this.build(size_m);
    this.colorBy(channel);
  }

  /** (Re)bin the track into `size_m` cells and rebuild the instanced cubes. */
  build(size_m) {
    this.sizeM = size_m;
    const s = (this.size = size_m / METERS_PER_UNIT);
    const P = this.track.positions(), n = this.track.length;
    const keys = ["alt", ...this.track.channelKeys()];
    const columns = keys.map((k) => this.track.channel(k));
    const byKey = new Map();
    for (let i = 0; i < n; i++) {
      const ix = Math.floor(P[i * 3] / s), iy = Math.floor(P[i * 3 + 1] / s), iz = Math.floor(P[i * 3 + 2] / s);
      const key = `${ix},${iy},${iz}`;
      let cell = byKey.get(key);
      if (!cell) byKey.set(key, (cell = { ix, iy, iz, n: 0, sums: {}, counts: {} }));
      cell.n++;
      keys.forEach((k, c) => {
        const v = columns[c][i];
        if (!Number.isFinite(v)) return;
        cell.sums[k] = (cell.sums[k] ?? 0) + v;
        cell.counts[k] = (cell.counts[k] ?? 0) + 1;
      });
    }
    this.cells = [...byKey.values()];

    if (this.mesh) {
      this.remove(this.mesh);
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
    }
    const edge = s * (1 - this.gap);
    const geometry = new THREE.BoxGeometry(edge, edge, edge);
    const material = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: this.opacity,
      depthWrite: false, // let the path and neighbouring cubes show through
    });
    const mesh = new THREE.InstancedMesh(geometry, material, this.cells.length);
    const m = new THREE.Matrix4();
    this.cells.forEach((c, i) => {
      m.makeTranslation((c.ix + 0.5) * s, (c.iy + 0.5) * s, (c.iz + 0.5) * s);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, this.color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.renderOrder = 1; // under the fat line (2)
    mesh.raycast = () => {}; // the path keeps the hover; cubes never block it
    this.mesh = mesh;
    this.add(mesh);
  }

  /** Mean of `key` in cell i, or NaN when nothing inside it reported that channel. */
  cellMean(i, key) {
    const c = this.cells[i];
    return c.counts[key] ? c.sums[key] / c.counts[key] : NaN;
  }

  /**
   * Colour the cubes by a channel's per-cell mean. The range is the same
   * robust percentile range the FlightPath uses for its samples, so cube and
   * line colours agree and share one legend. null/"none" = flat path colour.
   * @returns {{lo:number, hi:number}|null} the range used
   */
  colorBy(key) {
    this.colorKey = !key || key === "none" ? null : key;
    const mesh = this.mesh;
    if (!mesh) return null;
    let range = null;
    if (!this.colorKey) {
      for (let i = 0; i < this.cells.length; i++) mesh.setColorAt(i, this.color);
    } else {
      const vals = this.track.channel(this.colorKey);
      if (!vals) return null;
      range = metricRange(vals);
      const { lo, hi } = range;
      const missing = new THREE.Color(0x3a4150), c = new THREE.Color();
      for (let i = 0; i < this.cells.length; i++) {
        const v = this.cellMean(i, this.colorKey);
        mesh.setColorAt(i, Number.isFinite(v) ? turbo((v - lo) / (hi - lo), c) : missing);
      }
    }
    mesh.instanceColor.needsUpdate = true;
    return range;
  }

  /** Change the cell size (metres) and recolour. */
  setSize(size_m) {
    if (size_m === this.sizeM) return;
    this.build(size_m);
    this.colorBy(this.colorKey);
  }

  setOpacity(o) {
    this.opacity = o;
    if (this.mesh) this.mesh.material.opacity = o;
  }

  dispose() {
    if (!this.mesh) return;
    this.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.mesh = null;
  }
}
