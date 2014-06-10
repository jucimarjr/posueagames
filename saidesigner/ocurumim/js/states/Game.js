/*global State, Config, Phaser*/

State.Game = function (game) {
	"use strict";
	this.game = game;
	this.player = new Curumim.Player(game);
};
State.Game.prototype = {
	preload: function () {
		"use strict";
		
	},

	create: function () {
		"use strict";

		this.game.physics.startSystem(Phaser.Game.ARCADE);
 		this.game.physics.arcade.gravity.y = Config.game.gravity;
		
		this.player.create();
	},

	update: function () {
		"use strict";		

		Config.global.screen.resize(this.game);  

		this.player.update();
		
	}
};