/*global setTimeout, Config, Phaser*/

var State = {
	LudusSplash: function (game) {
		"use strict";
		this.game = game;
	}
};
State.LudusSplash.prototype = {
	preload: function () {
		"use strict";
		//this.game.load.image('tucandeira_splash', Config.tucandeiraSplash.dir, Config.global.screen.width, Config.global.screen.height);
		//GameSplash
		this.game.load.image('game_splash', Config.gameSplash.dir.background, Config.global.screen.width, Config.global.screen.height);
		this.game.load.image('progress_bar', Config.gameSplash.dir.bar, 960,30);
	},
	create: function () {
		"use strict";
		/*var sprite = this.game.add.sprite(Config.tucandeiraSplash.x, Config.tucandeiraSplash.y, 'tucandeira_splash');
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.tucandeiraSplash.millis, Phaser.Easing.Linear.None).start();
		}, Config.tucandeiraSplash.millis);
		setTimeout(function () {
			this.game.state.start('SponsorSplash');			
		}, Config.tucandeiraSplash.nextState);*/
		this.game.state.start('GameSplash');
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};