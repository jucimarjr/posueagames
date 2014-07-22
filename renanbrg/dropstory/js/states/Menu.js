/*global State, Config*/

State.Menu = function(game) {
    "use strict";

    this.game = game;
};

State.Menu.prototype = {
    preload: function() {
        "use strict";

        this.game.load.image('level1preloaderbg',
                'assets/images/level1preloaderbackground_960-600.png');
    },
    create: function() {
        "use strict";

        this.game.add.sprite(Config.Menu.x, Config.Menu.y,
                'game-splash');
        var playButton = this.game.add.button(Config.Menu.buttonPlay.x,
                Config.Menu.buttonPlay.y, 'button-play', this.clickPlay,
                this, 1, 0, 1, 0);

        var howToButton = this.game.add.button(Config.Menu.buttonHowToPlay.x,
                Config.Menu.buttonHowToPlay.y, 'button-how-to-play',
                this.clickHowToPlay, this, 1, 0, 1, 0);

        var creditsButton = this.game.add.button(Config.Menu.buttonCredits.x,
                Config.Menu.buttonCredits.y, 'button-credits',
                this.clickCredits, this, 1, 0, 1, 0);

        this.inicioSound = this.game.add.audio('som-inicio');
        this.inicioSound.loop = true;
        this.inicioSound.play();
    },
    clickPlay: function () {
        "use strict";

        this.inicioSound.stop();
        this.game.state.start('level1preloader-state');
    },
    clickHowToPlay: function () {
        "use strict";

        this.game.state.start('howtoplay-state');
    },
    clickCredits: function () {
        "use strict";

        this.game.state.start('credits-state');
    }
};