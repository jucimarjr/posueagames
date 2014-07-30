State.GameOver = function (game) {
    "use strict";

    this.game = game;
};

State.GameOver.prototype = {
    preload: function () {
        "use strict";
        this.game.load.audio('gameover-song', 'assets/gota-gameover.ogg');
        this.game.load.image('gameover-bg',  Config.gameOver.dir);
        this.skipKey = null;
        this.musicStop = false;
    },
    create: function () {
        "use strict";
        this.skipKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.skipKey.onDown.add(this.stopGameOver, this);

        this.background = this.game.add.sprite(Config.gameOver.x,
                Config.gameOver.y, 'gameover-bg');

        this.gameOverSound = this.game.add.audio('gameover-song');
        this.gameOverSound.play();
        this.gameOverSound.onStop.add(this.nextState, this);
    },

    stopGameOver: function () {
        this.musicStop = true;
        this.gameOverSound.stop();
        this.game.state.start('menu-state');
    },

    nextState: function () {
        "use strict";

        if (this.musicStop == false) {
            this.game.add.tween(this.background).to({alpha : 0}, 500,
                    Phaser.Easing.Linear.None).start();
            setTimeout(function() {
                this.game.state.start('menu-state');
            }, 600);
        }
    },
};
