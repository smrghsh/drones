/**
 * Fetch an asset that may have been split into <5 MB parts by
 * tools/chunk_assets.py (GitHub-friendly, no LFS). Resolves to an ArrayBuffer.
 *
 * `parts` is the part count from the flight record (`spec.parts`): 0 means
 * the plain file, N means `<url>.part00..` — either way no probing round
 * trip. When the record doesn't say, `<url>.parts.json` is tried first (a 404
 * falls back to the plain file).
 */
export async function fetchChunked(url, onProgress, parts) {
  if (parts == null) {
    const manifest = await fetch(url + ".parts.json").then((r) => (r.ok ? r.json() : null)).catch(() => null);
    parts = manifest?.parts ?? 0;
  }
  if (!parts) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.arrayBuffer();
  }
  let done = 0;
  const buffers = await Promise.all(
    Array.from({ length: parts }, (_, i) =>
      fetch(`${url}.part${String(i).padStart(2, "0")}`).then(async (r) => {
        if (!r.ok) throw new Error(`${url} part ${i}: ${r.status}`);
        const b = await r.arrayBuffer();
        onProgress?.(++done / parts);
        return b;
      }),
    ),
  );
  const out = new Uint8Array(buffers.reduce((n, b) => n + b.byteLength, 0));
  let off = 0;
  for (const b of buffers) { out.set(new Uint8Array(b), off); off += b.byteLength; }
  return out.buffer;
}
