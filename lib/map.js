var Player = require('./player');


/**
 * @constructor
 */
function Map() {
  this.width = 10000;
  this.height = 10000;
  this.players = {};
}


/**
 * @param {Socket} socket
 * @return {Player}
 */
Map.prototype.addPlayer = function(socket) {
  return this.players[socket.id] = new Player(this, socket);
};


// Export.
module.exports = new Map();
