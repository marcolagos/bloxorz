import * as THREE from "three";

export default class Pivot {
      
      pivot;
      leftChild;
      rightChild;
      aboveChild;
      belowChild;

      constructor(name) {
            this.pivot = new THREE.Object3D();
            this.pivot.name = name;
      }

      setChild(pivot, position) {
            if(position === 'left') {
                  this.leftChild = pivot;
            } else if (position === 'right') {
                  this.rightChild = pivot;
            } else if (position === 'above') {
                  this.aboveChild = pivot;
            } else if (position === 'below') {
                  this.belowChild = pivot;
            } else {
                  console.log("Child position is invalid")
            }
      }
}