import Prism from "./Prism";
import Plate from "./Plate";

export default class Level {

      #scene;
      #world;
      #level;

      #startPosition;
      #endPosition;

      #prism;
      #unit = 5;

      #keys = {};


      constructor(scene, world, level) {

            this.#scene = scene;
            this.#world = world;
            this.#level = level;

            var position, type, plate;
            for(var i = 0; i < this.#level.length; i++) {
                  for(var j = 0; j < this.#level[0].length; j++) {
                        if(this.#level[i][j] !== null){
                              position = [i * this.#unit, j * this.#unit];
                              type = this.#level[i][j]
                              plate = new Plate(this.#unit, position, type);
                              this.#scene.add(plate.prism);
                              this.#world.addBody(plate.body);
                              if(this.#level[i][j] === 1) {
                                    this.#startPosition = position;
                              }
                              if(this.#level[i][j] === -1) {
                                    this.#endPosition = position;
                              }                              
                        }
                  }
            }
            this.#prism = new Prism(this.#unit, this.#startPosition);
            this.#scene.add(this.#prism.prism);
            this.#world.addBody(this.#prism.body);
      }

      move(key, type) {
            if(type === 'keydown') {
                  this.#keys[key] = true;
            } else if (type === 'keyup') {
                  this.#keys[key] = false;
            }
            
            if(this.#keys['ArrowLeft']){
                  this.#prism.performRotation('+z');
                  this.#prism.performTranslation('x', [-1, null, 0]);
            }
            if(this.#keys['ArrowRight']){
                  this.#prism.performRotation('-z');
                  this.#prism.performTranslation('x', [1, null, 0]);
            }
            if(this.#keys['ArrowDown']){
                  this.#prism.performRotation('+x');
                  this.#prism.performTranslation('z', [0, null, 1]);
            }
            if(this.#keys['ArrowUp']){
                  this.#prism.performRotation('-x');
                  this.#prism.performTranslation('z', [0, null, -1]);
            }
      }

      updatePhysics() {
            // this.#prism.prism.position.set(this.#prism.body.position.x, this.#prism.body.position.y, this.#prism.body.position.z);
            this.#prism.prism.position.copy(this.#prism.body.position);
            this.#prism.prism.quaternion.copy(this.#prism.body.quaternion);
      }
}