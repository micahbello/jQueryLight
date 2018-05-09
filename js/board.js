const Snake = require("./snake.js");
const Apple = require("./apple.js");

class Board {
  constructor() {
    this.grid = this.makeGrid();
    this.apple = new Apple(this.randomAppleCoord());
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

  randomAppleCoord() {
    let coord1 = Math.floor((Math.random() * 19) + 1);
    let coord2 = Math.floor((Math.random() * 19) + 1);

    //write code here to make sure the apple never spawns on snake coords

    return [coord1, coord2];
  }

  snakeAppleCollision() {
    let colliding = false;

    if (this.snake.segments[0][0] === this.apple.coord[0] && this.snake.segments[0][1] === this.apple.coord[1]) {
      colliding = true;
    }
    return colliding;
  }

  newApple() {
    this.apple = new Apple(this.randomAppleCoord());
  }

}

module.exports = Board;
