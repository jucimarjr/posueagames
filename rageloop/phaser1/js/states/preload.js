(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            this.stage.backgroundColor = '#ccc';
        },
        create: function () {},
        update: function() {            
            //this.game.state.start('Menu');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));