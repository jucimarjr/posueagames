Game.PlayerController = function (gameState) {
    this.gameState = gameState;
    this.sprite;

    this.blockInput;
    this.cursorKeys;
    this.runButton;
    this.jumpButton;

    this.isGrounded;
    this.canJump;
    this.direction;
    this.doJump;
    this.groundBodies = new Array();

    this._actualRunModifier;
};

Game.PlayerController.Direction = {
    Left: -1,
    Right: 1,
    None: 0
}

Game.PlayerController.prototype = {
    create: function () {
        this.sprite = this.gameState.game.add.sprite(0, 0, 'player');
        this.sprite.anchor.setTo(0.5, 1.0);
        this.sprite.x = 140;
        this.sprite.y = 70;
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;

        this.gameState.registerBody(this.sprite);

        this.blockInput = false;
        this.doLongJump = false;

        this._actualRunModifier = 0.0;

        this.cursorKeys = this.gameState.game.input.keyboard.createCursorKeys();
        this.runButton = this.gameState.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.jumpButton = this.gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
        this.isGrounded = this.sprite.body.onFloor();
        this.handleInput();
    },

    handleInput: function () {
        if (this.blockInput)
            return;

        // Handle Movement
        this.handleMovement();
        // Handle Jumping
        this.handleJump();
        // Apply Velocity
        this.applyVelocity();
    },

    handleMovement: function () {
        this.direction = Game.PlayerController.Direction.None;

        if (this.cursorKeys.left.isDown)
            this.direction = Game.PlayerController.Direction.Left;
        else if (this.cursorKeys.right.isDown)
            this.direction = Game.PlayerController.Direction.Right;

        if (this.direction != Game.PlayerController.Direction.None && this.runButton.isDown) {
            this._actualRunModifier += PlayerConsts.runModifierDamping;
            this._actualRunModifier = Math.min(this._actualRunModifier, 
                                               PlayerConsts.runModifier);
            this.direction += this.direction == Game.PlayerController.Direction.Right ? this._actualRunModifier : -this._actualRunModifier;
        } else if (this.runButton.isUp) {
            this._actualRunModifier = 0.0;
        }
    }, 

    handleJump: function () {
        if (this.canJump && this.isGrounded && this.jumpButton.isDown) {
            this.doJump = true;
            this.canJump = false;
        } else if (this.isGrounded && !this.jumpButton.isDown) {
            this.canJump = true;
        }
    },

    applyVelocity: function () {
        // Handle horizontal velocity        
        this.sprite.body.velocity.x = this.direction * 
                                      PlayerConsts.movementVelocity * 
                                      PhysicsConsts.pixelsToUnit;

        // Handle vertical velocity
        if (this.doJump) {
            this.sprite.body.velocity.y = -PlayerConsts.jumpVelocity *
                                           PhysicsConsts.pixelsToUnit;
            this.doJump = false;
        }
    }

    // onBeginContact: function (otherBody, otherShape, shape, contactDataArray) {
    //     var item1 = contactDataArray[0];
    //     var item2 = contactDataArray[1];

    //     // console.log("item 1: " + item1.contactPointA[0] + "," + item1.contactPointA[1] + " | "  +
    //     //                          item1.contactPointB[0] + "," + item1.contactPointB[1] );

    //     // console.log("item 2: " + item2.contactPointA[0] + "," + item2.contactPointA[1] + " | "  +
    //     //                          item2.contactPointB[0] + "," + item2.contactPointB[1] );

    //     // console.log("--------------------------------------------");

    //     var zeroCounts = 0;

    //     zeroCounts = item1.contactPointA[1] == 0 ? zeroCounts + 1 : zeroCounts;
    //     zeroCounts = item1.contactPointB[1] == 0 ? zeroCounts + 1 : zeroCounts;
    //     zeroCounts = item2.contactPointA[1] == 0 ? zeroCounts + 1 : zeroCounts;
    //     zeroCounts = item2.contactPointB[1] == 0 ? zeroCounts + 1 : zeroCounts;

    //     this.isGrounded = zeroCounts >= 2;
    // }
};