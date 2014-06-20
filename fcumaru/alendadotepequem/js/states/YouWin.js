/*global State, Config, Phaser*/

State.YouWin = function(game) {
	"use strict";
	this.game = game;
};
State.YouWin.prototype = {
	preload : function() {
		"use strict";
		this.game.load.image('background', 'assets/youWin_960_600.png');
	},
	create : function() {
		"use strict";

		this.background = this.game.add.tileSprite(0, 0,
				game.stage.bounds.width,
				game.cache.getImage('background').height, 'background');

		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
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
