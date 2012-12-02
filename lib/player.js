/**
 * @constructor
 * @param {Map} map
 * @param {Socket} socket
 * @param {User} user
 */
var Player = module.exports = function Player(map, socket, user) {
  this.map = map;
  this.socket = socket;
  this.user = user;
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
  this.socket.broadcast('update', this.socket.id, position);
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
  this.socket.emit('spawn', this.socket.id, position);
  this.socket.broadcast('spawn', this.socket.id, position);
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
  this.socket.broadcast('shoot', this.socket.id, this.position.x,
    this.position.y, this.position.xspeed, this.position.yspeed, angle);
};


/**
 * Score.
 *
 * @param {String} id
 */
Player.prototype.kill = function(id) {
  var enemy = this.map.players[id];
  if (enemy) {
    this.destroyed = true;
    this.socket.broadcast('kill', enemy.socket.id);

    // The player gains experience.
    this.user.kills++;
    this.user.xp += enemy.kills + 1;

    // Respawn player in a bit.
    setTimeout(this.spawn.bind(this), 5000);
  }
};
