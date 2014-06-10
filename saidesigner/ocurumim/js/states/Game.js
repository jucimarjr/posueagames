/*global State, Config, Phaser*/

State.Game = function (game) {
	"use strict";
	this.game = game;
	this.player = new Curumim.Player(game);
	this.scene = new Curumim.Scene(game);
};
State.Game.prototype = {
	preload: function () {
		"use strict";
		
	},

	create: function () {
		"use strict";

		this.game.physics.startSystem(Phaser.Game.ARCADE);
 		this.game.physics.arcade.gravity.y = Config.game.gravity;
		
		this.scene.create();
		this.player.create();
		
	},

	update: function () {
		"use strict";		

		Config.global.screen.resize(this.game);
		
		this.scene.collide(this.player);
		this.scene.update();
		this.player.update();		
	}
};