import * as THREE from "three";

// Scene-scale contract. A site is a 1200 m square baked into a local tangent
// plane (see tools/prep_farm.py): x = east, z = -north, y = up.
export const METERS_PER_UNIT = 40; // 1200 m -> 30 units: a room-scale landscape; a 30 m scan is ~0.75 units
export const MODEL_Y = 0.75; // table height, so it sits nicely in VR

export const settings = {
  verticalExaggeration: 1.0,
};

// The current site: its site.json (centre, extent, elevation range) plus the
// `id`/`dir` of the static/sites.json entry it was loaded from. Every
// projection below is relative to it, so it is swapped wholesale by
// World.loadSite() and everything geo is rebuilt.
let site = null;
export function setSite(s) {
  site = s;
}
export function getSite() {
  return site;
}
/** URL of a file inside the current site's directory (`./farm/height.png`). */
export function siteUrl(file) {
  return `${(site?.dir ?? "./farm").replace(/\/$/, "")}/${file}`;
}

const R = 6378137;
const D2R = Math.PI / 180;

/** lat/lon/alt (m MSL) -> local metres { e, n, up } relative to site centre. */
export function toLocalMetres(lat, lon, altMsl = 0) {
  const e = (lon - site.lon) * D2R * R * Math.cos(site.lat * D2R);
  const n = (lat - site.lat) * D2R * R;
  return { e, n, up: altMsl - site.z_center };
}

/** Local metres -> scene units (in the model group's frame). */
// Note: vertical exaggeration is NOT baked in here — World.model.scale.y applies it
// to everything (terrain, paths, meshes) uniformly.
export function metresToScene(e, n, up, target = new THREE.Vector3()) {
  return target.set(e / METERS_PER_UNIT, up / METERS_PER_UNIT, -n / METERS_PER_UNIT);
}

export function project(lat, lon, altMsl, target) {
  const { e, n, up } = toLocalMetres(lat, lon, altMsl);
  return metresToScene(e, n, up, target);
}

/** Inverse of toLocalMetres: local metres -> { lat, lon }. */
export function fromLocalMetres(e, n) {
  return {
    lat: site.lat + n / (R * D2R),
    lon: site.lon + e / (R * D2R * Math.cos(site.lat * D2R)),
  };
}

/** Scene position (model frame) -> local metres { e, n, up }. */
export function sceneToMetres(p) {
  return {
    e: p.x * METERS_PER_UNIT,
    n: -p.z * METERS_PER_UNIT,
    up: p.y * METERS_PER_UNIT,
  };
}
