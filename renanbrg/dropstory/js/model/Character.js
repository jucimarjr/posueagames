/**
 * Base class for a character that the player controls.
 */

/**
 * @class Model.Character
 *
 * @classdesc Create a new character object.
 *
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {string} characterId - An identifier for the asset.
 * @param {string} assetPath - The path in the file system for the asset.
 * @param {Array int} - Dimensions of the asset: [width, height]. If not given,
 * assumes that the asset is not animated.
 * @param {int} dropCounter - the total of drops in the HUD's drop counter. If
 * it is equal to zero, then the character starts with the small drop animation.
 * otherwise, it starts with the big drop animation.
 */
Character = function(game, characterId, assetPath, assetDimensions,
        dropCounter) {
    "use strict";

    this.game = game;
    this.character = null;
    this.id = characterId;
    this.assetPath = assetPath;
    this.animestate = 'stop';  //stores if player is walk left or right, jump, die
    if (dropCounter == 0) {
        this.playersize = 'small'; //stores if player is small or big
    } else {
        this.playersize = 'big';
    }
    this.playerstate = 'normal'; //stores if player is normal, with sunscreen, with energy
    this.playershape = null;
    this.userDead = false;

    this.isAnimated = false;
    this.width = null;
    this.height = null;

    if (typeof assetDimensions === 'undefined') {
        this.isAnimated = false;
    } else if (assetDimensions.length == 2) {
        this.isAnimated = true;
        this.width = assetDimensions[0];
        this.height = assetDimensions[1];
    } else {
        throw 'Bad paramater: assetDimensions';
    }
};

