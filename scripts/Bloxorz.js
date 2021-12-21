import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import Prism from "./Prism";

class Bloxorz {

      camera;
      controls;
      scene;
      renderer;
      lights;

      constructor() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(
                  75,
                  window.innerWidth / window.innerHeight,
                  0.1,
                  1000
            );
            this.camera.position.z = 30;
            this.camera.position.y = 15;


            this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);

            this.controls = new OrbitControls(this.camera, this.renderer.domElement);

            
            this.#addLights();
            this.#addAxes(50);
            this.#addGrid(50);
            
      }

      #addLights() {
            this.lights = [];
            this.lights[0] = new THREE.PointLight(0xffffff, 1, 0);
            this.lights[1] = new THREE.PointLight(0xffffff, 1, 0);
            this.lights[2] = new THREE.PointLight(0xffffff, 1, 0);

            this.lights[0].position.set(0, 200, 0);
            this.lights[1].position.set(100, 200, 100);
            this.lights[2].position.set(-100, -200, -100);

            this.scene.add(this.lights[0]);
            this.scene.add(this.lights[1]);
            this.scene.add(this.lights[2]);
      }

      #addAxes(lengthOfAxes) {
            var axesHelper = new THREE.AxesHelper(lengthOfAxes);
            this.scene.add(axesHelper);
      }

      #addGrid(gridSize) {
            var gridHelper = new THREE.GridHelper(gridSize);
            this.scene.add(gridHelper);
      }

      addShape(shape) {
            this.scene.add(shape);
      }

}

var prism = new Prism(5, 10, 5);
var bloxorz = new Bloxorz();
bloxorz.addShape(prism.prism);

function animate() {
      requestAnimationFrame(animate);
      bloxorz.controls.update();
      bloxorz.renderer.render(bloxorz.scene, bloxorz.camera);
}

animate();


