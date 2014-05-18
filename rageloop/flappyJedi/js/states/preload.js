(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            this.stage.backgroundColor = '#ccc';

            this.game.load.image('player', './assets/player_205-94.png');
            this.game.load.image('bg', './assets/bg_1600-600.jpg');
            this.game.load.image('fg', './assets/fg_1998-224.png');
            this.game.load.image('enemy', './assets/enemy_463-127.png');
            this.game.load.image('bullet', './assets/bullet_43-43.png');
        },
        create: function () {},
        update: function() {            
            this.game.state.start('Gameplay');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));