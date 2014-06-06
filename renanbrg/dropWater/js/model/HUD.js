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
    },
    decreaseLife: function() {
    	this.lifeCounter--;
    	this.lifeLabel.setText(this.lifeCounter);
    },
};
