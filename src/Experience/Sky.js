import * as THREE from "three";
import { Experience } from "brahma-xr";

/**
 * Skysphere: an equirect texture on a big back-facing sphere, plus a small
 * copy of the same panorama as scene.environment for the few lit materials
 * (voxel cubes, avatars). Textures come from sources.js; a sky named
 * `<name>SkyTexture` may bring a `<name>SkyEnvironment` sibling, otherwise
 * the sky texture itself is used for the environment.
 */
export default class Sky {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources; 
        this.debug = this.experience.debug; 
        
        this.skies = {};
        this.currentSky = 'daytime';

        // Create the physical mesh
        this.geometry = new THREE.SphereGeometry(500, 60, 40); // Large enough to enclose the scene
        this.material = new THREE.MeshBasicMaterial({ side: THREE.BackSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        // Resources may not be loaded yet — try now (no-op if missing) and
        // again once everything in sources.js has finished loading.
        this.setSkies();
        this.resources.on("ready", () => this.setSkies());
    }

    setSkies() {
        const items = this.resources.items;
        for (const name of ["daytime", "nighttime", "sunset"]) {
            const map = items[name + "SkyTexture"];
            if (!map) continue;
            const env = items[name + "SkyEnvironment"] ?? map;
            for (const t of [map, env]) {
                t.colorSpace = THREE.SRGBColorSpace;
                t.mapping = THREE.EquirectangularReflectionMapping;
            }
            this.skies[name] = { map, env };
        }
        if (!this.skies[this.currentSky]) return; // not loaded yet, bail quietly

        this.updateSky();
        this.setDebug(); // build debug UI only once we know which skies exist
    }

    updateSky() {
        const sky = this.skies[this.currentSky];
        if (!sky) return;
        
        this.material.map = sky.map;
        this.material.needsUpdate = true;
        this.scene.environment = sky.env; 
    }

    setDebug() {
        if (!this.debug.active || this.debugFolder) return; // guard against building it twice

        this.debugFolder = this.debug.ui.addFolder('Skysphere');
        
        this.debugFolder.add(this, 'currentSky', Object.keys(this.skies))
            .name('Environment')
            .onChange(() => {
                this.updateSky();
            });
    }
}
