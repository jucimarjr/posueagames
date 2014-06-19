Game.GameState = function () {

    this.map;
    this.layer;
    this.keyGroup;

    this.player;
	this.playerFocusLight;
    this.playerLightSprite;
	
	this.hearts = [];

    this.playerHasKey;
};

Game.GameState.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#2d2d2d';

        this.setupPhysicsSystem();
        this.createTileMap();
        this.createKey();
        this.createHearts();
        this.createPlayer();
    },

    setupPhysicsSystem: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = PhysicsConsts.gravity;
        this.game.physics.arcade.TILE_BIAS = PhysicsConsts.tileBias;
    },

    createTileMap: function () {
        this.map = this.game.add.tilemap('map');
        
        this.map.addTilesetImage('ground_1x1');
        // this.map.addTilesetImage('key');
        // this.map.addTilesetImage('tiles2');

        this.layer = this.map.createLayer('walls');
        this.layer.resizeWorld();
		this.layer.debug = PhysicsConsts.debugDraw;
		this.layer.debugColor = 'red';

        this.map.setCollisionBetween(0, 25);
    },

    createPlayer: function () {
        this.player = new Game.PlayerController(this);
        this.player.create();
		
        this.game.camera.follow(this.player.sprite, 0);

		this.playerFocusLight = this.game.add.bitmapData(this.game.width, this.game.height);
		this.playerFocusLight.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
		this.playerLightSprite = this.game.add.image(0, 0, this.playerFocusLight);

        this.playerHasKey = false;
    },
	
	createHearts: function () {
		// var collisions = this.map.collision.collision;

		// console.log('collision: ' + collisions);
		
		// Game.HeartController.setWalls(collisions);
		// Game.HeartController.setStageCorners(0, 0, this.game.width, this.game.height);
		
        var waypoints = this.map.collision.collision;
        for (var i = 0; i < waypoints.length; i++) {
            var heart = new Game.HeartController(this.game, waypoints[i]);
            heart.create();
            this.hearts.push(heart);
        };
		
		// heart = new Game.HeartController(this.game);
		// heart.create(this.game.width - 100, this.game.height / 2.0 + 200, this.game);
		// this.hearts.push(heart);
	},

    createKey: function () {
        this.keyGroup = this.game.add.group();
        this.keyGroup.enableBody = true;
        
        this.map.createFromObjects(
            'spawn_points', 26, 'main_sprite_atlas', 'key_1_42-38.png',
            true, false, this.keyGroup, Game.KeyController, false
        );

        this.keyGroup.forEach(
            function (key) { 
                key.body.allowGravity = false;
                key.body.setSize(10, 30, 16, 0);
            }, this);
    },

    update: function () {
        this.game.physics.arcade.collide(this.layer, this.player.sprite);
        this.game.physics.arcade.overlap(this.keyGroup, this.player.sprite, this.collideWithKey, null, this);
        this.player.update();
        this.playerLightSprite.x = this.game.camera.x;
        this.playerLightSprite.y = this.game.camera.y;
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
        
        context.arc(this.player.sprite.x - this.playerLightSprite.x,
                    this.player.sprite.y - this.playerLightSprite.y,
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
        this.playerHasKey = true;
        keySprite.destroy();
    }
};