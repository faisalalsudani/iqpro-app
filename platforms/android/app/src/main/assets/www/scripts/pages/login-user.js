/**
 * Let's pick a user and login.
 */
var LoginUser = {
    load: function (con) {
        con.settings.user = {};
        let row = createElement("div", "row", "login");

        // Show Accouche Logo
        let logo = createElement("div", "col-xs-8 col-xs-offset-2", "logo");
        let img = createElement("img");
        img.src = "images/accouche_logo.png";
        logo.appendChild(img);
        row.appendChild(logo);

        // Show options to login with
        for (var u = 0; u < con.settings.users.length; u++) {
            let border_class = ""
            if (u === 0) {
                border_class += "rad-tr";
            }

            var user_div = LoginUser.createUserSelectable(con, con.settings.users[u], border_class);

            if (con.settings.users.length === 1) {
                var user_div = LoginUser.selectOneUser(con, con.settings.users[u], border_class)
            }

            row.appendChild(user_div);
        }





        // PIN (code, 5 digits, not stored)
        let pin_div = createElement("div", "form-group col-xs-8 col-xs-offset-2");
        let pin_title = createElement("label");
        pin_title.innerHTML = con.lang.pin_code;
        pin_title.setAttribute("for", "password-input");
        pin_div.appendChild(pin_title);
        let pin_input = createElement("input", "form-control", "password-input");
        pin_input.setAttribute("placeholder", con.lang.input_hint_pin);
        pin_input.setAttribute("type", "number");
        pin_input.setAttribute("style", "-webkit-text-security:disc");
        pin_input.setAttribute("autofocus", "");

        if (isApp()) {
            pin_input.classList.add('to-top');
            Keyboard.show();
        }


        pin_div.appendChild(pin_input);
        row.appendChild(pin_div);

        // Buttons // type, text, callback, value
        // Back button
        let btn_back_div = createElement("div", "col-xs-4 col-xs-offset-2");
        let btn_back = Buttons.createButton("btn-back rad-bl btn-url", con.lang.btn_settings, this.backToSettings, con);
        btn_back_div.appendChild(btn_back)
        row.appendChild(btn_back_div);

        // Login button
        let btn_login_div = createElement("div", "col-xs-4");
        let btn_login = Buttons.createButton("btn-primary btn-login rad-br", con.lang.btn_login, LoginUser.preUserLogin, con);
        btn_login_div.appendChild(btn_login)
        row.appendChild(btn_login_div);

        return row;
    },

    /*
     * Listen to the user selected.
     */
    createUserSelectable: function (con, user, border_class) {
        var user_div = createElement("div", "user-selectable col-xs-8 col-xs-offset-2", "user-" + user.med_id);
        var user_name = createElement("h4", "btn " + border_class);
        user_name.innerHTML = user.med_voorletters + " " + user.med_geslachtsnaam;
        user_div.appendChild(user_name);

        var options = document.getElementsByClassName("user-selectable");

        user_div.addEventListener("click", function () {
            for (var i = 0; i < options.length; i++) {
                if (options[i].classList.contains("selected")) {
                    options[i].classList.toggle('selected');
                }
            }

            con.settings.user = user;
            document.getElementById("user-" + user.med_id).classList.toggle('selected');
        });



        return user_div;
    },

    /*
     * If there is only one user wil be automaticlly selected.
     */
    selectOneUser: function (con, user, border_class) {
        var user_div = createElement("div", "selected user-selectable col-xs-8 col-xs-offset-2", "user-" + user.med_id);
        var user_name = createElement("h4", "btn " + border_class);
        user_name.innerHTML = user.med_voorletters + " " + user.med_geslachtsnaam;
        user_div.appendChild(user_name);
        con.settings.user = user;
        return user_div;
    },


    preUserLogin: function (con) {
        let pin = document.getElementById("password-input").value;
        Connection.loginUser(con, pin, LoginUser.userCorrect, LoginUser.userError);
    },

    /**
     * All has been approved from the server, we are in!
     */
    userCorrect: function (con, response) {
        con.settings.token = response.replace(/"/g, ""); // yea, we need to remove unnessesairy quotes "/.
        Storage.storeSettings(con);
        nextPage("MainMenu", con);
    },

    userError: function (error) {
        // Do something with the error.
        let modal_hook = document.getElementById("modals");
        let alert_container = createElement("div", "container-fluid");
        let alert_row = createElement("div", "row");
        let alert_div = createElement("div", "col-xs-12","alert");
        alert_div.innerHTML = con.lang.user_message_login_error;
        let btn_close = Buttons.createModalButton("glyphicon glyphicon-remove btn-alert-close", " ", this.closeModal);
        alert_div.appendChild(btn_close);
        alert_row.appendChild(alert_div);
        alert_container.appendChild(alert_row);
        modal_hook.appendChild(alert_container);
    },

    /**
     * Let's get to the settings screen.
     */
    backToSettings: function (con) {
        con.settings.auto_login = false;
        nextPage("LoginDevice", con);
    }
}
