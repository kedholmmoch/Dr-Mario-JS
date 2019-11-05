import Virus from './virus';

const GAME_WIDTH = 192;
const GAME_HEIGHT = 336;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("gameScreen");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  let spritesheet = document.getElementById("spritesheet");

  spritesheet.addEventListener("load", () => {
    
    
    let virus1 = new Virus({
      color: "blue",
      position: { x: 100, y: 100 },
      spritesheet
    });

    function gameLoop(timestamp) {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      
      ctx.drawImage(
        spritesheet,
        0, 48, 7, 7,
        75, 200, 24, 21
      );
      
      virus1.update(timestamp);
      virus1.draw(ctx);

      requestAnimationFrame(gameLoop);
    }
    
    gameLoop();

  });
});