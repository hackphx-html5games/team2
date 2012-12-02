/*global io:false */
var socket = io.connect();

socket.on('connect', function() {
  console.log('woohoo!');
});


/**
 * Events from the server to the client.
 */
socket.on('update', function(userid, position) {
});


socket.on('spawn', function(userid, position) {
});


socket.on('disconnect', function(userid} {
});


socket.on('shoot', function(userid, x, y, xspeed, yspeed, angle) {
});


socket.on('kill', function(userid) {
});


/**
 * Events from the client, one player, to the server.
 */
function update(position) {
  socket.emit('update', position);
}


function shoot(angle) {
  socket.emit('shoot', angle);
}


function kill(userid) {
  socket.emit('kill', userid);
}
