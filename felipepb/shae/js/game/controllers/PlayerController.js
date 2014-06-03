Game.PlayerController = function (gameState) {
    this.gameState = gameState;
    this.sprite;

    this.blockInput;
    this.cursorKeys;
    this.runButton;
    this.jumpButton;
	this.joystick;

    this.isGrounded;
    this.canJump;
    this.direction;
    this.doJump;
    this.groundBodies = new Array();

    this.currentAnim;
    this.animState;

    this._actualRunModifier;
};

Game.PlayerController.Direction = {
    Left: -1,
    Right: 1,
    None: 0
}

Game.PlayerController.AnimState = {
    Idle: 0,
    Walk: 1,
    Run: 2,
    JumpStart: 3,
    JumpAscend: 4,
    JumpApex: 5,
    JumpDescend: 6,
    JumpTouchDown: 7
}

Game.PlayerController.prototype = {
    create: function () {
        // Setup sprites
        this.sprite = this.gameState.game.add.sprite(0, 0, 'player_atlas');
        this.sprite.frameName = 'shae_idle_1_100-80.png';
        this.sprite.anchor.setTo(0.73, 0.5);
        this.sprite.x = 140;
        this.sprite.y = 70;
        
        // Create animations
        var idleAnimFrames = new Array();
        for (var i = 1; i <= 5; i++) {
            idleAnimFrames.push('shae_idle_' + i + '_100-80.png');
        };

        var walkAnimFrames = new Array();
        for (var i = 1; i <= 4; i++) {
            walkAnimFrames.push('shae_walk_' + i + '_100-80.png');
        };

        var runAnimFrames = new Array();
        for (var i = 1; i <= 4; i++) {
            runAnimFrames.push('shae_run_' + i + '_100-80.png');
        };

        this.sprite.animations.add('idle', idleAnimFrames, 10, true);
        this.sprite.animations.add('walk', walkAnimFrames, 10, true);
        this.sprite.animations.add('run', runAnimFrames, 10, true);

        // Create body
        this.gameState.registerBody(this.sprite);
        this.sprite.body.setSize(26, 64, 0, 0);

        // Setup input
        this.blockInput = false;
        this.doLongJump = false;

        this._actualRunModifier = 0.0;

        this.cursorKeys = this.gameState.game.input.keyboard.createCursorKeys();
        this.runButton = this.gameState.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.jumpButton = this.gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.joystick = new Joystick();
    },

    update: function () {
        this.isGrounded = this.sprite.body.onFloor();
        this.handleInput();
        this.handleAnimation();
    },

    render: function (game) {
        if (PhysicsConsts.debugDraw)
            game.debug.body(this.sprite);
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
		var joystick = this.joystick;
		var joystickX = joystick.getX();
		var joystickY = joystick.getY();
		
		console.log('x: ' + joystickX + ' |y:  ' + joystickY);
		
		var runButtonIsDown = this.runButton.isDown || joystick.getA();
		
        this.direction = Game.PlayerController.Direction.None;
        this.animState = Game.PlayerController.AnimState.Idle;

        if (this.cursorKeys.left.isDown || joystickX < JoystickConsts.leftOffset)
            this.direction = Game.PlayerController.Direction.Left;
        else if (this.cursorKeys.right.isDown || joystickX > JoystickConsts.rightOffset)
            this.direction = Game.PlayerController.Direction.Right;

        if (this.direction != Game.PlayerController.Direction.None)
            this.animState = Game.PlayerController.AnimState.Walk;

        if (this.direction != Game.PlayerController.Direction.None && runButtonIsDown) {
            this._actualRunModifier += PlayerConsts.runModifierDamping;
            this._actualRunModifier = Math.min(this._actualRunModifier, 
                                               PlayerConsts.runModifier);
            this.direction += this.direction == Game.PlayerController.Direction.Right
			                                     ? this._actualRunModifier
												 : -this._actualRunModifier;

            this.animState = Game.PlayerController.AnimState.Run;
        } else if (this.runButton.isUp) {
            this._actualRunModifier = 0.0;
        }
    },

    handleJump: function () {
		var joystick = this.joystick;
		var jumpButtonIsDown = this.jumpButton.isDown || joystick.getB();
		
        if (this.canJump && this.isGrounded && jumpButtonIsDown) {
            this.doJump = true;
            this.canJump = false;
        } else if (this.isGrounded && !jumpButtonIsDown) {
            this.canJump = true;
        }
    },

    handleAnimation: function () {
        if (this.direction <= Game.PlayerController.Direction.Left && this.sprite.scale.x != -1) {
            this.sprite.scale.x = -1;
            this.sprite.anchor.setTo(0.65, 0.5);
        } else if (this.direction >= Game.PlayerController.Direction.None && this.sprite.scale.x != 1) {
            this.sprite.scale.x = 1;
            this.sprite.anchor.setTo(0.73, 0.5);
        }

        if (this.animState == Game.PlayerController.AnimState.Idle && this.currentAnim != 'idle') {
            this.sprite.animations.play('idle');
            this.currentAnim = 'idle';

        } else if (this.animState == Game.PlayerController.AnimState.Walk && this.currentAnim != 'walk') {
            this.sprite.animations.play('walk');
            this.currentAnim = 'walk';
        } else if (this.animState == Game.PlayerController.AnimState.Run && this.currentAnim != 'run') {
            this.sprite.animations.play('run');
            this.currentAnim = 'run';
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