export default class InputHandler {
  constructor(pill) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 74:
          // alert("move left");
          pill.moveLeft();
          break;
        case 76:
          // alert("move right");
          pill.moveRight();
          break;
        case 75:
          // alert("speed drop");
          pill.speedDrop();
          break;
        case 83:
          // alert("flip left");
          pill.flipLeft();
          break;
        case 70:
          // alert("flip right");
          pill.flipRight();
          break;
      }
    });
    
  }
}