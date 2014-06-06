/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		var progressBar = this.game.add.sprite(Config.gameSplash.progressBar.x, Config.gameSplash.progressBar.y, 'progress-bar');
		var sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		this.game.load.setPreloadSprite(progressBar);
		this.game.load.onLoadComplete.add(function () {this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start(); setTimeout(function () {this.game.state.start('Menu');}, Config.gameSplash.millis);}, this);
		
		this.loadAssets();
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	loadAssets: function () {
		
		//Credits
		this.game.load.image('credits', Config.credits.dir);
		
		//HowToPlay
		this.game.load.image('how-to-play', Config.howToPlay.dir);
		
		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);

		//TileMap
		this.load.tilemap('fase01', Config.tilemap.fase01.dir, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', Config.tilemap.tiles.tileset.dir);
		
		this.game.load.image('coin', Config.tilemap.tiles.coins.dir);
		
		this.game.load.image('powerlife', Config.tilemap.tiles.powerlifes.dir);
		
		this.game.load.image('powerstar', Config.tilemap.tiles.powerstars.dir);
		
		//Player
		this.game.load.spritesheet('oscar', Config.player.dir, Config.player.width, Config.player.height);
		
		//Enemy
		this.game.load.spritesheet('enemy', Config.enemy.dir, Config.enemy.width, Config.enemy.height);
		
		//Background
		this.game.load.image('game-background', Config.background.game.dir);
	}
};