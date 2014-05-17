(function (app_container) {
    
    function Gameplay() {};

    Gameplay.prototype = {

        create: function () {
        	this.stage.backgroundColor = '#ccc';
        },

        update: function() {}, 
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));