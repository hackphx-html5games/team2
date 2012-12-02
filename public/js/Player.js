/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var image_ship = new Image();


function Player() {
  this.isLeft = true;
  this.forward = 0;
  this.reverse = 0;
  this.x = 300;
  this.y = 300;
  this.rot = 0;
  this.speed = 0;
  this.radius = 0;
  image_ship.src = './images/ship.png';
}

Player.prototype.draw = function(context) {
   // alert("left------------");
  //ctx.fillStyle="#00FFFF";
  //context.fillRect(this.x, this.y, 16, 32);
  ctx.save();
  //ctx.translate(-image_ship.width/2, -image_ship.height/2);
  ctx.translate(this.x + image_ship.width/2, this.y + image_ship.height/2);
  ctx.rotate(this.rot);
 // ctx.translate(image_ship.width, image_ship.height)
  ctx.drawImage(image_ship, -image_ship.width/2, -image_ship.height/2);
  ctx.restore();
};

Player.prototype.moveLeft = function() {
  this.rot -= 1;

};

Player.prototype.moveRight = function() {
  this.rot +=  1;
 };

Player.prototype.moveUp = function() {
  this.radius += 5;
};

Player.prototype.moveDown = function() {
  this.radius -= 5;
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
	this.x = this.radius * Math.cos(this.rot*Math.PI/180);
	this.y = this.radius * Math.sin(this.rot*Math.PI/180);
 };