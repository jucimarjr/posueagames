/*global setTimeout, Config, Phaser*/

State.SponsorSplash = function (game) {
    "use strict";

    this.game = game;
};

State.SponsorSplash.prototype = {
    preload: function () {
        "use strict";

        this.game.load.image('game-splash', Config.gameSplash.dir.background);
        //Menu buttons
        this.game.load.spritesheet('button-play', Config.Menu.buttonPlay.dir,
                Config.Menu.buttonPlay.width, Config.Menu.buttonPlay.height);
        this.game.load.spritesheet('button-credits',
                Config.Menu.buttonCredits.dir,
                Config.Menu.buttonCredits.width,
                Config.Menu.buttonCredits.height);
        this.game.load.spritesheet('button-how-to-play',
                Config.Menu.buttonHowToPlay.dir,
                Config.Menu.buttonHowToPlay.width,
                Config.Menu.buttonHowToPlay.height);

        //Credits image
        this.game.load.image('credits', Config.credits.dir);

        //How to play image
        this.game.load.image('how-to-play', Config.howToPlay.dir);
        this.game.load.image('progress-bar', Config.gameSplash.dir.bar);
        this.game.load.audio('som-inicio', 'assets/gota-tela-inicio.wav');
    },
    create: function () {
        "use strict";

        var sprite = this.game.add.sprite(Config.sponsorSplash.x,
                Config.sponsorSplash.y, 'sponsor-splash');

        setTimeout(function(timer) {
            clearTimeout(timer);
            this.game.add.tween(sprite).to({alpha : 0},
                    Config.sponsorSplash.millis,
                    Phaser.Easing.Linear.None).start();
        }, Config.sponsorSplash.millis);

        setTimeout(function(timer) {
            clearTimeout(timer);
            this.game.state.start('menu-state');
        }, Config.sponsorSplash.nextState);
    }
};