// We need to be able to store some stuff on the device.

var Storage = {
    /**
     * Store the settings, the once that matter anyway.
     */
    storeSettings: function (con) {
        let storage = window.localStorage;
        let base = {};
        if (con.settings.server_call_success) {
            base.server_call_success = true;
            base.server_url = con.settings.server_url;
        }

        storage.setItem("user_preffs", JSON.stringify(base));
    },

    /**
     * Get the settings, with the stored items, if available.
     */
    retrieveSettings: function (con, callback) {
        let storage = window.localStorage;
        let user_settings = JSON.parse(storage.getItem("user_preffs"));

        if (user_settings !== null) {
            if (user_settings.server_call_success) {
                con.settings.server_call_success = true;
                con.settings.server_url = user_settings.server_url;
            }
        }

        callback();
    }
}