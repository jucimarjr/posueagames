/*global State, Config, Phaser*/

State.Story = function (game) {
	"use strict";
	this.game = game;
};
State.Story.prototype = {
	create: function () {
		"use strict";
		var background;
		background = this.game.add.sprite(Config.story.x, Config.story.y, 'story');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Config.global.key.nextScreen)) {
			this.game.state.start('GamePlay');
		}
	},
	onClick: function () {
		"use strict";
		this.game.state.start('GamePlay');
	}
};