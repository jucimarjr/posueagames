BasicGame.Player = function (gameManager) {
    this.gameManager = gameManager;
    this.sprite;
    this.blockInput = false;
    this.keyboard = gameManager.game.input.keyboard;
    this.appliedJumpForce = false;

    this._leftMargin = 20 + BasicGame.Player.frameWidth / 2.0;
};

BasicGame.Player.frameWidth = 84;
BasicGame.Player.jumpKey = Phaser.Keyboard.SPACEBAR;

BasicGame.Player.prototype = {
    create: function () {
        var cameraHeight = this.gameManager.camera.height;
        var sprite = this.gameManager.add.sprite(this._leftMargin,
                                                 cameraHeight / 2.0,
                                                 'shipAtlas');

        sprite.frameName = 'ship_64-80.png';
        sprite.anchor.setTo(0.5, 0.5);

        // Physics code!
        this.gameManager.game.physics.p2.enableBody(sprite, BasicGame.GameManager.debugDraw);
        
        sprite.body.clearShapes();
        sprite.body.loadPolygon('physicsData', 'ship');
        sprite.body.velocity.y = BasicGame.GameManager.jumpForce;
        sprite.body.collideWorldBounds = true;

        this.sprite = sprite;
    },

    update: function () {
        this.handleInput();
    },

    handleInput: function () {
        if (this.blockInput)
            return;

        var keyboard = this.keyboard;
        var jumpKey = BasicGame.Player.jumpKey;

        if (!this.appliedJumpForce &&
            keyboard.isDown(jumpKey)) {
            this.appliedJumpForce = true;
            this.sprite.body.velocity.y = BasicGame.GameManager.jumpForce;
        } else if (!keyboard.isDown(jumpKey)) {
            this.appliedJumpForce = false;
        }
    },

    onPlayerCollided: function () {
        this.blockInput = true;
        this.sprite.body.allowGravity = false;
        this.sprite.body.velocity.y = 0.0;
    }
};