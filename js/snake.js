
class Snake {
  constructor(){
    this.segments = [[10, 10, "up", "head", "snake-head-up"], [10, 11, "up", "tail", "snake-tail-up"]];
    this.turning = false;
    this.direction = "up";
    this.size = this.segments.length;
  }

  assignDirPostSprite() {

    let segmentsLength = this.segments.length;

    for(let i = 0; i < segmentsLength; i++) {
      let currSegment = this.segments[i];
      let prevSegment = this.segments[i - 1];
      let nextSegment = this.segments[i + 1];

      //assign the sprite of the head
      if (currSegment === this.segments[0]) {
        if (currSegment[2] === "up") {
          currSegment[4] = "snake-head-up";
        } else if (currSegment[2] === "down") {
          currSegment[4] = "snake-head-down";
        } else if (currSegment[2] === "left") {
          currSegment[4] = "snake-head-left";
        } else {
          currSegment[4] = "snake-head-right";
        }
      } else if (currSegment === this.segments[segmentsLength - 1]) {
        //assign the sprite of the tail
        if (currSegment[2] === "up") {
          currSegment[4] = "snake-tail-up";
        } else if (currSegment[2] === "down") {
          currSegment[4] = "snake-tail-down";
        } else if (currSegment[2] === "left") {
          currSegment[4] = "snake-tail-left";
        } else if (currSegment[2] === "right") {
          currSegment[4] = "snake-tail-right";
        }
      }  else if (currSegment[2] === "turning") {
        //assign the sprite of the turning segments




        currSegment[4] = "turning";

      } else if ((prevSegment[2] === nextSegment[2]) ||
        (prevSegment[2] === "turning" && nextSegment[2] != "turning") ||
        prevSegment[2] != "turning" && nextSegment[2] === "turning") {
          //the above conditional is weird but it makes sure that straight segments
          //are assigned even if they are positioned next to turning segments
        if (currSegment[2] === "up" || currSegment[2] === "down") {
          //for the straight horizontal
          currSegment[4] = "snake-body-straight-horizontal";
        } else if (currSegment[2] === "left" || currSegment[2] === "right") {
          //for the straight vertical
          currSegment[4] = "snake-body-straight-vertical";
        }
      } else {
        //sprites for the turning segments
        if (prevSegment[2] === "left" && nextSegment[2] === "up") {
          //turning left from from going up
          currSegment[4] = "snake-body-turning-left-from-up";
        }
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
          let coord1 = this.segments[i][0];   //the y axix
          let coord2 = this.segments[i][1] - 1;  //the x axis

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

    this.assignDirPostSprite();
  }

  turn(newDirection) {
    if (this.isOpposite(newDirection, this.direction) === false && !this.turning) {
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

  grow() {

    if (this.segments.length > 1) { //this is for when the snake is more than one link long
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
    }


//below no longer in use, used when the snake had no sprites and started with 1 segment

    //   else { // this is for the when the snake is only one link (at the very start)
    //   let segmentCoord1 = this.segments[0][0];
    //   let segmentCoord2 = this.segments[0][1];
    //
    //
    //   if (this.direction === "up") {
    //     this.segments.push([segmentCoord1, segmentCoord2 + 1])
    //   } else if (this.direction === "down") {
    //     this.segments.push([segmentCoord1, segmentCoord2 - 1])
    //   } else if (this.direction === "right") {
    //     this.segments.push([segmentCoord1 - 1, segmentCoord2])
    //   } else if (this.direction === "left") {
    //     this.segments.push([segmentCoord1 + 1, segmentCoord2])
    //   }
    // }

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
