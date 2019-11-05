const COLOR_SPRITES = {
  top: {
    red: [0, 8, 7, 7],
    yellow: [8, 8, 7, 7],
    blue: [16, 8, 7, 7]
  },

  bottom: {
    red: [0, 16, 7, 7],
    yellow: [8, 16, 7, 7],
    blue: [16, 16, 7, 7]
  },

  left: {
    red: [0, 24, 7, 7],
    yellow: [8, 24, 7, 7],
    blue: [16, 24, 7, 7]
  },

  right: {
    red: [0, 32, 7, 7],
    yellow: [8, 32, 7, 7],
    blue: [16, 32, 7, 7]
  },

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

export default class Pill {
  constructor(options) {
    this.c0 = options.colors[0];
    this.c1 = options.colors[1];
    this.width = options.width;
    this.height = options.height;
    this.spritesheet = options.spritesheet;

    this.position = {x: 76, y: 23}
    this.stationary = false;
    this.rotation = 0;
    this.connected = true;
    this.orientation = this.getOrientation();

  }

  getOrientation() {
    switch (this.rotation) {
      case 0:
        return "horizontal";
      case 90:
        return "vertical";
      case 180:
        return "horizontal";
      case 270:
        return "vertical";
      default:
        return "horizontal";
    }
  }

  getSprites() {
    let c0 = this.c0;
    let c1 = this.c1;
    if (this.rotation === 0) {
      let left = COLOR_SPRITES.left[c0];
      let right = COLOR_SPRITES.right[c1];
      return {left: left, right: right};
    } else if (this.rotation === 180) {
      let left = COLOR_SPRITES.left[c1];
      let right = COLOR_SPRITES.right[c0];
      return {left: left, right: right}
    }
  }

  drawHorizontal(ctx) {
    let sprites = this.getSprites();
    ctx.drawImage(
      spritesheet,
      sprites.left[0],
      sprites.left[1],
      sprites.left[2],
      sprites.left[3],
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.drawImage(
      spritesheet,
      sprites.right[0],
      sprites.right[1],
      sprites.right[2],
      sprites.right[3],
      this.position.x + 25,
      this.position.y,
      this.width,
      this.height
    );
  }

  draw(ctx) {
    if (this.orientation === "horizontal") {
      this.drawHorizontal(ctx);
    }
  }

}