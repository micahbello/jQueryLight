/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class DOMNodeCollection {
  constructor(elements){ //should only receive an array
    this.elements = elements
  }


  html(arg) {
    if (!arg) {
      return this.elements[0].textContent;
    } else {
      this.elements.forEach(node => {
        node.innerHTML = arg
      });
    }
  }

  empty() {
    this.elements.forEach(node => {
      node.innerHTML = "";
    });
  }

  append(arg) {
    this.elements.forEach(node => {
      node.innerHTML = node.innerHTML + arg;
    });
  }


  children() {
    let childrenArray = [];
    this.elements.forEach(node => {
      for (let i = 0; i < node.children.length; i++) {
        childrenArray.push(node.children[i])
      }
    });
    return new DOMNodeCollection(childrenArray);
  }

  parent() {
    let parentsArray = [];

    this.elements.forEach(node => {
      parentsArray.push(node.parentNode);
    });
    return new DOMNodeCollection(parentsArray);
  }

  find(arg) {
    let matchingDescendants = [];

    this.elements.forEach(node => {
      matchingDescendants.push(node.querySelectorAll(arg));
    });

    let matchingDescendantsArray = [];

    for(let i=0; i < matchingDescendants.length; i++) {
      for (let j=0; j < matchingDescendants[i].length; j++) {
        matchingDescendantsArray.push(matchingDescendants[i][j]);
      }
    }
    return new DOMNodeCollection(matchingDescendantsArray);
  }

  remove(arg) {

   this.elements.forEach(node => {
    if (!arg){
      node.remove();
      } else {
        arg === "." + node.className ? node.remove() : null
      }
   });
  }

  on(e, callback) {
    this.elements.forEach(node => {
      node.addEventListener(e, callback)
      node.callback = callback;
    });
  }

  off(e) {
    this.elements.forEach(node => {
      node.removeEventListener(e, node.callback);
    });
  }

  attr(attribute, value) {

      if (!value) {
        if (this.elements[0].attributes[attribute] === undefined) {
          return undefined
        } else {
        return this.elements[0].attributes[attribute].nodeValue
        }

      } else {
        this.elements.forEach((element) => {
          if (element.attributes[attribute]) {
            element.attributes[attribute].nodeValue= value;
          } else {
            element.setAttribute(attribute, value);
          }
        });
      }
  }

  css(propertyName, value) {
    this.elements[0].style[propertyName] = value;
  }

  addClass(classNames) {
    this.elements.forEach(element => {
      if (element.classList.length === 0) {
      element.setAttribute("class", classNames)
      } else {
        let classNamesSplit = classNames.split(" ");
        for(let i = 0; i < classNamesSplit.length; i++) {
          element.classList.add(classNamesSplit[i]);
        }

      }
    });
  }
  //
  removeClass(classNames) {
    if (!classNames) {
      this.elements.forEach(element => {
        element.setAttribute("class", "");
      });
    } else {
      let classNamesSplit = classNames.split(" ");
      this.elements.forEach(element => {
        let classListLength = element.classList.length;

        for(let i = 0; i < classListLength; i++) {
          for (let j = 0; j < classNamesSplit.length; j++) {
            if (element.classList[i] === classNamesSplit[j]) {
              element.classList.remove(classNamesSplit[j]);
            }
          }
        }
      });
    }
  }

}

// module.exports = DOMNodeCollection;
/* harmony default export */ __webpack_exports__["default"] = (DOMNodeCollection);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);
const main_functions = __webpack_require__(2);
const GameView = __webpack_require__(3);


  $l(function() {
   new GameView();
   console.log("Like what you see? Hire me- Miqueas Bello")
  })


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(0);
// const DOMNodeCollection = require("./dom_node_collection.js");

//
function $l(selector) {

  if(document.readyState === "complete" && typeof selector === "function") {
    selector();
  }

  let queue = [];

  if (typeof selector === "string") {
    let nodelist = document.querySelectorAll(selector);
    let nodelistArray = Array.from(nodelist);
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["default"](nodelistArray)
  } else if (typeof selector === "function") {
    queue.push(selector)
  }

  document.addEventListener("DOMContentLoaded", () => {
    for(let i = 0; i < queue.length; i++){
      queue[i]();
    }
  });
}

  $l.extend = (...args) => {
    return Object.assign(...args);
  }

  $l.ajax = (optionsObject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(optionsObject.type, optionsObject.url);
    xhr.send();
    xhr.onload = function () {
    console.log(xhr.status);
    console.log(JSON.parse(xhr.response));
    }
  }

