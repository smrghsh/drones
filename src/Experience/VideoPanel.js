import * as THREE from "three";
import SamplePanel from "./SamplePanel.js";

const W = 1024, H = 512;

/**
 * SamplePanel variant for video flights: the image well plays the hovered
 * 10-second clip (a small <video> pool, muted so autoplay is allowed),
 * with a progress bar, and drives the path's drone marker in sync.
 */
export default class VideoPanel extends SamplePanel {
  constructor() {
    super();
    this.videos = new Map(); // chunk url -> <video>
    this.path = null;
    this.k = -1;
    this.playing = null;
  }

  video(url) {
    if (!this.videos.has(url)) {
      const v = document.createElement("video");
      v.src = url; v.muted = true; v.playsInline = true; v.preload = "auto"; v.crossOrigin = "anonymous";
      v.addEventListener("ended", () => { if (this.playing === v && !this.path?.onClipEnded(this.k)) { v.currentTime = 0; v.play(); } });
      this.videos.set(url, v);
      if (this.videos.size > 12) { // evict the oldest
        const [oldUrl, old] = this.videos.entries().next().value;
        if (old !== this.playing) { old.pause(); old.removeAttribute("src"); old.load(); this.videos.delete(oldUrl); }
      }
    }
    return this.videos.get(url);
  }

  /** Play segment k of a VideoPath at a world anchor point. */
  showVideo(path, k, worldPoint, scale = 0.25) {
    const chunk = path.flight.chunks[k];
    if (this.playing && this.playing !== this.videos.get(chunk.file)) this.playing.pause();
    this.path = path; this.k = k; this.flight = path.flight; this.current = chunk;
    this.baseScale = scale;
    this.scale.set(scale, scale / (this.parent?.scale.y ?? 1), scale);
    this.parent?.worldToLocal(this.position.copy(worldPoint));
    const v = this.video(chunk.file);
    v.currentTime = 0;
    v.play().catch(() => {});
    this.playing = v;
    // warm the neighbours
    for (const j of [k + 1, k - 1]) if (path.flight.chunks[j]) this.video(path.flight.chunks[j].file);
    this.image(chunk.poster);
    this.visible = true;
    this.draw();
  }

  hide() {
    if (this.pinned) return;
    this.visible = false;
    this.playing?.pause();
    this.playing = null;
    this.path = null; this.k = -1; this.current = null;
  }

  setPinned(p) {
    this.pinned = p;
    if (this.visible) this.draw();
  }

  draw() {
    const c = this.ctx, f = this.flight, chunk = this.current, path = this.path;
    if (!f || !chunk || !path) return;
    const v = this.playing;
    const tIn = v ? v.currentTime : 0;
    const t = Math.min(chunk.t0 + tIn, chunk.t1);
    const rec = path.recordAt(t);
    c.clearRect(0, 0, W, H);
    c.fillStyle = "rgba(14,18,28,0.92)";
    roundRect(c, 0, 0, W, H, 28); c.fill();
    c.strokeStyle = this.pinned ? "#ffd166" : "#" + path.color.getHexString(); c.lineWidth = 6; roundRect(c, 3, 3, W - 6, H - 6, 26); c.stroke();

    c.fillStyle = "#" + path.color.getHexString(); c.font = "bold 30px system-ui, sans-serif";
    c.fillText(f.name, 36, 56);
    c.fillStyle = "#c9d1e0"; c.font = "24px system-ui, sans-serif";
    c.fillText(`${f.drone} · ${f.camera}`, 36, 92);

    const utc = new Date((f.start_utc + t) * 1000);
    const clock = utc.toISOString().slice(11, 19) + " UTC";
    const local = utc.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const fields = [
      ["Segment", `${chunk.i + 1} / ${f.chunks.length}   (${fmtT(chunk.t0)} – ${fmtT(chunk.t1)})`],
      ["Clock", `${clock}  ·  ${local} local`],
      ["Video time", `${fmtT(t)}  of ${fmtT(f.duration_s)}`],
      ["Lat / Lon", `${rec.lat.toFixed(6)}, ${rec.lon.toFixed(6)}`],
      ["Altitude", `${rec.alt_msl.toFixed(1)} m MSL`],
      ["Camera", `heading ${rec.heading}°   pitch ${rec.pitch}°`],
      ["Pose from", rec.extrap ? "extrapolated (outside photo window)" : `scan photo ${rec.photo}`],
    ];
    let y = 130;
    for (const [k, val] of fields) {
      c.fillStyle = "#7f8aa3"; c.font = "18px system-ui, sans-serif"; c.fillText(k.toUpperCase(), 36, y);
      c.fillStyle = "#f2f5fa"; c.font = "24px system-ui, sans-serif"; c.fillText(String(val), 36, y + 24);
      y += 44;
    }

    // Video well (16:9)
    const ix = 560, iy = 110, iw = 428, ih = 241;
    c.fillStyle = "#000"; roundRect(c, ix, iy, iw, ih, 12); c.fill();
    c.save(); roundRect(c, ix, iy, iw, ih, 12); c.clip();
    if (v && v.readyState >= 2) c.drawImage(v, ix, iy, iw, ih);
    else {
      const poster = this.image(chunk.poster); // 5x2 contact strip: draw its first tile
      if (poster.complete && poster.naturalWidth) c.drawImage(poster, 0, 0, poster.naturalWidth / 5, poster.naturalHeight / 2, ix, iy, iw, ih);
      c.fillStyle = "#556"; c.font = "22px system-ui"; c.fillText("loading clip…", ix + 140, iy + ih / 2);
    }
    c.restore();
    // progress bar
    const frac = chunk.t1 > chunk.t0 ? (t - chunk.t0) / (chunk.t1 - chunk.t0) : 0;
    c.fillStyle = "rgba(255,255,255,0.15)"; c.fillRect(ix, iy + ih + 12, iw, 8);
    c.fillStyle = "#" + path.color.getHexString(); c.fillRect(ix, iy + ih + 12, iw * frac, 8);
    // poster strip as a mini timeline of the clip
    const poster = this.image(chunk.poster);
    if (poster.complete && poster.naturalWidth) {
      const sh = 62, sw = iw;
      c.save(); roundRect(c, ix, iy + ih + 32, sw, sh * 2 + 4, 8); c.clip();
      c.drawImage(poster, 0, 0, poster.naturalWidth, poster.naturalHeight / 2, ix, iy + ih + 32, sw, sh);
      c.drawImage(poster, 0, poster.naturalHeight / 2, poster.naturalWidth, poster.naturalHeight / 2, ix, iy + ih + 36 + sh, sw, sh);
      c.restore();
    }
    c.fillStyle = "#7f8aa3"; c.font = "20px system-ui";
    c.fillText(`${f.source}  ·  clip ${String(chunk.i).padStart(3, "0")}.mp4`, 36, H - 52);
    c.fillStyle = this.pinned ? "#ffd166" : "#7f8aa3";
    c.fillText(this.pinned ? (path.playAll ? "PINNED · playing whole flight — click to release" : "PINNED — click to release") : "click / trigger to pin", 36, H - 24);
    this.texture.needsUpdate = true;
  }

  update() {
    super.update();
    if (!this.visible || !this.playing || !this.path) return;
    this.path.onPlayback(this.k, this.playing.currentTime);
    this.draw();
  }
}

function fmtT(s) {
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
