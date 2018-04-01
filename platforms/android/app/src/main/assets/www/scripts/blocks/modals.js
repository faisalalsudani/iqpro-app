var Modals = {
    createModal: function (header, content) {
      let modal_div = createElement("div", "modal");
      modal_div.id = "modal-input";
      modal_div.setAttribute("role", "dialog");
      modal_div.setAttribute("tabindex", "-1");
      modal_div.setAttribute("aria-labelledby", "myModalLabel");

      let modal_dialog = createElement("div", "modal-dialog modal-lg");
      modal_dialog.setAttribute("role", "document");

      // Content
      let modal_content = createElement("div", "modal-content");

      // Header
      let modal_header_div = createElement("div", "modal-header");

      let header_button = this.createCloseButton();
      modal_header_div.appendChild(header_button);

      let modal_header = createElement("h3");
      modal_header.innerHTML = header;
      modal_header_div.appendChild(modal_header);

      modal_content.appendChild(modal_header_div);

      // Body
      let model_body = createElement("div", "modal-body");
      let model_body_container = createElement("div", "container-fluid");
      let model_body_row = createElement("div", "row");
      model_body_row.innerHTML = "<div class='col-xs-12 waiting-modal'><p>" + content + "</p></div>";

      model_body_container.appendChild(model_body_row);
      model_body.appendChild(model_body_container);
      modal_content.appendChild(model_body);

      // Buttons // type, text, callback, value
      let modal_footer = createElement("div", "row modal-footer");
      let btn_close = Buttons.createModalButton("btn btn-default col-xs-3 col-xs-offset-1", con.lang.btn_cancel, this.closeModal);
      modal_footer.appendChild(btn_close);
      // let btn_save = Buttons.createModalButton("btn btn-primary col-xs-3 col-xs-offset-4", con.lang.btn_save, this.passCallback, callback);
      // modal_footer.appendChild(btn_save);
      modal_content.appendChild(modal_footer);

      modal_dialog.appendChild(modal_content);
      modal_div.appendChild(modal_dialog);

      let modal_hook = document.getElementById("modals");
      modal_hook.appendChild(modal_div);
    },

    createModalAlert: function (con) {
        let modal_hook = document.getElementById("modals");
        let alert_container = createElement("div", "container-fluid");
        let alert_row = createElement("div", "row");
        let alert_div = createElement("div", "col-xs-12","alert");
        alert_div.innerHTML = con.lang.user_message_login_error;
        let btn_close = Buttons.createModalButton("btn-alert-close", "x", this.closeModal);
        alert_div.appendChild(btn_close);
        alert_row.appendChild(alert_div);
        alert_container.appendChild(alert_row);
        modal_hook.appendChild(alert_container);

        Modals.animateAlert();
    },

    // Modal for no connection
    createModalConnection: function (con) {
        let modal_hook = document.getElementById("modals");
        let connection_container = createElement("div", "container-fluid");
        let connection_row = createElement("div", "row");
        let connect_div = createElement("div", "col-xs-12","connection");
        connect_div.innerHTML = con.lang.error_aanmelden;
        let btn_close = Buttons.createModalButton("btn-alert-close", "x", this.closeModal);
        connect_div.appendChild(btn_close);
        connection_row.appendChild(connect_div);
        connection_container.appendChild(connection_row);
        modal_hook.appendChild(connection_container);

        Modals.animateConnection();
    },

    // Animate the connection modal
    animateConnection: function(){
        var connection = document.getElementById("connection");
        var bottom = -100;
        var id = setInterval(frame, 5);
        function frame() {
            if (bottom == 0) {
                clearInterval(id);
            } else {
                bottom++;
                connection.style.bottom = bottom + 'px';
                connection.style.display = 'block';
                connection.style.opacity = 1;
            }
        }
    },

    passCallback: function (callback) {
        let value = JSON.parse(JSON.stringify(document.getElementById("url-input").value));
        Modals.closeModal();
        callback(value);
    },

    createCloseButton: function () {
        // Modal close button
        let header_button = createElement("button", "close");
        header_button.setAttribute("data-dismiss", "modal");
        header_button.setAttribute("aria-label", "Close");

        let close = createElement("span", "glyphicon glyphicon-remove");
        close.setAttribute("aria-hidden", "true");
        // close.innerHTML = "&times;";

        let self = this;
        header_button.appendChild(close);
        header_button.addEventListener("click", function () {
            self.closeModal();
        });

        return header_button;
    },

    closeModal: function () {
        let modals = document.getElementById("modals");
        cleanNode(modals);
    },

    createModalAlert: function (con) {
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

    // Modal for no connection
    createModalConnection: function (con) {
        let modal_hook = document.getElementById("modals");
        let connection_container = createElement("div", "container-fluid");
        let connection_row = createElement("div", "row");
        let connect_div = createElement("div", "col-xs-12","connection");
        connect_div.innerHTML = con.lang.error_aanmelden;
        let btn_close = Buttons.createModalButton("btn-alert-close", "x", this.closeModal);
        connect_div.appendChild(btn_close);
        connection_row.appendChild(connect_div);
        connection_container.appendChild(connection_row);
        modal_hook.appendChild(connection_container);

        Modals.animateConnection();
    }
}
