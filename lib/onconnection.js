/**
 * Handles a brand new socket.io connection.
 *
 * @param {Socket} socket
 */
module.exports = function(socket) {
  var user = socket.handshake.user;
  console.log('socket connected');
  console.log(user);
};
