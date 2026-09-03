import * as THREE from "three";
import { Experience } from "brahma-xr";

export default class Sky {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources; 
        this.debug = this.experience.debug; 
        
        this.skies = {};
        this.currentSky = 'daytime';

        // Create the physical mesh
        this.geometry = new THREE.SphereGeometry(3000, 60, 40); // encloses the 1200 m site even at the 1 m : 1 m preset (camera far = 5000)
        this.material = new THREE.MeshBasicMaterial({ 
            side: THREE.BackSide, 
            colorSpace: THREE.SRGBColorSpace 
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        // Resources may not be loaded yet — try now (no-op if missing) and
        // again once everything in sources.js has finished loading.
        this.setSkies();
        this.resources.on("ready", () => this.setSkies());
    }

    setSkies() {

        console.log('daytimeSkyTexture:', this.resources.items.daytimeSkyTexture);

        if (!this.resources.items.daytimeSkyTexture) return; // not loaded yet, bail quietly

        this.skies.daytime = this.resources.items.daytimeSkyTexture;
        if (this.resources.items.nighttimeSkyTexture) this.skies.nighttime = this.resources.items.nighttimeSkyTexture;
        if (this.resources.items.sunsetSkyTexture) this.skies.sunset = this.resources.items.sunsetSkyTexture;

        this.updateSky();
        this.setDebug(); // build debug UI only once we know which skies exist
    }

    updateSky() {
        const activeTexture = this.skies[this.currentSky];
        if (!activeTexture) return;
        
        this.material.map = activeTexture;
        this.material.needsUpdate = true;
        
        activeTexture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.environment = activeTexture; 
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