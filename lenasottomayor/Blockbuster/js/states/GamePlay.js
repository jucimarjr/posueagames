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
		this.cruella = new Cruella(game, this.tilemap);
		this.freddy = new Freddy(game, this.tilemap);
		this.hannibal = new Hannibal(game, this.tilemap);
		this.jason = new Jason(game, this.tilemap);
		this.joker = new Joker(game, this.tilemap);
		this.vader = new Vader(game, this.tilemap);
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
		this.cruella.create();
		this.freddy.create();
		this.hannibal.create();
		this.jason.create();
		this.joker.create();
		this.vader.create();
		this.player.create();
	},
	update: function () {
		"use strict";
		this.level1.update();
		this.player.update();
	}
};