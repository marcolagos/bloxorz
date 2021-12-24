import Bloxorz from "./Bloxorz";


const level = {
      one: [
            [0,0,0,null,null,null],
            [0,1,0,0,null,null],
            [0,0,0,0,null,null],
            [null,0,0,0,null,null],
            [null,0,0,0,null,null],
            [null,0,0,0,0,null],
            [null,null,0,0,0,0],
            [null,null,0,0,-1,0],
            [null,null,0,0,0,0],
            [null,null,null,0,0,null]
      ],
      two: [
            [null,0,0,0,0,0],
            [null,0,0,0,1,0],
            [null,0,2,0,0,0],
            [null,0,0,0,0,0],
            [null,null,null,null,'2', null],
            [null,null,null,null,'2', null],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,3,0,0,0,0],
            [0,0,0,0,0,0],
            [null,null,null,null,'2', null],
            [null,null,null,null,'2', null],
            [0,0,0,0,0,null],
            [0,0,0,0,0,null],
            [0,-1,0,0,0,null],
            [0,0,0,0,0,null],
      ],
      three: [
            [null,0,0,0,0,null],
            [null,0,0,1,0,null],
            [null,0,0,0,0,null],
            [null,0,0,0,0,null],
            [null,null,0,null,null,null],
            [null,null,0,null,null,null],
            [0,0,0,null,null,null],
            [0,0,0,null,null,null],
            [0,0,0,null,null,null],
            [0,null,null,null,null,null],
            [0,null,null,null,null,null],
            [0,0,0,0,0,null],
            [0,0,0,0,0,0],
            [null,null,0,-1,0,0],
            [null,null,0,0,0,0],
      ],
      four: [

      ]
      };
var bloxorz = new Bloxorz();
bloxorz.renderLevel(level.two);

function animate() {
      requestAnimationFrame(animate);
      bloxorz.updatePhysics();
      // bloxorz.controls.update();
      bloxorz.renderer.render(bloxorz.scene, bloxorz.camera);
}

bloxorz.resize();
bloxorz.move();
animate();


