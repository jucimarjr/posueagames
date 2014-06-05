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
		//this.game.load.tilemap('level1', Config.level.dir+'1/map.json', null, Phaser.Tilemap.TILED_JSON);
		//this.game.load.tilemap('level2', 'assets/level/2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level3', 'assets/level/3.json', null, Phaser.Tilemap.TILED_JSON);
		/*this.game.load.tilemap('level4', Config.level.dir+'4/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level5', Config.level.dir+'5/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level6', Config.level.dir+'6/map.json', null, Phaser.Tilemap.TILED_JSON);*/

		this.game.load.image('bg2', 'assets/level/bg2.png');
		this.game.load.image('bg3', 'assets/level/bg2.png');
		this.game.load.image('tileset', 'assets/tileset.png');
		//this.game.load.image('star', 'assets/star.png');
		//this.game.load.image('bees', 'assets/enemies/bee.png');
		//this.game.load.spritesheet('playerS', 'assets/spritesheets/canoeiro_81-125-15.png', 81,125,15);
		//this.game.load.spritesheet('playerS', 'assets/spritesheets/canoeiro_81-125-15.png', 81,60,15);
		this.game.load.spritesheet('bee', 'assets/enemies/bee.png',40,40,2);
		this.game.load.image('tube', 'assets/enemies/tube_40-29.png',40,29);
		this.game.load.image('acidicWater', 'assets/enemies/acidicWater_14-17.png',14,17);
		//this.game.load.spritesheet('playerS', 'assets/spritesheets/canoeiro_81-125-15.png', 81,125,15);
		this.game.load.spritesheet('playerS', 'assets/spritesheets/canoeiro_39-60-27.png', 39,60,27);
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};