/*global State, Config, Phaser*/

State.Credits = function (game) {
    "use strict";

    this.game = game;
};

State.Credits.prototype = {
    preload: function () {
        "use strict";

        this.game.load.image('credits-bg',  Config.credits.dir);
    },
    create: function () {
        "use strict";

        var background = this.game.add.sprite(Config.credits.x,
                Config.credits.y, 'credits-bg');
        var playButton = this.game.add.button(Config.Menu.buttonBack.x,
                Config.Menu.buttonBack.y, 'button-back', this.clickPlay,
                this, 1, 0, 1, 0);
    },
    clickPlay: function () {
        "use strict";

        this.game.state.start('menu-state');
    }
};
