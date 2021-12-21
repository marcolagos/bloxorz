import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { Prism } from "./Prism";

/*=================================================================================================================== */

var camera, scene, renderer, controls, lights, axesHelper, gridHelper;
/**
 * Initializes camera, scene, renderer, controls, light, helpers
 */
function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.setZ(30);
  camera.position.setY(15);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  controls = new OrbitControls(camera, renderer.domElement);

  lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
  lights[2] = new THREE.PointLight(0xffffff, 1, 0);

  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);

  this.scene.add(lights[0]);
  this.scene.add(lights[1]);
  this.scene.add(lights[2]);

  axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  gridHelper = new THREE.GridHelper(50);
  scene.add(gridHelper);
}

/*=================================================================================================================== */


var prism1 = new Prism(5, 10, 5);
 scene.add(prism1.getPrism());


/*=================================================================================================================== */

var pivot,
  pivotNames = [],
  rotate90;
/**
 * Creates Spherical Pivots for the Prism to rotate
 * @param {Number of X Pivots} XPivots
 * @param {Number of Y Pivots} YPivots
 */
function makePivots(XPivots, YPivots) {
  pivot = new THREE.Group();
  pivot.position.set(0, 0, 0);
  rotate90 = Math.PI / 2;
  for (var i = 0; i <= XPivots * prismWidth; i += prismWidth) {
    for (var j = 0; j <= YPivots * prismDepth; j += prismDepth) {
      var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      sphere.position.x = i;
      sphere.position.y = 0;
      sphere.position.z = j;
      sphere.name = "pivot(" + i + "," + j + ")";
      pivotNames.push(sphere.name);
      scene.add(sphere);
    }
  }
}

/*=================================================================================================================== */

function move() {
  window.addEventListener("keydown", (event) => {
    var key = event.key;
    var pivotSphere;
    if (key === "ArrowUp") {
      prism.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0));
      pivotSphere = scene.getObjectByName(
        "(" + prismCoordinates[0][0] + "," + prismCoordinates[0][1] + ")"
      );
      pivotSphere.material.color = new THREE.Color(0xff0000);
      pivotSphere.add(pivot);
      pivot.add(prism);
      pivot.rotation.x -= rotate90;
    }
    if (key === "ArrowLeft") {
      prism.geometry.applyMatrix4(
        new THREE.Matrix4().makeTranslation(0, 0, -prismDepth)
      );
      pivotSphere = scene.getObjectByName(
        "(" + prismCoordinates[2][0] + "," + prismCoordinates[2][1] + ")"
      );
      pivotSphere.material.color = new THREE.Color(0xff0000);
      pivotSphere.add(pivot);
      pivot.add(prism);
      pivot.rotation.z += rotate90;
    }
    if (key === "ArrowRight") {
      prism.geometry.applyMatrix4(
        new THREE.Matrix4().makeTranslation(-prismWidth, 0, 0)
      );
      pivotSphere = scene.getObjectByName(
        "(" + prismCoordinates[1][0] + "," + prismCoordinates[1][1] + ")"
      );
      pivotSphere.material.color = new THREE.Color(0xff0000);
      pivotSphere.add(pivot);
      pivot.add(prism);
      pivot.rotation.z -= rotate90;
    }
    if (key === "ArrowDown") {
      prism.geometry.applyMatrix4(
        new THREE.Matrix4().makeTranslation(-prismWidth, 0, -prismDepth)
      );
      pivotSphere = scene.getObjectByName(
        "(" + prismCoordinates[3][0] + "," + prismCoordinates[3][1] + ")"
      );
      pivotSphere.material.color = new THREE.Color(0xff0000);
      pivotSphere.add(pivot);
      pivot.add(prism);
      pivot.rotation.x += rotate90;
    }
    pivot = new THREE.Group();
  });
}

/*=================================================================================================================== */
// var plateNames = [];
// function makePlane(Xsize, Ysize, plateWidth) {
//       var count = 0;
//       for(var i = 0; i <= Xsize * prismWidth; i += prismWidth){
//             count += 1;
//             for(var j = 0; j <= Ysize * prismDepth; j += prismDepth){
//                   count += 1;
//                   var plateMaterial;
//                   if(count % 2 === 0) {
//                         plateMaterial = new THREE.MeshStandardMaterial({color: 0xa9a9a9, wireframe: false});
//                   } else {
//                         plateMaterial = new THREE.MeshStandardMaterial({color: 0x333333, wireframe: false})
//                   }
//                   var plate = new THREE.Mesh( new THREE.BoxGeometry(prismWidth, plateWidth, prismDepth), plateMaterial);
//                   plate.geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( prismWidth / 2, plateWidth / 2, prismDepth / 2 ) );
//                   plate.position.x = i;
//                   plate.position.y = -plateWidth;
//                   plate.position.z = j;
//                   plate.name = "plate(" + i + "," + j + ")";
//                   plateNames.push(plate.name);
//                   scene.add(plate);
//             }
//       }
// }
/*=================================================================================================================== */

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  TWEEN.update();
  renderer.render(scene, camera);
}

init();
createPrism();
makePivots(5, 5);
// makePlane(5,5,1)
animate();
move();
