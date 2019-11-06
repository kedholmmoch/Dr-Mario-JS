import Game from './game';
import Board from './board';

const GAME_WIDTH = 203;
const GAME_HEIGHT = 355;
const MARGIN = 3;

const SQR_WIDTH = 25 - MARGIN;
const SQR_HEIGHT = 22 - MARGIN;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("gameScreen");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  let spritesheet = document.getElementById("spritesheet");

  spritesheet.addEventListener("load", () => {
    
    let game = new Game(
      GAME_WIDTH, 
      GAME_HEIGHT,
      MARGIN, 
      SQR_WIDTH, 
      SQR_HEIGHT, 
      spritesheet,
      20
    );
    game.start();

    function gameLoop(timestamp) {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      game.update(timestamp);
      game.draw(ctx);

      requestAnimationFrame(gameLoop);
    }
    
    requestAnimationFrame(gameLoop);
  });
});