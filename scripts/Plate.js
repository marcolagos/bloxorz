import * as THREE from 'three';
import { BoxGeometry } from "three";

export default class Plate {

      prism;

      constructor(width, height, depth, position, type) {
            
            var geometry = new BoxGeometry(width, height, depth);
            geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( width / 2, height / 2, depth / 2 ) );
            
            var loader = new THREE.TextureLoader();
            var material = new THREE.MeshBasicMaterial({
                  color: 0xFFFFFF,
                  map: loader.load('../assets/concrete.jpg'),
                  side: THREE.DoubleSide,
                  wireframe: false,
            });

            if(type === -1) {
                  material.wireframe = true;
            }

            this.prism = new THREE.Mesh(geometry, material);

            this.prism.position.x = position[0];
            this.prism.position.y -= height;
            this.prism.position.z = position[1];
      }
}