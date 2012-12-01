/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ctx;
var imageObj = new Image();
function Game() {
    fps = 60;
}

Game.prototype.start = function(ctx) {
  // alert("load");
  Game.player = new Player();
  this.ctx = ctx;
  imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
  //this.startLoop();
};

Game.prototype.startLoop =  function(){
    
    ctx.fillStyle="#0000FF";
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