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
		this.game.load.image('ludus-splash',    Config.ludusSplash.dir);
		this.game.load.image('progress-bar',    Config.gameSplash.dir.bar);
	},
	
	create: function () {
		"use strict";
		var sprite   = this.game.add.sprite(Config.ludusSplash.x, Config.ludusSplash.y, 'ludus-splash');
		sprite.alpha = 0;
		game.add.tween(sprite).to( { alpha: 1 }, Config.ludusSplash.millis, Phaser.Easing.Linear.None, true, 0, 6000, true).start();
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