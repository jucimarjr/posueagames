State.Level1Preloader = function(game) {
    "use strict";

    this.game = game;
};

State.Level1Preloader.prototype = {
    preload: function () {

        this.background = this.game.add.sprite(0, 0, 'level1preloaderbg');
        this.progressBar = this.game.add.sprite(120, 530, 'progress-bar');
        this.game.load.setPreloadSprite(this.progressBar);

        this.game.load.spritesheet('urchin',
                'assets/spritesheets/seaurchin_80-40.png', 40, 40);
        this.game.load.spritesheet('lifedrop',
                'assets/spritesheets/water_200-40.png', 40, 40);
        this.game.load.spritesheet('crab',
                'assets/spritesheets/crab_160-80.png', 160, 80);
        this.game.load.spritesheet('energy',
                'assets/spritesheets/energy_200-40.png', 40, 40);
        this.game.load.spritesheet('sundrop',
                'assets/spritesheets/sunscreendrop_200-40.png', 40, 40);
        this.game.load.spritesheet('dropinstraw',
                'assets/spritesheets/dropinstraw_3840-80.png', 480, 80);
        this.game.load.spritesheet('umbrella',
                'assets/spritesheets/umbrella_240-80.png', 80, 80);

        this.game.load.image('gameplay-bg',
                'assets/images/backgroundlevel1_4800-600.png');
        this.game.load.image('pausesplash', Config.pause.dir);

        this.game.load.tilemap('map', 'assets/level1_4800-600.json', null,
                Phaser.Tilemap.TILED_JSON);
        this.game.load.image('wetsand', 'assets/images/wetsand_40-40.png');
        this.game.load.image('hotsand', 'assets/images/hotsand_40-40.png');
        this.game.load.image('platform', 'assets/images/platform_160-80.png');
        this.game.load.image('seashell', 'assets/images/seashell_120-40.png');
        this.game.load.image('can', 'assets/images/can_320-120.png');
        this.game.load.image('bucket', 'assets/images/bucket_360-480.png');
        this.game.load.image('diagonalstraw',
                'assets/images/diagonalstraw_240-280.png');
        this.game.load.image('sunscreen', 'assets/images/sunscreen_280-80.png');
        this.game.load.image('seaurchin',
                'assets/spritesheets/seaurchin_80-40.png');
        this.game.load.image('glass', 'assets/images/glass_280-320.png');
        this.game.load.image('strawtip',
                'assets/images/strawtip_40-40.png');
        this.game.load.image('smoke', './assets/images/smoke_32-32.png');
        this.game.load.audio('jump','assets/waterdrop.ogg');
        this.game.load.audio('main','assets/gotamain.ogg');
        this.game.load.audio('powup','assets/gotapowerup.ogg');
        this.game.load.audio('stageclear', 'assets/victory.ogg');
        this.game.load.audio('lose', 'assets/lose.ogg');
    },
    create: function() {
        "use strict";

        var tween = this.game.add.tween(this.progressBar).to({alpha : 0}, 1000,
                Phaser.Easing.Linear.None).start();
        tween.onComplete.add(this.tweenFinished, this);
    },
    tweenFinished: function() {
        var self = this;
        setTimeout(function(timer) {
            self.game.add.tween(self.background).to({alpha : 0}, 1000,
                    Phaser.Easing.Linear.None).start();
        }, 1000);

        setTimeout(function(timer) {
            self.game.state.start('level1-state');
        }, 2000);
    }
};
