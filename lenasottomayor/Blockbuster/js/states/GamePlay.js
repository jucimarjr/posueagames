/*global State, Config, Phaser*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
		
		this.jumpSound = game.add.audio('jumpSound');
		this.coinSound = game.add.audio('coinSound');
		this.hurtSound = game.add.audio('hurtSound');
		this.powerupSound = game.add.audio('powerupSound');
		this.backgroundSound = game.add.audio('music');
		this.backgroundSound.play('',0,0.8,true);
		
		this.tilemap = new Tilemap(game);
		this.level1 = new Level1(game);
		this.layer1 = new Layer1(game, this.tilemap);
		this.coins = new Coins(game, this.tilemap);
		this.powerlifes = new PowerLifes(game, this.tilemap);
		this.powerstars = new PowerStars(game, this.tilemap);
		this.enemies = new Enemy(game, this.layer1, this.tilemap);
		this.HUD =  new HUD(game, this.level1.lifes, this.level1.score, this.level1.coins);
		this.player = new Player(game, this.coins, this.layer1, this.powerlifes, this.powerstars, this.thorns, this.HUD, this.jumpSound);
		
		this.enemyCollide = true;
	},
	create: function () {
		"use strict";
		this.tilemap.create();
		this.level1.create();
		this.layer1.create();
		this.coins.create();
		this.powerlifes.create();
		this.powerstars.create();
		this.enemies.create();
		this.HUD.create();
		this.player.create();
	},
	update: function () {
		"use strict";
		this.game.physics.arcade.collide(this.player.spritePlayer, this.layer1.platform);
		this.game.physics.arcade.collide(this.player.spritePlayer, this.layer1.thorn, this.collisionThorn, null, this);

		this.game.physics.arcade.overlap(this.player.spritePlayer, this.coins.group, this.collectCoins, null, this);
		this.game.physics.arcade.overlap(this.player.spritePlayer, this.powerlifes.group, this.collectPowerLifes, null, this);
		this.game.physics.arcade.overlap(this.player.spritePlayer, this.powerstars.group, this.collectPowerStars, null, this);

		this.HUD.update();
		
		if(!this.player.lose && this.enemyCollide) {
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.cruellasWalker, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.cruellasJumper, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.freddysWalker, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.freddysJumper, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.hannibalsWalker, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.hannibalsJumper, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.jasonsWalker, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.jasonsJumper, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.jokersWalker, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.jokersJumper, this.collision, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.enemies.vaders, this.collisionBoss, null, this);
		}
		
		this.enemies.vaders.forEachAlive(
			function (vader){

				if (Phaser.Point.distance(vader, this.player.spritePlayer) < Config.enemy.vader.distancePlayer) {
					this.game.physics.arcade.moveToObject(vader, this.player.spritePlayer, Config.enemy.vader.velocity);
				} else {
					vader.body.velocity.setTo(0, 0);
				}
				if (vader.body.x > this.player.spritePlayer.body.x) {
					vader.scale.x = -1;
				} else {
					vader.scale.x = 1;
				}
				
			}, this
		);
		
		this.enemies.update();
		this.player.update();
	},
	
	collectCoins: function(spritePlayer, coins) {
		coins.kill();
		this.coinSound.play();
		
		this.HUD.updateCoins(1);
		this.HUD.updateScore(Config.scores.coin);
	},
	
	collectPowerLifes: function(spritePlayer, powerlifes) {
		powerlifes.kill();
		this.powerupSound.play();
		
		this.HUD.updateLife(1);
		this.HUD.updateScore(Config.scores.powerlife);
	},
	
	collectPowerStars: function(spritePlayer, powerstars) {
		powerstars.kill();
		this.powerupSound.play();
		
		this.player.goldVersion();
		this.HUD.updateScore(Config.scores.powerstar);
	},
	
	collision: function (player, enemy) {
		if((player.body.y + player.body.height == enemy.body.y) && enemy.alive || this.player.gold) {
			
			if (!this.player.gold) {
				this.jumpSound.play();
				player.body.velocity.y = -Config.player.jump;
			} else {
				this.enemyCollide = false;
			}
			
			this.HUD.updateScore(Config.scores.enemy);
			
			this.killEnemy(enemy);
			
		} else {
			this.hurtSound.play();
			this.player.die(enemy);
		}
	},
	
	killEnemy: function (enemy){
		enemy.alive = false;
		enemy.body.velocity.x = 0;
		enemy.alpha = 0;
		enemy.animations.play('dead');
			
		var tween = game.add.tween(enemy).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 10, true);
		tween.onComplete.add(function() { enemy.kill(); this.enemyCollide = true; },this);
	},
	
	collisionThorn: function (player, thorn) {
		if((player.body.y + player.body.height == thorn.worldY && !this.player.gold && !this.player.loseInThorn)) {
			this.hurtSound.play();
			this.player.dieInThorn();
		}
	},
	
	collisionBoss: function (player, boss) {
		
		if((player.body.y + player.body.height == boss.body.y) && boss.alive) {
			this.jumpSound.play();
			player.body.velocity.y = -Config.player.jump;
			
			this.enemyCollide = false;
			
			this.HUD.updateScore(Config.scores.enemy);
			boss.hp--;
			
			if(boss.hp == 0 && boss.alive) {
				boss.body.velocity.x = 0;
				boss.body.velocity.y = 0;
				boss.alive = false;
				boss.animations.play('dead');
				
				setTimeout(function () {
					this.game.state.start('GameWin');
				}, Config.enemy.vader.timeDie);
			} else {
				boss.alpha = 0;
				var tween = game.add.tween(boss).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 40, true);
				tween.onComplete.add(function() { this.enemyCollide = true; },this);
			}
		} else {
			this.hurtSound.play();
			this.player.die(boss);
		}
	}
};