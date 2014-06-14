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
		this.game.load.image(Config.ludusSplash.key, Config.ludusSplash.dir);
//		//GameSplash
//		this.game.load.image('game-splash', Config.gameSplash.dir.background);
//		this.game.load.image('progress-bar', Config.gameSplash.dir.bar);
	},
	create: function () {
		"use strict";
		
		var sprite = this.game.add.sprite(Config.ludusSplash.x, Config.ludusSplash.y, Config.ludusSplash.key);
		
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.ludusSplash.alphaTime, Phaser.Easing.Linear.None).start();
		}, Config.ludusSplash.alphaWait);
		
		setTimeout(function () {
			//this.game.state.start('SponsorSplash');
			this.game.state.start('GameSplash');
		}, Config.ludusSplash.nextStateWait);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};