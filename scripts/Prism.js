import * as THREE from 'three';
import { BoxGeometry } from "three";

/**
 * Block class that renders a single block
 */
export default class Prism {

      prism;
      #width;
      #height;
      #depth;
      #rotationAxes;
      #transitionAxes;
      #orientation;

      constructor(width, height, depth, startPosition) {

            this.#width = width;
            this.#height = height;
            this.#depth = depth;

            var geometry = new BoxGeometry(width, height, depth);
            var material = new THREE.MeshPhongMaterial({
                  color: 0x39ff14,
                  emissive: 0x072534,
                  side: THREE.DoubleSide,
                  flatShading: true,
                });
            this.prism = new THREE.Mesh(geometry, material);

            this.prism.position.x = startPosition[0] + width / 2;
            this.prism.position.z = startPosition[1] + depth / 2;
            this.prism.position.y = height / 2;

            this.#rotationAxes = {
                  ArrowUp: '+z',
                  ArrowDown: '-z',
                  ArrowRight: '+x',
                  ArrowLeft: '-x',
            };

            this.#transitionAxes = {
                  ArrowUp: [1, -1, 0],
                  ArrowDown: [-1, -1, 0],
                  ArrowRight: [0, -1, 1],
                  ArrowLeft: [0, -1, -1],
            }

            this.#orientation = true;
      }

      

      moveLeft() {
            this.performRotation(this.#rotationAxes.ArrowLeft);
            this.performTransition(this.#transitionAxes.ArrowLeft);
      }

      moveRight() {
            
      }

      moveDown() {
            
      }

      moveUp() {
            
      }

      performRotation(axis) {
            if(axis === '+x') {
                  this.prism.rotation.x += Math.PI / 2;
            }
            if(axis === '-x') {
                  this.prism.rotation.x -= Math.PI / 2;
            }
            if(axis === '+y') {
                  this.prism.rotation.y += Math.PI / 2;
            }
            if(axis === '-y') {
                  this.prism.rotation.y -= Math.PI / 2;
            }
            if(axis === '+z') {
                  this.prism.rotation.z += Math.PI / 2;
            }
            if(axis === '-z') {
                  this.prism.rotation.z -= Math.PI / 2;
                  
            }
      }

      performTransition([posX, posY, posZ]) {
            this.prism.position.x += posX * (this.#width / 2 +  + this.#height / 2);
            this.prism.position.y += posY * this.#depth / 2;
            this.prism.position.z += posZ * (this.#width / 2 +  + this.#height / 2);
      }


}

