var map = require('./map');


/**
 * Handles a brand new socket.io connection.
 *
 * @param {Socket} socket
 */
module.exports = function(socket) {
  var user = socket.handshake.user;
  console.log('socket connected');
  console.log(user);

  var player = map.addPlayer(socket, user);

  ['disconnect', 'shoot', 'update', 'kill'].forEach(function(event) {
    socket.on(event, player[event].bind(player));
  });
};
