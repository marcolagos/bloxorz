import * as THREE from 'three';
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import * as CANNON from "cannon";


export default class Prism {

      prism;
      body;
      #unit;


      #orientation = true;
      #alterationKey;

      #posX = new THREE.Vector3(1,0,0);
      #posZ = new THREE.Vector3(0,0,1);
      
      #negX = new THREE.Vector3(-1,0,0);
      #negZ = new THREE.Vector3(0,0,-1);

      #radians = Math.PI / 2;
      #degrees = 90;

      constructor(unit, startPosition) {

            this.#unit = unit;

            var geometry = new THREE.BoxGeometry(unit, unit * 2, unit);
            var material = new THREE.MeshLambertMaterial({
                  color: 0x7E2D00,
                  side: THREE.DoubleSide,
                  wireframe: false,
                });
            this.prism = new THREE.Mesh(geometry, material);

            this.prism.position.x = startPosition[0] + unit / 2;
            this.prism.position.y = unit;
            this.prism.position.z = startPosition[1] + unit / 2;

            var shape = new CANNON.Box(new CANNON.Vec3(unit / 2, unit, unit / 2));
            var mass = 10;
            this.body = new CANNON.Body({ mass, shape });
            this.body.position.set(startPosition[0] + unit / 2, unit, startPosition[1] + unit / 2);
      }
      
      performRotation(axis) {
            var vector;
            var bodyRotation;
            if(axis === '+x') {
                  vector = this.#posX
                  bodyRotation = new CANNON.Quaternion();
                  bodyRotation.setFromAxisAngle(new CANNON.Vec3(1,0,0), this.#radians);
                  this.body.quaternion = bodyRotation.mult(this.body.quaternion);
            }
            if(axis === '-x') {
                  vector = this.#negX
                  bodyRotation = new CANNON.Quaternion();
                  bodyRotation.setFromAxisAngle(new CANNON.Vec3(-1,0,0), this.#radians);
                  this.body.quaternion = bodyRotation.mult(this.body.quaternion);
            }
            if(axis === '+z') {
                  vector = this.#posZ
                  bodyRotation = new CANNON.Quaternion();
                  bodyRotation.setFromAxisAngle(new CANNON.Vec3(0,0,1), this.#radians)
                  this.body.quaternion = bodyRotation.mult(this.body.quaternion);
            }
            if(axis === '-z') {
                  vector = this.#negZ
                  bodyRotation = new CANNON.Quaternion();
                  bodyRotation.setFromAxisAngle(new CANNON.Vec3(0,0,-1), this.#radians);
                  this.body.quaternion = bodyRotation.mult(this.body.quaternion);
            }
            // this.prism.rotateOnWorldAxis(vector, this.#radians);
            this.prism.rotateX(this.#radians);
            
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

            this.prism.position.x += this.#unit * x * 3 / 2;
            this.prism.position.y += this.#unit * y / 2;
            this.prism.position.z += this.#unit * z * 3 / 2;

            this.body.position.x += this.#unit * x * 3 / 2;
            this.body.position.y += this.#unit * y / 2;
            this.body.position.z += this.#unit * z * 3 / 2;
      }
}

