const VIRUS_WIDTH = 24;
const VIRUS_HEIGHT = 21;

const VIRUS_SPRITES = {
  red: {
    0: [0, 88, 7, 7],
    1: [0, 96, 7, 7]
  },

  yellow: {
    0: [0, 112, 7, 7],
    1: [0, 120, 7, 7]
  },

  blue: {
    0: [0, 136, 7, 7],
    1: [0, 144, 7, 7]
  },

  none: {
    0: [108, 260, 8, 8]
  }
}

export default class Virus {
  constructor(options) {
    this.color = options.color;
    this.position = options.position;

    this.frame = 0;
    this.lastUpdated = null;
    this.frameLength = 250;

    this.spritesheet = options.spritesheet;
    this.width = VIRUS_WIDTH;
    this.height = VIRUS_HEIGHT;
  }

  getSprite() {
    const frame = this.frame;
    switch(this.color) {
      case "red":
        return VIRUS_SPRITES.red[frame];
      case "yellow":
        return VIRUS_SPRITES.yellow[frame];
      case "blue":
        return VIRUS_SPRITES.blue[frame];
      default:
        return VIRUS_SPRITES.none[frame];
    }
  }

  update(timestamp) {
    if (!this.lastUpdated) this.lastUpdated = timestamp;

    // console.log(timestamp);

    if ((timestamp - this.lastUpdated) > this.frameLength) {
      this.frame = (this.frame + 1) % 2;
      this.lastUpdated = timestamp;
    }
  }

  draw(ctx){
    const sprite = this.getSprite();
    // console.log(this.lastUpdated);
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