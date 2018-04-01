/**
 * Instantiatable object for the connections to the server.
 */
var Connection = {

    // Let's check who can login with this device.
    getUsersForDevice: function (con, onSuccess, onError) {
        var data = null;
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status == 200) {
                    onSuccess(con, this.responseText);
                } else {
                    onError(con);
                }
            }
        });

        xhr.open("GET", con.settings.server_url + "/medewerker/" + con.settings.uuid);
        xhr.send(data);
    },

    // Let's try to login the user.
    loginUser: function (con, pin, onSuccess, onError) {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status == 200) {
                    onSuccess(con, this.responseText);

                } else {
                    onError(xhr.status, this.responseText);
                }
            }
        });

        xhr.open("GET", con.settings.server_url + "/medewerker/" + con.settings.uuid + "/" + con.settings.user.med_id + "/login?pincode=" + pin);
        xhr.send(null);
    },

    // Let get the user inzet (workload).
    getInzet: function (con, onSuccess, onError) {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status == 200) {
                    onSuccess(con, this.responseText);

                } else {
                    onError(xhr.status, this.responseText);
                }
            }
        });

        xhr.open("GET", con.settings.server_url + "/inzet");
        xhr.setRequestHeader("token", con.settings.token);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(null);
    },

    // Let get the user rooster.
    getRooster: function (con, onSuccess, onError) {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status == 200) {
                    onSuccess(con, this.responseText);

                } else {
                    onError(xhr.status, this.responseText);
                }
            }
        });

        xhr.open("GET", con.settings.server_url + "/rooster");
        xhr.setRequestHeader("token", con.settings.token);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(null);
    },

    /*
    // Let's see what the user has to do, a planning.
    getPlanning: function (settings, onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status == 200) {
                    onSuccess(settings, this.responseText);

                } else {
                    onError(xhr.status, this.responseText);
                }
            }
        });

        xhr.open("GET", settings.server_url + "/rooster");
        xhr.setRequestHeader("token", settings.user.token);
        xhr.send(null);
    },
    */

    /**
     * Get dossier for the client.
     * Will return 404 if the dossier is from somthing before yesterday.
     */
    getDossierById: function (con, dossier_id, onSuccess, onError) {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status == 200) {
                    onSuccess(con, this.responseText);

                } else {
                    onError(xhr.status, this.responseText);
                }
            }
        });

        xhr.open("GET", con.settings.server_url + "/dossiers/" + dossier_id);
        xhr.setRequestHeader("token", con.settings.token);
        xhr.send(null);
    },

    // Post a memo to a Dossier.
    postMemo: function (con, dossier_id, memo, onSucces, onError) {
        var xhr = new XMLHttpRequest();
        $.ajax({
            type: 'POST',
            url:  con.settings.server_url + "/dossiers/" + dossier_id + "/memo",
            data: JSON.stringify(memo),
            contentType: "application/json",
            headers: { 'token': con.settings.token },
            dataType: "json",
        }).done(function(data) {
            var xhr = new XMLHttpRequest();
            var url = con.settings.server_url + "/dossiers/" + dossier_id;
            xhr.open("GET", url);
            xhr.setRequestHeader("token", con.settings.token);
            xhr.onload = function (data) {
                onSucces(con, xhr.responseText);
            };
            // xhr.onError = function (data) {
            //     onError(data);
            // };
            xhr.send();
            Dossier.newMemoForm(con);
            Dossier.showClientMemos(con)
        });


    }
}
