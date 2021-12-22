import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;
camera.position.y = 15;

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

var controls = new OrbitControls(camera, renderer.domElement);
var axes = new THREE.AxesHelper(50);
scene.add(axes);

var geometry = new THREE.BoxGeometry(5, 10, 5);
geometry.applyMatrix4(
  new THREE.Matrix4().makeTranslation(5 / 2, 10 / 2, 5 / 2)
);
var material = new THREE.MeshPhongMaterial({
  color: 0x39ff14,
  emissive: 0x072534,
  side: THREE.DoubleSide,
  flatShading: true,
});

var prism = new THREE.Mesh(geometry, material);
scene.add(prism);



function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
      pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;
  
      if(pointIsWorld){
          obj.parent.localToWorld(obj.position); // compensate for world coordinate
      }
  
      obj.position.sub(point); // remove the offset
      obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
      obj.position.add(point); // re-add the offset
  
      if(pointIsWorld){
          obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
      }
}
  
var point = new THREE.Vector3(5,5,5);
var axis = new THREE.Vector3(1,2,5);
axis.normalize();

      
function move() {
      window.addEventListener("keydown", (event) => {
            
            rotateAboutPoint(prism, point, axis, Math.PI / 10, true);
      });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
move();
