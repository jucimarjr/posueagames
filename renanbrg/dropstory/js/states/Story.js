/*global setTimeout, Config, Phaser*/

State.Story = function (game) {
    "use strict";

    this.game = game;
    this.animationmusic = null;
};

State.Story.prototype = {
    preload: function () {
        "use strict";

        this.game.load.image('storyboard-1','assets/images/storyboard1_960-600.png');
        this.game.load.image('storyboard-2','assets/images/storyboard2_960-600.png');
        this.game.load.image('storyboard-3','assets/images/storyboard3_960-600.png');
       
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
        this.game.load.audio('som-inicio', 'assets/gotaExtra.ogg');
    },
    create: function () {
        "use strict";
        this.animationmusic = this.game.add.audio('storymusic');
        this.animationmusic.play();
        var sprite = this.game.add.sprite(0,0, 'storyboard-1');

        var self = this;
        setTimeout(function() {
            var tween = this.game.add.tween(sprite).to({alpha : 0},
                    2000,
                    Phaser.Easing.Linear.None).start();
            tween.onComplete.add(self.startNextSplash, self);
        }, 2000);

        setTimeout(function() {
            var tween1 = this.game.add.tween(sprite).to({alpha : 0},
                    4000,
                    Phaser.Easing.Linear.None).start();
            tween1.onComplete.add(self.startNextOne, self);
        }, 4000);


        setTimeout(function() {
        	self.animationmusic.stop();
            self.game.state.start('menu-state');
        }, 12000);
        
//        setTimeout(function() {
//        	this.animationmusic.stop();
//        }, 10000);
    },
    startNextSplash: function() {
    	var sprite2 = this.game.add.sprite(0,0, 'storyboard-2');
    },
    startNextOne: function() {
    	var sprite3 = this.game.add.sprite(0,0, 'storyboard-3');
    }
};