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
		this.game.load.onLoadComplete.add(function () {this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start(); setTimeout(function () {this.game.state.start('Menu');}, Config.gameSplash.millis);}, this);
		
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
		game.load.image(Config.game.map.tileSetKey, Config.game.map.tileSetDir);
		this.game.load.image(Config.game.bgKey,  Config.game.dir);
		this.game.load.tilemap(Config.game.map.key, Config.game.map.dir, null, Phaser.Tilemap.TILED_JSON);
		
		// player
		this.game.load.spritesheet(Config.game.player.key, Config.game.player.dir, Config.game.player.width, Config.game.player.height);
		// player bullet
		this.game.load.image(Config.game.playerBullet.key, Config.game.playerBullet.dir);
		
		// enemy
		this.game.load.spritesheet(Config.game.enemy.key, Config.game.enemy.dir, Config.game.enemy.width, Config.game.enemy.height);
		// enemy bullet
		this.game.load.image(Config.game.enemyBullet.key, Config.game.enemyBullet.dir);
		
		
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};