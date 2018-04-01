var MainMenu = {
  load: function (con) {
    let row = createElement("div", "row", "main-menu");
    this.getPlayersData(con);

    return row;
  },

  getPlayersData: function () {
    console.log(con);
  }
}
