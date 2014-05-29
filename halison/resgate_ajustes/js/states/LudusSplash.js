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
		this.game.load.image('ludus-splash-bg', Config.ludusSplash.backgroundDir);
		this.game.load.image('ludus-splash', Config.ludusSplash.dir);
		this.game.load.image('game-splash', Config.gameSplash.dir.background);
		this.game.load.image('progress-bar', Config.gameSplash.dir.bar);
	},
	create: function () {
		"use strict";
		var spriteBg = this.game.add.sprite(Config.ludusSplash.x, Config.ludusSplash.y, 'ludus-splash-bg');
		var sprite   = this.game.add.sprite(Config.ludusSplash.x, Config.ludusSplash.y, 'ludus-splash');
		sprite.alpha = 0;
		
		setTimeout(function () {
			game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 6000, true);
		}, Config.ludusSplash.millis);
		setTimeout(function () {
			this.game.state.start('GameSplash');
		}, Config.gameSplash.nextState);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVeritcally = true;
		this.game.scale.refresh();
		
	}
};