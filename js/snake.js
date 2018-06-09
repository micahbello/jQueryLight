const assignSpriteFunctions = require("./assign_sprite_functions.js");


class Snake {
  constructor(){
    this.segments = [[10, 10, "up", "head", "snake-head-up"], [10, 11, "up", "tail", "snake-tail-up"]];
    this.turning = false;
    this.direction = "up";
    this.size = this.segments.length;
  }

  assignSprite() {

    let segmentsLength = this.segments.length;

    for(let i = 0; i < segmentsLength; i++) {
      let currSegment = this.segments[i];
      let prevSegment = this.segments[i - 1];
      let nextSegment = this.segments[i + 1];

      if (currSegment === this.segments[0]) {
        currSegment[4] = assignSpriteFunctions.assignHeadSprite(currSegment);
      } else if (currSegment === this.segments[segmentsLength - 1]) {
        currSegment[4] = assignSpriteFunctions.assignTailSprite(currSegment, prevSegment);
      } else if (currSegment[2] === "turning" && prevSegment[2] === "turning") {
        currSegment[4] = assignSpriteFunctions.currTurnPrevTurn(currSegment, prevSegment, nextSegment);
      } else if (currSegment[2] === "turning" && nextSegment[2] === "turning") {
        currSegment[4] = assignSpriteFunctions.currTurnNextTurn(currSegment, prevSegment, nextSegment);
      } else if (currSegment[2] === "turning") {
        currSegment[4] = assignSpriteFunctions.assignTurnSprite(prevSegment, nextSegment);
      } else {
        currSegment[4] = assignSpriteFunctions.assignStraightSprite(prevSegment, nextSegment);
      }
    }
  }

  move() {

    //this is what allows the snake to move and have each segment
    //pass on info to the next segment.

    let newSegments = [];
    //the ifs correspond to the direction of the head, that determines what the head passes to the
    //next link which takes its place after every render
    if (this.direction === "up") {
      for (let i = 0; i < this.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.segments[i][0];   //the x axix
          let coord2 = this.segments[i][1] - 1;  //the y axis

          //this "newSegment" becomes the new head
          let newSegment = [coord1, coord2, "up", "head"];
          //gets placed in a newSegment array as the first one
          newSegments[i] = newSegment;
          this.turning = false;
        } else {
          newSegments[i] = this.segments[i - 1];
          newSegments[i][3] = "body"
        }
      }
    } else if (this.direction === "down") {
      for (let i = 0; i < this.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.segments[i][0];
          let coord2 = this.segments[i][1] + 1;

          let newSegment = [coord1, coord2, "down", "head"];
          newSegments[i] = newSegment;
          this.turning = false;
        } else {
          newSegments[i] = this.segments[i - 1];
          newSegments[i][3] = "body";
        }
      }
    } else if (this.direction === "left") {
      for (let i = 0; i < this.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.segments[i][0] - 1;
          let coord2 = this.segments[i][1];

          let newSegment = [coord1, coord2, "left", "head"];
          newSegments[i] = newSegment;
          this.turning = false;
        } else {
          newSegments[i] = this.segments[i - 1];
          newSegments[i][3] = "body"
        }
      }
    } else if (this.direction === "right") {

      for (let i = 0; i < this.segments.length; i ++) {
        if (i === 0) {
          let coord1 = this.segments[i][0] + 1;
          let coord2 = this.segments[i][1];

          let newSegment = [coord1, coord2, "right", "head"];
          newSegments[i] = newSegment;
          this.turning = false;
        } else {
          newSegments[i] = this.segments[i - 1];
          newSegments[i][3] = "body"
        }
      }
    }

    this.segments = newSegments;
    //here call assignDirPost on new segments array

    this.assignSprite();
  }

  turn(newDirection) {
    if (this.isOpposite(newDirection, this.direction) === false && !this.turning) {
      if (this.direction != newDirection) {
        this.direction = newDirection;

      //this will assign the new direction to the snake head so that it can be passed down
      //and the proper sprite can be rendered for each segment. This happens based on the
      //direction of the segment and it place in the segments array. The direction will be third
      //element in the segment array of segment in the array- the position in the array
      //will be the fourth so each segment is like the following-
      //[coord, coord, direction, position, spriteName]
        this.segments[0][2] = newDirection;

      //sets the direction of the second element to turning
        if (this.segments.length > 2) {
          this.segments[0][2] = "turning";
        }
        this.turning = true;
      }
    }
  }

  grow() {

    let last = this.segments[this.segments.length - 1];
    let secondLast = this.segments[this.segments.length - 2];

    if (last[0] === secondLast[0] && last[1] > secondLast[1]) {
      //this one is for when the tail is traveling up
      this.segments.push([last[0], last[1] + 1, "up", "tail"]);
      last[3] = "body";
    } else if (last[0] === secondLast[0] && last[1] < secondLast[1]) {
      //for one the tail is traveling down
      this.segments.push([last[0], last[1] - 1, "down", "tail"]);
      last[3] = "body";
    } else if (last[0] > secondLast[0] && last[1] === secondLast[1]) {
      //for when the tail is traveling left
      this.segments.push([last[0] + 1, last[1], "left", "tail"]);
      last[3] = "body";
    } else if (last[0] < secondLast[0] && last[1] === secondLast[1]) {
      //for when the tail is traveling right
      this.segments.push([last[0] - 1, last[1], "right", "tail"]);
      last[3] = "body";

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