window.$l = $l


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(4);

class GameView {
  constructor() {
    this.difficulty = undefined;
    this.intervalId;
    this.difficulty;
    this.inSession;

    this.render = this.render.bind(this);

// to start of game and restart game
    $l("button").on("click", (event) => {
      if (this.inSession != "animating") {
        let id = event.currentTarget.id;
        //calls on method to start the session
        this.startSession(id);
      }
    });

//key controls
    $l("body").on("keydown", this.handleKeyDown.bind(this));
  }

  startSession(difficultyLevel) {
    //to ensure the buttons cannot be repressed until the animations are over
    this.inSession = "animating";
    //changes the snake-emoji css id so that it can animate away
    $l(".snake-emoji").attr("id", "snake-leave");
    //check to see which window is curently up- start game or game over
    let gameOverDiv = $l(".game-over");
    //chnages the css id of which over window is up to animate it out
    if (gameOverDiv.elements[0].id === "hidden") {
      $l(".game-start").attr("id", "window-exit");
    } else {
      $l(".game-over").attr("id", "window-exit");
    }
    //set thing to this to have access to GameView inside the setTimeout method
    const thing = this;
    //makes sure the game starts 3 seconds later, giving enough time for above animations to occur
    window.setTimeout(function(){

      thing.board = new Board();
      //sets the speed according to the difficulty chosen
      thing.intervalId = window.setInterval(thing.render, timeIntervals[difficultyLevel]);
      //makes the play button appear atop the grid area
      $l(".fas.fa-play.top").attr("id", " ");
      $l(".fas.fa-pause.top").attr("id", "hidden");
      //method to set the difficulty from the css id of the clicked button

        function difficultyFromId(difficultyLevel) {
          let array = Array.from(difficultyLevel);
          //will cut off "difficulty-" from id
          let level = array.slice(11);
          return level.join("");
        }

      thing.difficulty = difficultyFromId(difficultyLevel);
      //resets the css ids of elements below
      $l(".snake-emoji").attr("id", " ")
      $l(".game-start").attr("id", "hidden");
      $l(".game-over").attr("id", "hidden");
      $l(".fas.fa-pause.side").attr("id", " ");
      $l(".fas.fa-pause.play").attr("id", "hidden");
      $l(".snake-game").attr("id", " ");
      thing.inSession = true;
    }, 3000)

  }

  handleKeyDown(e) {
    //directions and well as pausing and unpausing the game
    if (directionKeys[e.keyCode] && this.inSession === true) {
      this.board.snake.turn(directionKeys[e.keyCode])
    } else if (e.keyCode === 32 && this.inSession === true) {
      this.inSession = false;
      $l(".fas.fa-play.top").attr("id", "hidden");
      $l(".fas.fa-play.side").attr("id", " ");
      $l(".fas.fa-pause.top").attr("id", " ");
      $l(".fas.fa-pause.side").attr("id", "hidden");
    } else if (e.keyCode === 32 && this.inSession === false) {
      this.inSession = true;
      $l(".fas.fa-play.top").attr("id", " ");
      $l(".fas.fa-play.side").attr("id", "hidden");
      $l(".fas.fa-pause.top").attr("id", "hidden");
      $l(".fas.fa-pause.side").attr("id", " ");
    }
  }

//this method tests to see which coords on grid the snake is on
//this tests every snake segment against one particular li of the grid given
  coordsEquate(elementCoord, snakeSegments) {

    let isMatch = false;
    snakeSegments.forEach((segment, idx) => {
      if (segment[0] === elementCoord[0] && segment[1] === elementCoord[1]) {
        //if the elementcoords and the snake segment matches, it will return the
        //sprite name that was determined for that segment
        isMatch = segment[4];
      }
    });
    return isMatch;
  }

  appleCoordsMatch(elementCoord, appleCoords) {
    let isMatch = false;
      if (appleCoords[0] === elementCoord[0] && appleCoords[1] === elementCoord[1]) {
        isMatch = true;
      }
    return isMatch;
  }

