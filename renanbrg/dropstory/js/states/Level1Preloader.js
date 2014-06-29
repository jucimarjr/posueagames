State.Level1Preloader = function(game) {
    "use strict";

    this.game = game;
};

State.Level1Preloader.prototype = {
	preload: function () {

        var background = this.game.add.sprite(0, 0, 'level1preloaderbg');
        this.progressBar = this.game.add.sprite(120, 530, 'progress-bar');
        this.game.load.setPreloadSprite(this.progressBar);

        this.game.load.spritesheet('urchin',
                'assets/spritesheets/seaurchin_80-40.png', 40, 40);
        this.game.load.spritesheet('lifedrop',
                'assets/spritesheets/water_200-40.png', 40, 40);
        this.game.load.spritesheet('crab','assets/spritesheets/crab_150-69.png', 150, 69);
        this.game.load.spritesheet('energy','assets/spritesheets/energy_200-40.png', 40, 40);
        this.game.load.spritesheet('dropinstraw',
                'assets/spritesheets/dropinstraw_5280-70.png', 480, 70);

        this.game.load.image('gameplay-bg',  Config.gamePlay.dir);

        this.game.load.tilemap('map', 'assets/newlevel1_4480-544.json', null,
                Phaser.Tilemap.TILED_JSON);
        this.game.load.image('wetsand', 'assets/images/wetsand_32-32.png');
        this.game.load.image('hotsand', 'assets/images/hotsand_32-32.png');
        this.game.load.image('platform', 'assets/images/platform_160-64.png');
        this.game.load.image('seashell', 'assets/images/seashell_224-64.png');
        this.game.load.image('can', 'assets/images/can_320-128.png');
        this.game.load.image('bucket', 'assets/images/bucket_384-480.png');
        this.game.load.image('diagonalstraw', 'assets/images/straw_224-256.png');
        this.game.load.image('sunscreen', 'assets/images/sunscreen_288-96.png');
        this.game.load.image('seaurchin',
                'assets/spritesheets/seaurchin_80-40.png');
        this.game.load.image('glass', 'assets/images/glass_288-320.png');
        this.game.load.image('strawground', 'assets/images/straw_480-64.png');
        this.game.load.image('strawtipleft',
                'assets/images/strawtipleft_15-20.png');
        this.game.load.image('strawtipright',
                'assets/images/strawtipright_15-20.png');
        this.game.load.image('smoke', './assets/images/smoke_32-32.png');
        this.game.load.audio('jump','assets/waterDrop.mp3');
        this.game.load.audio('main','assets/gotaMain.mp3');
        this.game.load.audio('powup','assets/gotaPowerUp.mp3');
    },
    create: function() {
        "use strict";

        this.game.add.tween(this.progressBar).to({alpha : 0}, 1000,
                Phaser.Easing.Linear.None).start();

        setTimeout(function(timer) {
            clearTimeout(timer);
            this.game.state.start('level1-state');
        }, 1000);
    },
};