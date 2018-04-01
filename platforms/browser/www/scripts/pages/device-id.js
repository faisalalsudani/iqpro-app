
var DeviceId = {
    load: function (con) {
        let row = createElement("div", "row", "login");


        // Show company
        let nav = PageElements.createNavBar(con, "LoginCompanyUuid", con.settings.company_name);
        row.appendChild(nav);

        let uuid_div = createElement("div", "col-xs-8 col-xs-offset-2 device-id");
        let uuid_title = createElement("label");
        let device_uuid = createElement("p");
        device_uuid.innerHTML = "23985AF647";
        uuid_title.innerHTML = (con, "DeviceId", con.lang.deviceuuid);
        uuid_title.setAttribute("for", "device-id");
        uuid_div.appendChild(uuid_title);
        uuid_div.appendChild(device_uuid);
        row.appendChild(uuid_div);


        // Buttons // type, text, callback, value
        // Login button
        let btn_login_div = createElement("div", "col-xs-8 col-xs-offset-2");
        let btn_login = Buttons.createButton("btn-primary btn-login", con.lang.btn_ok, LoginUser.preUserLogin, con);
        btn_login_div.appendChild(btn_login)
        row.appendChild(btn_login_div);

        let set_url_div = createElement("div", "col-xs-8 col-xs-offset-2 set-url");
        let set_url_title = createElement("label");
        set_url_title.innerHTML = (con, "DeviceId", con.lang.set_url);
        let set_url_input = createElement("input", "form-control", "set-url-input");
        set_url_div.appendChild(set_url_title);
        set_url_div.appendChild(set_url_input);
        row.appendChild(set_url_div);

        return row;
    },

}

function emptyCallback() {

}
