/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ctx;
var imageObj = new Image();
function Game() {
}

Game.prototype.start = function(ctx) {
  // alert("load");
  Game.player = new Player();
  this.ctx = ctx;
  imageObj.src = './images/wall.png';
  //this.startLoop();
};

Game.prototype.startLoop =  function(){
    
    ctx.fillStyle='#0000FF';
    console.log('loop', ctx.width);
    ctx.fillRect(0,0,1000,600);

    ctx.drawImage(imageObj, 69, 50);
    Game.player.draw(ctx);
       // alert("loop");
       // ctx.fillStyle="#00FFFF";
       // ctx.fillRect(Game.player.x,Game.player.y,10,10);
};
Game.prototype.draw = function() {
  //Game.player.draw(Game.context);
};
