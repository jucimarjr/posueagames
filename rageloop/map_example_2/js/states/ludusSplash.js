/*global setTimeout, Config, Phaser*/

(function (app_container) {
    
    function LudusSplash() {};

    LudusSplash.prototype = {

        create: function () {
            this.stage.backgroundColor = '#ccc';
        },

        update: function() {},        
    };

    app_container.LudusSplash = LudusSplash;

}(window.app_container = window.app_container || {}));