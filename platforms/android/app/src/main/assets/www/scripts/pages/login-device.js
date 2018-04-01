
var LoginDevice = {
    /**
     * Creating the page for the user to interact with.
     */
    load: function (con) {
        if (con.settings.server_call_success && con.settings.auto_login) {
            this.preLoginCheck(con, con.settings.server_url);
            return createElement("div"); // else we get warning that cannot be appended.

        } else {
            return this.createDeviceLogin(con)
        }
    },

    /**
     * Check the device if it's a browser or not!.
     */

    isBrowser: function () {
        if (device.platform === "browser") {
            return true;
        }
    },

    /**
     * We need to show stuff.
     */
    createDeviceLogin: function (con) {
        let row = createElement("div", "row", "login");

        var uuid;

        if (LoginDevice.isBrowser()) {
            uuid = "cordova_browser";
        } else {
            uuid = device.uuid;
        }

        // Store for later use.
        con.settings.uuid = uuid;

        // Show Accouche Logo
        let logo = createElement("div", "col-xs-8 col-xs-offset-2", "logo");
        let img = createElement("img");
        img.src = "images/accouche_logo.png";
        logo.appendChild(img);
        row.appendChild(logo);

        let uuid_div = createElement("div", "col-xs-8 col-xs-offset-2 device-id");
        let uuid_title = createElement("label");
        let device_uuid = createElement("h5", "device_id");
        device_uuid.innerHTML = uuid;
        uuid_title.innerHTML = (con, "DeviceId", con.lang.deviceuuid);
        uuid_title.setAttribute("for", "device-id");
        uuid_div.appendChild(uuid_title);
        uuid_div.appendChild(device_uuid);
        row.appendChild(uuid_div);

        // Company, we need at least 3 letters (is stored)
        let company_div = createElement("div", "form-group col-xs-8 col-xs-offset-2 company-input");
        let company_title = createElement("label");
        company_title.innerHTML = con.lang.set_url;
        company_title.setAttribute("for", "company-input");
        company_div.appendChild(company_title);
        let company_input = createElement("input", "form-control", "company-input");
        company_input.setAttribute("list", "company-list");
        company_input.setAttribute("placeholder", con.lang.set_url_hint);
        if (con.settings.server_url) {
            company_input.setAttribute("value", con.settings.server_url);
        }

        if (LoginDevice.isBrowser()) {
            company_input.setAttribute("value", "https://accouche.eljakim.nl/api_test/api");
        }


        company_div.appendChild(company_input);
        row.appendChild(company_div);

        // Button.
        let btn_login_div = createElement("div", "col-xs-8 col-xs-offset-2");
        let btn_login = Buttons.createButton("btn-primary btn-login rad-bl btn-url", con.lang.btn_Sign_Up, LoginDevice.preLoginCheck, con);


        btn_login_div.appendChild(btn_login)
        row.appendChild(btn_login_div);

        let company_url = company_input.value;
        // If the input field not empty, go to next page!
        if (company_url !== "") {
            con.settings.server_url = company_url;
            Connection.getUsersForDevice(con, LoginDevice.preLoginCorrect, LoginDevice.preLoginError);
        }

        return row;
    },

    /**
     * Check user company URL.
     */
    preLoginCheck: function (con, company_url) {
        if (company_url === undefined) {
            company_url = document.getElementById("company-input").value;
        }

        if (LoginDevice.isBrowser()) {
            company_input.setAttribute("value", "https://accouche.eljakim.nl/api_test/api");
        }

        // fast check for valid
        if (company_url.indexOf("https://") !== -1) {
            con.settings.server_url = company_url;
            Connection.getUsersForDevice(con, LoginDevice.preLoginCorrect, LoginDevice.preLoginError);

        // Warn user for not valid url.
        } else {
            LoginDevice.preLoginError("Missing https:// from url, input: " + company_url);
        }
    },

    /**
     * Everything is correct and we can proceed.
     */
    preLoginCorrect: function (con, users) {
        let user_list = JSON.parse(users);
        con.settings.users = user_list;
        con.settings.server_call_success = true;
        con.settings.auto_login = false;

        if (user_list.length > 0) {
            nextPage("LoginUser", con);

        } else {
            LoginDevice.preLoginError("No users listed for this UuId!");
        }
    },

    /**
     * Something has gone wrong.
     */
    preLoginError: function (con, status, error) {
        // Do something with the error.
        console.log(con);
        let no_connection_div = createElement("div", "no-connection", "no-connection");
        let no_connection_p = createElement("p");
        no_connection_p.innerHTML = con.lang.no_connection;
        let no_connection_reload_button = createElement("button","btn btn-primary", "reload-page");
        no_connection_reload_button.innerHTML = con.lang.reload_page;
        no_connection_div.appendChild(no_connection_p);
        no_connection_div.appendChild(no_connection_reload_button);
        $("#body").append(no_connection_div);

        $("#reload-page").click(function() {
            $("html, body").animate({
                width: [ "toggle", "swing" ],
                height: [ "toggle", "swing" ],
                opacity: "toggle"
            }, 100, function() {
                setTimeout(function() {
                    location.reload();
                }, 100)
            });
        });
    }
}
