/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		
		game.physics.startSystem(Phaser.Game.ARCADE);
		game.physics.arcade.gravity.y = 800;
		
		var background;//, buttonPlay, buttonCredits, buttonHowToPlay;
		
		background = this.game.add.sprite(Config.game.x, Config.game.y, Config.game.bgKey);
//		
//		buttonPlay = this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this, 0, 1, 2, 3);
//		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
//		
//		buttonHowToPlay = this.game.add.button(Config.menu.buttonHowToPlay.x, Config.menu.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, 0, 1, 2, 3);
//		buttonHowToPlay.anchor.setTo(Config.menu.buttonHowToPlay.anchor.x, Config.menu.buttonHowToPlay.anchor.y);
//		
//		buttonCredits = this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this, 0, 1, 2, 3);
//		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
		
		// map
		this.map = game.add.tilemap(Config.game.map.key);
		this.map.addTilesetImage(Config.game.map.tileSetKey, Config.game.map.tileSetKey);
		
		this.layer = this.map.createLayer(Config.game.map.layerName);
		this.layer.resizeWorld();
		this.map.setCollisionBetween(0, 30, true, Config.game.map.layerName);
		
		game.camera.y = 1200;
		
		// player
		this.player = game.add.sprite(Config.game.player.x, Config.game.player.y, Config.game.player.key, 0);
		this.player.anchor.setTo(Config.game.player.anchor.x, Config.game.player.anchor.y);
		game.physics.enable(this.player);
		this.player.animations.add(Config.game.player.anim.walk, [0,1,2], 10, true);
		this.player.animations.add(Config.game.player.anim.jump, [3], 1, false);
		this.player.body.collideWorldBounds = true;
		game.camera.follow(this.player);
		
		// enemy
		this.enemyGroup = game.add.group();
		this.arrayEnemys = [];
		for(var count = 0; count < Config.game.enemy.x.length; count++) {
			
			this.arrayEnemys[count] = new EnemyData();
			
			this.arrayEnemys[count].nextShot = 0;
			
			this.arrayEnemys[count].sprite = this.enemyGroup.create(Config.game.enemy.x[count], Config.game.enemy.y[count], Config.game.enemy.key, 0);
			this.arrayEnemys[count].sprite.anchor.setTo(Config.game.enemy.anchor.x, Config.game.enemy.anchor.y);
			game.physics.enable(this.arrayEnemys[count].sprite);
			this.arrayEnemys[count].sprite.animations.add(Config.game.enemy.anim.shot, [2,3], 10, true);
			
		}
		
		this.playerNextShot = 0;
		this.rightKey = true;
		
		this.cursors = game.input.keyboard.createCursorKeys();
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
		this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	},
	update: function () {
		"use strict";
		
		game.physics.arcade.collide(this.layer, this.player);
		game.physics.arcade.collide(this.layer, this.enemyGroup);
		
//		game.physics.arcade.collide(this.player, bullets, this.explode, null, this);
		
		this.player.body.velocity.x = 0;
		if(this.cursors.left.isDown)
		{
			this.player.scale.x = .9; 
			this.player.scale.x = -.9;
			this.player.animations.play(Config.game.player.anim.walk);
			this.player.body.velocity.x = -150;
		}
		else if(this.cursors.right.isDown)
		{
			this.player.scale.x = -.9; 
			this.player.scale.x = .9;
			this.player.animations.play(Config.game.player.anim.walk);
			this.player.body.velocity.x = 150;
		}
		
		if(this.player.body.velocity.y !== 0)
			this.player.animations.play(Config.game.player.anim.jump);
		
		if (this.jumpButton.isDown && this.player.body.onFloor()) {
			this.player.body.velocity.y = -550;
		}
		
		// player shot
		if (this.fireButton.isDown) {
			
			this.fire();
			
		}
		
		
		// enemy shot
		this.updateEnemyShot();
		
		
//		Config.global.screen.resize(this.game);
	},
	
	fire: function() {
		
		var left = this.cursors.left.isDown;
		var up = this.cursors.up.isDown;
		var right = this.cursors.right.isDown;
		var down = this.cursors.down.isDown;
		
		var vel = Config.game.playerBullet.velocity;
		
		var velX = 0;
		var velY = 0;
		
		if(left) {
			velX = -vel;
		}
		if(up) {
			velY = -vel;
		}
		if(right) {
			velX = vel;
		}
		if(down) {
			velY = vel;
		}
		
		if(left || up || right || down) {
			this.leftKey = left;
			this.upKey = up;
			this.rightKey = right;
			this.downKey = down;
		}
		
		if(!left && !up && !right && !down) {
			if(this.leftKey) {
				velX = -vel;
			}
			if(this.upKey) {
				velY = -vel;
			}
			if(this.rightKey) {
				velX = vel;
			}
			if(this.downKey) {
				velY = vel;
			}
		}
		
		var currTime = new Date().getTime();
		if(currTime >= this.playerNextShot) {
			
			this.createPlayerShot(velX, velY);
			
			this.playerNextShot = currTime + Config.game.player.shotTime;
		}
		
	},
	
	createPlayerShot: function(velX, velY) {
		
		var shot;
		
		shot = this.game.add.sprite(this.player.body.x, this.player.body.y, Config.game.playerBullet.key);
		shot.anchor.setTo(Config.game.playerBullet.anchor.x, Config.game.playerBullet.anchor.y);
		game.physics.enable(shot);
		shot.body.allowGravity = false;
		
		shot.body.velocity.x = velX;
		shot.body.velocity.y = velY;
		
	},
	
	updateEnemyShot: function() {
		
		var currTime = new Date().getTime();
		var shot;
		for(var count = 0; count < Config.game.enemy.x.length; count++) {
			
			var diffX = Math.abs(this.arrayEnemys[count].sprite.body.x - this.player.body.x);
			var diffY = Math.abs(this.arrayEnemys[count].sprite.body.y - this.player.body.y);
			
			if(diffX <= (Config.global.screen.width / 2) && diffY <= (Config.global.screen.height / 2)) {
				
				if(currTime >= this.arrayEnemys[count].nextShot) {
					//console.log("shoot: "+count);
					
					shot = this.game.add.sprite(this.arrayEnemys[count].sprite.body.x, this.arrayEnemys[count].sprite.body.y, Config.game.enemyBullet.key);
					shot.anchor.setTo(Config.game.enemyBullet.anchor.x, Config.game.enemyBullet.anchor.y);
					game.physics.enable(shot);
					shot.body.allowGravity = false;
					
					var velX = Config.game.enemyBullet.velocity;
					var velY = Config.game.enemyBullet.velocity;
					
					var diffXNormal = this.arrayEnemys[count].sprite.body.x - this.player.body.x;
					var diffYNormal = this.arrayEnemys[count].sprite.body.y - this.player.body.y;
					
//					console.log("diffX: "+diffX);
//					console.log("diffY: "+diffY);
					
					var velConst;
					
					if(diffX == 0) {
						velX = 0;
						
						if(diffYNormal > 0) {
							velY = -velY;
						}
					}
					else if(diffY == 0) {
						velY = 0;
						
						if(diffXNormal > 0) {
							velX = -velX;
						}
					}
					else {
						velConst = diffX / diffY;
						
						if(diffX >= diffY) {
							velY = velY / velConst;
						}
						else {
							velX = velX * velConst;
						}
						
						if(diffXNormal > 0 && diffYNormal > 0) {
							
							velX = -velX;
							velY = -velY;
						}
						else if(diffXNormal > 0 && diffYNormal < 0) {
							
							velX = -velX;
						}
						else if(diffXNormal < 0 && diffYNormal > 0) {
							
							velY = -velY;
						}
					}
					
					shot.body.velocity.x = velX;
					shot.body.velocity.y = velY;
					
					this.arrayEnemys[count].nextShot = currTime + Config.game.enemy.shotTime;
				}
				
				//this.arrayEnemys[count].sprite.animations.play(Config.game.enemy.anim.shot);
			}
			
		}
	},
	
};

function EnemyData() {
	
	sprite: null;
	nextShot: 0;
	
};