import * as THREE from 'three';

export default class Plate {

      prism;

      constructor(unit, position, type) {
            
            var plateWidth = unit * 2 / 15

            var geometry = new THREE.BoxGeometry(unit, plateWidth, unit);
            geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( unit / 2, plateWidth / 2, unit / 2 ) );
            
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
            this.prism.position.y -= plateWidth;
            this.prism.position.z = position[1];
      }
}