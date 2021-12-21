import * as THREE from "three";
import { SphereGeometry } from "three";


export default class Pivot {
      
      pivotShape;
      leftChild = null;
      rightChild = null;
      aboveChild = null;
      belowChild = null;

      constructor(posX, posY) {

            var geometry = new THREE.SphereGeometry(1);
            var material = new THREE.MeshPhongMaterial({
                  color: 0xFFFFFF,
                  emissive: 0x072534,
                  side: THREE.DoubleSide,
                  flatShading: true,
                });
                
            this.pivotShape = new THREE.Mesh(geometry, material);
            this.pivotShape.position.x = posX;
            this.pivotShape.position.z = posY;
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
            } else {
                  console.log("Child position is invalid")
            }
      }
}