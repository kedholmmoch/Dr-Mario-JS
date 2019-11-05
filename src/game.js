import InputHandler from './input';
import Virus from './virus';
import Pill from './pill';

export default class Game {

  constructor(gameWidth, gameHeight, squareWidth, squareHeight, spritesheet) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
    this.spritesheet = spritesheet;

    // will need these later/soon ..
    this.viruses = [];
    this.board = [];
    this.currentPill = {};
  }

  start() {
    this.virus1 = new Virus({
      color: "red",
      position: { x: 101, y: 111 },
      game: this
    });

    this.pill1 = new Pill({
      colors: ["red", "yellow"],
      game: this
    });

    this.gameObjects = [
      this.virus1,
      this.pill1
    ];

    new InputHandler(this.pill1);
  }

  update(timestamp) {
    this.gameObjects.forEach(object => object.update(timestamp));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }

}