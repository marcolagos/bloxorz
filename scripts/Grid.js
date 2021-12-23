import Prism from "./Prism";
import Plate from "./Plate";

export default class Grid {

      #scene;
      #level;
      #gridLength;
      #gridWidth;

      #startPosition;
      #start;

      #endPosition;
      #end;

      #block;
      #width = 5;
      #height = 10;
      #depth = 5;

      #keysDown = {};


      constructor(scene, level) {

            this.#scene = scene;

            this.#level = level;
            this.#gridWidth = this.#level.length;
            this.#gridLength = this.#level[0].length;

            for(var i = 0; i < this.#gridWidth; i++) {
                  for(var j = 0; j < this.#gridLength; j++) {
                        if(this.#level[i][j] === 1) {
                              this.#startPosition = [i * this.#width, j * this.#depth];
                              this.#start = [i,j];
                        }
                        if(this.#level[i][j] === -1) {
                              this.#endPosition = [i * this.#width, j * this.#depth];
                              this.#end = [i,j];
                        }
                  }
            }
            this.placePlates();
            this.placeBlock();

      }

      placeBlock() {
            this.#block = new Prism(this.#width, this.#height, this.#depth, this.#startPosition);
            this.#scene.add(this.#block.prism);
      }

      placePlates() {
            var plate, position;
            for(var i = 0; i < this.#gridWidth; i++) {
                  for(var j = 0; j < this.#gridLength; j++) {
                        if(this.#level[i][j] !== null){
                              position = [i * this.#width, j * this.#depth];
                              plate = new Plate(this.#width, this.#height / 10, this.#depth, position, this.#level[i][j]);
                              this.#scene.add(plate.prism);                              
                        }
                  }
            }
      }

      move(key) {
            if(this.#keysDown['Alt']) {
                  if(this.#keysDown['x']){
                        this.#block.performRotation('-x');
                  }
                  if(this.#keysDown['y']){
                        this.#block.performRotation('-y');
                  }
                  if(this.#keysDown['z']){
                        this.#block.performRotation('-z');
                  }
            } else {
                  if(this.#keysDown['x']){
                        this.#block.performRotation('+x');
                  }
                  if(this.#keysDown['y']){
                        this.#block.performRotation('+y');
                  }
                  if(this.#keysDown['z']){
                        this.#block.performRotation('+z');
                  }
            }
      }

      keyDown(key) {
            this.#keysDown[key] = true;
      }

      keyUp(key) {
            this.#keysDown[key] = false;
      }
}