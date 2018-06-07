const Snake = require("./snake.js");
const Apple = require("./apple.js");

class Board {
  constructor() {
    this.grid = this.makeGrid();
    this.snake = new Snake();
    this.apple = new Apple(this.randomAppleCoord());
    this.score = 0;
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

    //this makes sure the apple never spawns on snake coords
    let currentSnakeCoords = this.snake.segments;
    let conflict = false;

    currentSnakeCoords.forEach(coord => {
      if (coord[0] === coord1 && coord[1] === coord2) {
        conflict = true;
      }
    });

    if (conflict === false ) {
      return [coord1, coord2];
    } else {
      return this.randomAppleCoord();
    }
  }

  snakeAppleCollision() {
    let colliding = false;

    if (this.snake.segments[0][0] === this.apple.coord[0]
      && this.snake.segments[0][1] === this.apple.coord[1]) {
      colliding = true;
    }
    return colliding;
  }

  loosingCollisions() {

    //first if will detect when the snake is outside of the grid
    //second if will detect when the snake collides with itself
    let colliding = false;

    if (this.snake.segments[0][0] < 0 || this.snake.segments[0][0] > 19
      || this.snake.segments[0][1] < 0 || this.snake.segments[0][1] > 19) {
      colliding = true;
    } else if (this.snake.size > 1){
      let snakeSegments = this.snake.segments.slice(1); // all segments except head
      let snakeHead = this.snake.segments[0];

      snakeSegments.forEach(segment => {
        if (segment[0] === snakeHead[0] && segment[1] === snakeHead[1]) {
          colliding = true;
        }
      });
    }
    return colliding;
  }

  newApple() {
    this.apple = new Apple(this.randomAppleCoord());
  }

}

module.exports = Board;
