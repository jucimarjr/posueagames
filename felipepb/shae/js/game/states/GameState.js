Game.GameState = function () {

    this.map;
    this.layer;

    this.player;
	this.playerFocusLight;
    this.playerLightSprite;
	
	this.hearts = [];
};

Game.GameState.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#2d2d2d';

        this.setupPhysicsSystem();
        this.createTileMap();
        this.createPlayer();
		// this.createHearts();
    },

    setupPhysicsSystem: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = PhysicsConsts.gravity;
        this.game.physics.arcade.TILE_BIAS = PhysicsConsts.tileBias;
    },

    createTileMap: function () {
        this.map = this.game.add.tilemap('map');
        
        this.map.addTilesetImage('ground_1x1');
        // this.map.addTilesetImage('walls_1x2');
        // this.map.addTilesetImage('tiles2');

        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
		this.layer.debug = true;
		this.layer.debugColor = 'red';

        this.map.setCollisionBetween(0, 25);
    },

    createPlayer: function () {
        this.player = new Game.PlayerController(this);
        this.player.create();
		
        this.game.camera.follow(this.player.sprite, 0);

		this.playerFocusLight = this.game.add.bitmapData(this.game.width, this.game.height);
		this.playerFocusLight.context.fillStyle = 'rgba(0, 0, 0, 0.6)';
		this.playerLightSprite = this.game.add.image(0, 0, this.playerFocusLight);
    },
	
	createHearts: function () {
		// var collisions = this.map.collision.collision;

		// console.log('collision: ' + collisions);
		
		// Game.HeartController.setWalls(collisions);
		// Game.HeartController.setStageCorners(0, 0, this.game.width, this.game.height);
		
		var heart = new Game.HeartController(this.game);
		heart.create(this.game.width / 2.0 - 250, 500, this.game);
		this.hearts.push(heart);
		
		// heart = new Game.HeartController(this.game);
		// heart.create(this.game.width - 100, this.game.height / 2.0 + 200, this.game);
		// this.hearts.push(heart);
	},

    update: function () {
        this.game.physics.arcade.collide(this.layer, this.player.sprite);
        this.player.update();
        this.playerLightSprite.x = this.game.camera.x;
        this.playerLightSprite.y = this.game.camera.y;
		
		var hearts = this.hearts;
        var length = hearts.length;
		for (var i = 0; i < length; i++) {
            // console.log(Math.sin(this.game.time.elapsed / 10.0));
            hearts[i].x += Math.sin(this.game.time.elapsed / 1000.0) * 2.0;
            hearts[i].update();
        }
    },

    render: function () {
		var hearts = this.hearts;
        var length = hearts.length;
		
        this.player.render(this.game);
		// Game.HeartController.clearBitmap();
		// for (var i = 0; i < length; i++)
  //           hearts[i].render();
		// Game.HeartController.renderBitmap();
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
    }
};