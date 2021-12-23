import Bloxorz from "./Bloxorz";

const level = {
      one: [
            [0,0,0,null,null,null],
            [0,1,0,0,null,null],
            [0,0,0,0,null,null],
            [null,0,0,0,null,null],
            [null,0,0,0,null,null],
            [null,null,0,0,0,null],
            [null,null,0,0,0,0],
            [null,null,0,0,-1,0],
            [null,null,0,0,0,0],
            [null,null,null,0,0,null]
      ]
      };
var bloxorz = new Bloxorz();
bloxorz.renderLevel(level.one);

function animate() {
      requestAnimationFrame(animate);
      // bloxorz.controls.update();
      bloxorz.renderer.render(bloxorz.scene, bloxorz.camera);
}

bloxorz.move();
animate();


