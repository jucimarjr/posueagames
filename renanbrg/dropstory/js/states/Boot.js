var State = {
    Boot: function(game) {
        "use strict";

        this.game = game;
    }
};

State.Boot.prototype = {
    preload: function() {
        "use strict";

        this.game.load.image('ludus-splash', Config.ludusSplash.dir);
    },
    create: function () {
        "use strict";

        if (this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.maxWidth = Config.global.screen.width;
            this.game.scale.maxHeight = Config.global.screen.height;
            this.game.scale.setScreenSize(true);

            this.game.state.start('ludus-state');
        } else {
            console.log('Game not supported for mobile devices');
        }
    }
};