// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.

/**
 * Globals
 */
var con; // con is short for container, where we store all stuff.

/**
* Load Pages
*/
requirejs([
    "blocks/commons",
    "blocks/buttons",
    "blocks/modals",
    "blocks/connection",
    "blocks/storage",
    "blocks/accouche",

    // Pages
    "pages/login-device",
    "pages/login-user",
    "pages/main-menu",
    "pages/dossier",
    "pages/device-id",

], function (util) {

	/**
	 * Different ways of starting up.
     */
    if (isApp()) {
        App.initialize();

    } else {
        App.preload();
    }
});

var App = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.preload.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.preload();
    },

    /**
     * Let's load the stuff we need.
     */
    preload: function() {
        con = {};

        let sets = [
            ["lang", "data/strings.json"],
            ["settings", "data/settings.json"]
        ];

        Commons.loadJSONFromFiles(con, sets, this.loadSettings.bind(this));
    },

    /**
     * Get me some settings, the once that were stored.
     */
    loadSettings: function () {
        Storage.retrieveSettings(con, App.onAppReady);
    },


    /**
     *** The App Starts Here ***
     */
    onAppReady: function() {
        console.log("App Ready");

        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
        document.addEventListener("backbutton", onBackKeyDown, false); // Back button EventListener for Android Back function

        var config = {
          apiKey: "AIzaSyDF975v59Czqj5s5ymOZ_hMFDa125NJMkk",
          authDomain: "iqpro-379a9.firebaseapp.com",
          databaseURL: "https://iqpro-379a9.firebaseio.com",
          projectId: "iqpro-379a9",
          storageBucket: "iqpro-379a9.appspot.com",
          messagingSenderId: "941055055231"
        };

        firebase.initializeApp(config);

        var database = firebase.database();

        var ref = database.ref('players');
        ref.on('value', dataSuccess, dataError);

        function dataSuccess(data) {
          con.players = data.val();

          nextPage("MainMenu", con);
        };

        function dataError(err) {
          console.log("error");
        }
    }

    // dataSuccess: function(data) {
    //     console.log(data);
    // },
    //
    // dataError: function(err) {
    //     console.log("error");
    // }
};

/**
 * Some events have their callback here:
 */
function onPause() {
}

function onResume() {
}

/**
 * Back button EventListener for Android Back function
 */
document.addEventListener("backbutton", onBackKeyDown, false);


/**
 * And the function itself.
 */
function onBackKeyDown() {
    var backbutton = document.getElementById("button-back");

    if (backbutton !== null) {
        backbutton.click();
    } else {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        } else {
            window.close();
        }
    }
}
