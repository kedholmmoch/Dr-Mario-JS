import Game from './game';
import Board from './board';

const GAME_WIDTH = 201;
const GAME_HEIGHT = 353;

const SQR_WIDTH = 24;
const SQR_HEIGHT = 21;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("gameScreen");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  let spritesheet = document.getElementById("spritesheet");

  spritesheet.addEventListener("load", () => {
    
    let game = new Game(
      GAME_WIDTH, 
      GAME_HEIGHT, 
      SQR_WIDTH, 
      SQR_HEIGHT, 
      spritesheet,
      3
    );
    game.start();

    // let board = new Board(game);
    // console.log(board);

    function gameLoop(timestamp) {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      game.update(timestamp);
      game.draw(ctx);

      requestAnimationFrame(gameLoop);
    }
    
    requestAnimationFrame(gameLoop);
  });
});