/*global setTimeout, Config, Phaser*/

State.LudusSplash = function (game) {
    "use strict";

    this.game = game;
};

State.LudusSplash.prototype = {
    preload: function () {
        "use strict";

        this.game.load.audio('storymusic', 'assets/gotaanimation.ogg');
    },
    create: function () {
        "use strict";

        var sprite = this.game.add.sprite(Config.ludusSplash.x,
                Config.ludusSplash.y, 'ludus-splash');

        setTimeout(function(timer) {
            clearTimeout(timer);
            this.game.add.tween(sprite).to({alpha : 0},
                    Config.ludusSplash.millis,
                    Phaser.Easing.Linear.None).start();
        }, Config.ludusSplash.millis);

        setTimeout(function(timer) {
            clearTimeout(timer);
            this.game.state.start('story-state');
        }, Config.ludusSplash.nextState);
    }
};
