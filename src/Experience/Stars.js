import * as THREE from "three";
import { Experience } from "brahma-xr";

// Distant starfield: a thin spherical shell of sprite points, far outside the
// farm (30 units across) but inside the camera far plane (1000). It gives the
// eye something to track for optical flow in VR without anything landing in
// the work area (issue #2).
const COUNT = 3000;
const MIN_DISTANCE = 300;
const MAX_DISTANCE = 400;

export default class Stars {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3).fill(1);

    for (let i = 0; i < COUNT * 3; i += 3) {
      const distance = MIN_DISTANCE + Math.random() * (MAX_DISTANCE - MIN_DISTANCE);
      const rot1 = Math.acos(2 * Math.random() - 1); // uniform on the sphere
      const rot2 = Math.random() * 2 * Math.PI;
      positions[i] = Math.sin(rot1) * Math.cos(rot2) * distance;
      positions[i + 1] = Math.sin(rot1) * Math.sin(rot2) * distance;
      positions[i + 2] = Math.cos(rot1) * distance;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 5,
      sizeAttenuation: true,
      color: "white",
      vertexColors: true,
      transparent: true,
      alphaTest: 0.001,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.particles.frustumCulled = false;
    this.scene.add(this.particles);

    // Assets preload after World is constructed; attach the sprite once they land.
    const applyTexture = () => {
      const texture = this.resources.items.starTexture;
      if (!texture) return;
      material.map = texture;
      material.alphaMap = texture;
      material.needsUpdate = true;
    };
    applyTexture();
    this.resources.on("ready", applyTexture);
  }

  update() {}
}
