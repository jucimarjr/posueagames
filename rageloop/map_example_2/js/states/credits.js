
(function (app_container) {
    
    function Credits() {};

    Credits.prototype = {

        create: function () {
            this.stage.backgroundColor = '#ccc';
        },

        update: function() {},        
    };

    app_container.Credits = Credits;

}(window.app_container = window.app_container || {}));