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


//
  willSnakeCollide() {
    const newSegments = nextSnakeSegments();
    // const currentDirection = this.snake.direction;

    let colliding = false;

    if (newSegments[0][0] < 0 || newSegments[0][0] > 19
      || newSegments[0][1] < 0 || newSegments[0][1] > 19) {
      colliding = true;
    } else if (newSegments.length> 1){
      let snakeSegments = newSegments.slice(1); // all segments except head
      let snakeHead = newSegments[0];

      snakeSegments.forEach(segment => {
        if (segment[0] === snakeHead[0] && segment[1] === snakeHead[1]) {
          colliding = true;
        }
      });
    }
    return colliding;
  }
//
// // /*
// //use the move method from snake as reference
//
  nextSnakeSegments() {

    let newSegments = [];
    //the ifs correspond to the direction of the head, that determines what the head passes to the
    //next link which takes its place after every render
    if (this.snake.direction === "up") {
      for (let i = 0; i < this.snake.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.snake.segments[i][0];   //the x axix
          let coord2 = this.snake.segments[i][1] - 1;  //the y axis

          //this "newSegment" becomes the new head
          let newSegment = [coord1, coord2, "up", "head"];
          //gets placed in a newSegment array as the first one
          newSegments[i] = newSegment;
        } else {
          newSegments[i] = this.snake.segments[i - 1];
          newSegments[i][3] = "body"
        }
      }
    } else if (this.snake.direction === "down") {
      for (let i = 0; i < this.snake.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.snake.segments[i][0];
          let coord2 = this.snake.segments[i][1] + 1;

          let newSegment = [coord1, coord2, "down", "head"];
          newSegments[i] = newSegment;
        } else {
          newSegments[i] = this.snake.segments[i - 1];
          newSegments[i][3] = "body";
        }
      }
    } else if (this.snake.direction === "left") {
      for (let i = 0; i < this.snake.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.snake.segments[i][0] - 1;
          let coord2 = this.snake.segments[i][1];

          let newSegment = [coord1, coord2, "left", "head"];
          newSegments[i] = newSegment;
        } else {
          newSegments[i] = this.snake.segments[i - 1];
          newSegments[i][3] = "body"
        }
      }
    } else if (this.snake.direction === "right") {

      for (let i = 0; i < this.snake.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.snake.segments[i][0] + 1;
          let coord2 = this.snake.segments[i][1];

          let newSegment = [coord1, coord2, "right", "head"];
          newSegments[i] = newSegment;
        } else {
          newSegments[i] = this.snake.segments[i - 1];
          newSegments[i][3] = "body"
        }
      }
    }

    return newSegments;
  }
//   // */
//

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
