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
 *
 */
Character = function(game, characterId, assetPath, assetDimensions) {
    "use strict";

    this.game = game;
    this.character = null;
    this.id = characterId;
    this.assetPath = assetPath;

    this.isAnimated = false;
    this.width = null;
    this.height = null;
    if (typeof assetDimensions === 'undefined') {
    	console.log('undefined');
        this.isAnimated = false;
    } else if (assetDimensions.length == 2) {
    	console.log('defined');
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
        this.setCharacterConfiguration();
    },

    /**
     * Set initial values for the sprite
     *
     * @method Character#setCharacterConfiguration
     * @memberof Character
     *
     */
    setCharacterConfiguration: function() {
        this.game.physics.enable(this.character, Phaser.Physics.ARCADE);
        this.character.body.bounce.y = 0.2;
        this.character.body.gravity.y = 800;
        this.character.scale.set(1.5, 1.5);
        this.character.body.collideWorldBounds = true;
        if (this.isAnimated) {
            this.character.animations.add('left', [0, 1, 2, 3], 10, true);
            this.character.animations.add('right', [5, 6, 7, 8], 10, true);
        }
        this.game.camera.follow(this.character);
        this.game.camera.y += 600;
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
        this.character.x += speed;
        if (this.isAnimated) {
            this.character.animations.play('right');
        }
    },

    /**
     * Make the character move to the left.
     *
     * @method Character#moveLeft
     * @memberof Character
     *
     * @param {integer} speed - how fast the sprite will move to the right.
     */
    moveLeft: function(speed) {
        this.character.x -= speed;
        if (this.isAnimated) {
        	this.character.animations.play('left');
        }
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
        this.character.frame = 4;
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
        if (this.character.body.onFloor() ||
                this.character.body.touching.down) {
            this.character.body.velocity.y = -jumpHeight;
        }
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
