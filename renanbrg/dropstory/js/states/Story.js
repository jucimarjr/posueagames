/*global setTimeout, Config, Phaser*/

State.Story = function (game) {
    "use strict";

    this.game = game;
    this.animationmusic = null;
    this.skipKey = null;
    this.timer1, this.timer2, this.timer3, this.timer4;
    this.currentFrame;
};

State.Story.prototype = {
    preload: function () {
        "use strict";

        this.game.load.image('storyboard-1','assets/images/storyboard1_960-600.png');
        this.game.load.image('storyboard-2','assets/images/storyboard2_960-600.png');
        this.game.load.image('storyboard-3','assets/images/storyboard3_960-600.png');
        this.game.load.image('storyboard-4','assets/images/storyboard4_960-600.png');

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
        this.game.load.audio('som-inicio', 'assets/gotaextra.ogg');
    },
    create: function () {
        "use strict";

        this.currentFrame = 1;
        this.skipKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.skipKey.onDown.add(this.skipStoryState, this);

        this.animationmusic = this.game.add.audio('storymusic');
        this.animationmusic.play();
        this.sprite = this.game.add.sprite(0, 0, 'storyboard-1');

        var self = this;
        this.timer1 = setTimeout(function() {
            var tween = this.game.add.tween(self.sprite).to({alpha : 0},
                    2000, Phaser.Easing.Linear.None).start();
            tween.onComplete.add(self.startNextSplash, self);
        }, 2500);

        this.timer2 = setTimeout(function() {
            var tween1 = this.game.add.tween(self.sprite).to({alpha : 0},
                    2000, Phaser.Easing.Linear.None).start();
            tween1.onComplete.add(self.startNextSplash, self);
        }, 7000);

        this.timer3 = setTimeout(function() {
            var tween1 = this.game.add.tween(self.sprite).to({alpha : 0},
                    2000, Phaser.Easing.Linear.None).start();
            tween1.onComplete.add(self.startNextSplash, self);
        }, 11500);

        this.timer4 = setTimeout(function() {
            var tween1 = this.game.add.tween(self.sprite).to({alpha : 0},
                    2000, Phaser.Easing.Linear.None).start();
            tween1.onComplete.add(self.startMenu, self);
        }, 16000);
    },
    startNextSplash: function() {
        this.currentFrame++;
        this.sprite = this.game.add.sprite(0, 0, 'storyboard-' +
                this.currentFrame);
    },
    startMenu: function() {
        this.animationmusic.stop();
        this.game.state.start('menu-state');
    },
    skipStoryState: function() {
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
        clearTimeout(this.timer4);
        this.game.input.keyboard.removeKey(this.skipKey);
        this.animationmusic.stop();
        this.game.state.start('menu-state');
    }
};
