/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
	this.isMenuStarted = false;
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
		
		//load imagens da fase1 
		game.load.tilemap('mapaFase1','assets/1aFase/mapaFase1a.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height);
		game.load.spritesheet('folhas', "assets/1aFase/folhas_120-40.png",40,40);
		game.load.spritesheet('jacare', "assets/1aFase/jacare_spritesheet_240-80.png",40,40);
		game.load.image('bgF1',Config.game.fase1.background);
		game.load.image('tilesetPlataformaF1','assets/1aFase/assets_1.png');
		game.load.image('key_8080','assets/1aFase/chave_80-80.png');
		game.load.image('imgLife','assets/tracajet1_20-40.png',20,40);
		game.load.audio('soundGame','assets/sounds/game_sound.wav');
		game.load.audio('soundGetSheet','assets/sounds/get_sheet.mp3');
		game.load.audio('soundGameOver','assets/sounds/game-over.mp3');
		game.load.audio('soundGetKey','assets/sounds/get_key.mp3');
		game.load.audio('soundColision','assets/sounds/colision.wav');
		game.load.audio('walk','assets/sounds/walk.wav');

		//load fase 2
		game.load.tilemap('mapa','assets/2_fase/2aFaseJson.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('monkey', "assets/2_fase/monkey_spritesheet_240-80.png",40,40);
		game.load.spritesheet('assets2', "assets/2_fase/assets_2.png",40,40);
        game.load.image('bgF2',Config.game.fase2.background);
        game.load.image('tilesetPlataforma','assets/2_fase/p1_480-40.png');
		game.load.image('tilesetPlataforma2','assets/2_fase/p2_480-40.png');
		game.load.image('tilesetPlataforma3','assets/2_fase/p3_40-480.png');
		game.load.image('tilesetPlataforma4','assets/2_fase/p4_40-480.png');
		game.load.audio('jump','assets/sounds/jump2.wav');
		game.load.audio('killSound','assets/sounds/killEnemy.wav');
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
		if (!this.isMenuStarted
			&& menu && bPlay && bCredits && bHowPlay && cr && h2play 
		){
		    this.isMenuStarted = true;
			setTimeout(function () {
				this.game.state.start('Menu');
			}, Config.gameSplash.millis);		
		}
	}
};