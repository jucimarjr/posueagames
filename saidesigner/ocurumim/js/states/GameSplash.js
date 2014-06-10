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
		this.game.load.setPreloadSprite(progressBar);

		this.game.load.onLoadComplete.add(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start(); setTimeout(function () {this.game.state.start('Menu');}, Config.gameSplash.millis);}, this);

		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);

		//Credits
		this.game.load.image('credits', Config.credits.dir);
		
		//HowToPlay
		this.game.load.image('how-to-play', Config.howToPlay.dir);
		
		//Game

		this.game.load.spritesheet('curumim', Config.player.sprite.src, Config.player.sprite.width, Config.player.sprite.height);
		this.game.load.image('bullet', Config.bullet.src);

		if (Config.global.debug) 
		{
			this.game.load.image('tileset','assets/images/tileset_debug.png');	
		}
		else 
		{
			this.game.load.image('tileset','assets/images/tileset.png');	
		}
		
		this.game.load.tilemap('map','assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);

		this.game.load.image('trees', 'assets/images/trees.png');
		this.game.load.image('forest', 'assets/images/forest.png');
		this.game.load.image('platform', 'assets/images/platform.png');
		this.game.load.image('clouds', 'assets/images/clouds.png');
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};