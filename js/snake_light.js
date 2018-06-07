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
/***/ (function(module, exports) {

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

module.exports = DOMNodeCollection;
// export default DOMNodeCollection;


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
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);
// import DOMNodeCollection from './dom_node_collection.js';
//
function $l(selector) {

  if(document.readyState === "complete" && typeof selector === "function") {
    selector();
  }

  let queue = [];

  if (typeof selector === "string") {
    let nodelist = document.querySelectorAll(selector);
    nodelistArray = Array.from(nodelist);
    return new DOMNodeCollection(nodelistArray)
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
    this.setIntervalId;
    this.difficulty;
    this.inSession;

    // this.render = this.render.bind(this);
    // this.intervalId = this.intervalId.bind(this);

// to start of game and restart game
    $l("button").on("click", (event) => {
      let id = event.currentTarget.id;

//this will set the difficulty level before starting the game.
      if (id === "difficulty-easy") {

        $l(".snake-emoji").attr("id", "snake-leave");
        // setTimeout(function(){
          this.board = new Board();
          this.inSession = true;
          this.intervalId = window.setInterval(this.render.bind(this), 300);
          $l(".fas.fa-play.top").attr("id", " ");
          $l(".fas.fa-pause.top").attr("id", "hidden");
          this.difficulty = "easy";
          $l(".snake-emoji").attr("id", " ")
          $l(".game-start").attr("id", "hidden");
          $l(".game-over").attr("id", "hidden");
        // }, 2000);
      } else if (id === "difficulty-medium") {
        this.board = new Board();
        this.inSession = true;
        this.intervalId = window.setInterval(this.render.bind(this), 200);
        $l(".fas.fa-play.top").attr("id", " ");
        $l(".fas.fa-pause.top").attr("id", "hidden");
        this.difficulty = "medium";
        $l(".game-start").attr("id", "hidden");
        $l(".game-over").attr("id", "hidden");
      } else if (id === "difficulty-hard") {
        this.board = new Board();
        this.inSession = true;
        this.intervalId = window.setInterval(this.render.bind(this), 100);
        $l(".fas.fa-play.top").attr("id", " ");
        $l(".fas.fa-pause.top").attr("id", "hidden");
        this.difficulty = "hard";
        $l(".game-start").attr("id", "hidden");
        $l(".game-over").attr("id", "hidden");
      } else if (id === "difficulty-extreme") {
        this.board = new Board();
        this.inSession = true;
        this.intervalId = window.setInterval(this.render.bind(this), 70);
        $l(".fas.fa-play.top").attr("id", " ");
        $l(".fas.fa-pause.top").attr("id", "hidden");
        this.difficulty = "extreme";
        $l(".game-start").attr("id", "hidden");
        $l(".game-over").attr("id", "hidden");
      }

    });

//key controls
    $l("body").on("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {

    //directions and well as pausing and unpausing the game
    if (directionKeys[e.keyCode]) {
      this.board.snake.turn(directionKeys[e.keyCode])
    } else if (e.keyCode === 32 && this.inSession === true) {
      this.inSession = false;
      $l(".fas.fa-play.top").attr("id", "hidden");
      $l(".fas.fa-pause.top").attr("id", " ");
    } else if (e.keyCode === 32 && this.inSession === false) {
      this.inSession = true;
      $l(".fas.fa-play.top").attr("id", " ");
      $l(".fas.fa-pause.top").attr("id", "hidden");
    }
  }

  coordsEquate(elementCoord, snakeSegments) {

    let isMatch = false;
    snakeSegments.forEach((segment, idx) => {
      if (segment[0] === elementCoord[0] && segment[1] === elementCoord[1]) {
        isMatch = true;
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
    if (this.board.loosingCollisions()) {
      this.inSession = undefined;
      window.clearInterval(this.intervalId);
      //change the classname of the gameover div in order to displat it
      $l(".game-over").attr("id", " ");
      $l(".game-over p#final-score").html(`Your scored <b> ${this.board.score} points </b> on <b> ${this.difficulty} difficulty </b>`);
      $l(".fas.fa-pause.top").attr("id", "hidden");
      $l(".fas.fa-play.top").attr("id", "hidden");
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

        if (this.coordsEquate(element.coord, this.board.snake.segments)) {
          element.className = "snake-segment";
          if (this.board.snake.segments[0][0] === element.coord[0]
            && this.board.snake.segments[0][1] === element.coord[1]) {
              element.textContent = ";)";
          }
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
  }

}

directionKeys = {
  38: "up",
  39: "right",
  40: "down",
  37: "left"
};



module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(5);
const Apple = __webpack_require__(6);

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {


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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Apple {
  constructor(coord) {
    this.coord = coord
  }
}

module.exports = Apple;


/***/ })
/******/ ]);