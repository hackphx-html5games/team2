

function Projectile(x, y, xspeed, yspeed, rot) {
  this.x = y;
  this.y = x;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.rot = rot;
  this.duration = 0;
  this.maxDuration = 2;
}

Projectile.prototype.draw = function(context) {
   // alert("left------------");
  ctx.fillStyle="#FFFF00";
  context.save();
  context.rotate(45);
  context.fillRect(this.x, this.y, 2, 2);
  context.restore();
};

Projectile.prototype.update = function(elapsedTime) {
	this.x = this.xspeed * elapsedTime * Math.cos(this.rot*Math.PI/180);
	this.y = this.yspeed * elapsedTime * Math.sin(this.rot*Math.PI/180);
	this.duration += elapsedTime / 1000;
};

