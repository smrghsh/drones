import * as THREE from "three";
import { Experience } from "brahma-xr";

export default class Sky {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // likely FIRST find cool skyboxes/skyspheres/HDR, etc. files and place in static
         // editing the sources file to import them
        // construct THREE Meshes of some sort for each of these
        //use debug-ui to have a dropdown toggle of these THREE Meshes' visibility
    }
}