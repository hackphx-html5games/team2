/**
 * @constructor
 * @param {Map} map
 * @param {Socket} socket
 */
var Player = module.exports = function Player(map, socket) {
  this.map = map;
  this.socket = socket;
  this.destroyed = false;
  this.spawn();
};


/**
 * @param {Object}
 *   {Number} x
 *   {Number} y
 *   {Number} xspeed
 *   {Number} yspeed
 *   {Number} angle
 */
Player.prototype.update = function(position) {
  if (this.destroyed) return;
  this.position = position;
  this.socket.broadcast('updatePosition', {
    id: this.socket.id,
    position: position
  });
};


/**
 * Spawn a player onto the map.
 */
Player.prototype.spawn = function() {
  var position = this.position = {
    x: Math.floor(Math.random() * this.width),
    y: Math.floor(Math.random() * this.height),
    xspeed: 0,
    yspeed: 0,
    angle: Math.floor(Math.random() * 360)
  };
  this.socket.emit('spawn', {
    id: this.socket.id,
    position: position
  });
  this.socket.broadcast('spawn', {
    id: this.socket.id,
    position: position
  });
};


/**
 * Player is destroyed by someone else.
 *
 * @param {Player} enemy Who is responsbile.
 */
Player.prototype.destroy = function(enemy) {
  this.destroyed = true;
  this.socket.broadcast('destroy', this.socket.id);
  enemy.kills++;

  // Respawn player in a bit.
  setTimeout(this.spawn.bind(this), 5000);
};


/**
 * Player disconnects.
 */
Player.prototype.disconnect = function() {
  this.socket.broadcast('disconnect', this.socket.id);
  delete this.map.players[this.socket.id];
};


/**
 * Player shoots a bullet.
 *
 * @param {Number} angle
 */
Player.prototype.shoot = function(angle) {
  this.socket.broadcast('shoot', {
    id: this.socket.id,
    xspeed: this.position.xspeed,
    yspeed: this.position.yspeed,
    angle: angle
  });
};


/**
 * Score.
 *
 * @param {String} id
 */
Player.prototype.kill = function(id) {
  var player = this.map.players[id];
  if (player) {
    player.destroy(this);
  }
};
