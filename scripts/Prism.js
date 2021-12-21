import * as THREE from 'three';
import { BoxGeometry } from "three";

/**
 * Block class that renders a single block
 */
export default class Prism {

      prism;
      orientation; // true: standing, false: laying

      constructor(width, height, depth, startPosition) {
            var geometry = new BoxGeometry(width, height, depth);
            geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( width / 2, height / 2, depth / 2 ) );
            var material = new THREE.MeshPhongMaterial({
                  color: 0x39ff14,
                  emissive: 0x072534,
                  side: THREE.DoubleSide,
                  flatShading: true,
                });
            this.prism = new THREE.Mesh(geometry, material);

            this.prism.position.x = startPosition[0];
            this.prism.position.z = startPosition[1];

            this.orientation = true; 
      }

      moveLeft() {

      }

      moveRight() {

      }

      moveDown() {

      }

      moveUp() {
            
      }


}

