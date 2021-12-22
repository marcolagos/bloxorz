import * as THREE from "three";
import { SphereGeometry } from "three";


export default class Pivot {
      
      pivotShape;
      leftChild = null;
      rightChild = null;
      aboveChild = null;
      belowChild = null;
      position;

      constructor(position) {
            this.position = position;

            var geometry = new THREE.SphereGeometry(1);
            var material = new THREE.MeshPhongMaterial({
                  color: 0xFFFFFF,
                  emissive: 0x072534,
                  side: THREE.DoubleSide,
                  flatShading: true,
                });

            this.pivotShape = new THREE.Mesh(geometry, material);
            this.pivotShape.position.x = position[0];
            this.pivotShape.position.z = position[1];
      }

      setChild(pivot, position) {
            if(position === 'left') {
                  this.leftChild = pivot;
            } else if (position === 'right') {
                  this.rightChild = pivot;
            } else if (position === 'below') {
                  this.belowChild = pivot;
            } else if (position === 'above') {
                  this.aboveChild = pivot;
            }
      }
}