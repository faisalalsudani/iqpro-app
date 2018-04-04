// Dossier, let's show the data we have.

var Player = {
    load: function (con) {
        let row = createElement("div", "row", "dossier");

        $("#body").append(row);
        this.showPost(con);

        return row;
    },

    showPlayer: function (con) {
      // Buttons // type, text, callback, value
      // Back button
      let btn_back_div = createElement("div", "btn-back");
      let btn_back = Buttons.createButton("btn btn-red btn-back", con.lang.back_btn, MainMenu.backToSettings, con);
      btn_back_div.appendChild(btn_back)
      $("#body").append(btn_back_div);

      let post_container = createElement("div", "col-xs-12 post-container", "post"+con.current_post_id.id);
      let post_title = createElement("h4", "post-title");
      post_title.innerHTML = con.current_post_id.title.rendered;
      post_container.appendChild(post_title);

      let post_img_container = createElement("div", "post-image-container");
      let post_img = createElement("img", "post-image");
      post_img.setAttribute("src", con.current_post_id.better_featured_image.source_url);
      post_img_container.appendChild(post_img)
      post_container.appendChild(post_img_container);

      let post_meta_container = createElement("div", "col-xs-12 post-meta-container");
      let post_data_container = createElement("div", "col-xs-4 post-date");
      let post_date = createElement("p");
      var post_date_str = con.current_post_id.date;
      var post_datastr_rest = post_date_str.substr(0, 10);
      post_date.innerHTML = post_datastr_rest;
      post_data_container.appendChild(post_date);
      post_meta_container.appendChild(post_data_container);
      post_container.appendChild(post_meta_container);

      let post_content_container = createElement("div", "post-content-container");
      let post_content = createElement("p");
      post_content.innerHTML = con.current_post_id.content.rendered;
      post_content_container.appendChild(post_content);
      post_container.appendChild(post_content_container);

      $("#dossier").append(post_container);

    },

    errorPostMemo: function (con, data) {
        console.log(data);
    }
  }