  render() {

    if (this.board.score > 0 && this.board.score % 10 === 0) {
      $l(".snake-emoji-runner").attr("id", "snake-run");
    }

    if (this.board.loosingCollisions()) {


      this.inSession = undefined;
      window.clearInterval(this.intervalId);

      //this is so the grid rotates upon losing
      $l(".snake-game").attr("id", "rotate");
      $l(".fas.fa-play.top").attr("id", "hidden");
      this.board.snake.direction = "none";

      //change the classname of the gameover div in order to display it
      //allows for above animation to take place before displaying the game over window

      let thing = this;

      window.setTimeout(function() {
        $l(".game-over").attr("id", " ");
        $l(".game-over p#final-score").html(`Your scored <b> ${thing.board.score} points </b> on <b> ${thing.difficulty} difficulty </b>`);
        $l(".fas.fa-pause.top").attr("id", "hidden");
        $l(".fas.fa-play.side").attr("id", "hidden");
        $l(".fas.fa-pause.side").attr("id", " ");
      }, 1000);
    }

    if (this.inSession === true) {
      $l(".snake-game").html(" ");

      this.board.snake.move();

      for (let i = 0; i < this.board.grid[this.board.grid.length - 1][1]; i++) {
        $l(".snake-game").append("<ul>")
      }

      const ulListItems = () => {
        let items = "";

        for (let i = 0; i < this.board.grid[this.board.grid.length - 1][1]; i++) {
          items += "<li>";
        }
        return items;
      }

      $l(".snake-game ul").append(ulListItems());

      let coord1 = 0 // applies to horizontal
      let coord2 = 0; // applies to vertical

      $l(".snake-game li").elements.forEach(element => {
        element.coord = [coord1, coord2];

        //now render the snake segments as css snake-segment class
        //test to see if the element is a snake segment
        let snakeSegmentSpriteName = this.coordsEquate(element.coord, this.board.snake.segments);

        if (snakeSegmentSpriteName != false) {
          //if the function returns with a direction and positio, set that element.className to that
          //snake sprite
          element.className = snakeSegmentSpriteName;
        }

        // element.textContent = `${coord2}`;
        if (this.appleCoordsMatch(element.coord, this.board.apple.coord)) {
          element.className = "apple";
        }

        //testing position of appleSnake collision detection
        if (this.board.snakeAppleCollision()) {
          this.board.newApple();
          this.board.snake.grow();
          this.board.score += 10;
        }

        if (coord1 + 1 > 19) {
          coord1 = 0;
        } else {
          coord1 += 1;
        }

        if (coord1 === 0) {
          coord2 += 1;
        }

      });

      if (this.board.snake.size === 1) {
        $l("#points").html("Points: 0");
        $l("#length").html("Snake length: 1 link");
        $l("#difficulty").html(`Difficulty: ${this.difficulty}`);
      } else {
        $l("#points").html(`Points: ${this.board.score}`);
        $l("#length").html(`Snake length: ${this.board.snake.size} links`);
        $l("#difficulty").html(`Difficulty: ${this.difficulty}`);
      }
    }

    $l(".points-counter p").html(`${this.board.score}`)

//this will turn the icons in the control green depending on current direction
    if (this.board.snake.direction === "up") {
      $l(`.fas.fa-arrow-alt-circle-up.fa-2x`).css("color", "green");
    } else {
      $l(`.fas.fa-arrow-alt-circle-up.fa-2x`).css("color", "black");
    }

    if (this.board.snake.direction === "left") {
      $l(`.fas.fa-arrow-alt-circle-left.fa-2x`).css("color", "green");
    } else {
      $l(`.fas.fa-arrow-alt-circle-left.fa-2x`).css("color", "black");
    }

    if (this.board.snake.direction === "down") {
      $l(`.fas.fa-arrow-alt-circle-down.fa-2x`).css("color", "green");
    } else {
      $l(`.fas.fa-arrow-alt-circle-down.fa-2x`).css("color", "black");
    }

    if (this.board.snake.direction === "right") {
      $l(`.fas.fa-arrow-alt-circle-right.fa-2x`).css("color", "green");
    } else {
      $l(`.fas.fa-arrow-alt-circle-right.fa-2x`).css("color", "black");
    }
  }

}

directionKeys = {
  38: "up",
  39: "right",
  40: "down",
  37: "left"
};

timeIntervals = {
  "difficulty-easy": 300,
  "difficulty-medium": 200,
  "difficulty-hard":100,
  "difficulty-extreme": 70
}

module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(5);
const Apple = __webpack_require__(7);

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const assignSpriteFunctions = __webpack_require__(6);


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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

class Apple {
  constructor(coord) {
    this.coord = coord
  }
}

module.exports = Apple;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map