/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Player() {
  this.x = 300;
  this.y = 100;
}

Player.prototype.draw = function(context) {
   // alert("left------------");
  ctx.fillStyle="#00FFFF";
  context.fillRect(this.x, this.y, 32, 32);
};

Player.prototype.moveLeft = function() {
 // alert("left------------");
  this.x -= 5;
};

Player.prototype.moveRight = function() {
  this.x +=5; 
 };

Player.prototype.moveUp = function() {
  this.y -= 5;
};

Player.prototype.moveDown = function() {
  this.y += 5;
};

Player.prototype.shoot = function() {
	// body...
	var bullet = new projectile(this.x, this.y,
    this.xspeed, this.yspeed, this.rot);
	return bullet;
};
