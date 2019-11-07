export default class Dose {
  constructor(options) {
    this.color = options.color;
    this.coordinates = options.coordinates;
    this.game = options.game;
    this.pill = options.pill || null;
    this.otherHalf = options.otherHalf || null;
  }

  // deleteFromBoard(coordArray) {
  //   let [row, column] = this.coordinates;

  //   coordArray.forEach(coord => {
      
  //   })
  // }
}