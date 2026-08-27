// src/my-skybox.js
import * as THREE from 'three';

console.log("🌌 Skybox injector active using direct imports...");

function injectSkybox() {
    const exp = window.experience;

    if (exp && exp.scene && exp.renderer) {
        console.log("✅ Core engine hooked! Injecting pristine Three.js starfield...");

        // 1. Build a tighter star field shell to guarantee it fits within any far clip limits
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 8000; 
        const starPositions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i += 3) {
            // Keep stars within a safe 300-unit distance sphere
            const radius = 250 + Math.random() * 50; 
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            
            starPositions[i]     = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i + 2] = radius * Math.cos(phi);
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2.0,
            transparent: true,
            opacity: 0.95,
            sizeAttenuation: false,
            depthTest: false,
            depthWrite: false
        });

        const starField = new THREE.Points(starGeometry, starMaterial);
        starField.renderOrder = 99999; // Ensure stars render on top of the background clear
        exp.scene.add(starField);

        // 2. Patch the render loop to bind star movements directly to the active viewing camera
        const originalRender = exp.renderer.render;
        exp.renderer.render = function (scene, camera) {
            // Force the theme space colors right before drawing pixels
            exp.renderer.setClearColor(0x050510, 1);
            scene.background = new THREE.Color(0x050510);

            // Turn down any rendering fog layers
            if (scene.fog) {
                if (scene.fog.isFogExp2) {
                    scene.fog.density = 0.00005;
                } else {
                    scene.fog.far = 50000;
                }
            }

            // Sync the star coordinates to the active camera position so they never get left behind
            if (camera) {
                starField.position.copy(camera.position);
            }

            originalRender.call(this, scene, camera);
        };

        return true; 
    }
    return false;
}

const injectorClock = setInterval(() => {
    if (injectSkybox()) clearInterval(injectorClock);
}, 300);
