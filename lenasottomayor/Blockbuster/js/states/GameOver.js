/*global State, Config, Phaser*/

State.GameOver = function (game) {
	"use strict";
	this.game = game;
};
State.GameOver.prototype = {
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.gameOver.x, Config.gameOver.y, 'game-over');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('GamePlay');
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
				this.game.state.start('Menu');
		}
	},
	onClick: function () {
		"use strict";
		this.game.state.start('Menu');
	}
};
