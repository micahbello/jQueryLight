const Board = require("./board.js");

class GameView {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.intervalId = window.setInterval(this.render.bind(this), 300);

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

  render() {
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

      if (this.coordsEquate(element.coord, this.board.snake.segments) === true) {
        element.className = "snake-segment";
        if (this.board.snake.segments[0][0] === element.coord[0]
          && this.board.snake.segments[0][1] === element.coord[1]) {
            element.textContent = ";)";
        }
      }

      // element.textContent = `${coord1}`;


      if (coord1 + 1 > 19) {
        coord1 = 0;
      } else {
        coord1 += 1;
      }

      if (coord1 === 0) {
        coord2 += 1;
      }

    });
  }

}

directionKeys = {
  38: "up",
  39: "right",
  40: "down",
  37: "left"
};


module.exports = GameView;
