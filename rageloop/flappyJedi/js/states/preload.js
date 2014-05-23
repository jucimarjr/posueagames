(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            //this.stage.backgroundColor = '#ccc';
            
           	/* game sounds */
        	this.game.load.audio('startsound','assets/audio/startgame.mp3');
        	this.game.load.audio('bgsound','assets/audio/marchTeme.mp3');

            /*menu images*/
            this.game.load.image('menubg','assets/menu/bgmenu_960-600.png');
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
            this.game.load.image('bullet', './assets/bullet_86-43.png');
            this.game.load.spritesheet('powerups', './assets/powerups_240-60.png', 60, 60);

        },
        create: function () {},
        update: function() {            
            this.game.state.start('Menu');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));
