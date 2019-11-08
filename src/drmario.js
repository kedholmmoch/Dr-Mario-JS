import Game from './game';
import Board from './board';

// const GAME_WIDTH = 203;
// const GAME_HEIGHT = 355;
const GAME_WIDTH = 250;
const GAME_HEIGHT = 492;
const MARGIN = 3;

const SQR_WIDTH = 25 - MARGIN;
const SQR_HEIGHT = 22 - MARGIN;

const BOTTLE = [153, 290, 78, 174];

document.addEventListener('DOMContentLoaded', () => {
  // let background = document.getElementById("background");
  // document.body.style.backgroundImage = url('../assets');

  const canvas = document.getElementById("gameScreen");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  let miscellaneous = document.getElementById("miscellaneous");
  let spritesheet = document.getElementById("spritesheet");

  spritesheet.addEventListener("load", () => {
    
    let game = new Game(
      GAME_WIDTH, 
      GAME_HEIGHT,
      MARGIN, 
      SQR_WIDTH, 
      SQR_HEIGHT, 
      spritesheet,
      3
    );
    game.start();

    function gameLoop(timestamp) {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.drawImage(miscellaneous, 
        BOTTLE[0], BOTTLE[1], BOTTLE[2], BOTTLE[3], 
        0, 0, GAME_WIDTH, GAME_HEIGHT);

      game.update(timestamp);
      game.draw(ctx);

      requestAnimationFrame(gameLoop);
    }
    
    requestAnimationFrame(gameLoop);
  });
});