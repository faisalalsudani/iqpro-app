/**
 * Instantiatable object for the connections to the server.
 */
var Connection = {
    // اخبار اللاعبين المحترفين
    getPosts: function (con, onSuccess, onError) {
      var url = "http://www.iq-pro.net/wp-json/wp/v2/posts";
      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              if (xhr.status == 200) {
                  var raw_posts = this.responseText;

                  let posts = JSON.parse(raw_posts);
                  con.posts = posts;

                  MainMenu.showPosts(con);

              } else {
                  onError(xhr.status, this.responseText);
              }
          }
      });

      xhr.open("GET", url + "/?categories=63&per_page=20");
      // xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(null);
    },

    // اخبار الدوري العراقي
    getIraqiLeaugeNews: function (con, onSuccess, onError) {
      var url = "http://www.iq-pro.net/wp-json/wp/v2/posts";
      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              if (xhr.status == 200) {
                  var raw_iraqi_leauge_posts = this.responseText;

                  let iraqi_leauge_posts = JSON.parse(raw_iraqi_leauge_posts);
                  con.iraqi_leauge_news = iraqi_leauge_posts;

                  MainMenu.showPostsLeauge(con);

              } else {
                  onError(xhr.status, this.responseText);
              }
          }
      });

      xhr.open("GET", url + "/?categories=67&per_page=20");
      // xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(null);
    },

    // اخبار المنتخب العراقي
    getIraqiTeamNews: function (con, onSuccess, onError) {
      var url = "http://www.iq-pro.net/wp-json/wp/v2/posts";
      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              if (xhr.status == 200) {
                  var raw_iraqi_team_posts = this.responseText;

                  let iraqi_team_posts = JSON.parse(raw_iraqi_team_posts);
                  con.iraqi_team_news = iraqi_team_posts;

                  MainMenu.showPostsNational(con);

              } else {
                  onError(xhr.status, this.responseText);
              }
          }
      });

      xhr.open("GET", url + "/?categories=64&per_page=20");
      // xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(null);
    }
}
