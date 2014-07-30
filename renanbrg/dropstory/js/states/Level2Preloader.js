State.Level2Preloader = function(game) {
    "use strict";

    this.game = game;
};

State.Level2Preloader.prototype = {
    preload: function () {

        this.background = this.game.add.sprite(0, 0, 'level2preloaderbg');
        this.progressBar = this.game.add.sprite(120, 530, 'progress-bar');
        this.game.load.setPreloadSprite(this.progressBar);

        this.game.load.spritesheet('urchin',
                'assets/spritesheets/seaurchin_80-40.png', 40, 40);
        this.game.load.spritesheet('lifedrop',
                'assets/spritesheets/water_200-40.png', 40, 40);
        this.game.load.spritesheet('aciddrop',
                'assets/spritesheets/aciddrop_120-30.png', 40, 30);
        this.game.load.spritesheet('evildrop',
                'assets/spritesheets/evildrop_180-60.png', 60, 60);
        this.game.load.spritesheet('lifeup',
                'assets/images/life_80-80.png', 80, 80);
        this.game.load.spritesheet('crab',
                'assets/spritesheets/crab_160-80.png', 160, 80);
        this.game.load.spritesheet('energy',
                'assets/spritesheets/energy_200-40.png', 40, 40);
        this.game.load.spritesheet('umbrella',
                'assets/spritesheets/umbrella_240-80.png', 80, 80);
        this.game.load.image('gameplay-bg',
                'assets/images/backgroundlevel1_4800-600.png');
        this.game.load.tilemap('maplevel2', 'assets/level2_7680-600.json',
                null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('hotsand', 'assets/images/hotsand_40-40.png');
        this.game.load.image('platform', 'assets/images/platform_160-80.png');
        this.game.load.image('fakeplatform',
                'assets/images/fakeplatform_160-80.png');
        this.game.load.image('seashell',
                'assets/images/seashell_120-40.png');
        this.game.load.image('seaurchin',
                'assets/spritesheets/seaurchin_80-40.png');
        this.game.load.image('glass', 'assets/images/glass_280-320.png');
        this.game.load.image('smoke', './assets/images/smoke_32-32.png');
        this.game.load.image('pausesplash', Config.pause.dir);

        //audios
        this.game.load.audio('jump', 'assets/waterdrop.ogg');
        this.game.load.audio('main', 'assets/gotamain.ogg');
        this.game.load.audio('powup', 'assets/gotapowerup.ogg');
        this.game.load.audio('lose', 'assets/lose.ogg');
        this.game.load.audio('life', 'assets/life.ogg');
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
            self.game.state.start('level2-state');
        }, 2000);
    }
};
