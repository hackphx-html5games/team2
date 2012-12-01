/*global io:false */
var socket = io.connect();

socket.on('connect', function() {
  console.log('woohoo!');
});
