(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {

            this.progressBar = this.add.sprite(0, 300, 'progressBar_bar');
            this.load.setPreloadSprite(this.progressBar);

            var style = { font: "36px pixelFont", fill: "#ffffff"};
            var loadingText = this.game.add.text(this.game.world.width/2, this.game.world.height/2 + 100, 'Loading...', style);
            loadingText.anchor.set(0.5, 0.5);

            /* audios */
            this.game.load.audio('bgsound','assets/sounds/bgsound.mp3');
            this.game.load.audio('gameoversound','assets/sounds/gameover.mp3');
            this.game.load.audio('shuriken_sound','assets/sounds/thrown_shuriken.mp3');
            this.game.load.audio('click','assets/sounds/click.mp3');

            /*history*/
            this.game.load.image('history_1','assets/images/history/scene01_960-600.png');
            this.game.load.image('history_2','assets/images/history/scene02_960-600.png');
            this.game.load.image('history_3','assets/images/history/scene03_960-600.png');
            
            /*Menu assets*/
            this.game.load.image('menu_bg','assets/images/menuBg_960-600.png');
            this.game.load.spritesheet('start_btn','assets/sprites/start_btn_199-114.png', 199, 57);
            this.game.load.spritesheet('credits_btn','assets/sprites/credits_btn_199-114.png', 199, 57);
            this.game.load.spritesheet('back_btn','assets/sprites/back_btn_199-114.png', 199, 57);
            this.game.load.spritesheet('howto_btn','assets/sprites/howto_btn_199-114.png', 199, 57);
            this.game.load.spritesheet('menu_btn','assets/sprites/menu_btn_199-114.png', 199, 57);


            this.game.load.spritesheet('restart_btn','assets/sprites/start_btn_199-114.png', 199, 57);

            /*Gameplay assets*/
            this.game.load.spritesheet('ninjas', 'assets/sprites/sheetninjas_2879-587_2.png', 89, 84);
            this.game.load.image('background','assets/sprites/background3_960-600.png');
            this.game.load.image('tileset','assets/sprites/tileset.png');
            this.game.load.image('shuriken', 'assets/sprites/shuriken-ninjs_32-31.png');
            this.game.load.image('shuriken_enemy', 'assets/sprites/shuriken-enemy_28-27.png');
            this.game.load.image('ninja_life', 'assets/images/vida-hud-27-26.png');
            this.game.load.image('blood_particle', 'assets/sprites/red_particle_5-5.png');

            /*Maps*/
            this.game.load.tilemap('map1', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('map2', 'assets/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
            
            /*GameOver assets*/
            this.game.load.image('gameover_bg','assets/images/gameOverBg_960-600.png');

            /*How to Play*/
            this.game.load.image('howto_bg','assets/images/HowToPlay_960-600.png');

        },
        create: function () {},
        update: function() {
            this.game.state.start('StoryPresentation');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));