import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { RGB_ETC1_Format } from "three";


var scene, renderer, camera, controls;
scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
);
camera.position.set(30,30,30);

controls = new OrbitControls(camera, renderer.domElement);

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 0.15);
lights[1] = new THREE.PointLight(0xffffff, 0.3);
lights[2] = new THREE.PointLight(0xffffff, 0.45);
lights[3] = new THREE.AmbientLight(0xffffff, 0.5);

lights[0].position.set(-40, 0, 0);
lights[1].position.set(40, 0, 0);
lights[2].position.set(0, 0, 40);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);
scene.add(lights[3]);

var axes = new THREE.AxesHelper(100);
scene.add(axes);

var prism;
var unit = 5;
var geometry = new THREE.BoxGeometry(unit, unit * 2, unit);
var material = new THREE.MeshLambertMaterial({
      color: 0x7E2D00,
      side: THREE.DoubleSide,
      wireframe: false,
      });
prism = new THREE.Mesh(geometry, material);
scene.add(prism);

var ground;
var unit = 5;
var geometry = new THREE.BoxGeometry(unit * 10, unit * 2, unit * 10);
var material = new THREE.MeshLambertMaterial({
      color: 0xc9c9c9,
      side: THREE.DoubleSide,
      wireframe: false,
      });
ground = new THREE.Mesh(geometry, material);
ground.position.y -= 2 * unit;
scene.add(ground);


var left = new TWEEN.Tween(prism.position).to({z: -10}, 1000);
var down = new TWEEN.Tween(prism.position).to({x: 10}, 1000);
var right = new TWEEN.Tween(prism.position).to({z: 10}, 1000);
var up = new TWEEN.Tween(prism.position).to({x: -10}, 1000);

left.chain(down);
down.chain(right);
right.chain(up);
up.chain(left);



left.onUpdate(() => {
      
})

function rotate() {
      window.addEventListener('keydown', () => {
            left.start()
      })
}

function resize() {
      window.addEventListener('resize', () => {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
      });
}

resize();



function animate() {
      requestAnimationFrame(animate);
      controls.update();
      TWEEN.update()
      renderer.render(scene, camera);
}

rotate();
animate();