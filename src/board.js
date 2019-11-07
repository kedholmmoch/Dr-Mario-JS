import Virus from './virus';
import Pill from './pill';
import Dose from './dose';

const COLORS = ["red", "yellow", "blue"];

export default class Board {
  constructor(game) {
    this.width = 8;
    this.height = 16;
    this.game = game;
    this.margin = game.margin;
    this.squareWidth = game.squareWidth;
    this.squareHeight = game.squareHeight;
    this.level = game.level;  // we'll do levels 0 through 10
    this.numberViruses = 4 * (this.level + 1);

    this.grid = this.createEmptyGrid();
    this.viruses = [];
  }

  createEmptyGrid() {
    const grid = [...Array(this.height)]
      .map(row => Array(this.width).fill(null));

    return grid;
  }

  populateViruses() {
    let total = this.numberViruses;
    let added = 0;

    // only want to add viruses to uppermost rows if the level is very high
    let rowAdjustment = 4 - Math.floor(this.level / 5);

    let lowestRow = 3 + rowAdjustment;
    let rowRange = 16 - lowestRow;

    while (added < total) {
      let row = Math.floor(Math.random() * rowRange) + lowestRow;
      let column = Math.floor(Math.random() * this.width);
      let color = COLORS[Math.floor(Math.random() * 3)];

      if (this.grid[row][column] === null) {
        let newVirus = new Virus({
          game: this.game,
          color: color,
          coordinates: [row, column]
        });

        this.grid[row][column] = newVirus;
        this.viruses.push(newVirus);
        added += 1;
      }
    }

    return this.grid;
  }

  getPosition(coords) {
    let margin = this.margin;
    let [yCoord, xCoord] = coords;

    let xPos = margin + (xCoord * (this.squareWidth + margin));
    let yPos = margin + (yCoord * (this.squareHeight + margin));

    return { x: xPos, y: yPos };
  }

  isEmpty(coords) {   // coords is an array in form of [row, column]
    let [row, column] = coords;

    if (column < 0 || column > 7) return false;   // outside of board
    if (row > 15) return false;                   // outside of board

    if (this.grid[row][column] === null) {
      return true;
    } else {
      return false;
    }
  }

  recordPill(pill) {
    let [row, column] = pill.coordinates;
    let rotation = pill.rotation;
    let orientation = pill.orientation;

    let c0 = pill.c0;
    let c1 = pill.c1;

    if (orientation === "horizontal") {
      let leftCoord = [row, column];
      let rightCoord = [row, column + 1];

      if (rotation === 0) {
        this.grid[row][column] = new Dose({
          color: c0,
          coordinates: leftCoord,
          game: this.game,
          pill: pill
        });
        this.grid[row][column + 1] = new Dose({
          color: c1,
          coordinates: rightCoord,
          game: this.game,
          pill: pill
        });

      } else if (rotation === 180) {
        this.grid[row][column] = new Dose({
          color: c1,
          coordinates: leftCoord,
          game: this.game,
          pill: pill
        });
        this.grid[row][column + 1] = new Dose({
          color: c0,
          coordinates: rightCoord,
          game: this.game,
          pill: pill
        });
      }
    } else if (orientation === "vertical") {
      let topCoord = [row - 1, column];
      let bottomCoord = [row, column];

      if (rotation === 90) {
        this.grid[row -1][column] = new Dose({
          color: c0,
          coordinates: topCoord,
          game: this.game,
          pill: pill
        });
        this.grid[row][column] = new Dose({
          color: c1,
          coordinates: bottomCoord,
          game: this.game,
          pill: pill
        });

      } else if (rotation === 270) {
        this.grid[row - 1][column] = new Dose({
          color: c1,
          coordinates: topCoord,
          game: this.game,
          pill: pill
        });
        this.grid[row][column] = new Dose({
          color: c0,
          coordinates: bottomCoord,
          game: this.game,
          pill: pill
        });
      }
    }
  }
  
}