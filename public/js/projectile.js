

function projectile(x, y, rot, speed) {
  this.x = y;
  this.y = x;
  this.rot = rot;
  this.speed = speed + 4;
  this.duration = 0;
  this.maxDuration = 2;
}

projectile.prototype.draw = function(context) {
   // alert("left------------");
  ctx.fillStyle="#FFFF00";
  context.save();
  context.rotate(45);
  context.fillRect(this.x, this.y, 2, 2);
  context.restore();
};

projectile.prototype.update(elapsedTime) {
	var radius = speed * elapsedTime;
	this.x = radius * Math.cos(rot);
	this.y = radius * Math.sin(rot);
	this.duration += elapsedTime / 1000;
}

