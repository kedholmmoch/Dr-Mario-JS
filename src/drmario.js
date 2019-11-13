import Game from './game';
import Mario from './mario';

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

const getLevel = function(num) {
  switch (num) {
    case 1:
      return "Slow";
    case 2:
      return "Medium";
    case 3:
      return "Fast";
    case 4:
      return "Faster";
    case 5:
      return "Fastest";
  }
}

const playTheme = function (url, musicIsMuted) {
  let audio = document.createElement('audio');

  if (musicIsMuted) {
    audio.muted = true;
  }

  audio.src = url;
  audio.style.display = "none";
  audio.onended = function () {
    audio.remove();
  };
  document.body.appendChild(audio);

  const play = function() {
    audio.play();
  }
  document.addEventListener('click', play);

  let muteButton = document.getElementById('mute-music');
  muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    // console.log('paused?');
  });

  let startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    document.removeEventListener('click', play);
    audio.remove();
  });
}

/*
const startGameLoop = function(levelSlide, speedSlide, gameWidth, gameHeight,
  margin, sqrWidth, sqrHeight, gameSpritesheet, marioSpritesheet, bottle, ctx, 
  marioCtx) {
    let stageLevel = parseInt(levelSlide.value);
    let stageSpeed = parseInt(speedSlide.value);
  
    let game = new Game(
      gameWidth,
      gameHeight,
      margin,
      sqrWidth,
      sqrHeight,
      gameSpritesheet,
      stageLevel,
      stageSpeed
    );
  
    let mario = new Mario({
      spritesheet: marioSpritesheet,
      game: game
    });

    let gameOptions = document.getElementById('to-mute');
    let startButton = document.getElementById('start-button');
  
    gameOptions.classList.add('muted');
    startButton.innerText = "RESTART";
  
    const ctx2 = ctx;
    const marioCtx2 = marioCtx;

    game.start();
  
    function gameLoop(timestamp) {
      ctx2.clearRect(0, 0, gameWidth, gameHeight);
      ctx2.drawImage(marioSpritesheet,
        bottle[0], bottle[1], bottle[2], bottle[3],
        0, 0, gameWidth, gameHeight);
  
      game.update(timestamp);
      game.draw(ctx2);
      mario.draw(marioCtx2);
  
      requestAnimationFrame(gameLoop);
    }
  
  requestAnimationFrame(gameLoop);
}
*/

document.addEventListener('DOMContentLoaded', () => {

  // fade in elements while waiting for font to load
  const jsLogo = document.getElementById("logo-js");
  const createdBy = document.getElementById('created-by');
  const myName = document.getElementById('kevin-moch');
  const menuSidebar = document.getElementById('menu-sidebar');

  window.setTimeout(()=> {
    jsLogo.style.color = "black";
    createdBy.style.opacity = 1;
    printName(myName);
    window.setTimeout(() => {
      menuSidebar.style.opacity = 1;
    }, 1000);
  }, 100);


  // set up mute button
  var musicIsMuted = false;
  let muteButton = document.getElementById('mute-music');
  muteButton.addEventListener('click', () => {
    musicIsMuted = !musicIsMuted;
    muteButton.classList.toggle('sound-off');
    // console.log(musicIsMuted);
  });

  // listener to adjust the displayed level
  const levelSlide = document.getElementById("level-slide");
  const levelOutput = document.getElementById("curr-level");
  levelOutput.innerHTML = levelSlide.value;

  levelSlide.oninput = function () {
    levelOutput.innerHTML = this.value;
  };

  // listener to adjust the displayed speed
  const speedSlide = document.getElementById("speed-slide");
  const speedOutput = document.getElementById("curr-speed");
  speedOutput.innerHTML = getLevel(parseInt(speedSlide.value));

  speedSlide.oninput = function () {
    speedOutput.innerHTML = getLevel(parseInt(this.value));
  }

  // grabbing canvases and canvas contexts
  const canvas = document.getElementById("gameScreen");
  const ctx = canvas.getContext("2d");

  const marioCanvas = document.getElementById("dr-mario-canvas");
  const marioCtx = marioCanvas.getContext('2d');

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // grabbing spritesheets
  let miscellaneous = document.getElementById("miscellaneous");
  let spritesheet = document.getElementById("spritesheet");

  spritesheet.addEventListener("load", () => {

    ctx.drawImage(miscellaneous,
      BOTTLE[0], BOTTLE[1], BOTTLE[2], BOTTLE[3],
      0, 0, GAME_WIDTH, GAME_HEIGHT);

    let gameOptions = document.getElementById('game-options');
    let startButton = document.getElementById('start-button');


    // start music and associated event listeners
    playTheme('./assets/sounds/Dr_Mario_Theme.mp3', musicIsMuted);
    
    let lostButton = document.getElementById('lost-game');
    let wonButton = document.getElementById('won-game');

    lostButton.addEventListener('click', () => {
      playTheme('./assets/sounds/Dr_Mario_Theme.mp3', musicIsMuted);
    });
    wonButton.addEventListener('click', () => {
      playTheme('./assets/sounds/Dr_Mario_Theme.mp3', musicIsMuted);
    });

    // event listener on start button to start game;

    // startGameLoop(levelSlide, speedSlide, GAME_WIDTH, GAME_HEIGHT, MARGIN,
    //   SQR_WIDTH, SQR_HEIGHT, spritesheet, miscellaneous, BOTTLE, gameOptions,
    //   startButton, ctx, marioCtx);

    // startButton.addEventListener('click', startGameLoop.bind(null, event, 
    //   levelSlide, speedSlide, GAME_WIDTH, GAME_HEIGHT, MARGIN, SQR_WIDTH, 
    //   SQR_HEIGHT, spritesheet, miscellaneous, BOTTLE, ctx, marioCtx));

    
    startButton.addEventListener('click', () => {
      let stageLevel = parseInt(levelSlide.value);
      let stageSpeed = parseInt(speedSlide.value);

      let game = new Game(
        GAME_WIDTH, 
        GAME_HEIGHT,
        MARGIN, 
        SQR_WIDTH, 
        SQR_HEIGHT, 
        spritesheet,
        stageLevel,
        stageSpeed
      );
  
      let mario = new Mario({
        spritesheet: miscellaneous,
        game: game
      });

      gameOptions.classList.add('muted');
      startButton.innerText = "RESTART";
  
      game.start(musicIsMuted);

      function gameLoop(timestamp) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.drawImage(miscellaneous, 
          BOTTLE[0], BOTTLE[1], BOTTLE[2], BOTTLE[3], 
          0, 0, GAME_WIDTH, GAME_HEIGHT);
  
        game.update(timestamp);
        game.draw(ctx);
        mario.draw(marioCtx);
  
        requestAnimationFrame(gameLoop);
      }
      
      requestAnimationFrame(gameLoop);
    });
    
  });
});