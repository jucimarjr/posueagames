State.GameOver = function (game) {
    "use strict";

    this.game = game;
};

State.GameOver.prototype = {
    preload: function () {
        "use strict";

        this.game.load.audio('gameover-song', 'assets/gota-gameover.ogg');
        this.game.load.image('gameover-bg',  Config.gameOver.dir);
    },
    create: function () {
        "use strict";

        this.background = this.game.add.sprite(Config.gameOver.x,
                Config.gameOver.y, 'gameover-bg');

        this.gameOverSound = this.game.add.audio('gameover-song');
        this.gameOverSound.onStop.add(this.nextState, this);
        this.gameOverSound.play();
    },
    nextState: function () {
        "use strict";

        this.game.add.tween(this.background).to({alpha : 0}, 500,
                Phaser.Easing.Linear.None).start();

        setTimeout(function() {
            this.game.state.start('menu-state');
        }, 600);
    }
};
