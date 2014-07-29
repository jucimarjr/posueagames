var LudusSplashProperties = {
	background: 'assets/images/LudusSplash_1920-1080.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};
var State = {
	LudusSplash: function (game) {
		"use strict";
		this.game = game;
		//this.sponsorSplash = new SponsorSplash(game);
		this.gameSplash = new GameSplash(game);		
	}
};
State.LudusSplash.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('ludus-splash', LudusSplashProperties.background);

		//this.sponsorSplash.init();
		this.gameSplash.init();
	},
	create: function () {
		"use strict";
		var sprite = this.game.add.sprite(LudusSplashProperties.x, LudusSplashProperties.y, 'ludus-splash');
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, LudusSplashProperties.millis, Phaser.Easing.Linear.None).start();
		}, LudusSplashProperties.millis);
		setTimeout(function () {
			//this.game.state.start('SponsorSplash');
			this.game.state.start('GameSplash');
		}, LudusSplashProperties.nextState);
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	}
};