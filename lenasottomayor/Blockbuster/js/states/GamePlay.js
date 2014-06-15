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
		this.enemy = new Enemy(game, this.layer1, this.tilemap);
		this.player = new Player(game, this.coins, this.layer1, this.powerlifes, this.powerstars, this.thorns, this.enemy);
	},
	create: function () {
		"use strict";
		this.tilemap.create();
		this.level1.create();
		this.layer1.create();
		this.coins.create();
		this.powerlifes.create();
		this.powerstars.create();
		this.enemy.create();
		this.player.create();
	},
	update: function () {
		"use strict";
//		this.level1.update();
		
		this.game.physics.arcade.collide(this.player.spritePlayer, this.layer1.platform);
		this.game.physics.arcade.collide(this.player.spritePlayer, this.layer1.thorn);

    	this.game.physics.arcade.overlap(this.player.spritePlayer, this.coins.group, this.collectCoins, null, this);
    	this.game.physics.arcade.overlap(this.player.spritePlayer, this.powerlifes.group, this.collectPowerLifes, null, this);
    	this.game.physics.arcade.overlap(this.player.spritePlayer, this.powerstars.group, this.collectPowerStars, null, this);
		this.game.physics.arcade.overlap(this.player.spritePlayer, this.enemy.hannibalsWalker, this.playerDie, null, this);
		
		this.enemy.update();
		this.player.update();
	},
	
	collectCoins: function(spritePlayer, coins) {
		coins.kill();
	},
	
	collectPowerLifes: function(spritePlayer, powerlifes) {
		powerlifes.kill();
	},
	
	collectPowerStars: function(spritePlayer, powerstars) {
		powerstars.kill();
	},
	
	playerDie: function(spritePlayer, enemy){
		this.player.die();
	}
};