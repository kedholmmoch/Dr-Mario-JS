import Virus from './virus';
import Pill from './pill';

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
    let virus1 = new Virus({
      color: "yellow",
      position: { x: 101, y: 111 },
      width: SQR_WIDTH,
      height: SQR_HEIGHT,
      spritesheet
    });

    let pill1 = new Pill({
      spritesheet: spritesheet,
      width: SQR_WIDTH,
      height: SQR_HEIGHT,
      colors: ["blue", "blue"]
    })

    function gameLoop(timestamp) {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      
      // ctx.drawImage(
      //   spritesheet,
      //   0, 48, 7, 7,
      //   75, 200, 24, 21
      // );
      
      virus1.update(timestamp);
      virus1.draw(ctx);
      pill1.draw(ctx);

      requestAnimationFrame(gameLoop);
    }
    
    gameLoop();

  });
});