Character.prototype = {
    /**
     * Load the asset related with the character.
     *
     * @method Character#preload
     * @memberof Character
     */
    preload: function() {
        "use strict";

        if (this.isAnimated) {
            this.game.load.spritesheet(this.id, this.assetPath,
                    this.width, this.height);
        } else {
            this.game.load.image(this.id, this.assetPath);
        }
    },

    /**
     * Add the sprite of the character in the game environment.
     *
     * @method Character#create
     * @memberof Character
     *
     * @param {integer} positionX - Position in the X coordinate to add
     * the character.
     * @param {integer} positionY - Position in the Y coordinate to add
     * the character.
     */
    create: function(positionX, positionY) {
        "use strict";

        this.character = this.game.add.sprite(positionX, positionY , this.id);
    },

    /**
     * Configure the character sprite. The changes performed in this function
     * must be defined in the callback function passed as parameter.
     *
     * @method Character#configureCharacter
     * @memberof Character
     * @param {function} callback - function called to apply the changes in
     * the character sprite.
     */
    configureCharacter: function(callback) {
        "use strict";

        if (callback && typeof(callback) === "function") {
            callback(this.character);
        } else {
            throw 'Bad paramater: callback must be a function';
        }
    },

    setCharacterInicialValues: function () {
        this.character.smoothed = false;
        this.character.body.fixedRotation = true;
        this.character.body.sprite.name = 'playerdrop';
        this.playershape = this.character.body.setCircle(18,0,4);

        // normal state
        this.character.animations.add('leftsmallnormal', [4,5,6], 10, true);
        this.character.animations.add('rightsmallnormal', [8,9,10], 10, true);
        this.character.animations.add('jumpleftsmallnormal', [3], 10, false);
        this.character.animations.add('jumprightsmallnormal', [11], 10, false);
        this.character.animations.add('stopsmallnormal', [7], 10, true);
        this.character.animations.add('leftbignormal', [19,20,21], 10, true);
        this.character.animations.add('rightbignormal', [23,24,25], 10, true);
        this.character.animations.add('jumpleftbignormal', [18], 10, true);
        this.character.animations.add('jumprightbignormal', [26], 10, true);
        this.character.animations.add('stopbignormal', [22], 10, true);

        // energy state
        this.character.animations.add('leftsmallenergy', [34,35,36], 10, true);
        this.character.animations.add('rightsmallenergy', [38,39,40], 10, true);
        this.character.animations.add('jumpleftsmallenergy', [33], 10, false);
        this.character.animations.add('jumprightsmallenergy', [41], 10, false);
        this.character.animations.add('stopsmallenergy', [37], 10, true);
        this.character.animations.add('leftbigenergy', [49,50,51], 10, true);
        this.character.animations.add('rightbigenergy', [53,54,55], 10, true);
        this.character.animations.add('jumpleftbigenergy', [48], 10, true);
        this.character.animations.add('jumprightbigenergy', [56], 10, true);
        this.character.animations.add('stopbigenergy', [52], 10, true);

        // sunscreen state
        this.character.animations.add('leftsmallsunscreen', [64,65,66], 10, true);
        this.character.animations.add('rightsmallsunscreen', [68,69,70], 10, true);
        this.character.animations.add('jumpleftsmallsunscreen', [63], 10, false);
        this.character.animations.add('jumprightsmallsunscreen', [71], 10, false);
        this.character.animations.add('stopsmallsunscreen', [67], 10, true);
        this.character.animations.add('leftbisunscreen', [79,80,81], 10, true);
        this.character.animations.add('rightbigsunscreen', [83,84,85], 10, true);
        this.character.animations.add('jumpleftbigsunscreen', [78], 10, true);
        this.character.animations.add('jumprightbigsunscreen', [86], 10, true);
        this.character.animations.add('stopbigsunscreen', [82], 10, true);

        // Make the drop disappear when the player dies
        this.character.animations.add('evaporate', [90, 91, 92, 93, 94],
                10, false);
    },

    playerAnimations: function () {
        if (this.animestate === 'jumpTop') {
            this.character.animations.stop();
            this.character.frame = 2;
        } else if (this.animestate === 'jumpright') {
            this.character.animations.play('jumpright' + this.playersize +
                    this.playerstate);
        } else if (this.animestate === 'jumpleft') {
            this.character.animations.play('jumpleft' + this.playersize +
                    this.playerstate);
        } else if (this.animestate === 'die') {
            this.character.animations.stop();
            this.character.frame = 6;
        } else if (this.animestate === 'win') {
            this.character.animations.stop();
            this.character.frame = 7;
        } else if (this.animestate === 'powerup') {
            this.character.animations.stop();
            this.character.frame = 8;
        } else if (this.animestate === 'fall') {
            this.character.animations.stop();
            this.character.frame = 9;
        } else if (this.animestate === 'left') {
            this.character.animations.play('left' + this.playersize +
                    this.playerstate);
        } else if (this.animestate === 'right') {
            this.character.animations.play('right' + this.playersize +
                    this.playerstate);
        } else if (this.animestate === 'evaporate') {
            this.character.animations.play('evaporate');
        } else {
            this.character.animations.stop();
            this.character.animations.play('stop' + this.playersize +
                    this.playerstate);
        }
    },


    /**
     * Make the character move to the right.
     *
     * @method Character#moveRight
     * @memberof Character
     *
     * @param {integer} speed - how fast the sprite will move to the right.
     */
    moveRight: function(speed) {
        this.character.body.moveRight(speed);
    },

    /**
     * Make the character move to the left.
     *
     * @method Character#moveLeft
     * @memberof Character
     *
     * @param {integer} speed - how fast the sprite will move to the left.
     */
    moveLeft: function(speed) {
        this.character.body.moveLeft(speed);
    },

    /**
     * Make the character jump.
     *
     * @method Character#moveLeft
     * @memberof Character
     *
     * @param {integer} jumpHeight - how high the character will jump.
     * It must be a value bigger than 0.
     */
    jump: function(jumpHeight) {
        this.character.body.moveUp(jumpHeight);
    },

    /**
     * Make the character stop.
     *
     * @method Character#stop
     * @memberof Character
     */
    stop: function() {
        if (this.isAnimated) {
            this.character.animations.stop();
        }
        //this.character.frame = 9;
        this.character.body.velocity.x = 0;
    },

    /**
     * Return the Phaser.Sprite related with the character
     *
     * @method Character#getSpriteObject
     * @memberof Character
     *
     * @return {Phaser.Sprite} the sprite object of the character.
     */
    getSpriteObject: function() {
        return this.character;
    },

    /**
     * kill character.
     *
     * @method Character#kill
     */
    kill: function() {
        this.character.kill();
    },

    /**
     * Set a horizontal velocity for the character.
     *
     * @method Character#setVelocityX
     * @memberof Character
     *
     * @param {integer} velocity - Velocity X of the character.
     */
    setVelocityX: function(velocity) {
        this.character.body.velocity.x = velocity;
    },
};
