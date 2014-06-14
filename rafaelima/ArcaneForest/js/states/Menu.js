/*global State, Config*/

State.Menu = function (game) {
	"use strict";
	this.game = game;
};

var selectorPlay;
var selectorCredit;
var isPlay;

State.Menu.prototype = {
	preload: function () {
		"use strict";
		isPlay = true;
	},
	create: function () {
		"use strict";
		this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
		this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this);
		this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this);
		
		selectorPlay = this.game.add.sprite(336, 320, 'button-play-selector');
		selectorCredit = this.game.add.sprite(293, 430, 'button-credits-selector');
		selectorCredit.alpha  = 0;
		this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER ]);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			selectorPlay.alpha  = 1;
			selectorCredit.alpha  = 0;
			isPlay = true;
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			selectorCredit.alpha  = 1;
			selectorPlay.alpha  = 0;
			isPlay = false;
		}

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			if(isPlay){
				this.clickPlay();
			}else{
				this.clickCredits();
			}
		}
	},
	clickPlay: function () {
		"use strict";
		this.game.state.start('Story');
		//this.game.state.start('Game');
	},
	clickHowToPlay: function () {
		"use strict";
		this.game.state.start('HowToPlay');
	},
	clickCredits: function () {
		"use strict";
		this.game.state.start('Credits');
	}
};