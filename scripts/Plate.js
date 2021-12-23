import * as THREE from 'three';
import * as CANNON from "cannon";

export default class Plate {

      prism;
      body;

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
            this.prism.position.y = -plateWidth;
            this.prism.position.z = position[1];

            var shape = new CANNON.Box(new CANNON.Vec3(unit / 2, plateWidth / 2, unit / 2));
            var mass = 0;
            this.body = new CANNON.Body({ mass, shape });
            this.body.position.set(position[0], -plateWidth, position[1]);
      }
}