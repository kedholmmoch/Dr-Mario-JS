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
  constructor(colors, spritesheet, width, height) {
    this.c0 = colors[0];
    this.c1 = colors[1];
    this.width = width;
    this.height = height;
    this.spritesheet = spritesheet;

    this.position = {x: 76, y: 23}
    this.rotation = 0;
    this.connected = true;


  }

  getSprites() {
    if (this.rotation = 0) {
      let c0 = this.c0;
      let c1 = this.c1;
      let left = COLOR_SPRITES.left.c0;
      let right = COLOR_SPRITES.right.c1;
      return {left: left, right: right};
    }
  }

  draw(ctx) {
    let sprites = getSprites();
    ctx.drawImage(
      spritesheet,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      
    )
  }

}