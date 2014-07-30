/*global State, Config*/

State.Menu = function(game) {
    "use strict";

    this.game = game;
    this.inicioSound = null;
};

State.Menu.prototype = {
    preload: function() {
        "use strict";

        hud.preload();
        this.game.load.image('level1preloaderbg', Config.preloaderLevel1.dir);
        this.game.load.image('level2preloaderbg', Config.preloaderLevel2.dir);
        this.game.load.spritesheet('button-back', Config.Menu.buttonBack.dir,
                Config.Menu.buttonBack.width, Config.Menu.buttonBack.height);
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

        if (this.inicioSound == null) {
            this.inicioSound = this.game.add.audio('som-inicio');
            this.inicioSound.loop = true;
        }
        if (!this.inicioSound.isPlaying) {
            this.inicioSound.play();
        }
    },
    clickPlay: function () {
        "use strict";

        this.inicioSound.stop();
        hud.init();
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
