/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var image_player = new Image();


function Player() {
  this.isLeft = true;
  this.x = 300;
  this.y = 100;
  this.rot = 0;
  image_player.src = './images/ship.png';
}

Player.prototype.draw = function(context) {
  this.update()
   // alert("left------------");
   ctx.drawImage(image_player, this.x, this.y);
  //ctx.fillStyle="#00FFFF";
  //context.fillRect(this.x, this.y, 32, 32);
};

Player.prototype.moveLeft = function() {
  this.isLeft = true;

};

Player.prototype.moveRight = function() {
  this.isLeft =  false;
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
Player.prototype.update = function(){
     if(this.isLeft == true){
      if(this.x > 130){
       this.x -= 1;
      }
     }else{
      if(this.x < 900-60)
      this.x += 1;
     }
 };