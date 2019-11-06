import InputHandler from './input';
import Board from './board';
import Pill from './pill';
// import Virus from './virus';   // may not need, since board takes care of it

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

    // still a placeholder for a new Pill
    this.pill1 = new Pill({
      colors: ["blue", "blue"],
      game: this
    });

    // will need these later/soon ..

    this.currentPill = this.pill1;
  }

  start() {

    this.gameObjects = [
      ...this.board.viruses,
      this.currentPill
    ];

    new InputHandler(this.currentPill);
  }

  update(timestamp) {
    this.gameObjects.forEach(object => object.update(timestamp));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}