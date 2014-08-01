/*global State, Config, Phaser*/

State.Gameover = function (game) {
	"use strict";
	this.game = game;
	this.gameoverSnd;
};
State.Gameover.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.gameover.x, Config.gameover.y, 'gameover');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);

		this.gameoverSnd =  this.game.add.audio('gameover', 1, false);
		this.gameoverSnd.play();
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Menu');
		}
	},
	onClick: function () {
		"use strict";
		this.gameoverSnd.stop();
		this.game.state.start('Menu');
	}
};