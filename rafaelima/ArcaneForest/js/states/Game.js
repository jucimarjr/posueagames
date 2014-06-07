State.Game = function(game) {
	"use strict";
	this.game = game;
};

var layer;
var player;
var cursors;
var attackButton;
var pauseButton;
var map;
var rotate;
var bg1;
var bg2;
var bg3;
var bg4;
var bg5;
var bar, bar2, bar3;
var previousX;
var previousY;
var collects;
var itemsTaken;
var idPlayer;
var helper;
var flagId, flagMove;
var monster;
var playerCollisionGroup, obstacleCollisionGroup, monsterCollisionGroup, tileCollisionGroup, collectCollisionGroup, barCollisionGroup;
var isJumping, beInGround, yBeforeJump;
var monster_speed = 5;
var health;

State.Game.prototype = {
	preload : function() {
		"use strict";
		itemsTaken = 0;
		flagId = false;
		idPlayer = 0;
		beInGround = true;
		isJumping = false;
		yBeforeJump = 3504;
		rotate = 0.05;
		previousX = 0;
		previousY = 0;
		flagMove = false;
	},
	create : function() {
		"use strict";

		//set p2
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.setImpactEvents(true);
		this.game.physics.p2.restitution = 0;
		this.game.physics.p2.gravity.y = 800;
		this.game.stage.backgroundColor = '#2d2d2d';
		this.game.physics.p2.updateBoundsCollisionGroup();

		//collision groups
		//start collision groups
		playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
		obstacleCollisionGroup = this.game.physics.p2.createCollisionGroup();
		monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
		tileCollisionGroup = this.game.physics.p2.createCollisionGroup();
		collectCollisionGroup = this.game.physics.p2.createCollisionGroup();
		barCollisionGroup = this.game.physics.p2.createCollisionGroup();

		//bg
		bg4 = this.game.add.tileSprite(1700, 1950, 3600, 1200, 'bg4');
		bg4.tileScale.setTo(4, 4);
		bg1 = this.game.add.tileSprite(0, 3060, 3000, 540, 'bg1');
		bg2 = this.game.add.tileSprite(0, 3060, 3000, 540, 'bg2');
		bg3 = this.game.add.tileSprite(0, 3060, 3000, 540, 'bg3');
		this.game.add.tileSprite(2560, 3060, 3000, 540, 'bg4');

		//Map
		map = this.game.add.tilemap('stage');
		map.addTilesetImage('tileset_arcane_forest', 'tileset');
		layer = map.createLayer('Camada de Tiles 1');
		map.setCollisionBetween(1, 5);
		map.setCollisionBetween(8, 22);
		map.setCollisionBetween(25, 32);
		map.setCollisionBetween(34, 37);
		this.game.physics.p2.enable(layer);
		var tileObjects = this.game.physics.p2.convertTilemap(map, layer);

		//Tile collision
		for ( var tile in tileObjects) {
			tileObjects[tile].setCollisionGroup(tileCollisionGroup);
			tileObjects[tile].collides(playerCollisionGroup, this.hitTiles,
					this);
		}

		//player
		player = this.game.add.sprite(60, 3300, 'emmarun');
		player.animations.add('right', [ 0, 1, 2, 3, 4 ], 10, true);
		player.animations.add('turn', [ 4 ], 20, true);
		player.animations.add('left', [ 4, 3, 2, 1, 0 ], 10, true);
		player.smoothed = false;
		player.health = 3;
		this.game.physics.p2.enable(player, false);
		this.game.camera.follow(player);
		player.body.collideWorldBounds = true;
		player.body.fixedRotation = true;
		player.body.setCollisionGroup(playerCollisionGroup);

		//collide
		player.body.collides(monsterCollisionGroup, this.hitMonsters, this);
		player.body.collides(obstacleCollisionGroup, this.hitObstacles, this);
		player.body.collides(tileCollisionGroup, this.hitTiles, this);
		player.body.collides(collectCollisionGroup, this.collectItems, this);
		player.body.collides(barCollisionGroup, this.hitBar, this);

		//add 'things' to the world
		this.putObstacles();
		this.putMonsters();
		this.putBar();
		this.putCollect();

		beInGround = false;
		isJumping = false;
		yBeforeJump = 3504;

		//DEBUG LAYER - deletar
		layer.debug = true;

		layer.resizeWorld();

		cursors = this.game.input.keyboard.createCursorKeys();
		attackButton = this.game.input.keyboard
				.addKey(Phaser.Keyboard.SPACEBAR);

		pauseButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		pauseButton.onDown.add(this.pauseGame, this);

	},

	pauseGame : function() {
		this.game.paused = !this.game.paused;
	},

	update : function() {
		"use strict";

//		this.showHealth();
		//				Config.global.screen.resize(this.game);
		if (cursors.left.isDown) {
			player.body.moveLeft(500);
			player.scale.x = -1;
			player.animations.play('left');
		} else if (cursors.right.isDown) {
			player.body.moveRight(500);
			player.scale.x = 1;
			player.animations.play('right');
		} else if (cursors.up.isDown) {
			//					layer.rotation -=0.05;
			//					layer.resizeWorld();
			//					map.setCollisionBetween(1, 12);
			//					this.game.physics.p2.enable(layer);
		} else if (cursors.down.isDown) {
			//					layer.rotation +=0.05;
			//					layer.resizeWorld();
		} else {
			player.body.velocity.x = 0;
			player.animations.play('turn');
		}

		if (parseInt(player.x) > (Config.global.screen.width / 2)
				&& previousX != parseInt(player.x)) {
			if (previousX > player.x) {
				bg2.tilePosition.x += 0.2;
				bg3.tilePosition.x += 0.3;
			} else {
				bg2.tilePosition.x -= 0.2;
				bg3.tilePosition.x -= 0.3;
			}
		}

		previousX = parseInt(player.x);

		this.doJump();
		this.doAttack();
		this.followPlayer();

		if (player.x < 2863 && player.y <= 2461) {
			this.gameRotate();
		}

	},

	onClick : function() {
		"use strict";
	},

	gameRotate : function() {
		"use strict";
		this.game.state.start('GifFall');
	},

	render : function() {
		"use strict";
		//DEBUG
//		this.game.debug.spriteInfo(player, 32, 32);
	},

	//collect item (diamond and key)
	collectItems : function(varPlayer, collect) {
		"use strict";
		//hit once
		if ((collect.data.id != idPlayer) && !flagId) {
			idPlayer = collect.data.id;

			console.log(varPlayer.data.id, collect.data.id);
			collect.sprite.kill();
			itemsTaken++;

			if (itemsTaken > 0) {
				var fixedItem = collect.sprite.reset(0, 0, 1);
				fixedItem.fixedToCamera = true;
				fixedItem.cameraOffset.setTo(856 + (24 * itemsTaken), 20);
				flagId = true;
			}
		}
		if ((collect.data.id == idPlayer) && flagId) {
			flagId = false;
		}
	},

	//health
	showHealth : function() {
		"use strict";
		//hit once
		var healthNumber = player.health;
		for (var totalHealth = 3; totalHealth > 0; totalHealth--, healthNumber--) {
			if (healthNumber > 0) {
				var fixedItem = this.game.add.sprite(40 * (totalHealth), 8,
						'life');
			} else {
				var fixedItem = this.game.add.sprite(40 * (totalHealth), 8,
						'nolife');
			}
			fixedItem.fixedToCamera = true;
		}
	},

	resetPlayerBasic : function() {
		player.smoothed = false;
		this.game.physics.p2.enable(player, false);
		this.game.camera.follow(player);
		player.body.collideWorldBounds = true;
		player.body.fixedRotation = true;
		player.body.setCollisionGroup(playerCollisionGroup);

		//collide
		player.body.collides(monsterCollisionGroup, this.hitMonsters, this);
		player.body.collides(obstacleCollisionGroup, this.hitObstacles, this);
		player.body.collides(tileCollisionGroup, this.hitTiles, this);
		player.body.collides(collectCollisionGroup, this.collectItems, this);
		player.body.collides(barCollisionGroup);
	},

	resetPlayerJumpUp : function() {
		var x = player.x;
		var y = player.y;
		player.kill();
		player = this.game.add.sprite(x, y, 'emmajumping');
		player.animations.add('right', [ 1, 0 ], 5, true);
		player.animations.add('turn', [ 1 ], 5, true);
		player.animations.add('left', [ 1, 0 ], 5, true);
		this.resetPlayerBasic()
	},

	resetPlayerJumpDown : function() {
		var x = player.x;
		var y = player.y;
		player.kill();
		player = this.game.add.sprite(x, y, 'emmajumping');
		player.animations.add('right', [ 1, 2 ], 3, true);
		player.animations.add('turn', [ 2 ], 3, true);
		player.animations.add('left', [ 1, 2 ], 3, true);
		this.resetPlayerBasic();

	},

	resetPlayer : function() {
		var x = player.x;
		var y = player.y;
		player.kill();
		player = this.game.add.sprite(x, y, 'emmarun');
		player.animations.add('right', [ 0, 1, 2, 3, 4 ], 10, true);
		player.animations.add('turn', [ 4 ], 20, true);
		player.animations.add('left', [ 4, 3, 2, 1, 0 ], 10, true);
		this.resetPlayerBasic();
	},
	doJump : function() {
		if (cursors.up.isDown) {
			if (isJumping === false && beInGround === true) {
				if (player.key != 'emmajumping') {
					this.resetPlayerJumpUp();
				}
				yBeforeJump = player.body.y;
				player.body.moveUp(500);
				isJumping = true;
				beInGround = false;
			}
		}
		if (isJumping === true) {
			player.body.moveUp(500);
			if (player.body.y <= (yBeforeJump - 500)) {
				this.resetPlayerJumpDown();
				isJumping = false;
				player.body.moveDown(500);
			}
		} else if (beInGround != true) {
			player.body.moveDown(500);
		}
	},

	doAttack : function() {
		if (attackButton.isDown) {
			if (player.key != 'emmaattack') {
				var x = player.x;
				var y = player.y - 100;
				player.kill();
				player = this.game.add.sprite(x, y, 'emmaattack');
				player.animations.add('right', [ 0, 2, 1 ], 6, true);
				player.animations.add('turn', [ 0, 2, 1 ], 6, true);
				player.animations.add('left', [ 0, 2, 1 ], 6, true);
				this.resetPlayerBasic();
			}
		}
	},

	hitTiles : function() {
		beInGround = this.checkIfCanJump();
		isJumping = false;
		if (player.key != 'emmarun') {
			this.resetPlayer();
		}
	},

	hitObstacles : function() {
		beInGround = this.checkIfCanJump();
		isJumping = false;
		if (player.key != 'emmarun') {
			this.resetPlayer();
		}
	},

	hitMonsters : function() {
		if (player.key === 'emmaattack' && this.checkIfConered() === true) {
			monster.kill();
			player.body.moveLeft(500);
		} else {
			player.kill();
			monster.body.moveRight(500);
		}
	},

	hitBar : function() {
		if (checkIfConered() === false) {
			beInGround = checkIfCanJump();
			isJumping = false;
		}
	},

	//internet magic...player is over something
	checkIfCanJump : function() {

		var yAxis = p2.vec2.fromValues(0, 1);
		var result = false;

		for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = game.physics.p2.world.narrowphase.contactEquations[i];

			if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
				var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
				if (c.bodyA === player.body.data)
					d *= -1;
				if (d > 0.5)
					result = true;
			}
		}

		return result;

	},
	//internet magic...player has something beside her rightside
	checkIfConered : function() {

		var xAxis = p2.vec2.fromValues(1, 0);
		var result = false;

		for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = game.physics.p2.world.narrowphase.contactEquations[i];

			if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
				var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
				if (c.bodyA === player.body.data)
					d *= -1;
				if (d > 0.5)
					result = true;
				else if (d < -0.5)
					result = true;
			}
		}

		return result;

	},

	//Create Bars
	putBar : function() {
		//bar 1
		bar = this.game.add.sprite(Config.game.bar.startX,
				Config.game.bar.startY, 'bar');
		this.game.physics.p2.enable(bar, false);
		bar.body.kinematic = true;
		this.game.add.tween(bar.body.velocity).to({
			x : '+200'
		}, 15000).to({
			x : '-200'
		}, 15000).yoyo().loop().start();
		bar.body.setCollisionGroup(barCollisionGroup);
		bar.body.collides([ barCollisionGroup, playerCollisionGroup ]);

		//bar 2
		bar2 = this.game.add.sprite(3850, 3334, 'bar');
		this.game.physics.p2.enable(bar2, false);
		bar2.body.kinematic = true;
		this.game.add.tween(bar2.body.velocity).to({
			x : '+200'
		}, 15000).to({
			x : '-200'
		}, 15000).yoyo().loop().start();
		bar2.body.setCollisionGroup(barCollisionGroup);
		bar2.body.collides([ barCollisionGroup, playerCollisionGroup ]);

		//bar 3
		bar3 = this.game.add.sprite(4250, 3234, 'bar');
		this.game.physics.p2.enable(bar3, false);
		bar3.body.kinematic = true;
		this.game.add.tween(bar3.body.velocity).to({
			x : '+200'
		}, 15000).to({
			x : '-200'
		}, 15000).yoyo().loop().start();
		bar3.body.setCollisionGroup(barCollisionGroup);
		bar3.body.collides([ barCollisionGroup, playerCollisionGroup ]);
	},
	//Create Obstacles
	putObstacles : function() {
		obstacles = this.game.add.group();

		for (var i = 1; i <= 4; i++) {
			var obstacle = obstacles.create(game.world.randomX,
					game.world.randomY, 'obstacle' + i);
			game.physics.p2.enable(obstacle, false);
			obstacle.body.fixedRotation = true; //no circle movement 
			obstacle.body.kinematic = true;
			obstacle.body.setCollisionGroup(obstacleCollisionGroup);
			obstacle.body.collides([ obstacleCollisionGroup,
					playerCollisionGroup ]);
		}
	},

	//create monsters
	putMonsters : function() {
		//monster
		monster = game.add.sprite(160, 3510, 'monstercat');
		monster.animations.add('walk', [ 0, 1, 2, 3 ], 10, true);
		monster.play('walk');
		game.physics.p2.enable(monster, false);
		monster.body.fixedRotation = true; //no circle movement 
		monster.body.kinematic = true;
		monster.body.setCollisionGroup(monsterCollisionGroup);
		monster.body.collides([ monsterCollisionGroup, playerCollisionGroup ]);
	},

	//Create Collects
	putCollect : function() {
		//Group Item
		collects = this.game.add.group();

		//Collect Items 1
		var collect = collects.create(1657, 3260, 'blue');
		this.game.physics.p2.enable(collect, false);
		collect.body.fixedRotation = true; //no circle movement 
		collect.body.kinematic = true;
		collect.body.setCollisionGroup(collectCollisionGroup);
		collect.body.collides([ collectCollisionGroup, playerCollisionGroup ]);

		//Collect Items 2
		var collect = collects.create(3239, 2345, 'pink');
		this.game.physics.p2.enable(collect, false);
		collect.body.fixedRotation = true; //no circle movement 
		collect.body.kinematic = true;
		collect.body.setCollisionGroup(collectCollisionGroup);
		collect.body.collides([ collectCollisionGroup, playerCollisionGroup ]);

		//Collect Items 3
		var collect = collects.create(200, 3500, 'red');
		this.game.physics.p2.enable(collect, false);
		collect.body.fixedRotation = true; //no circle movement 
		collect.body.kinematic = true;
		collect.body.setCollisionGroup(collectCollisionGroup);
		collect.body.collides([ collectCollisionGroup, playerCollisionGroup ]);

		var collect = collects.create(300, 3500, 'key');
		this.game.physics.p2.enable(collect, false);
		collect.body.fixedRotation = true; //no circle movement 
		collect.body.kinematic = true;
		collect.body.setCollisionGroup(collectCollisionGroup);
		collect.body.collides([ collectCollisionGroup, playerCollisionGroup ]);
	},

	followPlayer : function() {
		if (player.body.x < monster.body.x) {
			monster.body.velocity.x = monster_speed * -1;
		} else {
			monster.body.velocity.x = monster_speed;
		}
		if (player.body.y < monster.body.y) {
			monster.body.velocity.y = monster_speed * -1;
		} else {
			monster.body.velocity.y = monster_speed;
		}

	}

};
