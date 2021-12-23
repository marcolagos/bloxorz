import Prism from "./Prism";
import Plate from "./Plate";

export default class Level {

      #scene;
      #level;

      #startPosition;
      #endPosition;

      #prism;
      #unit = 5;

      #keys = {};


      constructor(scene, level) {

            this.#scene = scene;
            this.#level = level;

            var position, type, plate;
            for(var i = 0; i < this.#level.length; i++) {
                  for(var j = 0; j < this.#level[0].length; j++) {
                        if(this.#level[i][j] !== null){
                              position = [i * this.#unit, j * this.#unit];
                              type = this.#level[i][j]
                              plate = new Plate(this.#unit, position, type);
                              this.#scene.add(plate.prism);
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
}