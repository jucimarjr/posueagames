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
    this.pauseSprite = null;
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
        this.game.load.spritesheet('dropper',
                'assets/spritesheets/dropper_600-182.png', 100, 182);
    },
    /**
     * Init the life counter and the drop counter.
     *
     * @method HUD#init
     * @memberof HUD
     */
    init: function() {
        this.lifeCounter = 3;
        this.dropCounter = 0;
    },
    /**
     * Init the drop counter.
     *
     * @method HUD#initDropCounter
     * @memberof HUD
     */
    initDropCounter: function() {
        this.dropCounter = 0;
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
        this.xLabel = this.game.add.text(70, 26, "x", styleForX);
        this.xLabel.fixedToCamera = true;

        var styleForLife = { font: "40px Helvetica", fill: "#ffffff" };
        this.lifeLabel = this.game.add.text(90, 22, this.lifeCounter,
                styleForLife);
        this.lifeLabel.fixedToCamera = true;

        this.dropAttemps = this.game.add.sprite(Config.global.screen.width -
                105, 20, 'dropper');
        this.dropAttemps.animations.add('attempt1Up', [1], 10, false);
        this.dropAttemps.animations.add('attempt1Down', [0], 10, false);
        this.dropAttemps.animations.add('attempt2Up', [2], 10, false);
        this.dropAttemps.animations.add('attempt2Down', [1], 10, false);
        this.dropAttemps.animations.add('attempt3Up', [3], 10, false);
        this.dropAttemps.animations.add('attempt3Down', [2], 10, false);
        this.dropAttemps.animations.add('attempt4Up', [4], 10, false);
        this.dropAttemps.animations.add('attempt4Down', [3], 10, false);
        this.dropAttemps.animations.add('attempt5Up', [5], 10, false);
        this.dropAttemps.animations.add('attempt5Down', [4], 10, false);
        this.dropAttemps.animations.play('attempt' + (this.dropCounter + 1)
                + 'Down');
        this.dropAttemps.fixedToCamera = true;

        this.pauseSprite = this.game.add.sprite(this.game.width / 2,
                this.game.height / 2, 'pausesplash');
        this.pauseSprite.fixedToCamera = true;
        this.pauseSprite.anchor.setTo(0.5, 0.5);
        this.pauseSprite.visible = false;

        // Do not remove this line of code. It is needed in the Level 1 to move
        // the camera when the player is passing into the straw.
        this.game.time.advancedTiming = true;
    },
    decreaseLife: function() {
        this.lifeCounter--;
        this.lifeLabel.setText(this.lifeCounter);
    },
    increaseLife: function() {
        this.lifeCounter++;
        this.lifeLabel.setText(this.lifeCounter);
    },
    getLifeCounter: function() {
        return this.lifeCounter;
    },
    increaseDropBar: function() {
        this.dropCounter++;
        if (this.dropCounter > 0 && this.dropCounter <= 5) {
            this.dropAttemps.animations.play('attempt' + this.dropCounter +
                    'Up');
        } else if (this.dropCounter > 5) {
            this.dropCounter = 5;
        }
    },
    decreaseDropBar: function() {
        this.dropCounter--;
        if (this.dropCounter >= 0 && this.dropCounter <= 4) {
            this.dropAttemps.animations.play('attempt' +
                    (this.dropCounter + 1) + 'Down');
        }
    },
    getDropCounter: function() {
        return this.dropCounter;
    },
    showPauseImage: function() {
        this.pauseSprite.visible = true;
    },
    hidePauseImage: function() {
        this.pauseSprite.visible = false;
    }
};
