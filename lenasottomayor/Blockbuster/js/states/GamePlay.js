/*global State, Config, Phaser*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
		this.tilemap = new Tilemap(game);
		this.level1 = new Level1(game);
		this.layer1 = new Layer1(game, this.tilemap);
		this.coins = new Coins(game, this.tilemap);
		this.powerlifes = new PowerLifes(game, this.tilemap);
		this.powerstars = new PowerStars(game, this.tilemap);
		this.enemies = new Enemy(game, this.layer1, this.tilemap);
		this.HUD =  new HUD(game, this.level1.lifes, this.level1.score, this.level1.coins);
		this.player = new Player(game, this.coins, this.layer1, this.powerlifes, this.powerstars, this.thorns, this.HUD);
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
		this.game.physics.arcade.collide(this.player.spritePlayer, this.layer1.thorn);

		this.HUD.update();
		
		if(!this.player.lose) {
			this.game.physics.arcade.collide(this.player.spritePlayer, this.coins.group, this.collectCoins, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.powerlifes.group, this.collectPowerLifes, null, this);
			this.game.physics.arcade.collide(this.player.spritePlayer, this.powerstars.group, this.collectPowerStars, null, this);
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
		}
		
		this.enemies.update();
		this.player.update();
	},
	
	collectCoins: function(spritePlayer, coins) {
		coins.kill();
		
		this.HUD.updateCoins(1);
		this.HUD.updateScore(Config.scores.coin);
	},
	
	collectPowerLifes: function(spritePlayer, powerlifes) {
		powerlifes.kill();
		
		this.HUD.updateLife(1);
		this.HUD.updateScore(Config.scores.powerlife);
	},
	
	collectPowerStars: function(spritePlayer, powerstars) {
		powerstars.kill();
		
		this.HUD.updateScore(Config.scores.powerstar);
	},
	
	collision: function (player, enemy) {
		if((player.body.y + player.body.height == enemy.body.y) && enemy.alive) {
			player.body.velocity.y = -Config.player.jump;
			
			this.HUD.updateScore(Config.scores.enemy);
				
			enemy.alive = false;
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			enemy.alpha = 0;
			enemy.animations.play('dead');
				
			var tween = game.add.tween(enemy).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 10, true);
			tween.onComplete.add(function() { enemy.kill(); },this);
		} else {
			this.player.die(enemy);
		}
	} 
};