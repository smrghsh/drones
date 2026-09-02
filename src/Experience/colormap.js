import * as THREE from "three";

// Google's "turbo" colour map (polynomial fit, Mikhailov 2019): perceptually
// ordered, high contrast on a dark scene — good for sensor magnitudes.
const R4 = [0.13572138, 4.6153926, -42.66032258, 132.13108234], R2 = [-152.94239396, 59.28637943];
const G4 = [0.09140261, 2.19418839, 4.84296658, -14.18503333], G2 = [4.27729857, 2.82956604];
const B4 = [0.1066733, 12.64194608, -60.58204836, 110.36276771], B2 = [-89.90310912, 27.34824973];
function poly(x, a, b) { return a[0] + x * (a[1] + x * (a[2] + x * a[3])) + x ** 4 * (b[0] + x * b[1]); }

/** t in [0,1] -> THREE.Color (turbo). */
export function turbo(t, target = new THREE.Color()) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return target.setRGB(
    THREE.MathUtils.clamp(poly(x, R4, R2), 0, 1),
    THREE.MathUtils.clamp(poly(x, G4, G2), 0, 1),
    THREE.MathUtils.clamp(poly(x, B4, B2), 0, 1),
  );
}

/** Robust colour range for a metric: 2nd..98th percentile of its valid readings. */
export function metricRange(values) {
  const v = values.filter((x) => x != null && Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return { lo: 0, hi: 1 };
  const q = (p) => v[Math.min(v.length - 1, Math.floor(p * (v.length - 1)))];
  const lo = q(0.02), hi = q(0.98);
  return hi > lo ? { lo, hi } : { lo: v[0], hi: v[v.length - 1] + (v[0] === v[v.length - 1] ? 1 : 0) };
}

export function formatMetric(key, v, unit = "") {
  if (v == null || !Number.isFinite(v)) return "—";
  if (key === "gas_ohm") return `${(v / 1000).toFixed(v >= 100000 ? 0 : 1)} kΩ`;
  const digits = Math.abs(v) >= 100 ? 0 : 1;
  return `${v.toFixed(digits)}${unit ? " " + unit : ""}`;
}

// ---- HTML legend (bottom-right colour bar) --------------------------------
let legend = null;
function ensureLegend() {
  if (legend) return legend;
  const el = document.createElement("div");
  el.id = "legend";
  el.innerHTML = `<div class="title"></div><canvas width="256" height="14"></canvas><div class="ticks"><span class="lo"></span><span class="hi"></span></div>`;
  document.body.appendChild(el);
  const ctx = el.querySelector("canvas").getContext("2d");
  const c = new THREE.Color();
  for (let x = 0; x < 256; x++) { turbo(x / 255, c); ctx.fillStyle = c.getStyle(); ctx.fillRect(x, 0, 1, 14); }
  legend = { el, title: el.querySelector(".title"), lo: el.querySelector(".lo"), hi: el.querySelector(".hi") };
  return legend;
}
export function showLegend({ key, label, unit, lo, hi }) {
  const l = ensureLegend();
  l.title.textContent = label + (unit ? ` (${unit})` : "");
  l.lo.textContent = formatMetric(key, lo, unit);
  l.hi.textContent = formatMetric(key, hi, unit);
  l.el.style.display = "block";
}
export function hideLegend() { if (legend) legend.el.style.display = "none"; }
