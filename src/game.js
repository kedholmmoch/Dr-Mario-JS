import InputHandler from './input';
import Board from './board';
import Virus from './virus';
import Pill from './pill';

export default class Game {

  constructor(gameWidth, gameHeight, margin, squareWidth, squareHeight, 
      spritesheet, level) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.margin = margin;
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
    this.spritesheet = spritesheet;
    this.level = level ? level : 0;

    this.board = new Board(this);
    console.log(this.board);

    // will need these later/soon ..

    this.currentPill = {};
  }

  start() {
    /*
    this.virus1 = new Virus({
      color: "red",
      position: { x: 101, y: 111 },
      game: this
    });
    */

    this.pill1 = new Pill({
      colors: ["blue", "blue"],
      game: this
    });

    // this.gameObjects = [
    //   this.virus1,
    //   this.pill1
    //   // ...this.board.viruses
    // ];

    this.gameObjects = this.board.viruses.concat(this.pill1);

    new InputHandler(this.pill1);
  }

  update(timestamp) {
    this.gameObjects.forEach(object => object.update(timestamp));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}