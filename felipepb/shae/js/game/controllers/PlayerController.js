Game.PlayerController = function (gameState, spawnPoint) {
    this.gameState = gameState;
    this.game = this.gameState.game;
    this.spawnPoint = spawnPoint;
    this.sprite;
    this.emitter;

    this.blockInput;
    this.cursorKeys;
    this.runButton;
    this.jumpButton;
	this.joystick;

    this.isGrounded;
    this.canJump;
    this.doJump;
    this.isJumping;
    this.isJumpInputReleased;
    this.direction;
    this.groundBodies = new Array();

    this.currentAnim;
    this.animState;

    this.jumpSFX = new Array();
    this.touchdownSFX = new Array();
    this.footstepSFX = new Array();

    this.deathSFX;
    this.spawnSFX;
    this.runSFX;
    this.ghostSFX;

    this._actualRunModifier;
    this._footstepSFXPlayed;
};

Game.PlayerController.Direction = {
    Left: -1,
    Right: 1,
    None: 0
};

Game.PlayerController.AnimState = {
    Idle: 'idle',
    Walk: 'walk',
    Run: 'run',
    JumpStart: 'jump start',
    JumpAscend: 'jump ascend',
    JumpApex: 'jump apex',
    JumpDescend: 'jump descend',
    JumpTouchdown: 'jump touchdown',
    Respawning: 'respawning',
    Dying: 'dying',
	FlyingSoul: 'soul flying'
};

