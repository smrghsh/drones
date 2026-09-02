// Declare your assets here — they preload before "ready" fires, then live
// in experience.resources.items keyed by name. Put the files in static/.
//
// Types: gltfModel | glbModel | texture | cubeTexture | font | exr
//        | simulationData (fetches raw text — CSV, JSON, whatever)
//
// The sky is an 8-bit sRGB equirect (from the Poly Haven EXR via
// `oiiotool sky.exr --colorconvert linear sRGB -d uint8 -o sky.jpg`): the
// renderer has no tone mapping, so the HDR range was clipped anyway, and a
// 300 KB JPEG decodes in the browser's image pipeline instead of 70 MB of
// PIZ-compressed EXR inflating on the main thread. The 1K copy feeds
// scene.environment (PMREM from a 4K texture is wasted on Lambert cubes).
export default [
  // { name: "goggleModel", type: "glbModel", path: "./goggle.glb" }, // avatars wear these if present
  //{ name: "starTexture", type: "texture", path: "./textures/star.png" },
  { name: "daytimeSkyTexture", type: "texture", path: "./skies/qwantani_moon_noon_puresky_4k.jpg" },
  { name: "daytimeSkyEnvironment", type: "texture", path: "./skies/qwantani_moon_noon_puresky_1k.jpg" },
];
