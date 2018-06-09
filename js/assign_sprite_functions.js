function assignHeadSprite(currSegment) {

  if (currSegment[2] === "up") {
    return "snake-head-up";
  } else if (currSegment[2] === "down") {
    return "snake-head-down";
  } else if (currSegment[2] === "left") {
    return "snake-head-left";
  } else {
    return "snake-head-right";
  }

}

function assignTailSprite(currSegment, prevSegment) {
  if (currSegment[2] === "up") {
    return "snake-tail-up";
  } else if (currSegment[2] === "down") {
    return "snake-tail-down";
  } else if (currSegment[2] === "left") {
    return "snake-tail-left";
  } else if (currSegment[2] === "right") {
    return "snake-tail-right";
  } else if (currSegment[2] === "turning" && prevSegment[2] === "left") {
    //the following is for cases when the tail is the last one and 'turning'
    return "snake-tail-left";
  } else if (currSegment[2] === "turning" && prevSegment[2] === "down") {
    return "snake-tail-down";
  } else if (currSegment[2] === "turning" && prevSegment[2] === "right") {
    return "snake-tail-right";
  } else if (currSegment[2] === "turning" && prevSegment[2] === "up") {
    return "snake-tail-up";
  } else if (currSegment[2] === "turning" && prevSegment[2] === "left") {
    return "snake-tail-left";
  } else if (prevSegment[0] > currSegment[0]) {
    return "snake-tail-right";
  } else if (prevSegment[0] < currSegment[0]) {
    return "snake-tail-left";
  } else if (prevSegment[1] > currSegment[1]) {
    return "snake-tail-down";
  } else if (prevSegment[1] < currSegment[1]) {
    return "snake-tail-up";
  }
}

//[10x, 10y, "up", "head", "snake-head-up"]
function currTurnPrevTurn(currSegment, prevSegment, nextSegment) {
  if (nextSegment[1] > currSegment[1] && currSegment[0] < prevSegment[0]) {
    return "snake-body-turning-up-and-right";
  } else if (nextSegment[1] > currSegment[1] && currSegment[0] > prevSegment[0]) {
    return "snake-body-turning-up-and-left";
  } else if (nextSegment[1] < currSegment[1] && currSegment[0] < prevSegment[0]) {
    return "snake-body-turning-down-and-right";
  } else if (nextSegment[1] < currSegment[1] && currSegment[0] > prevSegment[0]) {
    return "snake-body-turning-down-and-left";
  }

  else if (prevSegment[1] > currSegment[1] && currSegment[0] < nextSegment[0]) {
    return "snake-body-turning-left-and-down";
  } else if (prevSegment[1] < currSegment[1] && currSegment[0] > nextSegment[0]) {
    return "snake-body-turning-right-and-up";
  } else if (prevSegment[1] < currSegment[1] && currSegment[0] < nextSegment[0]) {
    return "snake-body-turning-left-and-up";
  } else if (prevSegment[1] > currSegment[1] && currSegment[0] > nextSegment[0]) {
    return "snake-body-turning-right-and-down";
  }
}

function currTurnNextTurn(currSegment, prevSegment, nextSegment) {
  if (nextSegment[0] < currSegment[0] && currSegment[1] < prevSegment[1]) {
    return "snake-body-turning-right-and-down";
  } else if (nextSegment[0] > currSegment[0] && currSegment[1] < prevSegment[1]) {
    return "snake-body-turning-left-and-down";
  } else if (nextSegment[0] < currSegment[0] && currSegment[1] > prevSegment[1]) {
    return "snake-body-turning-right-and-up";
  } else if (nextSegment[0] > currSegment[0] && currSegment[1] > prevSegment[1]) {
    return "snake-body-turning-left-and-up";
  }

  else if (nextSegment[1] < currSegment[1] && prevSegment[0] > currSegment[0]) {
    return "snake-body-turning-down-and-right";
  } else if (nextSegment[1] > currSegment[1] && prevSegment[0] < currSegment[0]) {
    return "snake-body-turning-up-and-left";
  } else if (nextSegment[1] > currSegment[1] && prevSegment[0] > currSegment[0]) {
    return "snake-body-turning-up-and-right";
  } else if (nextSegment[1] < currSegment[1] && prevSegment[0] < currSegment[0]) {
    return "snake-body-turning-down-and-left";
  }
}

function assignTurnSprite(prevSegment, nextSegment) {
  if (prevSegment[2] === "left" && nextSegment[2] === "up") {
    return "snake-body-turning-up-and-left";
  } else if (prevSegment[2] === "down" && nextSegment[2] === "left") {
    return "snake-body-turning-left-and-down";
  } else if (prevSegment[2] === "right" && nextSegment[2] === "down") {
    return "snake-body-turning-down-and-right";
  } else if (prevSegment[2] === "up" && nextSegment[2] === "right") {
    return "snake-body-turning-right-and-up";
  } else if (prevSegment[2] === "down" && nextSegment[2] === "right") {
    return "snake-body-turning-right-and-down";
  } else if (prevSegment[2] === "up" && nextSegment[2] === "left") {
    return "snake-body-turning-left-and-up";
  } else if (prevSegment[2] === "right" && nextSegment[2] === "up") {
    return "snake-body-turning-up-and-right";
  } else if (prevSegment[2] === "left" && nextSegment[2] === "down") {
    return "snake-body-turning-down-and-left";
  }

}

function assignStraightSprite(prevSegment, nextSegment) {
  if (prevSegment[0] === nextSegment[0]) {
    return "snake-body-straight-horizontal";
  } else {
    return "snake-body-straight-vertical";
  }
}


module.exports.assignHeadSprite = assignHeadSprite;
module.exports.assignTailSprite = assignTailSprite;
module.exports.currTurnPrevTurn = currTurnPrevTurn;
module.exports.currTurnNextTurn = currTurnNextTurn;
module.exports.assignTurnSprite = assignTurnSprite;
module.exports.assignStraightSprite = assignStraightSprite;
