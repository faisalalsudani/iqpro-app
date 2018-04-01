var MainMenu = {
  load: function (con) {
    let row = createElement("div", "row", "main-menu");
    this.getPlayersData(con);
    Connection.getPosts(con, this.showPosts, this.onError);
    // row.appendChild(this.topNavbar());

    $('body').prepend(this.topNavbar());
    this.showPosts(con);
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
    let menu_li = createElement("li", "nav-item");
    menu_li.innerHTML = "HOME";
    menu_ul.appendChild(menu_li);
    menu_collapse_div.appendChild(menu_ul);
    top_navbar.appendChild(menu_collapse_div);
    top_navbar_jus.appendChild(top_navbar);
    header.appendChild(top_navbar_jus);

    return header;
  },

  // parsePosts: function (raw_posts) {
  //   let posts = JSON.parse(raw_posts);
  //   con.posts = posts;
  // },

  showPosts: function (con) {
    let posts_container = createElement("div", "container posts-container", "posts-container");
    let posts = con.posts;
    console.log(con);
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
        singl_post_card.appendChild(single_post_card_image);
        single_post_card_body.appendChild(post_title);
        single_post_card_body.appendChild(post_excerpt);
        single_post_card_body.appendChild(post_read_more);
        singl_post_card.appendChild(single_post_card_body);
        single_post.appendChild(singl_post_card);
        posts_container.appendChild(single_post);
      }
    }

    $("#body").append(posts_container);
    // return posts_container;
  },

  getPlayersData: function () {
    // console.log(con);
    console.log(con.players);
  },

  onError: function () {
    console.log("error");
  }
}
