/*global io:false */
var socket = io.connect();

socket.on('connect', function() {
  socket.emit('play');
  console.log('woohoo!');
});
