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
		this.game.load.tilemap('level1', 'assets/level/1.json', null, Phaser.Tilemap.TILED_JSON);
		//this.game.load.tilemap('level2', 'assets/level/2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level3', 'assets/level/3.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level4', 'assets/level/4.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level5', 'assets/level/5.json', null, Phaser.Tilemap.TILED_JSON);
	    /*this.game.load.tilemap('level6', Config.level.dir+'6/map.json', null, Phaser.Tilemap.TILED_JSON);*/

		this.game.load.spritesheet('playerS', 'assets/spritesheets/canoeiro_39-60-27.png', 39,60,27);
		this.game.load.spritesheet('bee', 'assets/enemies/casacaba_40-70-4.png',40,70,4);
		this.game.load.spritesheet('bush', 'assets/spritesheets/bush_40-35-3.png',40,35,3);
		this.game.load.spritesheet('coin', 'assets/spritesheets/coins/coins_40-40-8.png',40,40,8);
		this.game.load.spritesheet('coinIara', 'assets/spritesheets/coins/coinsIara_40-40-8.png',40,40,8);

		this.game.load.image('bg1', 'assets/level/bg1_462-800.jpg');
		this.game.load.image('bg3', 'assets/level/bg1_462-800.jpg');
		this.game.load.image('bg4', 'assets/level/bg1_462-800.jpg');
		this.game.load.image('bg5', 'assets/level/bg1_462-800.jpg');
		this.game.load.image('branches', 'assets/level/branches_360-283.png');
		this.game.load.image('tileset', 'assets/tile_40-40-17.png');		
		this.game.load.image('thorn', 'assets/enemies/thorns_80-40.png');
		this.game.load.image('tube', 'assets/enemies/cannon_25-40.png');
		this.game.load.image('acidicWater', 'assets/enemies/gota_13-37.png');
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};