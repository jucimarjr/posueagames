(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            //this.stage.backgroundColor = '#ccc';
            
           	/* game sounds */
            this.game.load.audio('bgsound','assets/audio/imperial.wav');
            this.game.load.audio('falling','assets/audio/falling.mp3');
            this.game.load.audio('bomb','assets/audio/bomb.mp3');
            this.game.load.audio('crash','assets/audio/impact.mp3');
            this.game.load.audio('blaster','assets/audio/blaster.wav');

            /*menu images*/
            this.game.load.image('menuTitle', 'assets/menu/titlemenu_346-193.png');
            this.game.load.image('menubg','assets/menu/bgmenu_1600-600.png');
            //this.game.load.image('menubg','assets/menu/bgmenu_960-600.png');
            this.game.load.spritesheet('playbtn','assets/menu/btnplay_434-50.png', 217, 50);

            /*gameover images*/
            //this.game.load.image('replaybtn','assets/menu/play_again_button.png');
            this.game.load.image('gameoverbg','assets/gameover/gameover_960-600.png');
            this.game.load.spritesheet('replaybtn', 'assets/gameover/playagain_479-25.png', 239.5, 25);
            
            /*gameplay images*/
            this.game.load.image('player', './assets/player_205-94.png');
            this.game.load.image('bg', './assets/bg_1600-600.jpg');
            this.game.load.image('fg', './assets/fg_1998-224.png');
            this.game.load.image('enemy', './assets/enemy_205-94.png');
            this.game.load.spritesheet('probedroid', './assets/probedroid_300-250-2.png', 150, 250);
            this.game.load.image('bullet', './assets/bullet_86-43.png');
            this.game.load.spritesheet('powerups', './assets/powerups_180-60.png', 60, 60);
            this.game.load.spritesheet('enemy_explosion', './assets/xplosionsprite_2145-100.png', 165, 100);
            this.game.load.spritesheet('player_fire', './assets/shooting_150-24.png', 50, 24);

            this.game.load.image('smoke', './assets/smoke_32-32.png');

        },
        create: function () {},
        update: function() {            
            this.game.state.start('Menu');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));
