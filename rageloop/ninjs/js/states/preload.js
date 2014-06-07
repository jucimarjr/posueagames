(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {

            /*Menu assets*/
            this.game.load.image('menu_bg','assets/images/menuBg_960-600.png');
            this.game.load.spritesheet('start_btn','assets/sprites/start_btn_199-114.png', 199, 57);
            this.game.load.spritesheet('reset_btn','assets/sprites/reset_btn_199-114.png', 199, 57);

            /*Gameplay assets*/
            this.game.load.spritesheet('ninjas', 'assets/sprites/ninjas_2879-587.png', 89, 83);
            this.game.load.tilemap('map', 'assets/maps/level.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tileset','assets/sprites/tileset.png');
            this.game.load.image('shuriken', 'assets/sprites/shuriken-ninjs_32-31.png');
            this.game.load.image('shuriken_enemy', 'assets/sprites/shuriken-enemy_28-27.png');
        },
        create: function () {},
        update: function() {
            this.game.state.start('Menu');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));