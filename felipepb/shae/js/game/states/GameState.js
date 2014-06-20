Game.GameState = function () {
    this.map;
    this.layer;
    this.keyGroup;
    this.gateGroup;

    this.player;
	this.playerFocusLight;
    this.playerLightSprite;
	
	this.hearts = [];
	this.heartBeatController;

    this.hud;

    this.playerHasKey;
    this.stageComplete;
};

Game.GameState.tileMapName = 'map';

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
		this.createHeartBeatController();
        this.createHUD();
		
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
        var tween = this.game.add.tween(this.player.sprite);

        tween.to(null, 1000, Phaser.Easing.Linear.None, true, 0);
        tween.onComplete.add(function () {
            self.player.playRespawnAnimation();
		});
	},

    setupPhysicsSystem: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = PhysicsConsts.gravity;
        this.game.physics.arcade.TILE_BIAS = PhysicsConsts.tileBias;
    },

    createTileMap: function () {
        this.map = this.game.add.tilemap(Game.GameState.tileMapName);
        
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
		this.heartBeatController = new Game.HeartBeatController(this.game);
		this.heartBeatController.setHearts(this.hearts);
	},
	
	createPlayerLight: function () {
		this.playerFocusLight = this.game.add.bitmapData(this.game.width, this.game.height);
        this.playerFocusLight.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
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

    update: function () {
        this.game.physics.arcade.collide(this.layer, this.player.sprite);
        this.game.physics.arcade.overlap(this.keyGroup, this.player.sprite, this.collideWithKey, null, this);
        this.game.physics.arcade.collide(this.gateGroup, this.player.sprite, this.collideWithGate, null, this);
        
        this.player.update();
		
		var hearts = this.hearts;
		var heartsLength = hearts.length;
		for (var i = 0; i < heartsLength; i++) {
			hearts[i].update();
		}
		
		this.heartBeatController.update();
    },

    render: function () {
        this.player.render(this.game);
		this.renderPlayerLight();
    },
	
	renderPlayerLight: function () {
		var context = this.playerFocusLight.context;
        var screenWidth = this.game.camera.width;
        var screenHeight = this.game.camera.height;
		
		context.clearRect(0, 0, screenWidth, screenHeight);
        context.beginPath();
        context.rect(0, 0, screenWidth, screenHeight);
        
        context.shadowColor = 'black';
        context.shadowBlur = 200;
        
        context.arc(this.player.sprite.x - this.game.camera.x,
                    this.player.sprite.y - this.game.camera.y,
                    100, 0, Math.PI * 2, true);
        
        context.fill();
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
        this.hud.showKeyIcon();
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
		Game.GameState.tileMapName = 'map';           // set next tilemap here
		this.navigate('GameState');
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
        Utils.fadeInScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeInDuration, function () {
            self.state.start(stateName);
        });
	},

    onPlayerLostLife: function () {
        var self = this;
        this.hud.decreaseLife(function () { self.onGameOver(); });
    },

    onGameOver: function () {
        this.navigateToGameLoose();
    }
};