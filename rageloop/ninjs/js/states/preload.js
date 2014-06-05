(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            this.game.load.spritesheet('ninja', 'assets/sprites/ninja_475-34-16.png', 22, 34);
            this.game.load.tilemap('map', 'assets/maps/map01.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tileset','assets/sprites/tileset.png');
            this.game.load.image('shuriken', 'assets/sprites/shuriken_14-13.png');
        },
        create: function () {},
        update: function() {
            this.game.state.start('Gameplay');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));