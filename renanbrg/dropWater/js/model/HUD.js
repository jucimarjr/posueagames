/**
 * Base class for all HUDs of the game.
 */

/**
 * @class Model.HUD
 *
 * @classdesc This class implements all logic to show and update the HUDs of
 * the game.
 *
 * @param {Phaser.Game} game - A reference to the currently running game.
 */
HUD = function(game) {
    "use strict";

    this.game = game;

    this.lifeAsset = null;
    this.xLabel = null;
    this.lifeLabel = null;
    this.lifeCounter = 3;
    this.dropCounter = 0;
};

HUD.prototype = {
    /**
     * Load the asset related with the HUD.
     *
     * @method HUD#preload
     * @memberof HUD
     */
    preload: function() {
        "use strict";

        this.game.load.image('life_image', 'assets/images/life_40-40.png');
        this.game.load.spritesheet('dropAttempts',
                'assets/images/drop_attempts_1000-200.png', 40, 200);
    },

    /**
     * Add the HUD images in the game.
     *
     * @method HUD#create
     * @memberof HUD
     *
     */
    create: function() {
        "use strict";

        this.lifeAsset = this.game.add.image(20, 20, 'life_image');
        this.lifeAsset.fixedToCamera = true;
        
        var styleForX = { font: "26px Helvetica", fill: "#ffffff" };
        this.xLabel = game.add.text(70, 26, "x", styleForX);
        this.xLabel.fixedToCamera = true;
        
        var styleForLife = { font: "40px Helvetica", fill: "#ffffff" };
        this.lifeLabel = game.add.text(90, 22, this.lifeCounter, styleForLife);
        this.lifeLabel.fixedToCamera = true;

        this.dropAttemps = this.game.add.sprite(Config.global.screen.width - 60,
                20, 'dropAttempts');
        this.dropAttemps.animations.add('attempt1Up',
                [0, 1, 2, 1, 2, 3, 2, 3, 4], 10,
                false);
        this.dropAttemps.animations.add('attempt1Down',
                [4, 3, 2, 3, 2, 1, 2, 1, 0], 10, false);
        this.dropAttemps.animations.add('attempt2Up',
                [4, 5, 6, 5, 6, 7, 6, 7, 8, 7, 8, 9], 10, false);
        this.dropAttemps.animations.add('attempt2Down',
                [9, 8, 7, 8, 7, 6, 7, 6, 5, 6, 5, 4], 10, false);
        this.dropAttemps.animations.add('attempt3Up',
                [9, 10, 11, 10, 11, 12, 11, 12, 13, 12, 13, 14], 10, false);
        this.dropAttemps.animations.add('attempt3Down',
                [14, 13, 12, 13, 12, 11, 12, 11, 10, 11, 10, 9], 10, false);
        this.dropAttemps.animations.add('attempt4Up',
                [14, 15, 16, 15, 16, 17, 16, 17, 18, 17, 18, 19], 10, false);
        this.dropAttemps.animations.add('attempt4Down',
                [19, 18, 17, 18, 17, 16, 17, 16, 15, 16, 15, 14], 10, false);
        this.dropAttemps.animations.add('attempt5Up',
                [19, 20, 21, 20, 21, 22, 21, 22, 23, 22, 23, 24], 10, false);
        this.dropAttemps.animations.add('attempt5Down',
                [24, 23, 22, 21, 20, 19], 10, false);
        this.dropAttemps.animations.add('attempt0', [0], 10, false);
        this.dropAttemps.fixedToCamera = true;
    },
    decreaseLife: function() {
    	this.lifeCounter--;
    	this.lifeLabel.setText(this.lifeCounter);
    },
    increaseDropBar: function() {
        this.dropCounter++;
        if (this.dropCounter > 0 && this.dropCounter <= 5) {
            this.dropAttemps.animations.play('attempt' + this.dropCounter +
                    'Up');
        }
    },
    decreaseDropBar: function() {
        this.dropCounter--;
        if (this.dropCounter > 0 && this.dropCounter <= 4) {
            this.dropAttemps.animations.play('attempt' + this.dropCounter +
                    'Down');
        }
    },
};
