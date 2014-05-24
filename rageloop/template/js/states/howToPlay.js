(function (app_container) {
    
    function HowToPlay() {};

    HowToPlay.prototype = {

        create: function () {
            this.stage.backgroundColor = '#ccc';
        },

        update: function() {},        
    };

    app_container.HowToPlay = HowToPlay;

}(window.app_container = window.app_container || {}));