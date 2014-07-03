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
		var background = this.game.add.sprite(Config.howToPlay.x, Config.howToPlay.y, 'how-to-play');
		var button = this.game.add.button(Config.menu.buttonBack.x, Config.menu.buttonBack.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.menu.buttonBack.anchor.x, Config.menu.buttonBack.anchor.y);
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	},
	onBack: function () {
		"use strict";
		this.game.state.start('Menu');
	}
};