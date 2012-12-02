
var ctx;

var image_wall = new Image();
var image_bg = new Image();
var projectiles = new Array();
 function Game() {

  fps = 60;

  this.wall1_x = 100-30;
  this.wall2_x = 900-30;

 }
 
 Game.prototype.start = function(ctx) {
    // alert("load");
 Game.player = new Player();
 Game.player = new Player(this.wall1_x, this.wall2_x);
 this.ctx = ctx;

  image_wall.src = './images/wall.png';
  image_bg.src = './images/bg.png';
  //this.startLoop();
 };
 
Game.prototype.startLoop =  function(){

ctx.drawImage(image_bg, 0, 0);
 
  ctx.drawImage(image_wall, 100, 0);
  ctx.drawImage(image_wall, 100, 350);
  ctx.drawImage(image_wall, 900-30, 0);
  ctx.drawImage(image_wall, 900-30, 350);
  Game.updateProjectiles();
  for(var i = 0; 0 < projectiles.length; i++) {
    projectiles[i].update();
      if (projectiles[i].duration < projectiles[i].maxDuration) {
        delete projectiles[i];
      }
    }
  }
 Game.player.draw(ctx);
       // alert("loop");
        // ctx.fillStyle="#00FFFF";
       // ctx.fillRect(Game.player.x,Game.player.y,10,10);

  };
  Game.prototype.draw = function() {
   //Game.player.draw(Game.context);
}

