//* sq_width = 24px (25); sq_height = 21px (22); *//

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

    this.position = {x: 76, y: 23};
    this.rotation = 0;
    this.orientation = this.getOrientation();
    this.lastDrop = null;
    this.dropSpeed = 1;

    this.stationary = false;
    this.connected = true;
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

  moveLeft() {
    if (this.position.x >= 25) {
      this.position.x -= 25;
    }
  }

  moveRight() {
    if (this.position.x < 151) {
      this.position.x += 25;
    }
  }

  flipLeft() {
    // will have to adjust later so that orientation does NOT change if things in the way
    let newRotation = this.rotation - 90;
    this.rotation = (newRotation >= 0) ? 
      newRotation : 
      (((this.rotation - 90) % 360) + 360) % 360;
    this.orientation = this.getOrientation();
  }

  flipRight() {
    // will have to adjust later so that orientation does NOT change if things in the way
    this.rotation = (this.rotation + 90) % 360;
    this.orientation = this.getOrientation();
  }

  drop() {
    /// will have to adjust to also stop if there is something in the way
    console.log('drop function');
    console.log(this.position.y);
    
    if (this.position.y < 331) {
      this.position.y += 22;
    }
  }

  slowDrop() {

  }

  speedDrop() {

  }


  // methods involved in displaying/drawing the pills

  getSprites() {
    let left, right, top, bottom;
    let c0 = this.c0;
    let c1 = this.c1;

    if (this.rotation === 0) {
      left = COLOR_SPRITES.left[c0];
      right = COLOR_SPRITES.right[c1];
      return { left: left, right: right };
    } else if (this.rotation === 180) {
      left = COLOR_SPRITES.left[c1];
      right = COLOR_SPRITES.right[c0];
      return { left: left, right: right };
    } else if (this.rotation === 90) {
      top = COLOR_SPRITES.top[c0];
      bottom = COLOR_SPRITES.bottom[c1];
      return { top: top, bottom: bottom };
    } else if (this.rotation === 270) {
      top = COLOR_SPRITES.top[c1];
      bottom = COLOR_SPRITES.bottom[c0];
      return { top: top, bottom: bottom};
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

  drawVertical(ctx) {
    let sprites = this.getSprites();
    ctx.drawImage(
      spritesheet,
      sprites.top[0],
      sprites.top[1],
      sprites.top[2],
      sprites.top[3],
      this.position.x,
      this.position.y - 22,
      this.width,
      this.height
    );
    ctx.drawImage(
      spritesheet,
      sprites.bottom[0],
      sprites.bottom[1],
      sprites.bottom[2],
      sprites.bottom[3],
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  draw(ctx) {
    if (this.orientation === "horizontal") {
      this.drawHorizontal(ctx);
    } else if (this.orientation === "vertical") {
      this.drawVertical(ctx);
    }
  }

  update(timestamp) {
    if (!this.lastDrop) this.lastDrop = timestamp;

    let dropInterval = 1100 - (100 * this.dropSpeed);

    // console.log(timestamp - this.lastDrop);

    if ((timestamp - this.lastDrop) > dropInterval) {
      this.drop();
      this.lastDrop = timestamp;
    }
  }

}