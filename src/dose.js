const DOSE_SPRITES = {
  single: {
    red: [0, 40, 7, 7],
    yellow: [8, 40, 7, 7],
    blue: [16, 40, 7, 7]
  },

  empty: {
    red: [0, 48, 7, 7],
    yellow: [8, 48, 7, 7],
    blue: [16, 48, 7, 7]
  }
}

export default class Dose {
  constructor(options) {
    this.color = options.color;
    this.coordinates = options.coordinates;
    this.pill = options.pill || null;
    this.otherHalf = options.otherHalf || null;
    this.single = options.single || false;

    this.game = options.game;
    this.spritesheet = this.game.spritesheet;

    this.position = this.game.board.getPosition(this.coordinates);
    this.width = options.game.squareWidth;
    this.height = options.game.squareHeight;
  }

  addToGame() {
    this.game.singleDoses.push(this);
    this.game.gameObjects.push(this);
    console.log("dose added?");
    console.log(this);
    console.log(this.game.singleDoses);
  }

  deleteFromGame() {
    // let that = this;
    // let currDoses = this.game.singleDoses;

    let singleDoseIndex = this.game.singleDoses.indexOf(this);
    let gameObjectsIndex = this.game.gameObjects.indexOf(this);

    this.game.singleDoses.splice(singleDoseIndex, 1);
    this.game.gameObjects.splice(gameObjectsIndex, 1);

    // currDoses.forEach((dose, idx) => {
    //   if (dose = that) {
    //     that.game.singleDoses.splice(idx, 1);
    //   }
    // });

    console.log(singleDoseIndex);
    console.log(gameObjectsIndex);
  }

  getSprite() {
    let color = this.color;
    return DOSE_SPRITES.single[color];
  }

  update(timestamp) {

  }

  draw(ctx) {
    const sprite = this.getSprite();
    ctx.drawImage(
      this.spritesheet,
      sprite[0],
      sprite[1],
      sprite[2],
      sprite[3],
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}