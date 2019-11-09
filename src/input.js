export default class InputHandler {
  constructor(pill) {
    
    this.pill = pill;
    this.handleInput = this.handleInput.bind(this);

    document.addEventListener("keydown", this.handleInput);

    /*
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 74:
          pill.moveLeft();
          break;
        case 76:
          pill.moveRight();
          break;
        case 75:
          pill.speedDrop();
          break;
        case 83:
          pill.flipLeft();
          break;
        case 70:
          pill.flipRight();
          break;
      }
    });
    */
  }

  handleInput(event) {
    switch (event.keyCode) {
      case 74:
        this.pill.moveLeft();
        break;
      case 37:
        event.preventDefault();
        this.pill.moveLeft();
        break;
      case 76:
        this.pill.moveRight();
        break;
      case 39:
        event.preventDefault();
        this.pill.moveRight();
        break;
      case 75:
        this.pill.speedDrop();
        break;
      case 40:
        this.pill.speedDrop();
        break;
      case 83:
        this.pill.flipLeft();
        break;
      case 70:
        this.pill.flipRight();
        break;
    }
  }

  removeListener() {
    document.removeEventListener("keydown", this.handleInput);
  }
}