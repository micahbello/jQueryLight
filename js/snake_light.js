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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
const main_functions = __webpack_require__(2);
const GameView = __webpack_require__(7);


  $l(function() {
   let board = new GameView();
  })


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
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

const Coord = __webpack_require__(4);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {class Coord {
  constuctor() {
  }

  plus() {

  }

  equals() {

  }

  isOpposite() {
    
  }

}

module.export = Coord;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(3);
const Apple = __webpack_require__(8);

class Board {
  constructor() {
    this.grid = this.makeGrid();
    this.snake = new Snake();
    this.apple = new Apple(this.randomAppleCoord());
    this.score = 0;
    this.inSession = true;
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
      console.log("HOOOO")
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

    if (this.snake.segments[0][0] < 0 || this.snake.segments[0][0] > 20
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(6);

class GameView {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.intervalId = window.setInterval(this.render.bind(this), 200);
    // this.inSession = true;

    $l("body").on("keydown", this.handleKeyDown.bind(this));

  }

  handleKeyDown(e) {
    if (directionKeys[e.keyCode]) {
      this.board.snake.turn(directionKeys[e.keyCode])
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
      this.board.inSession = false;
      window.clearInterval(this.intervalId);
      $l("p").html("hello")
    }


    if (this.board.inSession === true) {
      $l("section").html(" ");

      this.board.snake.move();

      for (let i = 0; i < this.board.grid[this.board.grid.length - 1][1]; i++) {
        $l("section").append("<ul>")
      }

      const ulListItems = () => {
        let items = "";

        for (let i = 0; i < this.board.grid[this.board.grid.length - 1][1]; i++) {
          items += "<li>";
        }
        return items;
      }

      $l("ul").append(ulListItems());

      let coord1 = 0 // applies to horizontal
      let coord2 = 0; // applies to vertical
      $l("li").elements.forEach(element => {
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
        $l(".score").html("size: 1 link | score: 0")
      } else {
        $l(".score").html(`size: ${this.board.snake.size} links | score: ${this.board.score}`)
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
/* 8 */
/***/ (function(module, exports) {

class Apple {
  constructor(coord) {
    this.coord = coord
  }
}

module.exports = Apple;


/***/ })
/******/ ]);