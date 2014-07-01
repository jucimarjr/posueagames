/*global State, Config, Phaser*/

State.HowToPlay = function (game) {
	"use strict";
	this.game = game;
};
State.HowToPlay.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);

		var playboard = this.game.add.sprite(Config.howToPlay.x, Config.howToPlay.y, 'how-to-play');
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
		this.game.state.start('Menu');
	}
};