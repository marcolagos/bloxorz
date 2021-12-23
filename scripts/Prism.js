import * as THREE from 'three';
import { BoxGeometry } from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

export default class Prism {

      prism;

      #width;
      #height;
      #depth;

      X = new THREE.Vector3(1,0,0);
      Y = new THREE.Vector3(0,1,0);
      Z = new THREE.Vector3(0,0,1);
      
      Xo = new THREE.Vector3(-1,0,0);
      Yo = new THREE.Vector3(0,-1,0);
      Zo = new THREE.Vector3(0,0,-1);

      radians = Math.PI / 2;

      constructor(width, height, depth, startPosition) {

            this.#width = width;
            this.#height = height;
            this.#depth = depth;

            var geometry = new BoxGeometry(width, height, depth);
            var material = new THREE.MeshLambertMaterial({
                  color: 0x7E2D00,
                  side: THREE.DoubleSide,
                });
            this.prism = new THREE.Mesh(geometry, material);

            this.prism.position.x = startPosition[0] + width / 2;
            this.prism.position.z = startPosition[1] + depth / 2;
            this.prism.position.y = height / 2;
      }
      
      performRotation(axis) {
            var vector;
            if(axis === '+x') {
                  vector = this.X;
            }
            if(axis === '-x') {
                  vector = this.Xo;
            }
            if(axis === '+y') {
                  vector = this.Y;
            }
            if(axis === '-y') {
                  vector = this.Yo;
            }
            if(axis === '+z') {
                  vector = this.Z;
            }
            if(axis === '-z') {
                  vector = this.Zo;
            }
      
            this.prism.rotateOnWorldAxis(vector, this.radians);
      }
}

