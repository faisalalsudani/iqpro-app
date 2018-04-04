var AllPlayers = {
  load: function (con) {
    let row = createElement("div", "row", "players");
    this.showPlayersNav(con);

    this.showPlayers(con);
    return row;
  },


  /**
   * Let's get to the settings screen.
   */
  backToSettings: function (con) {
      $('header').remove()
      nextPage("MainMenu", con);
  },

  showPlayersNav: function () {
    var back = document.getElementById("nav-item-0")
    back.addEventListener("click", function() {
      $('#players-navigator').remove();
      $('#players-container').remove();
      AllPlayers.backToSettings(con);
    });

    let players_nav = createElement("div", "container-fluid", "players-navigator");

    let players_nav_row = createElement("div", "row");
    let players_nav_div = createElement("div", "col-xs-12");
    let show_all_players = createElement("button", "btn btn-red");
    show_all_players.innerHTML = "عرض جميع اللاعبيين";
    players_nav_div.appendChild(show_all_players);
    players_nav_row.appendChild(players_nav_div);
    players_nav.appendChild(players_nav_row);

    show_all_players.addEventListener("click", function () {
      $('#players-container').remove();
      $(".players-contenent div").removeClass("btn-red-active");
      AllPlayers.showPlayers(con);
    });

    let players_contenent_nav = createElement("div", "row players-contenent");

    for (let i = 0; i < con.lang.contenents.length; i++) {
        let menu_item = createElement("div", "col-xs-3 players-contenent-nav nav-btn-tab");
        menu_item.setAttribute("id", "nav-btn-tab-" + i);
        let menu_item_name = createElement("h4", "tab");
        menu_item_name.innerHTML = con.lang.contenents[i];
        menu_item.appendChild(menu_item_name);

        menu_item.addEventListener("click", function () {

            if (i === 3) {
              $('#players-container').remove();
              AllPlayers.showPlayersAsia(con);
            } else if (i === 2) {
              $('#players-container').remove();
              AllPlayers.showPlayersEurop(con);
            } else if (i === 1) {
              $('#players-container').remove();
              AllPlayers.showPlayersAfrica(con);
            } else {
              $('#players-container').remove();
              AllPlayers.showPlayersAmrica(con);
            }
            toggle(i, menu_item);
        });


        players_contenent_nav.appendChild(menu_item);

        function toggle(i, menu_item) {

          // Toggle title css
          let nav_buttons = document.getElementsByClassName("nav-btn-tab");
          Array.from(nav_buttons).forEach(
            function(element, index, array) {
              if (element.id === "nav-btn-tab-" + i) { // clicked button
                element.classList = "col-xs-3 players-contenent-nav nav-btn-tab btn-red-active";
              } else {
                element.classList = "col-xs-3 players-contenent-nav nav-btn-tab";
              }
            }
          );
      }
    }

    players_nav.appendChild(players_contenent_nav);

    $('body').append(players_nav);
  },

  showPlayers: function (con) {
    let players_container = createElement("div", "container-fluid", "players-container");
    let players_row = createElement("div", "row", "players-row");

    $("#nav-item-1").remove();

    for (var i = 0; i < con.players.length; i++) {
      let players = createElement("div", "col-xs-6");
      let player_div = createElement("div", "player")

      let player_img = createElement("img", "player-img");
      player_img.setAttribute("style", "background-image:url(" + con.players[i].img + ")");
      player_div.appendChild(player_img);

      let player_team_country = createElement("div", "player-team-country flag-icon-background flag-icon-" + con.players[i].flag);
      player_div.appendChild(player_team_country);

      let player_name = createElement("h4", "player-name");
      player_name.innerHTML = con.players[i].name;
      player_div.appendChild(player_name);

      players.appendChild(player_div);
      players_row.appendChild(players)
    }

    players_container.appendChild(players_row);
    $('body').append(players_container);

  },

  showPlayersAsia: function () {
    let news_content = document.getElementById("players-container");
    $(news_content).empty()

    let players_container = createElement("div", "container-fluid", "players-container");
    let players_row = createElement("div", "row", "players-row");

    for (var i = 0; i < con.players.length; i++) {
      if (con.players[i].continent === "اسيا") {
        let players = createElement("div", "col-xs-6");
        let player_div = createElement("div", "player")

        let player_img = createElement("img", "player-img");
        player_img.setAttribute("style", "background-image:url(" + con.players[i].img + ")");
        player_div.appendChild(player_img);

        let player_team_country = createElement("div", "player-team-country flag-icon-background flag-icon-" + con.players[i].flag);
        player_div.appendChild(player_team_country);

        let player_name = createElement("h4", "player-name");
        player_name.innerHTML = con.players[i].name;
        player_div.appendChild(player_name);

        players.appendChild(player_div);
        players_row.appendChild(players)
      }

      players_container.appendChild(players_row);
      $('body').append(players_container);
      }
  },

  showPlayersEurop: function () {
    let news_content = document.getElementById("players-container");
    $(news_content).empty()

    let players_container = createElement("div", "container-fluid", "players-container");
    let players_row = createElement("div", "row", "players-row");

    for (var i = 0; i < con.players.length; i++) {
      if (con.players[i].continent === "اوربا") {
        let players = createElement("div", "col-xs-6");
        let player_div = createElement("div", "player")

        let player_img = createElement("img", "player-img");
        player_img.setAttribute("style", "background-image:url(" + con.players[i].img + ")");
        player_div.appendChild(player_img);

        let player_team_country = createElement("div", "player-team-country flag-icon-background flag-icon-" + con.players[i].flag);
        player_div.appendChild(player_team_country);

        let player_name = createElement("h4", "player-name");
        player_name.innerHTML = con.players[i].name;
        player_div.appendChild(player_name);

        players.appendChild(player_div);
        players_row.appendChild(players)
      }

      players_container.appendChild(players_row);
      $('body').append(players_container);
      }
  },

  showPlayersAfrica: function () {
    let news_content = document.getElementById("players-container");
    $(news_content).empty()

    let players_container = createElement("div", "container-fluid", "players-container");
    let players_row = createElement("div", "row", "players-row");

    for (var i = 0; i < con.players.length; i++) {
      if (con.players[i].continent === "افريقيا" ) {
        let players = createElement("div", "col-xs-6");
        let player_div = createElement("div", "player")

        let player_img = createElement("img", "player-img");
        player_img.setAttribute("style", "background-image:url(" + con.players[i].img + ")");
        player_div.appendChild(player_img);

        let player_team_country = createElement("div", "player-team-country flag-icon-background flag-icon-" + con.players[i].flag);
        player_div.appendChild(player_team_country);

        let player_name = createElement("h4", "player-name");
        player_name.innerHTML = con.players[i].name;
        player_div.appendChild(player_name);

        players.appendChild(player_div);
        players_row.appendChild(players)
      }

      players_container.appendChild(players_row);
      $('body').append(players_container);
      }
  },

  showPlayersAmrica: function () {
    let news_content = document.getElementById("players-container");
    $(news_content).empty()

    let players_container = createElement("div", "container-fluid", "players-container");
    let players_row = createElement("div", "row", "players-row");

    for (var i = 0; i < con.players.length; i++) {
      if (con.players[i].continent === "الامريكتان") {
        let players = createElement("div", "col-xs-6");
        let player_div = createElement("div", "player")

        let player_img = createElement("img", "player-img");
        player_img.setAttribute("style", "background-image:url(" + con.players[i].img + ")");
        player_div.appendChild(player_img);

        let player_team_country = createElement("div", "player-team-country flag-icon-background flag-icon-" + con.players[i].flag);
        player_div.appendChild(player_team_country);

        let player_name = createElement("h4", "player-name");
        player_name.innerHTML = con.players[i].name;
        player_div.appendChild(player_name);

        players.appendChild(player_div);
        players_row.appendChild(players)
      }

      players_container.appendChild(players_row);
      $('body').append(players_container);
      }
  },

  onError: function () {
    console.log("error");
  }
}
