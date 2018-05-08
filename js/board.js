class Board {
  constructor() {
    this.grid = this.makegrid();
  }


  makegrid() {
    for (let i = 0; i <= 21; i++) {
      $l("section").append("<ul>")
    }

    const ulListItems = () => {
      let items = "";
      for (let i = 0; i <= 21; i++) {
        items += "<li>";
      }
      return items;
    }
    //
    $l("ul").append(ulListItems())

  }



}

module.exports = Board;
