/**
 * 
 */
State.GameOver = function (game) {
	"use strict";
	this.game = game;
};
State.GameOver.prototype = {
	preload: function () {
		"use strict";
		this.game.load.audio('gameOver','assets/gotaGameOver.ogg');
		
		
	},
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.gameOver.x, Config.gameOver.y, 'gameOver-bg');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
		
		this.mainSound.stop();
		
		this.gameOverSound = this.game.add.audio("gameOver");
        this.gameOverSound.play();
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
