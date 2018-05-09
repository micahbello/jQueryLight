const Snake = require("./snake.js");

class Board {
  constructor() {
    this.grid = this.makeGrid();
    this.snake = new Snake([[10, 10], [10,11], [10, 12], [10, 13], [10, 14]]);
  }

  makeGrid() {
    let grid = [];

    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 21; j++) {
        grid.push([i,j])
      }
    }

    return grid;
  }

}

module.exports = Board;
