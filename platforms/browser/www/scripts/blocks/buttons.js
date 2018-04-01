
var Buttons = {
    createButton: function (type, text, callback, value) {
        // <button class="btn btn-default" type="submit">Button</button>

        let button = createElement("button", "btn " + type);
        button.setAttribute("type", "submit");
        button.innerHTML = text;
        button.addEventListener("click", function () {
            callback(value);
        });

        return button;
    },

    createModalButton: function (type, text, callback, value) {
        let button_div = createElement("div", "modal-button");
        let button_con = createElement("button", type);
        button_con.innerHTML = text;
        button_con.addEventListener("click", function () {
            callback(value);
        });
        button_div.appendChild(button_con);

        return button_div;
    }
}
