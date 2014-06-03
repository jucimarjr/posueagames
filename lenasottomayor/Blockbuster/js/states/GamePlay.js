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
	},
	create: function () {
		"use strict";
		this.tilemap.create();
		this.level1.create();
		this.layer1.create();
		this.coins.create();
	},
	update: function () {
		"use strict";
		this.level1.update();
	}
};