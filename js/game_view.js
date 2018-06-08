const Board = require("./board.js");

class GameView {
  constructor() {
    this.difficulty = undefined;
    this.intervalId;
    this.difficulty;
    this.inSession;

    this.render = this.render.bind(this);

// to start of game and restart game
    $l("button").on("click", (event) => {

      let id = event.currentTarget.id;
//this will set the difficulty level before starting the game.
      if (id === "difficulty-easy") {
        $l(".snake-emoji").attr("id", "snake-leave");

        let gameOverDiv = $l(".game-over");

        if (gameOverDiv.elements[0].id === "hidden") {
          $l(".game-start").attr("id", "window-exit");
        } else {
          $l(".game-over").attr("id", "window-exit");
        }

        const thing = this;
        setTimeout(function(){
          thing.board = new Board();
          thing.inSession = true;
          thing.intervalId = window.setInterval(thing.render, 300);
          $l(".fas.fa-play.top").attr("id", " ");
          $l(".fas.fa-pause.top").attr("id", "hidden");
          thing.difficulty = "easy";
          $l(".snake-emoji").attr("id", " ")
          $l(".game-start").attr("id", "hidden");
          $l(".game-over").attr("id", "hidden");
        }, 3000);

      } else if (id === "difficulty-medium") {
        $l(".snake-emoji").attr("id", "snake-leave");

        let gameOverDiv = $l(".game-over");

        if (gameOverDiv.elements[0].id === "hidden") {
          $l(".game-start").attr("id", "window-exit");
        } else {
          $l(".game-over").attr("id", "window-exit");
        }

        const thing = this;
        setTimeout(function(){
          thing.board = new Board();
          thing.inSession = true;

          thing.intervalId = window.setInterval(thing.render, 200);
          console.log(thing)

          $l(".fas.fa-play.top").attr("id", " ");
          $l(".fas.fa-pause.top").attr("id", "hidden");
          thing.difficulty = "easy";
          // console.log(this.difficulty)
          $l(".snake-emoji").attr("id", " ")
          $l(".game-start").attr("id", "hidden");
          $l(".game-over").attr("id", "hidden");
        }, 3000);
      } else if (id === "difficulty-hard") {
        $l(".snake-emoji").attr("id", "snake-leave");

        let gameOverDiv = $l(".game-over");

        if (gameOverDiv.elements[0].id === "hidden") {
          $l(".game-start").attr("id", "window-exit");
        } else {
          $l(".game-over").attr("id", "window-exit");
        }

        const thing = this;
        setTimeout(function(){
          thing.board = new Board();
          thing.inSession = true;

          thing.intervalId = window.setInterval(thing.render, 100);
          console.log(thing)

          $l(".fas.fa-play.top").attr("id", " ");
          $l(".fas.fa-pause.top").attr("id", "hidden");
          thing.difficulty = "easy";
          // console.log(this.difficulty)
          $l(".snake-emoji").attr("id", " ")
          $l(".game-start").attr("id", "hidden");
          $l(".game-over").attr("id", "hidden");
        }, 3000);
      } else if (id === "difficulty-extreme") {
        $l(".snake-emoji").attr("id", "snake-leave");

        let gameOverDiv = $l(".game-over");

        if (gameOverDiv.elements[0].id === "hidden") {
          $l(".game-start").attr("id", "window-exit");
        } else {
          $l(".game-over").attr("id", "window-exit");
        }

        const thing = this;
        setTimeout(function(){
          thing.board = new Board();
          thing.inSession = true;

          thing.intervalId = window.setInterval(thing.render, 70);
          console.log(thing)

          $l(".fas.fa-play.top").attr("id", " ");
          $l(".fas.fa-pause.top").attr("id", "hidden");
          thing.difficulty = "easy";
          // console.log(this.difficulty)
          $l(".snake-emoji").attr("id", " ")
          $l(".game-start").attr("id", "hidden");
          $l(".game-over").attr("id", "hidden");
        }, 3000);
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
