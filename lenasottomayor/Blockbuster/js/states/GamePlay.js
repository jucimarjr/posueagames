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
		this.player = new Player(game, this.coins, this.layer1, this.powerlifes, this.powerstars, this.thorns);
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
		this.level1.update();
		this.enemy.update();
		this.player.update();
	}
};