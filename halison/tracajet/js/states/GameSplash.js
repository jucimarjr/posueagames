/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		var progressBar = this.game.add.sprite(0, 500, 'progress-bar');
		var sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		sprite.anchor.setTo(Config.gameSplash.anchor.x, Config.gameSplash.anchor.y);
		this.game.load.setPreloadSprite(progressBar);
		this.game.load.onLoadComplete.add(function () {this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start(); }, this);
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);
		this.game.load.image('credits', Config.credits.dir);
		this.game.load.image('how-to-play', Config.howToPlay.dir);
		this.game.load.spritesheet('how-to-play-text', Config.howToPlay.text.dir, Config.howToPlay.text.width, Config.howToPlay.text.height);
		this.game.load.spritesheet('credits-text',  Config.credits.text.dir,  Config.credits.text.width,  Config.credits.text.height);
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		var menu =     game.cache.checkImageKey('menu-background');
		var bPlay =    game.cache.checkImageKey('button-play');
		var bCredits = game.cache.checkImageKey('button-credits');
		var bHowPlay = game.cache.checkImageKey('button-how-to-play');
		var cr =       game.cache.checkImageKey('credits');
		var h2play =   game.cache.checkImageKey('how-to-play');
		var crt =       game.cache.checkImageKey('credits-text');
		var h2playt =   game.cache.checkImageKey('how-to-play-text');
		if (menu && bPlay && bCredits && bHowPlay && cr && h2play && crt && h2playt ){
			setTimeout(function () {
				this.game.state.start('Menu');}
			, Config.gameSplash.millis);		
		}
	}
};