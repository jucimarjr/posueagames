State.HowToPlay = function (game) {
    "use strict";

    this.game = game;
};

State.HowToPlay.prototype = {
    preload: function () {
        "use strict";

        this.game.load.image('howtoplay-bg', Config.howToPlay.dir);
    },
    create: function () {
        "use strict";

        var background = this.game.add.sprite(Config.howToPlay.x,
                Config.howToPlay.y, 'howtoplay-bg');
        var backButton = this.game.add.button(Config.Menu.buttonBack.x,
                Config.Menu.buttonBack.y, 'button-back', this.backToMenu,
                this, 1, 0, 1, 0);
    },
    backToMenu: function () {
        "use strict";

        this.game.state.start('menu-state');
    }
};