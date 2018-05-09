const Coord = require("./coord.js");

class Snake {
  constructor(segments){
    this.segments = segments;
    this.turning = false;
    this.direction = "up";
  }

  move() {
    let newSegments = [];
    if (this.direction === "up") {
      console.log(this.segments[0][0] != this.segments[1][0])
      for (let i = 0; i < this.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.segments[i][0];
          let coord2 = this.segments[i][1] - 1;

          let newSegment = [coord1, coord2];
          newSegments[i] = newSegment;
          this.turning = false;
        } else {
          newSegments[i] = this.segments[i - 1];
        }
      }
    } else if (this.direction === "down") {
      for (let i = 0; i < this.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.segments[i][0];
          let coord2 = this.segments[i][1] + 1;

          let newSegment = [coord1, coord2];
          newSegments[i] = newSegment;
          this.turning = false;
        } else {
          newSegments[i] = this.segments[i - 1];
        }
      }
    } else if (this.direction === "left") {
      for (let i = 0; i < this.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.segments[i][0] - 1;
          let coord2 = this.segments[i][1];

          let newSegment = [coord1, coord2];
          newSegments[i] = newSegment;
          this.turning = false;
        } else {
          newSegments[i] = this.segments[i - 1];
        }
      }
    } else if (this.direction === "right") {

      for (let i = 0; i < this.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.segments[i][0] + 1;
          let coord2 = this.segments[i][1];

          let newSegment = [coord1, coord2];
          newSegments[i] = newSegment;
          this.turning = false;
        } else {
          newSegments[i] = this.segments[i - 1];
        }
      }
    }

    this.segments = newSegments;
  }

  turn(newDirection) {
    if (this.isOpposite(newDirection, this.direction) === false && !this.turning) {
      this.direction = newDirection;
      this.turning = true;
    }
  }

  isOpposite(newDirection, currentDirection) {
    if (newDirection === "left" && currentDirection === "right") {
      return true;
    } else if (newDirection === "right" && currentDirection === "left") {
      return true;
    } else if (newDirection === "up" && currentDirection === "down") {
      return true;
    } else if (newDirection === "down" && currentDirection === "up") {
      return true;
    }
    return false;
  }

}


module.exports = Snake;
