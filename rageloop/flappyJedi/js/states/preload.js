(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            this.stage.backgroundColor = '#ccc';

            this.game.load.image('bike', './assets/bike_227-112.png');
        },
        create: function () {},
        update: function() {            
            this.game.state.start('Gameplay');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));