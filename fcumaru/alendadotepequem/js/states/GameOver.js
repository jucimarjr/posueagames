/*global State, Config, Phaser*/

State.GameOver = function(game) {
	"use strict";
	this.game = game;
};
State.GameOver.prototype = {
	preload : function() {
		"use strict";
	},
	create : function() {
		"use strict";

		var background = this.game.add.sprite(Config.menu.x, Config.menu.y,
				'game-over');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);

		var effect = this.game.add.tileSprite(Config.menu.x, Config.menu.y,
				Config.global.screen.width, Config.global.screen.height,
				'game-over-effect');
		effect.autoScroll(0, 80);
	},
	update : function() {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Menu');
		}
	},
	onClick : function() {
		"use strict";
		this.game.state.start('Menu');
	}
};
