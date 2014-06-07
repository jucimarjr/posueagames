/*global State, Config, Phaser*/

State.HowToPlay = function (game) {
	"use strict";
	this.game = game;
};
State.HowToPlay.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('how-to-play-text', Config.howToPlay.text.dir);
	},
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.howToPlay.x, Config.howToPlay.y, 'how-to-play');
		var sprite = game.add.sprite(Config.howToPlay.text.x, Config.howToPlay.text.x, 'how-to-play-text');
		sprite.anchor.setTo(Config.howToPlay.text.anchor.x, Config.howToPlay.text.anchor.y);
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
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