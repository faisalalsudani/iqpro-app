/*jslint browser:true, devel:true */
/*global con, cleanNode*/

/**
 * Created by kmarijs on 13/07/2017.
 */

/**
 * Let's move pages
 * @param pageTo        Name of the page
 * @param input         Can have extra data.
 */
function nextPage(pageTo, input) {
    "use strict";
    let page = document.getElementById("body");
    page.style.backgroundImage = "";

    cleanNode(page);

    // Modals
    let row_modals = createElement("div", "row", "modals");
    page.appendChild(row_modals);

    // Content
    let new_page;
    eval("new_page = " + pageTo + ".load(input)"); // (page, input)
    page.appendChild(new_page);
}

/**
 * Remove the child Elements of a Node.
 */
function cleanNode(node) {
    "use strict";
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

/**
 * We create a lot of Elements, this will help that lot.
 */
function createElement(element_type, element_class, element_id) {
    "use strict";
    let element = document.createElement(element_type);

    if (element_class !== undefined) {
        element.className = element_class;

        if (element_id !== undefined) {
            element.id = element_id;
        }
    }

    return element;
}

/**
 * Function that tries to find out if it is an App or Website.
 */
function isApp() {
    return window.cordova && !(window.device && window.device.isVirtual);
}

/***
    Our way of making sure user can get to other webpage...
    For App part see:
    http://stackoverflow.com/questions/17887348/phonegap-open-link-in-browser
***/
function gotoURL(link) {
    // check if has correct start
    if (!link.includes("http://") && !link.includes("https://")) {
        link = "http://" + link;
    }

    if (isApp()) {
        if (device.platform.toUpperCase() === 'ANDROID') {
            navigator.app.loadUrl(link, {
                openExternal: true
            });
        } else if (device.platform.toUpperCase() === 'IOS') {
            window.open(link, '_system');
        }

    } else {
        var redirectWindow = window.open(link, '_blank');
        redirectWindow.location;
    }
}


var Commons = {
    getImgURL: function (file_name) {
        return "url(img/" + file_name + ")";
    },

    copyObject: function(object) {
        return JSON.parse(JSON.stringify(object));
    },

    /**
     * To keep it more secure, load the data from a JSON file, and not .js.
     */
    loadJSONFromFile: function (file_name, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) { //  && this.status == 200
                callback(JSON.parse(this.responseText));
            }
        };

        xhr.open("GET", file_name, false);
        xhr.send();
    },

    /**
     * file_names: Array
     * callback, when done, what to do
     */
    loadJSONFromFiles: function(store, file_names, callback) {
        if (file_names.length > 0) {
            let self = this; // get a var to the scope
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (this.readyState == 4) { //  && this.status == 200
                    store[file_names[0][0]] = JSON.parse(this.responseText);

                    let new_list = file_names.slice(1); // Shift don't work correcly here
                    self.loadJSONFromFiles(store, new_list, callback);
                }
            };

            xhr.open("GET", file_names[0][1], true);
            xhr.send();

        } else {
            callback();
        }
    }
}

var PageElements = {
    createNavBar: function (con, back_page, title, user_name) {
        "use strict";
        let div = createElement("div", "col-xs-12 row", "nav-bar");

        // Back
        let back = createElement("div", "col-xs-1 button-back", "button-back");
        back.addEventListener("click", function () {
            nextPage(back_page, con);
        });
        let back_icon = createElement("span", "glyphicon glyphicon-triangle-left");
        back.appendChild(back_icon);
        div.appendChild(back);

        // Title
        let title_div = createElement("div", "col-xs-5", "nav-page-title");
        let title_inner = createElement("h4");
        title_inner.innerHTML = title;
        title_div.appendChild(title_inner);
        div.appendChild(title_div);

        // User
        /*
        if (typeof user_name === 'undefined' || !user_name) {
            let user_div = createElement("div", "col-xs-5", "nav-username");
            let user_inner = createElement("h4");
            user_inner.innerHTML = con.settings.user.username;
            user_div.appendChild(user_inner);
            // So we can go to Page Dossier
            user_div.addEventListener("click", function () {
                nextPage("Dossier");
            });
            div.appendChild(user_div);
        }
        */

        return div;
    }
}
