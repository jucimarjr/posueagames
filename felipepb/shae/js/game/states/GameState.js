Game.GameState = function () {
    this.map;
    this.layer;
    this.keyGroup;
    this.gateGroup;

    this.player;
	this.playerFocusLight;
    this.playerLightSprite;
	this.playerLightRadius;
	this.playerLightAlpha;
    this.playerLightAnimationTime;
	this.playerLightRadiusFrom;
	this.playerLightRadiusTo;
	this.playerLightAlphaFrom;
	this.playerLightAlphaTo;

	this.hearts = [];
	this.heartBeatController;
	
	this.playerClone;

    this.hud;
    this.loadedLevel;
	
	this.pause;

    this.playerHasKey;
    this.stageComplete;
};

Game.GameState.currentLevel = 0;
Game.GameState.levels = [
    { name: 'tutorial' },
    { name: 'level_1' },
    { name: 'level_2' },
    { name: 'level_3' }
    // Add more levels here...
];

Game.GameState.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#2d2d2d';

        this.setupPhysicsSystem();
        this.createTileMap();
        this.createKey();
        this.createGate();
		this.createPlayer();
        this.createHearts();
		this.createPlayerLight();

		if (Game.GameState.currentLevel == Game.GameState.levels.length - 1)
			this.createPlayerClone();
		else
			this.playerClone = null;

		this.createHeartBeatController();
		this.playerLightRadius = 0;
		this.playerLightAlpha = 0.0;
		this.playerLightAnimationTime = 0;
		this.playerLightRadiusFrom = PlayerConsts.lightFocusRadius;
		this.playerLightRadiusTo = PlayerConsts.lightFocusRadius - 15;
		this.playerLightAlphaFrom = 0.0;
        this.playerLightAlphaTo = 0.2;
		
		var self = this;
		Utils.fadeOutScreen(this.game,
		                    TweensConsts.fadeFillStyle,
							TweensConsts.fadeOutDuration * 3,
							function () {
                                self.onFadeOutScreenAnimationCompleted();
							});
    },

	onFadeOutScreenAnimationCompleted: function () {
		var self = this;
		var pauseTween = this.game.add.tween(this);
		var playerLightTween = this.game.add.tween(this);
        var playerRespawnTween = this.game.add.tween(this);
        
		pauseTween.to(null, 500, Phaser.Easing.Linear.None, true, 0);
		pauseTween.onComplete.add(function () {
			playerLightTween.to({ playerLightRadius: PlayerConsts.lightFocusRadius }, 500, Phaser.Easing.Quadratic.Out, true, 0);
	        playerLightTween.onComplete.add(function () {
	            playerRespawnTween.to(null, 1000, Phaser.Easing.Linear.None, true, 0);
	            playerRespawnTween.onComplete.add(function () {
					self.createHUD();
					self.createPause();
	                self.player.playRespawnAnimation();
	            });
	        });
		});
	},

    setupPhysicsSystem: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = PhysicsConsts.gravity;
        this.game.physics.arcade.TILE_BIAS = PhysicsConsts.tileBias;
    },

    createTileMap: function () {
        this.loadedLevel = Game.GameState.levels[Game.GameState.currentLevel];
        console.log('loaded level: ' + this.loadedLevel.name);
        this.map = this.game.add.tilemap(this.loadedLevel.name);
        
        this.map.addTilesetImage('walls_tileset');

        this.layer = this.map.createLayer('walls');
        this.layer.resizeWorld();
		this.layer.debug = PhysicsConsts.debugDraw;
		this.layer.debugColor = 'red';

        this.map.setCollisionBetween(0, 25);

        this.stageComplete = false;
    },

    createPlayer: function () {
        var point = { x: 0, y: 0 };
        for (var i = 0; i < this.map.objects.spawn_points.length; i++) {
            if (this.map.objects.spawn_points[i].name == 'player-sp') {
                point.x = this.map.objects.spawn_points[i].x;
                point.y = this.map.objects.spawn_points[i].y;
            }
        };

        this.player = new Game.PlayerController(this, point);
        this.player.create();
        this.game.camera.follow(this.player.sprite, 0);
        this.playerHasKey = false;
    },
    
    createPlayerClone: function () {
    	this.playerClone = new Game.PlayerCloneController(this);
        this.playerClone.create();
    },
	
	createHearts: function () {		
        var waypoints = this.map.collision.collision;
		Utils.clearArray(this.hearts);
        for (var i = 0; i < waypoints.length; i++) {
            var heart = new Game.HeartController(this, this.player, waypoints[i]);
            heart.create();
            this.hearts.push(heart);
        };
	},

	createHeartBeatController: function () {
		this.heartBeatController = new Game.HeartBeatController(this.game, this.player.sprite);
		this.heartBeatController.setHearts(this.hearts);
	},
	
	createPlayerLight: function () {
		this.playerFocusLight = this.game.add.bitmapData(this.game.width, this.game.height);
        this.playerLightSprite = this.game.add.image(0, 0, this.playerFocusLight);
		this.playerLightSprite.fixedToCamera = true;
	},

    createKey: function () {
        this.keyGroup = this.game.add.group();
        this.keyGroup.enableBody = true;
        
        this.map.createFromObjects(
            'spawn_points', 1, 'main_sprite_atlas', 'key_1_42-38.png',
            true, false, this.keyGroup, Game.KeyController, false
        );

        this.keyGroup.forEach(
            function (key) { 
                key.body.allowGravity = false;
                key.body.setSize(10, 30, 16, 0);
            }, this);
    },

    createGate: function () {
        this.gateGroup = this.game.add.group();
        this.gateGroup.enableBody = true;
        
        this.map.createFromObjects(
            'gates', 6, 'main_sprite_atlas', 'gate_32-96.png',
            true, false, this.gateGroup, Game.GateController, false
        );

        this.gateGroup.forEach(
            function (gate) { 
                gate.body.allowGravity = false;
                gate.body.immovable = true;
                // gate.body.setSize(10, 30, 16, 0);
            }, this);
    },

    createHUD: function () {
        this.hud = new Game.HUDController(this);
        this.hud.create();
    },
	
	createPause: function () {
		this.pause = new Game.PauseController(this);
		this.pause.create();
	},

    update: function () {
		if (this.pause) {
            this.pause.update();
        }
		
        this.game.physics.arcade.collide(this.layer, this.player.sprite);
        this.game.physics.arcade.overlap(this.keyGroup, this.player.sprite, this.collideWithKey, null, this);
        this.game.physics.arcade.collide(this.gateGroup, this.player.sprite, this.collideWithGate, null, this);
        
        this.player.update();
        if (this.playerClone)
        	this.playerClone.update();
		
		var hearts = this.hearts;
		var heartsLength = hearts.length;
		for (var i = 0; i < heartsLength; i++) {
			hearts[i].update();
		}
		if (this.player.sprite.body && !this.stageComplete) {
			this.heartBeatController.update();
            this.updatePlayerLight();
		}
    },
	
	pauseUpdate: function () {
		if (this.pause) {
			this.pause.pauseUpdate();
		}
	},

    render: function () {
        this.player.render(this.game);
		this.renderPlayerLight();
    },
	
	updatePlayerLight: function () {
		var duration = this.heartBeatController.frequence;
		var fromRadius = this.playerLightRadiusFrom;
		var toRadius = this.playerLightRadiusTo;
		var fromAlpha = this.playerLightAlphaFrom;
		var toAlpha = this.playerLightAlphaTo;

		if (this.playerLightRadius == toRadius) {
			var copyRadius = fromRadius;
			fromRadius = toRadius;
			toRadius = copyRadius;
			
			var copyAlpha = fromAlpha;
			fromAlpha = toAlpha;
			toAlpha = copyAlpha;
		}

        var progress = Phaser.Easing.Bounce.InOut(this.playerLightAnimationTime / duration);
		this.playerLightAnimationTime += this.game.time.elapsed;

		this.playerLightRadius = fromRadius + (toRadius - fromRadius) * progress;
		this.playerLightAlpha = fromAlpha + (toAlpha - fromAlpha) * progress;

		if (this.playerLightAnimationTime >= duration) {
            this.playerLightAnimationTime = 0;
			this.playerLightRadius = toRadius;
			this.playerLightAlpha = toAlpha;
        }
		
		this.playerLightRadiusFrom = fromRadius;
        this.playerLightRadiusTo = toRadius;
		this.playerLightAlphaFrom = fromAlpha;
		this.playerLightAlphaTo = toAlpha;
    },

	renderPlayerLight: function () {
		var context = this.playerFocusLight.context;
        var camera = this.game.camera;
		var playerSprite = this.player.sprite;

		context.clearRect(0, 0, camera.width, camera.height);

        context.beginPath();
        context.rect(0, 0, camera.width, camera.height);
        context.arc(playerSprite.x - camera.x,
                    playerSprite.y - camera.y,
                    this.playerLightRadius, 0, Math.PI * 2, true);
        context.fillStyle = 'rgba(0, 0, 0, 1.0)';
		context.shadowColor = 'black';
        context.shadowBlur = 200;
        context.fill();
		context.closePath();

        if (!this.stageComplete) {
            context.arc(playerSprite.x - camera.x,
                        playerSprite.y - camera.y,
                        this.playerLightRadius, 0, Math.PI * 2);
	        context.fillStyle = 'rgba(0, 0, 0, ' + this.playerLightAlpha + ')';
	        context.shadowColor = 'transparent';
	        context.shadowBlur = 0;
	        context.fill(); 
		}

		if (PhysicsConsts.debugDraw) {
			context.beginPath();
	        context.arc(playerSprite.x - camera.x,
	                    playerSprite.y - camera.y,
	                    5, 0, Math.PI * 2);
	        context.fillStyle = 'red';
	        context.fill();
	        context.closePath();
		}

        this.playerFocusLight.dirty = true;
	},

    registerBody: function (sprite) {
        this.game.physics.arcade.enableBody(sprite);
    },

    unregisterBody: function (body) {
        body.destroy();
    },

    collideWithKey: function (playerSprite, keySprite) {
        if (this.playerHasKey)
            return;
        
        this.playerHasKey = true;
        keySprite.onCollected(playerSprite);
        
        if (this.playerClone) {
        	this.stageComplete = true;
            this.player.stopAndBlockInput();
            this.player.destroyBody();
			for (var i = 0; i < this.hearts.length; i++) {
				this.hearts[i].setEnabled(false);
			}
			this.onStageComplete();
        } else {
        	this.hud.showKeyIcon();
        }
    },

    collideWithGate: function (playerSprite, gateSprite) {
        if (this.stageComplete)
            return;

        if (this.playerHasKey) {
            this.stageComplete = true;
            gateSprite.onGateOpenned(this.onStageComplete, this);
            this.player.stopAndBlockInput();
			for (var i = 0; i < this.hearts.length; i++) {
				this.hearts[i].setEnabled(false);
			}
        } else {
            console.log('Key needed!');
        }
    },

    onStageComplete: function () {
        console.log('Stage complete! Load next level...');
		
        Game.GameState.currentLevel += 1;

        var nextState = 'GameState';

        if (Game.GameState.currentLevel >= Game.GameState.levels.length)
            nextState = 'GameWinState';
		
		var self = this;
        var playerLightTween = this.game.add.tween(this);
        playerLightTween.to({ playerLightRadius: 0 }, 500, Phaser.Easing.Quadratic.In, true, 0);
        playerLightTween.onComplete.add(function () {
            self.navigate(nextState);
        });
    },
	
	navigateToGameWin: function () {
        this.navigate('GameWinState');
    },
	
	navigateToGameLoose: function () {
		this.navigate('GameLooseState');
	},

	navigate: function (stateName) {
		var self = this;
        self.game.input.keyboard.onDownCallback = null;
		self.game.input.keyboard.reset();
        Utils.fadeInScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeInDuration, function () {
            self.state.start(stateName);
        });
	},

	playerLife: function () {
        return this.hud ? this.hud.livesCount : PlayerConsts.startingLifeTotal;
    },

    onPlayerLostLife: function () {
        var self = this;
        this.hud.decreaseLife(function () { self.onGameOver(); });
    },

    onGameOver: function () {
		var self = this;
		var pauseTween = this.game.add.tween(this);

		pauseTween.to(null, 1500, Phaser.Easing.Linear.None, true, 0);
		pauseTween.onComplete.add(function () {
            self.navigateToGameLoose();
		});
    }
};