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
		var background, buttonPlay, buttonCredits, buttonHowToPlay ;
		if(!this.menuMusic){
			this.menuMusic = this.game.add.audio('menu-audio',1,true);
			this.menuMusic.play('',0,1,true);
		}else if(!this.menuMusic.isPlaying){
			this.menuMusic.play();
		}
		background = this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
		buttonPlay = this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this, 1, 0, 1);
		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
		buttonHowToPlay = this.game.add.button(Config.menu.buttonHowToPlay.x, Config.menu.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, 1, 0, 1);
		buttonHowToPlay.anchor.setTo(Config.menu.buttonHowToPlay.anchor.x, Config.menu.buttonHowToPlay.anchor.y);
		buttonCredits = this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this, 1, 0, 1);
		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	clickPlay: function () {
		"use strict";
		this.menuMusic.stop();
		//this.game.state.start('GamePlay');
		this.game.state.start('Story');
	},
	clickHowToPlay: function () {
		"use strict";
		//this.menuMusic.stop();
		this.game.state.start('HowToPlay');
	},
	clickCredits: function () {
		"use strict";
		//this.menuMusic.stop();
		this.game.state.start('Credits');
	}
};