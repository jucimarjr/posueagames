/*global State, Config*/

State.Menu = function (game) {
	"use strict";
	this.game = game;
	this.isFirstLoad = true;
};
State.Menu.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		var background, buttonOpening, buttonPlay, buttonCredits, buttonHowToPlay ;
		background = this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
		buttonOpening= this.game.add.button(Config.menu.buttonOpening.x, Config.menu.buttonOpening.y, 'button-opening', this.clickOpening, this, 1, 0, 1);
		buttonOpening.anchor.setTo(Config.menu.buttonOpening.anchor.x, Config.menu.buttonOpening.anchor.y);
		buttonPlay = this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this, 1, 0, 1);
		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
		buttonHowToPlay = this.game.add.button(Config.menu.buttonHowToPlay.x, Config.menu.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, 1, 0, 1);
		buttonHowToPlay.anchor.setTo(Config.menu.buttonHowToPlay.anchor.x, Config.menu.buttonHowToPlay.anchor.y);
		buttonCredits = this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this, 1, 0, 1);
		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
		if (this.isFirstLoad){
			this.isFirstLoad = false;
			window.open("abertura.html","_blank");
		}
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	clickOpening: function () {
		"use strict";
		window.open("abertura.html","_blank");
	},
	clickPlay: function () {
		"use strict";
		 this.game.state.start('Play');
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