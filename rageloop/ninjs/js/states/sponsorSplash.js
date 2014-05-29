/*global setTimeout, Config, Phaser*/

(function (app_container) {
    
    function SponsorSplash() {};

    SponsorSplash.prototype = {

        create: function () {
            this.stage.backgroundColor = '#ccc';
        },

        update: function() {},        
    };

    app_container.SponsorSplash = SponsorSplash;

}(window.app_container = window.app_container || {}));