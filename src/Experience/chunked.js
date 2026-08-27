/**
 * Fetch an asset that may have been split into <5 MB parts by
 * tools/chunk_assets.py (GitHub-friendly, no LFS). If `<url>.parts.json`
 * exists the parts are fetched in parallel and concatenated; otherwise the
 * plain file is fetched. Resolves to an ArrayBuffer.
 */
export async function fetchChunked(url, onProgress) {
  const manifest = await fetch(url + ".parts.json").then((r) => (r.ok ? r.json() : null)).catch(() => null);
  if (!manifest) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.arrayBuffer();
  }
  let done = 0;
  const parts = await Promise.all(
    Array.from({ length: manifest.parts }, (_, i) =>
      fetch(`${url}.part${String(i).padStart(2, "0")}`).then(async (r) => {
        if (!r.ok) throw new Error(`${url} part ${i}: ${r.status}`);
        const b = await r.arrayBuffer();
        onProgress?.(++done / manifest.parts);
        return b;
      }),
    ),
  );
  const out = new Uint8Array(manifest.size);
  let off = 0;
  for (const p of parts) { out.set(new Uint8Array(p), off); off += p.byteLength; }
  return out.buffer;
}
