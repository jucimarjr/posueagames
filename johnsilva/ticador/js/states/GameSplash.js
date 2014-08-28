/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		var sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game_splash');
		var progressBar = this.game.add.sprite(0, 500, 'progress_bar');
		//this.load.setPreloadSprite(progressBar);		
		this.game.load.setPreloadSprite(progressBar);
		this.game.load.onLoadComplete.add(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start(); 
			setTimeout(function () {
				//this.game.state.start('Menu');
				this.game.state.start('GamePlay');
			}, Config.gameSplash.millis);
		}, this);
		
		//Menu
		/*this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);
		this.game.load.audio('menu-audio', Config.audio.menu);*/

		//Game
		this.game.load.spritesheet('player', 'assets/sprites/player_200-160-2.png', 200,160,2);		
		this.game.load.spritesheet('fish2', 'assets/sprites/fish2_90-40-2.png',90,40,2);
		this.game.load.spritesheet('fish3', 'assets/sprites/fish3_90-80-3.png',90,80,3);
		this.game.load.spritesheet('fish4', 'assets/sprites/fish4_90-120-4.png',90,120,4);

		//Btn
		this.game.load.spritesheet('btnPlay', 'assets/btns/play_100-70.png', 100, 70, 2);
		this.game.load.spritesheet('btnPlayer', 'assets/btns/btnPlayer_100-70.png', 100, 70, 2);
		this.game.load.image('bgGameOver', 'assets/btns/gameover_350-280.png',350,280);
		this.game.load.image('btnTapR', 'assets/btns/tapR_75-50.jpg', 75, 50);
		this.game.load.image('btnTapL', 'assets/btns/tapL_75-50.jpg', 75, 50);

		this.game.load.image('bg', 'assets/bg/bg_450-600.png', 450, 600);
		this.game.load.image('gota', 'assets/sprites/gota_17-17.png', 17, 17);
		
		//this.game.load.audio('jumpSound', Config.audio.jump);

	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};