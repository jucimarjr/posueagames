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
			this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start(); 
			setTimeout(function () {
				this.game.state.start('Menu');
			}, Config.gameSplash.millis);
		}, this);
		
		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);
		this.game.load.audio('menu-audio', Config.audio.menu);

		//Credits
		this.game.load.image('credits', Config.credits.dir);
		
		//HowToPlay
		this.game.load.image('how-to-play', Config.howToPlay.dir);

		//Story		
		this.game.load.image('story1', Config.story.dir);
		this.game.load.image('story2', Config.story.dir2);
		
		//Game
		this.game.load.tilemap('level1', 'assets/level/1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level2', 'assets/level/2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level3', 'assets/level/3.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level4', 'assets/level/4.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level5', 'assets/level/5.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level6', 'assets/level/6.json', null, Phaser.Tilemap.TILED_JSON);
	    this.game.load.tilemap('level7', 'assets/level/last.json', null, Phaser.Tilemap.TILED_JSON);
		/*this.game.load.tilemap('level8', 'assets/level/8.json', null, Phaser.Tilemap.TILED_JSON);
	    this.game.load.tilemap('level9', 'assets/level/9.json', null, Phaser.Tilemap.TILED_JSON);*/
	    //this.game.load.tilemap('level10', 'assets/level/10.json', null, Phaser.Tilemap.TILED_JSON);

		this.game.load.spritesheet('playerS', 'assets/spritesheets/canoeiro_39-60-27.png', 39,60,27);		
		this.game.load.spritesheet('playerFinal', 'assets/spritesheets/canoeiroFinal_39-60-27.png', 39,60,27);
		this.game.load.spritesheet('bee', 'assets/enemies/casacaba_40-70-4.png',40,70,4);
		this.game.load.spritesheet('bush', 'assets/spritesheets/bush_40-35-3.png',40,35,3);
		this.game.load.spritesheet('coin', 'assets/spritesheets/coins/coins_40-40-8.png',40,40,8);
		this.game.load.spritesheet('coinIara', 'assets/spritesheets/coins/coinsIara_40-40-8.png',40,40,8);
		this.game.load.spritesheet('checkP', 'assets/spritesheets/check_20-37-3.png',20,37,3);
		this.game.load.spritesheet('flag', 'assets/spritesheets/gamewin_40-40-8.png',40,40,8);
		this.game.load.spritesheet('rain', 'assets/level/rain.png', 17, 17);

		this.game.load.image('bg1', 'assets/level/bg1_462-800.jpg');
		this.game.load.image('bg2', 'assets/level/bg3_462-800.jpg');
		this.game.load.image('bg3', 'assets/level/bg6_462-800.jpg');
		this.game.load.image('bg4', 'assets/level/cenario2/bg1_860-800.jpg');
		this.game.load.image('bg5', 'assets/level/cenario2/bg2_860-800.jpg');
		this.game.load.image('bg6', 'assets/level/cenario2/bg3_860-800.jpg');
		this.game.load.image('bg7', 'assets/level/cenario3/3cave_430-800.jpg');
		//this.game.load.image('bg9', 'assets/level/bg6_462-800.jpg');
		this.game.load.image('cipo', 'assets/level/cipo_10-80.png');
		this.game.load.image('branches', 'assets/level/branches_360-283.png');
		this.game.load.image('tileset', 'assets/tile_40-40-17.png');
		this.game.load.image('finalTileset', 'assets/level/cenario3/tile3.png');		
		this.game.load.image('thorn', 'assets/enemies/thorns_80-40.png');
		this.game.load.image('tube', 'assets/enemies/cannon_25-40.png');
		this.game.load.image('cannon', 'assets/level/cenario3/triplecannon4_32-40.png');
		this.game.load.image('dardo', 'assets/level/cenario3/dartH4_33-7.png');
		this.game.load.image('acidicWater', 'assets/enemies/gota_13-37.png');
		this.game.load.image('caba', 'assets/enemies/caba_8-8.png');
		this.game.load.image('cave', 'assets/level/cave2_224-146.png');

		this.game.load.audio('jumpSound', Config.audio.jump);
		this.game.load.audio('dieSound', Config.audio.die);
		this.game.load.audio('phase1', Config.audio.phase1);
		this.game.load.audio('phase2', Config.audio.phase2);
		this.game.load.audio('phase3', Config.audio.phase1);
		this.game.load.audio('phase4', Config.audio.phase2);
		this.game.load.audio('phase5', Config.audio.phase1);
		this.game.load.audio('phase6', Config.audio.phase1);
		this.game.load.audio('phase7', Config.audio.phase2);
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};