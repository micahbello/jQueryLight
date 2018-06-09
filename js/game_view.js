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
      //sets the speed accroding to the difficulty chosen
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

    if (this.board.loosingCollisions() ) {
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
