const Coord = require("./coord.js");

class Snake {
  constructor(){
    this.segments = [[10,10]];
    this.turning = false;
    this.direction = "up";
    this.size = this.segments.length;
  }

  move() {
    let newSegments = [];
    if (this.direction === "up") {
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

  grow() {

    if (this.segments.length > 1) { //this is for when the snake is more than one link long
      let last = this.segments[this.segments.length - 1];
      let secondLast = this.segments[this.segments.length - 2];

      if (last[0] === secondLast[0] && last[1] > secondLast[1]) {
        this.segments.push([last[0], last[1] + 1])
      } else if (last[0] === secondLast[0] && last[1] < secondLast[1]) {
        this.segments.push([last[0], last[1] - 1])
      } else if (last[0] > secondLast[0] && last[1] === secondLast[1]) {
        this.segments.push([last[0] + 1, last[1]])
      } else if (last[0] < secondLast[0] && last[1] === secondLast[1]) {
        this.segments.push([last[0] - 1, last[1]])
      }
    } else { // this is for the when the snake is only one link lone (at the very start)
      let segmentCoord1 = this.segments[0][0];
      let segmentCoord2 = this.segments[0][1];


      if (this.direction === "up") {
        this.segments.push([segmentCoord1, segmentCoord2 + 1])
      } else if (this.direction === "down") {
        this.segments.push([segmentCoord1, segmentCoord2 - 1])
      } else if (this.direction === "right") {
        this.segments.push([segmentCoord1 - 1, segmentCoord2])
      } else if (this.direction === "left") {
        this.segments.push([segmentCoord1 + 1, segmentCoord2])
      }
    }

    this.size = this.segments.length;
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
