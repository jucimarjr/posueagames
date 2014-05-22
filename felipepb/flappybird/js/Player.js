BasicGame.Player = function (gameManager) {
    this.gameManager = gameManager;
    this._leftMargin = 20 + BasicGame.Player.frameWidth / 2.0;
    this.sprite;
    this.keyboard = gameManager.game.input.keyboard;
    this.appliedJumpForce = false;
};

BasicGame.Player.frameWidth = 85;
BasicGame.Player.frameHeight = 60;
BasicGame.Player.frameCount = 3;
BasicGame.Player.jumpForce = -5 * BasicGame.GameManager.pixelsToUnit;
BasicGame.Player.jumpKey = Phaser.Keyboard.SPACEBAR;

BasicGame.Player.prototype = {
    create: function () {
        var cameraHeight = this.gameManager.camera.height;
        var sprite = this.gameManager.add.sprite(this._leftMargin,
                                                  cameraHeight / 2.0,
                                                  'clumsy');
        this.gameManager.physics.enable(sprite, Phaser.Physics.ARCADE);                                                  
        sprite.frame = 0;
        sprite.anchor.setTo(0.5, 0.5);
        sprite.body.gravity.y = 9.8 * BasicGame.GameManager.pixelsToUnit;
        sprite.body.velocity.y = BasicGame.Player.jumpForce;
        sprite.body.collideWorldBounds = true;
        
        this.sprite = sprite;
    },
    
    update: function () {
        var keyboard = this.keyboard;
        var jumpKey = BasicGame.Player.jumpKey;

        if (!this.appliedJumpForce &&
            keyboard.isDown(jumpKey)) {
            this.appliedJumpForce = true;
            this.sprite.body.velocity.y += BasicGame.Player.jumpForce;
        } else if (!keyboard.isDown(jumpKey)) {
            this.appliedJumpForce = false;
        }
    }
};
