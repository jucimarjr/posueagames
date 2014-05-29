(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            this.game.load.spritesheet('saci', '../map_example_1/assets/saci_75-116.png', 75, 116);
            this.game.load.tilemap('map', 'assets/maps/map01.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tileset','assets/sprites/tileset.png');
        },
        create: function () {},
        update: function() {
            this.game.state.start('Gameplay');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));