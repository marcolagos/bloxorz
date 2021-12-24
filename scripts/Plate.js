import * as THREE from 'three';
import * as CANNON from "cannon";

export default class Plate {

      prism;
      body;

      constructor(unit, position, type) {

            var plateWidth = unit * 2 / 15;

            var geometry = new THREE.BoxGeometry(unit, plateWidth, unit);
            geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( unit / 2, plateWidth / 2, unit / 2 ) );
            
            var material, loader;
            console.log(type);
            if(type === 0 || type === 1){
                  loader = new THREE.TextureLoader();
                  material = new THREE.MeshBasicMaterial({
                        color: 0xFFFFFF,
                        map: loader.load('../assets/concrete.jpg'),
                        side: THREE.DoubleSide,
                        wireframe: false,
                  });
            } else if(type === 'o') {
                  material = new THREE.MeshLambertMaterial({
                        color: 0x0000FF,
                        side: THREE.DoubleSide,
                        wireframe: false,
                  })
            } else if (type === 'x') {
                  material = new THREE.MeshLambertMaterial({
                        color: 0x00FF00,
                        side: THREE.DoubleSide,
                        wireframe: false,
                  })
            }
            
            this.prism = new THREE.Mesh(geometry, material);

            this.prism.position.x = position[0];
            this.prism.position.y = -plateWidth;
            this.prism.position.z = position[1];

            var shape = new CANNON.Box(new CANNON.Vec3(unit / 2, plateWidth / 2, unit / 2));
            var mass = 0;
            this.body = new CANNON.Body({ mass, shape });
            this.body.position.set(position[0] + unit / 2, -plateWidth, position[1] + unit / 2);
      }
}