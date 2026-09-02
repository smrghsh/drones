import * as THREE from "three";
import { project } from "./domain.js";

/**
 * Columnar store for a flight trajectory. Positions live in typed arrays
 * (Float64 lat/lon — Float32 only resolves ~1 m at these latitudes — and a
 * packed Float32 scene-space cache); every numeric field found in the source
 * records becomes a Float32 channel (heading, gimbal_pitch, co2, …) with NaN
 * for missing values. The original records are kept as-is for UI panels.
 *
 * This is the "dump data in" point of the flight API: any array of objects
 * with lat/lon/alt-ish keys becomes a Track.
 *
 *   const track = Track.from(rows);                       // lat/lon/alt_msl
 *   const track = Track.from(rows, { alt: "elevation" }); // custom keys
 */
export default class Track {
  /**
   * @param {object} cols
   * @param {Float64Array} cols.lat  degrees
   * @param {Float64Array} cols.lon  degrees
   * @param {Float32Array} cols.alt  metres MSL
   * @param {Object<string, Float32Array>} [cols.channels] extra per-point data
   * @param {object[]} [cols.records] source records, for panels/tooltips
   */
  constructor({ lat, lon, alt, channels = {}, records = [] }) {
    this.lat = lat;
    this.lon = lon;
    this.alt = alt;
    this.channels = channels;
    this.records = records;
    this._positions = null;
  }

  /**
   * Build a Track from an array of plain records (Skydio samples, a video
   * track, an air-quality log, a CSV parse…). Every other numeric field is
   * captured automatically as a channel.
   *
   * @param {object[]} records one object per point
   * @param {object} [keys]
   * @param {string} [keys.lat="lat"] field holding latitude (deg)
   * @param {string} [keys.lon="lon"] field holding longitude (deg)
   * @param {string} [keys.alt="alt_msl"] field holding altitude (m MSL)
   * @param {string[]} [keys.exclude] numeric fields to skip
   * @returns {Track}
   */
  static from(records, { lat = "lat", lon = "lon", alt = "alt_msl", exclude = [] } = {}) {
    const n = records.length;
    const la = new Float64Array(n), lo = new Float64Array(n), al = new Float32Array(n);
    const skip = new Set([lat, lon, alt, ...exclude]);
    const channels = {};
    records.forEach((r, i) => {
      la[i] = r[lat];
      lo[i] = r[lon];
      al[i] = r[alt] ?? 0;
      for (const k in r) {
        if (skip.has(k) || typeof r[k] !== "number") continue;
        (channels[k] ??= new Float32Array(n).fill(NaN))[i] = r[k];
      }
    });
    return new Track({ lat: la, lon: lo, alt: al, channels, records });
  }

  /** Number of points. */
  get length() {
    return this.lat.length;
  }

  /** Packed scene-space positions [x0,y0,z0, x1,…] (model frame, cached). */
  positions() {
    if (!this._positions) {
      const n = this.length, out = new Float32Array(n * 3), v = new THREE.Vector3();
      for (let i = 0; i < n; i++) {
        project(this.lat[i], this.lon[i], this.alt[i], v);
        out[i * 3] = v.x; out[i * 3 + 1] = v.y; out[i * 3 + 2] = v.z;
      }
      this._positions = out;
    }
    return this._positions;
  }

  /** Scene-space position of point i. */
  position(i, target = new THREE.Vector3()) {
    const p = this.positions();
    return target.set(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]);
  }

  /**
   * Per-point values for a channel; `"alt"` returns the altitude column.
   * @returns {Float32Array|null} NaN marks a missing reading
   */
  channel(key) {
    if (key === "alt") return this.alt;
    return this.channels[key] ?? null;
  }

  /** Names of the extra data channels this track carries. */
  channelKeys() {
    return Object.keys(this.channels);
  }

  /** Source record for point i (for panels). */
  record(i) {
    return this.records[i];
  }
}
