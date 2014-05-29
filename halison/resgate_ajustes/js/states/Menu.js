/*global State, Config*/

State.Menu = function (game) {
	"use strict";
	this.game = game;
};
State.Menu.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
//		alert("1");
		var background, buttonPlay, buttonCredits, buttonHowToPlay ;
//		alert("2");
		background = this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
//		alert("3");
		buttonPlay = this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this, 1, 0, 1);
//		alert("4");
		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
//		alert("5");
		buttonHowToPlay = this.game.add.button(Config.menu.buttonHowToPlay.x, Config.menu.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, 1, 0, 1);
//		alert("6");
		buttonHowToPlay.anchor.setTo(Config.menu.buttonHowToPlay.anchor.x, Config.menu.buttonHowToPlay.anchor.y);
//		alert("7");
		buttonCredits = this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this, 1, 0, 1);
//		alert("8");
		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
//		alert("9");
		
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
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