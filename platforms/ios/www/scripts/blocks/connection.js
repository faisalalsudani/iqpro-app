/**
 * Instantiatable object for the connections to the server.
 */
var Connection = {
    // Let get the user inzet (workload).
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

      xhr.open("GET", url + "/?per_page=20");
      // xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(null);
    }
}
