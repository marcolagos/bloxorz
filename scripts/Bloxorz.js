import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import Grid from "./Grid";

class Bloxorz {

      camera;
      scene;
      renderer;
      controls;

      #grid;

      constructor() {
            this.#makeScene();
            this.#addControls();
            this.#addAxes();
            this.#addGrid();
      }

      #makeScene() {
            this.scene = new THREE.Scene();

            this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);

            this.camera = new THREE.PerspectiveCamera(
                  75,
                  window.innerWidth / window.innerHeight,
                  0.1,
                  1000
            );
            this.camera.position.y = 50;
            this.camera.position.x = -20;

            var lights = [];
            lights[0] = new THREE.PointLight(0xffffff, 1, 0);
            lights[1] = new THREE.PointLight(0xffffff, 1, 0);
            lights[2] = new THREE.PointLight(0xffffff, 1, 0);

            lights[0].position.set(0, 200, 0);
            lights[1].position.set(100, 200, 100);
            lights[2].position.set(-100, -200, -100);

            this.scene.add(lights[0]);
            this.scene.add(lights[1]);
            this.scene.add(lights[2]);
      }

      #addControls() {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      }

      #addAxes() {
            var axesHelper = new THREE.AxesHelper(50);
            this.scene.add(axesHelper);
      }

      #addGrid() {
            var gridHelper = new THREE.GridHelper(50);
            this.scene.add(gridHelper);
      }

      renderLevel(level) {
            this.#grid = new Grid(this.scene, level);
      }

      move() {
            window.addEventListener('keydown', (event) => {
                  this.#grid.move(event.key);
            })
      }

}

const level = {
      one: [
            [null,null,null,null,null,null,0,0,0,null],
            [null,null,null,null,null,0,0,-1,0,0],
            [null,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,null],
            [0,1,0,0,0,0,null,null,null,null],
            [0,0,0,null,null,null,null,null,null,null]
            ],
      };
var bloxorz = new Bloxorz();
bloxorz.renderLevel(level.one);

function animate() {
      requestAnimationFrame(animate);
      bloxorz.controls.update();
      bloxorz.renderer.render(bloxorz.scene, bloxorz.camera);
}

bloxorz.move();
animate();