Game.PlayerController.prototype = {
    create: function () {
        this.createSprite();
        this.createAnimations();
        this.setupInput();
        this.createParticles();
        this.createSoundEffects();
    },

    createSprite: function () {
        // Setup sprites
        this.sprite = this.gameState.game.add.sprite(0, 0, 'main_sprite_atlas');
        this.sprite.frameName = 'shae_idle_1_100-100.png';
        this.sprite.anchor.setTo(0.73, 0.5);
        this.sprite.x = this.spawnPoint.x + 20;
        this.sprite.y = this.spawnPoint.y - 32;
        this.sprite.scale.x = 0;
        this.sprite.scale.y = 0;
    },

    createAnimations: function () {
        // Create animations
        var idleAnimFrames = new Array();
        for (var i = 1; i <= 5; i++) {
            idleAnimFrames.push('shae_idle_' + i + '_100-100.png');
        };

        var walkAnimFrames = new Array();
        for (var i = 1; i <= 4; i++) {
            walkAnimFrames.push('shae_walk_' + i + '_100-100.png');
        };

        var runAnimFrames = new Array();
        for (var i = 1; i <= 4; i++) {
            runAnimFrames.push('shae_run_' + i + '_100-100.png');
        };

        var jumpStartAnimFrames = new Array();
        jumpStartAnimFrames.push('shae_jump_1_100-100.png');

        var jumpAscendAnimFrames = new Array();
        jumpAscendAnimFrames.push('shae_jump_2_100-100.png');
        jumpAscendAnimFrames.push('shae_jump_3_100-100.png');

        var jumpApexAnimFrames = new Array();
        jumpApexAnimFrames.push('shae_jump_4_100-100.png');

        var jumpDescendAnimFrames = new Array();
        jumpDescendAnimFrames.push('shae_jump_5_100-100.png');
        jumpDescendAnimFrames.push('shae_jump_6_100-100.png');

        var jumpTouchDownAnimFrames = new Array();
        jumpTouchDownAnimFrames.push('shae_jump_7_100-100.png');

        var deathAnimFrames = new Array();
        for (var i = 1; i <= 7; i++) {
            deathAnimFrames.push('shae_dying_'+ i + '_100-100.png');
        };

        var respawnAnimFrames = new Array();
        for (var i = 7; i >= 1; i--) {
            respawnAnimFrames.push('shae_dying_'+ i + '_100-100.png');
        };
		
		var soulFlyingFrames = new Array();
		for (var i = 1; i <= 2; i++) {
			soulFlyingFrames.push('shae_soul_' + i + '_100-100.png'); 
		}

        var jumpStartAnim, jumpApexAnim, jumpTouchdownAnim, respawnAnim, deathAnim;

        this.sprite.animations.add('idle', idleAnimFrames, 10, true);
        this.sprite.animations.add('walk', walkAnimFrames, 10, true);
        this.sprite.animations.add('run', runAnimFrames, 10, true);
        this.sprite.animations.add('jump-ascend', jumpAscendAnimFrames, 10, true);
        this.sprite.animations.add('jump-descend', jumpDescendAnimFrames, 10, true);
		this.sprite.animations.add(Game.PlayerController.AnimState.FlyingSoul, soulFlyingFrames, 10, true);

        jumpStartAnim = this.sprite.animations.add('jump-start', jumpStartAnimFrames, 7.5, false);
        jumpStartAnim.onComplete.add(this.onJumpStartFinished, this);
        
        jumpApexAnim = this.sprite.animations.add('jump-apex', jumpApexAnimFrames, 7.5, false);
        jumpApexAnim.onComplete.add(this.onJumpApexFinished, this);
        
        jumpTouchdownAnim = this.sprite.animations.add('jump-touchdown', jumpTouchDownAnimFrames, 7.5, false);
        jumpTouchdownAnim.onComplete.add(this.onJumpTouchdownFinished, this);

        respawnAnim = this.sprite.animations.add('respawn', respawnAnimFrames, 15, false);
        respawnAnim.onComplete.add(this.onRespawnAnimFinished, this);

        deathAnim = this.sprite.animations.add('dying', deathAnimFrames, 15, false);
        deathAnim.onComplete.add(this.onDeathAnimFinished, this);
    },

    createParticles: function () {
        // Create emitter
        this.emitter = this.gameState.game.add.emitter(this.sprite.x,
                                                       this.sprite.y,
                                                       100);
        this.emitter.makeParticles('smoke_particle_small');
        this.emitter.setYSpeed(-0, -50);
        // this.emitter.setXSpeed(-50, 50);
        this.emitter.gravity = -750;
        this.emitter.setAlpha(1.0, 0.0, 500, Phaser.Easing.Cubic.In);
        this.emitter.setScale(0.8, 2.5, 0.8, 2.5, 500, Phaser.Easing.Cubic.In);
        this.emitter.setRotation(5, 20);
        this.emitter.width = 5;
    },

    setupInput: function () {
        // Setup input
        this.canJump = true;
        this.isJumping = false;
        this.blockInput = false;

        this._actualRunModifier = 0.0;

        this.cursorKeys = this.gameState.game.input.keyboard.createCursorKeys();
        this.runButton = this.gameState.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.jumpButton = this.gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.joystick = new Joystick();
    },

    createSoundEffects: function () {
        // Create sound effects
        for (var i = 1; i <= 3; i++) {
            this.jumpSFX.push(this.game.add.audio('jump_0' + i));
        };

        for (var i = 1; i <= 3; i++) {
            this.touchdownSFX.push(this.game.add.audio('touchdown_0' + i));
        };

        for (var i = 1; i <= 3; i++) {
            this.footstepSFX.push(this.game.add.audio('footstep_0' + i));
        };

        this._footstepSFXPlayed = false;

        this.deathSFX = this.game.add.audio('death_new_sfx');
        this.spawnSFX = this.game.add.audio('spawn_new_sfx');
        this.runSFX = this.game.add.audio('run_sfx');
        this.ghostSFX = this.game.add.audio('ghost_sfx', 1, true);
    },

    createBody: function () {
        this.gameState.registerBody(this.sprite);
        this.sprite.body.setSize(26, 64, 0, 0);
    },

    destroyBody: function () {
        if (this.sprite && this.sprite.body) {
			this.sprite.body.destroy();
			this.sprite.body = null;
		}
    },

    update: function () {
        if (this.blockInput)
            return;

		if (this.animState == Game.PlayerController.AnimState.Respawning ||
            this.animState == Game.PlayerController.AnimState.Dying ||
            this.animState == Game.PlayerController.AnimState.FlyingSoul) {
            return;
		}

        if (this.sprite.body)
            this.isGrounded = this.sprite.body.onFloor();
        
        this.handleInput();
        this.handleAnimation();

        this.emitter.x = this.sprite.x - 4;
        this.emitter.y = this.sprite.y + 34;

        if (this.sprite.frameName == 'shae_walk_1_100-100.png' ||
            this.sprite.frameName == 'shae_walk_3_100-100.png') {
            
            if (!this._footstepSFXPlayed) {
                this.footstepSFX[Utils.random(0, 2)].play('', 0, 0.5);
                this._footstepSFXPlayed = true;
            }
        } else if (this.sprite.frameName == 'shae_run_1_100-100.png' ||
                   this.sprite.frameName == 'shae_run_3_100-100.png') {
            
            if (!this._footstepSFXPlayed) {
                this.footstepSFX[Utils.random(0, 2)].play('', 0, 1.25);
                this._footstepSFXPlayed = true;
            }
        } else if (this._footstepSFXPlayed) {
            this._footstepSFXPlayed = false;
        }
    },

    render: function (game) {
        if (PhysicsConsts.debugDraw && this.sprite && this.sprite.body)
            game.debug.body(this.sprite);
    },

    handleInput: function () {
        if (this.blockInput || !this.sprite.body)
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
		
		// console.log('x: ' + joystickX + ' |y:  ' + joystickY);
		
		var runButtonIsDown = this.runButton.isDown || joystick.getA();
		
        this.direction = Game.PlayerController.Direction.None;

        if (this.isGrounded && this.canJump)
            this.animState = Game.PlayerController.AnimState.Idle;

        if (this.cursorKeys.left.isDown || joystickX < JoystickConsts.leftOffset)
            this.direction = Game.PlayerController.Direction.Left;
        else if (this.cursorKeys.right.isDown || joystickX > JoystickConsts.rightOffset)
            this.direction = Game.PlayerController.Direction.Right;

        if (this.direction != Game.PlayerController.Direction.None && this.isGrounded && this.canJump)
            this.animState = Game.PlayerController.AnimState.Walk;

        if (this.direction != Game.PlayerController.Direction.None && runButtonIsDown) {
            this._actualRunModifier += PlayerConsts.runModifierDamping;
            this._actualRunModifier = Math.min(this._actualRunModifier, 
                                               PlayerConsts.runModifier);

            if (this.isGrounded && this.canJump)
                this.animState = Game.PlayerController.AnimState.Run;

        } else if ((this.runButton.isUp && this.isGrounded) || 
                    this.direction == Game.PlayerController.Direction.None) {
            this._actualRunModifier = 0.0;
        }

        this.direction += this.direction == Game.PlayerController.Direction.Right
                          ? this._actualRunModifier
                          : -this._actualRunModifier;
    },

    handleJump: function () {
		var joystick = this.joystick;
		var hasJumpInput = this.jumpButton.justPressed(100) || joystick.getB();
		
        // if (!this.canJump && this.isGrounded && !this.isJumping && !hasJumpInput)
        //     this.canJump = true;

        if (this.jumpButton.isUp && !this.isJumpInputReleased)
             this.isJumpInputReleased = true;

        if (this.canJump && hasJumpInput/* && this.isJumpInputReleased*/) {
            // Jump!
            this.isJumpInputReleased = false;
            this.isJumping = true;
            this.doJump = true;
            this.canJump = false;
            this.animState = Game.PlayerController.AnimState.JumpStart;
        } else if (!this.isJumpInputReleased && this.currentAnim == 'jump-ascend' && this.jumpButton.justPressed(350)) {
            this.doJump = true;
        } else if (this.isGrounded && (Utils.stringContains(this.currentAnim, 'jump-start') ||
                                       Utils.stringContains(this.currentAnim, 'jump-ascend') ||
                                       Utils.stringContains(this.currentAnim, 'jump-apex') ||
                                       Utils.stringContains(this.currentAnim, 'jump-descend'))) {
            // Player hit the ground.
            this.animState = Game.PlayerController.AnimState.JumpTouchdown;
        } else if (!this.isGrounded) {
            // Player is mid-air...
            if (this.currentAnim == 'jump-ascend' && this.sprite.body.velocity.y > -0.1) {
                // ...and is slowing down. Play apex animation.
                this.animState = Game.PlayerController.AnimState.JumpApex;
            } else if (this.currentAnim != 'jump-descend' && this.sprite.body.velocity.y > 0) {
                this.animState = Game.PlayerController.AnimState.JumpDescend;
                
                if (!this.isJumping) 
                    this.isJumping = true;
                
                if (this.canJump) 
                    this.canJump = false;
            }
         }
    },

    handleAnimation: function () {
        // Handle scaleX to mirror the sprite horizontally.
        if (this.direction <= Game.PlayerController.Direction.Left && this.sprite.scale.x != -1) {
            this.sprite.scale.x = -1;
            this.sprite.anchor.setTo(0.65, 0.5);
        } else if (this.direction >= Game.PlayerController.Direction.Right && this.sprite.scale.x != 1) {
            this.sprite.scale.x = 1;
            this.sprite.anchor.setTo(0.73, 0.5);
        }

        // Handle animation based on current player state.
        if (this.animState == Game.PlayerController.AnimState.Idle && this.currentAnim != 'idle') {
            // Idle animation.
            this.sprite.animations.play('idle');
            this.currentAnim = 'idle';
        } else if (this.animState == Game.PlayerController.AnimState.Walk && this.currentAnim != 'walk') {
            // Walk animation when player is grounded.
            this.sprite.animations.play('walk');
            this.currentAnim = 'walk';
        } else if (this.animState == Game.PlayerController.AnimState.Run && this.currentAnim != 'run') {
            // Run animation when player is grounded.
            this.sprite.animations.play('run');
            this.currentAnim = 'run';
            // Emit particles.
            var numParticles = Utils.random(6, 10);
            this.emitter.start(true, 400, null, numParticles);
            // Play run sound.
            this.runSFX.play('', 0, 0.25);
        } else if (this.animState == Game.PlayerController.AnimState.JumpStart && this.currentAnim != 'jump-start') {
            // Jump start animation, run when player is starting to jump, duh.
            this.sprite.animations.play('jump-start');
            this.currentAnim = 'jump-start';
            // Emit particles.
            var numParticles = Utils.random(12, 18);
            this.emitter.start(true, 500, null, numParticles);
            // Play jump sound effect.
            this.jumpSFX[Utils.random(0, 2)].play();
        } else if (this.animState == Game.PlayerController.AnimState.JumpAscend && this.currentAnim != 'jump-ascend') {
            // Jump ascend animation, run when player is going up.
            this.sprite.animations.play('jump-ascend');
            this.currentAnim = 'jump-ascend';
        } else if (this.animState == Game.PlayerController.AnimState.JumpApex && this.currentAnim != 'jump-apex') {
            // Jump apex animation, run when player reaches close to 0 horizontal velocity while jumping.
            this.sprite.animations.play('jump-apex');
            this.currentAnim = 'jump-apex';
        } else if (this.animState == Game.PlayerController.AnimState.JumpDescend && this.currentAnim != 'jump-descend') {
            // Jump descend animation, run when player is falling.
            this.sprite.animations.play('jump-descend');
            this.currentAnim = 'jump-descend';
        } else if (this.animState == Game.PlayerController.AnimState.JumpTouchdown && this.currentAnim != 'jump-touchdown') {
            // Jump touchdown animation, run when player touched the ground coming from a jump/fall.
            this.sprite.animations.play('jump-touchdown');
            this.currentAnim = 'jump-touchdown';
            // Emit particles.
            var numParticles = Utils.random(8, 12);
            this.emitter.start(true, 500, null, numParticles);
            // Play touchdown sound effects.
            this.touchdownSFX[Utils.random(0, 2)].play();
        } else if (this.animState == Game.PlayerController.AnimState.FlyingSoul &&
		           this.currentAnim != Game.PlayerController.AnimState.FlyingSoul) {
			this.sprite.animations.play(Game.PlayerController.AnimState.FlyingSoul);
			this.currentAnim = Game.PlayerController.AnimState.FlyingSoul;
		}
    },

    applyVelocity: function () {
        // Handle horizontal velocity.
        var body = this.sprite.body;
        if ((body.velocity.x >= 0 && this.direction > 0) || (body.velocity.x <= 0 && this.direction < 0)) {
            // Player is going in the same direction as the input.
            if (this.direction > 0)
                body.velocity.x = Math.min(body.velocity.x + PlayerConsts.walkAccel * this.direction, 
                                           PlayerConsts.walkVelocity * this.direction);
            else
                body.velocity.x = Math.max(body.velocity.x + PlayerConsts.walkAccel * this.direction,
                                           PlayerConsts.walkVelocity * this.direction);
        } else if ((body.velocity.x >= 0 && this.direction < 0) || (body.velocity.x <= 0 && this.direction > 0)) {
            // Player is going in a different direction from the input.
            if (this.direction > 0)
                body.velocity.x = Math.min(body.velocity.x + PlayerConsts.walkDamping * this.direction, 
                                           PlayerConsts.walkDamping * this.direction);
            else
                body.velocity.x = Math.max(body.velocity.x + PlayerConsts.walkDamping * this.direction, 
                                           PlayerConsts.walkDamping * this.direction);
        } else {
            if (body.velocity.x > 0)
                body.velocity.x = Math.max(0.0, body.velocity.x - PlayerConsts.walkDamping * 3.0);
            else if (body.velocity.x < 0)
                body.velocity.x = Math.min(0.0, body.velocity.x + PlayerConsts.walkDamping * 3.0);
        }

        // Handle vertical velocity.
        if (this.doJump) {
            this.sprite.body.velocity.y = -PlayerConsts.jumpVelocity;
            this.doJump = false;
        }
    },

    onJumpStartFinished: function () {
        if (this.sprite.body.velocity.y < 0 && this.currentAnim != 'jump-ascend')
            this.animState = Game.PlayerController.AnimState.JumpAscend;
    },

    onJumpApexFinished: function () {
        // Player is mid-air...
        if (this.sprite.body.velocity.y > 0) {
            // ...and is falling.
            this.animState = Game.PlayerController.AnimState.JumpDescend;
        }
    },

    onJumpTouchdownFinished: function () {
        // console.log('onJumpTouchdownFinished');
        this.canJump = true;
        this.isJumping = false;
    },

    playRespawnAnimation: function () {
        this.sprite.animations.play('respawn');
        this.currentAnim = 'respawn';
        this.animState = Game.PlayerController.AnimState.Respawning;

        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;

        this.spawnSFX.play();

        if (this.ghostSFX.isPlaying)
            this.ghostSFX.stop();
    },

    playDeathAnimation: function () {
        this.sprite.animations.play('dying');
        this.currentAnim = 'dying';
        this.animState = Game.PlayerController.AnimState.Dying;

        this.deathSFX.play();
    },
	
	playFlyingSoulAnimation: function () {
		this.sprite.animations.play(Game.PlayerController.AnimState.FlyingSoul);
        this.currentAnim = Game.PlayerController.AnimState.FlyingSoul;
        this.animState = Game.PlayerController.AnimState.FlyingSoul;

        this.ghostSFX.play('', 0, 0.1);
        var tween = this.game.add.tween(this.ghostSFX);
        tween.to({ volume: 1.0 }, 1000);
        tween.start();
	},

    onRespawnAnimFinished: function () {
        // console.log('onRespawnAnimFinished');
        this.createBody();
        this.animState = Game.PlayerController.AnimState.Idle;
		this.canJump = true;
        this.isJumping = false;
        this.blockInput = false;
		this.sprite.frameName = 'shae_idle_1_100-100.png';
        this.sprite.anchor.setTo(0.73, 0.5);
		this._actualRunModifier = 0.0;
    },

    onDeathAnimFinished: function () {
		if (this.gameState.playerLife() < 0) {
			this.sprite.scale.x = 0;
			this.sprite.scale.y = 0;
			return;
		}
		
		var self = this;

		this.sprite.alpha = 0.0;
		this.playFlyingSoulAnimation();
		
		var fadeInTweenCompleted = false;
		var positionTweenCompleted = false;

		if (self.sprite.x < self.spawnPoint.x) {
            this.direction = Game.PlayerController.Direction.Right;
		} else {
			this.direction = Game.PlayerController.Direction.Left;
		}
		this.handleAnimation();

		var fadeInTween = this.gameState.game.add.tween(this.sprite);
		fadeInTween.to(null, 800, Phaser.Easing.Linear.None, true, 0)
		           .to({ alpha: 1.0 }, 1000, Phaser.Easing.Quadratic.Out, true, 0);
		fadeInTween.onComplete.add(function () {
			if (fadeInTweenCompleted)
                return;
			fadeInTweenCompleted = true;

			var positionTween = self.gameState.game.add.tween(self.sprite);
			positionTween.to({ x: self.spawnPoint.x + 20, y: self.spawnPoint.y - 32 },
			                 5 * Phaser.Point.distance(self.sprite, self.spawnPoint),
							 Phaser.Easing.Linear.None,
							 true,
							 0);
            positionTween.onComplete.add(function () {
				if (positionTweenCompleted)
				    return;
				positionTweenCompleted = true;
				
				var fadeOutAnimationLength = 2;
				var fadeOutAnimationIndex = 0;
				var fadeOutTween = self.gameState.game.add.tween(self.sprite);
				fadeOutTween.to(null, 400, Phaser.Easing.Linear.None, true, 0)
//				            .to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true, 0)
							.to({ alpha: 1 }, 0, Phaser.Easing.Linear.None, true, 0);
                fadeOutTween.onComplete.add(function () {
					if (++fadeOutAnimationIndex != fadeOutAnimationLength) {
						return;
					}
                    self.playRespawnAnimation();
					self.handleAnimation();
				});
			});
		});
    },

    stopAndBlockInput: function () {
        this.blockInput = true;
        this.sprite.body.immovable = true;
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.animations.stop();
    }
};