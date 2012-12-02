/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Player() {
  this.isLeft = true;
  this.forward = 0;
  this.reverse = 0;
  this.x = 200;
  this.y = 200;
  this.rot = 0;
  this.speed = 0;
}

Player.prototype.draw = function(context) {
  this.update()
   // alert("left------------");
  ctx.fillStyle="#00FFFF";
  context.fillRect(this.x, this.y, 16, 32);
};

Player.prototype.moveLeft = function() {
  this.rot -= 3;

};

Player.prototype.moveRight = function() {
  this.rot +=  3;
 };

Player.prototype.moveUp = function() {
  this.speed += 5;
};

Player.prototype.moveDown = function() {
  this.speed -= 5;
};

Player.prototype.shoot = function() {
	// body...
	var bullet = new projectile(this.x, this.y,
    this.xspeed, this.yspeed, this.rot);
	return bullet;
};
Player.prototype.update = function(){
     /*if(this.isLeft == true){
      if(this.x > 130){
       this.x -= 1;
      }
     }else{
      if(this.x < 900-60)
      this.x += 1;
     }*/
	this.x = this.xspeed * Math.cos(this.rot*Math.PI/180);
	this.y = this.yspeed * Math.sin(this.rot*Math.PI/180);
 };