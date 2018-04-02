var MainMenu = {
  load: function (con) {
    (con);
    let row = createElement("div", "row", "main-menu");
    Connection.getPosts(con, this.showPosts, this.onError);

    // Create sub nav.
    let tabs = this.createNewsNav(con);
    row.appendChild(tabs);

    // Create div for content.
    let news_content = createElement("div", "col-xs-12 row", "news-content");
    row.appendChild(news_content);

    $('body').prepend(this.topNavbar());

    return row;
  },

  // top nav_bar
  topNavbar: function () {
    let header = createElement("header");
    let top_navbar = createElement("div", "navbar navbar-expand-lg navbar-dark bg-dark")
    let top_navbar_jus = createElement("div", "");
    let navbar_logo = createElement("a", "navbar-brand");
    navbar_logo.setAttribute("href", "#");
    navbar_logo.innerHTML = "IQ-PRO";
    top_navbar.appendChild(navbar_logo);



    let navbar_toggler = createElement("button", "navbar-toggler");
    navbar_toggler.setAttribute("type", "button");
    navbar_toggler.setAttribute("data-toggle", "collapse");
    navbar_toggler.setAttribute("data-target", "#navbarText");
    navbar_toggler.setAttribute("aria-controls", "navbarText");
    navbar_toggler.setAttribute("aria-expanded", false);
    navbar_toggler.setAttribute("aria-label", "Toggle navigation");
    let navbar_toggler_icon = createElement("span", "navbar-toggler-icon");
    navbar_toggler.appendChild(navbar_toggler_icon);
    top_navbar.appendChild(navbar_toggler);

    let menu_collapse_div = createElement("div", "collapse navbar-collapse", "navbarText");
    let menu_ul = createElement("ul", "navbar-nav");

    for (var i = 0; i < con.lang.main_menu.length; i++) {
      let menu_li = createElement("li", "nav-item", "nav-item-" + i);
      menu_li.innerHTML = con.lang.main_menu[i];

      if (i === 1) {
        menu_li.addEventListener("click", function() {
          $('#players-container').remove();

          nextPage("AllPlayers", con);
          document.getElementById("navbarText").classList.remove("show");
        });
      }
      menu_ul.appendChild(menu_li);
    }


    menu_collapse_div.appendChild(menu_ul);
    top_navbar.appendChild(menu_collapse_div);
    top_navbar_jus.appendChild(top_navbar);
    header.appendChild(top_navbar_jus);

    return header;
  },

  /**
   * Let's get to the settings screen.
   */
  backToSettings: function (con) {
      $('header').remove()
      nextPage("MainMenu", con);
  },

  /**
   * Function to create the Nav menu for the Dossier.
   */
  createNewsNav: function(con) {
    let tabs = createElement("div", "row col-xs-12", "nav-tabs");// TABS MENU

    let menu_items = con.lang.menus;

    for (let i = 0; i < menu_items.length; i++) {
        let menu_item = createElement("div", "col-xs-4 nav-btn-tab");
        menu_item.setAttribute("id", "nav-btn-tab-" + i);
        let menu_item_name = createElement("h4", "tab");
        menu_item_name.innerHTML = menu_items[i];
        menu_item.appendChild(menu_item_name);

        if (i === 2) {
          menu_item.classList.add("active");
        }

        menu_item.addEventListener("click", function () {
            toggle(i, menu_item);

            if (i === 0) {
              Connection.getIraqiTeamNews(con, this.showPostsNational, this.onError);
              MainMenu.showPostsNational(con);
            } else if ( i === 1) {
              Connection.getIraqiLeaugeNews(con, this.showPostsLeauge, this.onError);
              MainMenu.showPostsLeauge(con);
            } else {
              MainMenu.showPosts(con);
            }
        });


        tabs.appendChild(menu_item);

        function toggle(i, menu_item) {

          // Toggle title css
          let nav_buttons = document.getElementsByClassName("nav-btn-tab");
          Array.from(nav_buttons).forEach(
            function(element, index, array) {
              if (element.id === "nav-btn-tab-" + i) { // clicked button
                element.classList = "col-xs-4 nav-btn-tab active";
              } else {
                element.classList = "col-xs-4 nav-btn-tab";
              }
            }
          );
      }
    }

    return tabs;
  },

  showPosts: function (con) {
    let news_content = document.getElementById("news-content");
    $(news_content).empty()

    let posts_container = createElement("div", "container posts-container", "posts-container");
    let posts = con.posts;

    let waiting_for_response = createElement("button", "btn btn-lg btn-red");
    let waiting_for_response_span = createElement("span", "glyphicon glyphicon-refresh spinning");
    waiting_for_response.innerHTML = "الرجاء الأنتظار ";
    waiting_for_response.appendChild(waiting_for_response_span);

    if (posts !== undefined) {
      for (var i = 0; i < posts.length; i++) {
        let single_post = createElement("div", "row single-post", posts[i].id);
        let singl_post_card = createElement("div", "card");
        let single_post_card_image = createElement("img", "card-img-top");
        single_post_card_image.setAttribute("src", posts[i].better_featured_image.source_url);
        let single_post_card_body = createElement("div", "card-body");
        let post_title = createElement("h4", "post-title");
        post_title.innerHTML = posts[i].title.rendered;
        let post_excerpt = createElement("p", "card-text");
        var post_excerpt_txt = posts[i].excerpt.rendered;
        var length = 150;
        var post_excerpt_txt_trim = post_excerpt_txt.length > length ? post_excerpt_txt.substring(0, length - 3) + "..." : post_excerpt_txt;
        post_excerpt.innerHTML = post_excerpt_txt_trim;
        let post_read_more = createElement("a", "btn btn-red");
        post_read_more.innerHTML = "أقرا المزيد";

        // This slightly ugly way works to get the value stored that we need later on.
        let post_id = JSON.parse(JSON.stringify(posts[i]));


        post_read_more.addEventListener("click", function () {
            con.current_post_id = JSON.parse(JSON.stringify(post_id));
            nextPage("Dossier", con);
        });

        singl_post_card.appendChild(single_post_card_image);
        single_post_card_body.appendChild(post_title);
        single_post_card_body.appendChild(post_excerpt);
        single_post_card_body.appendChild(post_read_more);
        singl_post_card.appendChild(single_post_card_body);
        single_post.appendChild(singl_post_card);
        posts_container.appendChild(single_post);
      }
    } else {
      $("#news-content").append(waiting_for_response);
    }

    $("#news-content").append(posts_container);
  },


  showPostsLeauge: function (con) {
    let news_content = document.getElementById("news-content");
    $(news_content).empty()

    let waiting_for_response = createElement("button", "btn btn-lg btn-red");
    let waiting_for_response_span = createElement("span", "glyphicon glyphicon-refresh spinning");
    waiting_for_response.innerHTML = "الرجاء الأنتظار ";
    waiting_for_response.appendChild(waiting_for_response_span);

    let posts_container = createElement("div", "container posts-container", "posts-container");
    let iraqi_leauge_news = con.iraqi_leauge_news;
    if (iraqi_leauge_news !== undefined) {
      for (var i = 0; i < iraqi_leauge_news.length; i++) {
        let single_post = createElement("div", "row single-post", iraqi_leauge_news[i].id);
        let singl_post_card = createElement("div", "card");
        let single_post_card_image = createElement("img", "card-img-top");
        single_post_card_image.setAttribute("src", iraqi_leauge_news[i].better_featured_image.source_url);
        let single_post_card_body = createElement("div", "card-body");
        let post_title = createElement("h4", "post-title");
        post_title.innerHTML = iraqi_leauge_news[i].title.rendered;
        let post_excerpt = createElement("p", "card-text");
        var post_excerpt_txt = iraqi_leauge_news[i].excerpt.rendered;
        var length = 150;
        var post_excerpt_txt_trim = post_excerpt_txt.length > length ? post_excerpt_txt.substring(0, length - 3) + "..." : post_excerpt_txt;
        post_excerpt.innerHTML = post_excerpt_txt_trim;
        let post_read_more = createElement("a", "btn btn-red");
        post_read_more.innerHTML = "أقرا المزيد";
        singl_post_card.appendChild(single_post_card_image);
        single_post_card_body.appendChild(post_title);
        single_post_card_body.appendChild(post_excerpt);
        single_post_card_body.appendChild(post_read_more);
        singl_post_card.appendChild(single_post_card_body);
        single_post.appendChild(singl_post_card);
        posts_container.appendChild(single_post);
      }
    } else {
      $("#news-content").append(waiting_for_response);
    }

    $("#news-content").append(posts_container);
  },

  showPostsNational: function (con) {
    let news_content = document.getElementById("news-content");
    $(news_content).empty()

    let waiting_for_response = createElement("button", "btn btn-lg btn-red");
    let waiting_for_response_span = createElement("span", "glyphicon glyphicon-refresh spinning");
    waiting_for_response.innerHTML = "الرجاء الأنتظار ";
    waiting_for_response.appendChild(waiting_for_response_span);

    let posts_container = createElement("div", "container posts-container", "posts-container");
    let iraqi_team_news = con.iraqi_team_news;
    if (iraqi_team_news !== undefined) {
      for (var i = 0; i < iraqi_team_news.length; i++) {
        let single_post = createElement("div", "row single-post", iraqi_team_news[i].id);
        let singl_post_card = createElement("div", "card");
        let single_post_card_image = createElement("img", "card-img-top");
        single_post_card_image.setAttribute("src", iraqi_team_news[i].better_featured_image.source_url);
        let single_post_card_body = createElement("div", "card-body");
        let post_title = createElement("h4", "post-title");
        post_title.innerHTML = iraqi_team_news[i].title.rendered;
        let post_excerpt = createElement("p", "card-text");
        var post_excerpt_txt = iraqi_team_news[i].excerpt.rendered;
        var length = 150;
        var post_excerpt_txt_trim = post_excerpt_txt.length > length ? post_excerpt_txt.substring(0, length - 3) + "..." : post_excerpt_txt;
        post_excerpt.innerHTML = post_excerpt_txt_trim;
        let post_read_more = createElement("a", "btn btn-red");
        post_read_more.innerHTML = "أقرا المزيد";

        singl_post_card.appendChild(single_post_card_image);
        single_post_card_body.appendChild(post_title);
        single_post_card_body.appendChild(post_excerpt);
        single_post_card_body.appendChild(post_read_more);
        singl_post_card.appendChild(single_post_card_body);
        single_post.appendChild(singl_post_card);
        posts_container.appendChild(single_post);
      }
    } else {
        $("#news-content").append(waiting_for_response);
    }

    $("#news-content").append(posts_container);
  },

  onError: function () {
    ("error");
  }
}
