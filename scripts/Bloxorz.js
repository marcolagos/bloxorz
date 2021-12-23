import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Level from "./Level";

export default class Bloxorz {

      camera;
      scene;
      renderer;
      controls;

      #level;

      constructor() {
            this.#makeScene();
            // this.#addControls();
            // this.#addAxes();
            // this.#addGrid();
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
            this.camera.position.x = 25;
            this.camera.position.y = 25;
            this.camera.position.z = 50;
            this.camera.lookAt(new THREE.Vector3(25,0,20));

            var lights = [];
            lights[0] = new THREE.PointLight(0xffffff, 0.15);
            lights[1] = new THREE.PointLight(0xffffff, 0.3);
            lights[2] = new THREE.PointLight(0xffffff, 0.45);
            lights[3] = new THREE.AmbientLight(0xffffff, 0.5);

            lights[0].position.set(-40, 0, 0);
            lights[1].position.set(40, 0, 0);
            lights[2].position.set(0, 0, 40);

            this.scene.add(lights[0]);
            this.scene.add(lights[1]);
            this.scene.add(lights[2]);
            this.scene.add(lights[3]);
      }

      #addControls() {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      }

      #addAxes() {
            var axesHelper = new THREE.AxesHelper(200);
            this.scene.add(axesHelper);
      }

      #addGrid() {
            var gridHelper = new THREE.GridHelper(200, 100);
            this.scene.add(gridHelper);
      }

      renderLevel(level) {
            this.#level = new Level(this.scene, level);
      }

      move() {
            ['keydown','keyup'].forEach((event) => 
                  window.addEventListener(event, (press) => {
                        this.#level.move(press.key, press.type);
                  })
            );
      }
}