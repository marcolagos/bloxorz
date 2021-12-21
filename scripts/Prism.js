import * as THREE from 'three';
import { BoxGeometry } from "three";

/**
 * Block class that renders a single block
 */
export default class Prism {

      height;
      width;
      depth;
      geometry;
      material;
      prism;

      constructor(height, width, depth) {
            this.height = height;
            this.width = width;
            this.depth = depth;
            this.geometry = new BoxGeometry(height, width, depth);
            this.material = new THREE.MeshPhongMaterial({
                  color: 0x39ff14,
                  emissive: 0x072534,
                  side: THREE.DoubleSide,
                  flatShading: true,
                });
            this.prism = new THREE.Mesh(this.geometry, this.material);
      }
}

