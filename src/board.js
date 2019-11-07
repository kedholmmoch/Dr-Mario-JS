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

    console.log(this.findFours());
  }

  checkFourDown(coords) {
    let [row, column] = coords;

    let sqNumber = 1;
    let squares = [coords];
    let color = this.grid[row][column].color;

    let currRow = row;
    let sameColor = true;

    while (sameColor && currRow <= 14) {
      currRow += 1;
      let currSquare = this.grid[currRow][column];

      if (currSquare) {
        let currColor = this.grid[currRow][column].color;
  
        if (currColor === color) {
          sqNumber += 1;
          squares.push([currRow, column]);
        } else {
          sameColor = false;
        }
      } else {
        sameColor = false;
      }
    }

    if (sqNumber >= 4) {
      return squares;
    } else {
      return false;
    }

  }

  checkFourAcross(coords) {
    let [row, column] = coords;

    let sqNumber = 1;
    let squares = [coords];
    let color = this.grid[row][column].color;

    let currCol = column;
    let sameColor = true;

    while (sameColor && currCol <= 6) {
      currCol += 1;
      let currSquare = this.grid[row][currCol];

      if (currSquare) {
        let currColor = this.grid[row][currCol].color;

        if (currColor === color) {
          sqNumber += 1;
          squares.push([row, currCol]);
        } else {
          sameColor = false;
        }
      } else {
        sameColor = false;
      }
    }

    if (sqNumber >= 4) {
      return squares;
    } else {
      return false;
    }
  }

  findFours() {
    let fours = [];
    
    for (let row = 0; row <= 15; row++) {
      for (let col = 0; col <= 7; col++) {
        let coords = [row, col];

        if (!this.isEmpty(coords)) {
          let downResult = this.checkFourDown(coords);
          let acrossResult = this.checkFourAcross(coords);

          if (downResult) {
            fours = fours.concat(downResult);
          }
          if (acrossResult) {
            fours = fours.concat(acrossResult);
          }
        }
      }   
    }

    let result = [];   // need to eliminate duplicate coordinates from result

    fours.forEach(coord => {
      if (!result.some(ele => ele[0] === coord[0] && ele[1] === coord[1])) {
        result.push(coord);
      }
    });

    return result;
  }

  clearFours() {
    let toClear = this.findFours();

    if (toClear) {
      console.log('cleared!');
    }
  }

}