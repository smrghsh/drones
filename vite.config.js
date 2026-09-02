import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// The brahma ecosystem convention: app code in src/, assets in static/,
// GitHub-Pages-ready build in docs/. HTTPS is on because WebXR requires a
// secure context — accept the self-signed certificate warning in dev.
// NO_SSL=1 npm run dev serves plain http (handy for desktop/automation);
// headsets need the default https.
const ssl = !process.env.NO_SSL;

export default defineConfig({
  root: "src/",
  publicDir: "../static/",
  base: "./",
  plugins: ssl ? [basicSsl()] : [],
  resolve: { dedupe: ["three"] }, // brahma-xr and the app must share one three
  // Serve brahma-xr from source instead of Vite's pre-bundled cache: the cache
  // is keyed on the lockfile, so it kept serving the unpatched copy after
  // patch-package fixed node_modules (the "toHexString" Loading hang).
  optimizeDeps: { exclude: ["brahma-xr"] },
  server: {
    host: true, // reachable from headsets on your LAN
    https: ssl,
  },
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    sourcemap: false, // 4 MB of maps in docs/ nobody fetches; flip on locally when debugging a build
  },
});
