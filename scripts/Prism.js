import * as THREE from 'three';
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

export default class Prism {

      prism;
      #unit;


      #orientation = true;
      #alterationKey;

      #posX = new THREE.Vector3(1,0,0);
      #posZ = new THREE.Vector3(0,0,1);
      
      #negX = new THREE.Vector3(-1,0,0);
      #negZ = new THREE.Vector3(0,0,-1);

      #radians = Math.PI / 2;

      constructor(unit, startPosition) {

            this.#unit = unit;

            var geometry = new THREE.BoxGeometry(unit, unit * 2, unit);
            var material = new THREE.MeshLambertMaterial({
                  color: 0x7E2D00,
                  side: THREE.DoubleSide,
                });
            this.prism = new THREE.Mesh(geometry, material);

            this.prism.position.x = startPosition[0] + unit / 2;
            this.prism.position.z = startPosition[1] + unit / 2;
            this.prism.position.y = unit;
      }
      
      performRotation(axis) {
            var vector;
            if(axis === '+x') {
                  vector = this.#posX
            }
            if(axis === '-x') {
                  vector = this.#negX
            }
            if(axis === '+z') {
                  vector = this.#posZ
            }
            if(axis === '-z') {
                  vector = this.#negZ
            }
            this.prism.rotateOnWorldAxis(vector, this.#radians);
      }

      performTranslation(key, [x, y, z]) {
            if(this.#orientation) {
                  this.#orientation = false;
                  this.#alterationKey = key;
                  y = -1;
            } else if(this.#alterationKey === key) {
                  this.#orientation = true;
                  y = 1;
            } else {
                  x = (x === 0) ? 0 : (x === -1 ? -2/3 : 2/3);
                  y = 0;
                  z = (z === 0) ? 0 : (z === -1 ? -2/3 : 2/3);
            }
            console.log(x,y,z);
            console.log(this.#unit * x * 3 / 2, this.#unit * y / 2, this.#unit * z * 3 / 2)
            this.prism.position.x += this.#unit * x * 3 / 2;
            this.prism.position.y += this.#unit * y / 2;
            this.prism.position.z += this.#unit * z * 3 / 2;
      }
}

