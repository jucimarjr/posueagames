State.GameOver = function (game) {
	"use strict";
	this.game = game;
};

State.GameOver.prototype = {
	create: function () {
		"use strict";
		this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'bg_splash_load');
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);
	},
	update: function () {
		"use strict";
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)||this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Game');
		}
	}
}