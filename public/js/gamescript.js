/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 
    var c=document.getElementById("gamecanvas");
    var ctx=c.getContext("2d");
    
    game = new Game();
    game.start(ctx);
    
   
    
    /*ctx.fillStyle="#00ff00";
    ctx.fillRect(1100,0,300,600);*/

// Start the game loop
    game._intervalId = setInterval(game.startLoop, 1000 / 60);


window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 32: //space bar
      Game.projectiles.push(Game.player.shoot());
      break;
    case 37: // Left
        alert("left");
       Game.player.moveLeft();
    break;

    case 38: // Up
      Game.player.moveUp();
    break;

    case 39: // Right
       //alert("right");
      Game.player.moveRight();
    break;

    case 40: // Down
      Game.player.moveDown();
    break;
  }
}, false);

