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
      } else if (currSegment[2] === "turning" && prevSegment[2] === "left") {
        //the following is for cases when the tail is the last one and 'turning'
        currSegment[4] = "snake-tail-left";
      } else if (currSegment[2] === "turning" && prevSegment[2] === "down") {
        currSegment[4] = "snake-tail-down";
      } else if (currSegment[2] === "turning" && prevSegment[2] === "right") {
        currSegment[4] = "snake-tail-right";
      } else if (currSegment[2] === "turning" && prevSegment[2] === "up") {
        currSegment[4] = "snake-tail-up";
      }
    }  else if (currSegment[2] === "turning") {
      //assign the sprite of the turning segments

      if (prevSegment[2] === "left" && nextSegment[2] === "up") {
        currSegment[4] = "snake-body-turning-up-and-left";
      } else if (prevSegment[2] === "down" && nextSegment[2] === "left") {
        currSegment[4] = "snake-body-turning-left-and-down";
      } else if (prevSegment[2] === "right" && nextSegment[2] === "down") {
        currSegment[4] = "snake-body-turning-down-and-right";
      } else if (prevSegment[2] === "up" && nextSegment[2] === "right") {
        currSegment[4] = "snake-body-turning-right-and-up";
      } else if (prevSegment[2] === "down" && nextSegment[2] === "right") {
        currSegment[4] = "snake-body-turning-right-and-down";
      } else if (prevSegment[2] === "up" && nextSegment[2] === "left") {
        currSegment[4] = "snake-body-turning-left-and-up";
      } else if (prevSegment[2] === "right" && nextSegment[2] === "up") {
        currSegment[4] = "snake-body-turning-up-and-right";
      } else if (prevSegment[2] === "left" && nextSegment[2] === "down") {
        currSegment[4] = "snake-body-turning-down-and-left";
      }
      //these will take care of double turns
      else if (prevSegment[2] === "down" && nextSegment[2] === "turning"
        && nextSegment[0] < currSegment[0]) {
        currSegment[4] = "snake-body-turning-up-and-left";
      } else if (prevSegment[2] === "turning" && nextSegment[2] === "down"
        && nextSegment[1] < currSegment[1] && prevSegment[0] > currSegment[0]) {
        // currSegment[4] = "snake-body-turning-down-and-right";
        currSegment[4] = "test";

      } else if (prevSegment[2] === "turning" && nextSegment[2] === "up"
        && prevSegment[0] > currSegment[0] && currSegment[1] < prevSegment[1]) {
          debugger
        currSegment[4] = "snake-body-turning-up-and-right";
      } else {
      currSegment[4] = "turning"
      }

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
