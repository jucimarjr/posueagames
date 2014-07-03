var SponsorSplashProperties = {
	background: 'assets/images/SponsorSplash_1920-1080.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};
SponsorSplash = function (game) {
	this.game = game;	
};
SponsorSplash.prototype = {
	init: function(){
		this.game.load.image('sponsor-splash', SponsorSplashProperties.background);	
	},
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		var sprite = this.game.add.sprite(SponsorSplashProperties.x, SponsorSplashProperties.y, 'sponsor-splash');
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, SponsorSplashProperties.millis, Phaser.Easing.Linear.None).start();
		}, SponsorSplashProperties.millis);
		setTimeout(function () {
			this.game.state.start('GameSplash');
		}, SponsorSplashProperties.nextState);
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	}	
};
State.SponsorSplash = SponsorSplash;