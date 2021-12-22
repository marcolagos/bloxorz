import * as THREE from 'three';
import Prism from "./Prism";
import Pivot from "./Pivot";
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

      block;
      #width = 5;
      #height = 10;
      #depth = 5;

      #pivots;

      constructor(scene, level) {

            this.#scene = scene;

            this.#level = level;
            this.#gridWidth = this.#level.length;
            this.#gridLength = this.#level[0].length;

            this.#pivots = [];
            for(var i = 0; i < this.#gridWidth; i++) {
                  this.#pivots.push([])
                  for(var j = 0; j < this.#gridLength; j++) {
                        this.#pivots[i].push(null);
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
            // this.placePivots();
            this.placePlates();
            this.placeBlock();

      }

      placeBlock() {
            this.block = new Prism(this.#width, this.#height, this.#depth, this.#startPosition);
            this.#scene.add(this.block.prism);
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
      
      placePivots() {
            var pivot, position;
            for(var i = 0; i < this.#gridWidth; i++) {
                  for(var j = 0; j < this.#gridLength; j++) {

                        if(this.#level[i][j] !== null){
                              pivot = new Pivot([i * this.#width, j * this.#depth]);
                              this.#pivots[i][j] = pivot;
                              this.#scene.add(pivot.pivotShape);                              
                        }
                  }
            }

            var pivot;
            for(var i = 0; i < this.#gridWidth; i++) {
                  for(var j = 0; j < this.#gridLength; j++) {
                        if(this.#level[i][j] !== null){
                              pivot = this.#pivots[i][j];
                              if(i === 0 && j === 0) {
                                    pivot.setChild(this.#pivots[i][j + 1], "right");
                                    pivot.setChild(this.#pivots[i + 1][j], "below");
                              }
                              else if(i === 0 && j === this.#gridLength - 1) {
                                    pivot.setChild(this.#pivots[i][j - 1], "left");
                                    pivot.setChild(this.#pivots[i + 1][j], "below");
                              }
                              else if(i === this.#gridWidth - 1 && j === 0) {
                                    pivot.setChild(this.#pivots[i][j + 1], "right");
                                    pivot.setChild(this.#pivots[i - 1][j], "above");
                              }
                              else if(i === this.#gridWidth - 1 && j === this.#gridLength - 1) {
                                    pivot.setChild(this.#pivots[i][j - 1], "left");
                                    pivot.setChild(this.#pivots[i - 1][j], "above");
                              }
                              else if (i === 0) {
                                    pivot.setChild(this.#pivots[i][j - 1], "left");
                                    pivot.setChild(this.#pivots[i][j + 1], "right");
                                    pivot.setChild(this.#pivots[i + 1][j], "below");
                              }
                              else if (j === 0) {
                                    pivot.setChild(this.#pivots[i][j + 1], "right");
                                    pivot.setChild(this.#pivots[i + 1][j], "below");
                                    pivot.setChild(this.#pivots[i - 1][j], "above");
                              }
                              else if (i === this.#gridWidth - 1) {
                                    pivot.setChild(this.#pivots[i][j - 1], "left");
                                    pivot.setChild(this.#pivots[i][j + 1], "right");
                                    pivot.setChild(this.#pivots[i - 1][j], "above");

                              }
                              else if (j === this.#gridLength - 1) {
                                    pivot.setChild(this.#pivots[i][j - 1], "left");
                                    pivot.setChild(this.#pivots[i + 1][j], "below");
                                    pivot.setChild(this.#pivots[i - 1][j], "above");
                              }
                              else {
                                    pivot.setChild(this.#pivots[i][j - 1], "left");
                                    pivot.setChild(this.#pivots[i][j + 1], "right");
                                    pivot.setChild(this.#pivots[i + 1][j], "below");
                                    pivot.setChild(this.#pivots[i - 1][j], "above");
                              }
                        }
                  }
            }

      }

      move(key) {
            if(key === "ArrowLeft"){
                  this.block.moveLeft();
            }
            if(key === "ArrowRight"){
                  this.block.moveRight();
            }
            if(key === "ArrowDown"){
                  this.block.moveDown();
            }
            if(key === "ArrowUp"){
                  this.block.moveUp();
            }
      }
}