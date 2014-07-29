/*global State, Config, Phaser*/

State.Ending = function (game) {
    "use strict";

    this.game = game;
};

State.Ending.prototype = {
    preload: function () {
        "use strict";

        this.game.load.image('thanks-bg',  Config.ending.dir);
    },
    create: function () {
        "use strict";

        var background = this.game.add.sprite(Config.ending.x,
                Config.ending.y, 'thanks-bg');
        var playButton = this.game.add.button(Config.Menu.buttonBack.x - 8,
                Config.Menu.buttonBack.y - 8, 'button-back', this.clickPlay,
                this, 1, 0, 1, 0);
    },
    clickPlay: function () {
        "use strict";

        this.game.state.start('menu-state');
    }
};
