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
		this.game.load.image('tucandeira-splash', Config.tucandeiraSplash.dir);
		//GameSplash
		this.game.load.image('game-splash', Config.gameSplash.dir.background);
		this.game.load.image('progress-bar', Config.gameSplash.dir.bar);
	},
	create: function () {
		"use strict";
		var sprite = this.game.add.sprite(Config.tucandeiraSplash.x, Config.tucandeiraSplash.y, 'tucandeira-splash');
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.tucandeiraSplash.millis, Phaser.Easing.Linear.None).start();
		}, Config.tucandeiraSplash.millis);
		setTimeout(function () {
			this.game.state.start('SponsorSplash');
		}, Config.tucandeiraSplash.nextState);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};