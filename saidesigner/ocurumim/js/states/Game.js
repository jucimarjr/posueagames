/*global State, Config, Phaser*/

State.Game = function (game) {
	"use strict";
	this.game = game;
};
State.Game.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Menu');
		}
	}
};
