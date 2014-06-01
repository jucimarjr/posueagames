(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {

            this.game.load.tilemap('map', 'assets/mapaVertical.json', null, Phaser.Tilemap.TILED_JSON);

            this.game.load.image('tileset','assets/images/tileset2.png');

            this.game.load.image('bg', 'assets/images/bg_960-600.png');

            this.game.load.spritesheet('saci', 'assets/images/saci_75-116.png', 75, 116);

            this.game.load.image('platform', 'assets/images/plataforma_120-30.png');

        },
        create: function () {},
        update: function() {
            this.game.state.start('Gameplay');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));