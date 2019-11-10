import Game from './game';
import Mario from './mario';

// const GAME_WIDTH = 203;
// const GAME_HEIGHT = 355;
const GAME_WIDTH = 250;
const GAME_HEIGHT = 492;
const MARGIN = 3;

const SQR_WIDTH = 25 - MARGIN;
const SQR_HEIGHT = 22 - MARGIN;

const BOTTLE = [153, 290, 78, 174];

const printName = function(input) {
  const name = "KEVIN MOCH";
  const timing = 100;
  setTimeout(function() {
    for (let i = 1; i <= name.length; i++) {
      (function(i) {
        setTimeout(function() {
          input.innerText = name.slice(0, i)
        }, timing * i)
      })(i);
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {

  // fade in JS logo while waiting for font to load
  const jsLogo = document.getElementById("logo-js");
  const createdBy = document.getElementById('created-by');
  const myName = document.getElementById('kevin-moch');

  window.setTimeout(()=> {
    jsLogo.style.color = "black";
    createdBy.style.opacity = 1;
    printName(myName);
  }, 500);

  const canvas = document.getElementById("gameScreen");
  const ctx = canvas.getContext("2d");

  const marioCanvas = document.getElementById("dr-mario-canvas");
  const marioCtx = marioCanvas.getContext('2d');

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
      2
    );

    let mario = new Mario({
      spritesheet: miscellaneous
    });

    // this can all probably go in the game.start function ... ?
    let levelDisplay = document.getElementById('stage-level-display');
    levelDisplay.innerText = game.level;

    let virusDisplay = document.getElementById('stage-viruses-display');
    virusDisplay.innerText = game.viruses.length;

    let scoreDisplay = document.getElementById('stage-score-display');
    scoreDisplay.innerText = game.score;


    let stageInfo = document.getElementById('stage-info');
    stageInfo.classList.toggle('hidden');

    game.start();

    function gameLoop(timestamp) {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.drawImage(miscellaneous, 
        BOTTLE[0], BOTTLE[1], BOTTLE[2], BOTTLE[3], 
        0, 0, GAME_WIDTH, GAME_HEIGHT);

      game.update(timestamp, virusDisplay);
      game.draw(ctx);
      mario.draw(marioCtx);

      requestAnimationFrame(gameLoop);
    }
    
    requestAnimationFrame(gameLoop);
  });
});