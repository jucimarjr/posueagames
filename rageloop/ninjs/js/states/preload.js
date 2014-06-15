(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {

            /* audios */
            this.game.load.audio('bgsound','assets/sounds/gameplay_audio.ogg');
            this.game.load.audio('gameoversound','assets/sounds/game_over.ogg');            
            this.game.load.audio('shuriken_sound','assets/sounds/thrown_shuriken.mp3');
            this.game.load.audio('click','assets/sounds/click.mp3');

            /*Menu assets*/
            this.game.load.image('menu_bg','assets/images/menuBg_960-600.png');
            this.game.load.spritesheet('start_btn','assets/sprites/start_btn_199-114.png', 199, 57);
            this.game.load.spritesheet('reset_btn','assets/sprites/reset_btn_199-114.png', 199, 57);

            this.game.load.spritesheet('restart_btn','assets/sprites/start_btn_199-114.png', 199, 57);

            /*Gameplay assets*/
            this.game.load.spritesheet('ninjas', 'assets/sprites/sheetninjas_2879-587.png', 89, 84);
            this.game.load.tilemap('map', 'assets/maps/level.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('background','assets/sprites/background2_960-600.jpg');
            this.game.load.image('tileset','assets/sprites/tileset.png');
            this.game.load.image('shuriken', 'assets/sprites/shuriken-ninjs_32-31.png');
            this.game.load.image('shuriken_enemy', 'assets/sprites/shuriken-enemy_28-27.png');
            this.game.load.image('ninja_life', 'assets/images/vida-hud-27-26.png');
        },
        create: function () {},
        update: function() {
            this.game.state.start('StoryPresentation');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));