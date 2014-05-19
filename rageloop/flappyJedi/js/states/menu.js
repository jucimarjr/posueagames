(function (app_container) {
    
    function Menu() {};

    Menu.prototype = {

        create: function () {
            this.stage.backgroundColor = '#ccc';
        },

        update: function() {},        
    };

    app_container.Menu = Menu;

}(window.app_container = window.app_container || {}));