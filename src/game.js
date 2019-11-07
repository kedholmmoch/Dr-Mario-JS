import InputHandler from './input';
import Board from './board';
import Pill from './pill';


const COLORS = ["red", "yellow", "blue"];

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
    this.board.populateViruses();
    console.log(this.board);

    // still a placeholder for a new Pill

    /* 

    this.pill1 = new Pill({
      colors: ["blue", "blue"],
      game: this
    });

    */

    // will need these later/soon ..

    this.currentPill = this.generatePill();
  }

  start() {

    this.gameObjects = [
      ...this.board.viruses,
      this.currentPill
    ];

    new InputHandler(this.currentPill);
  }

  generatePill() {
    let c0 = COLORS[Math.floor(Math.random() * 3)];
    let c1 = COLORS[Math.floor(Math.random() * 3)];

    let newPill = new Pill({
      colors: [c0, c1],
      game: this
    });

    return newPill;
  }

  update(timestamp) {
    this.gameObjects.forEach(object => object.update(timestamp));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}