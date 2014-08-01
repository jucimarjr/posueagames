/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		
		var sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		var progressBar = this.game.add.sprite(0, 580, 'progress-bar');
		this.game.load.setPreloadSprite(progressBar);

		var loadingTxt = this.game.add.text(10, 582, 'Carregando...', { font: "12px Bored Fjord", fill: "#ffffff", align: "center" });				

		this.game.load.onLoadComplete.add(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start(); 
			this.nextState();
		}, this);
		
		this.loadAssets();
	},

	update: function () {
		"use strict";

		Config.global.screen.resize(this.game);
	},

	nextState: function () {
		"use strict";

		setTimeout(
			function () {
				this.game.state.start('Menu');
			}, 
			Config.gameSplash.nextState
		);
	},

	loadAssets: function () {
		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);

		//Credits
		this.game.load.image('credits', Config.credits.dir);
		
		//HowToPlay
		this.game.load.image('how-to-play', Config.howToPlay.dir);
		
		//Gameover
		this.game.load.image('gameover', Config.gameover.dir);

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
		this.game.load.image('trees2', 'assets/images/trees2.png');
		this.game.load.image('forest2', 'assets/images/forest2.png');
		this.game.load.image('platform2', 'assets/images/platform2.png');
		this.game.load.image('platform3', 'assets/images/platform3.png');
		this.game.load.image('platform4', 'assets/images/platform4.png');
		this.game.load.image('cave', 'assets/images/cave.png');
		this.game.load.image('clouds', 'assets/images/clouds.png');
		this.game.load.image('ounce_tail', Config.ounce.tail.src);
		this.game.load.image('arrow', Config.arrow.src);
		this.game.load.image('waterfall', Config.waterfall.src);
			
		this.game.load.spritesheet('fruits', Config.fruit.small.src, Config.fruit.small.width, Config.fruit.small.height);
		this.game.load.spritesheet('fruitsBig', Config.fruit.big.src, Config.fruit.big.width, Config.fruit.big.height);
		this.game.load.spritesheet('ounce', Config.ounce.sprite.src, Config.ounce.sprite.width, Config.ounce.sprite.height);
		this.game.load.spritesheet('ounce_dizzy', Config.ounce.dizzy.src, Config.ounce.dizzy.width, Config.ounce.dizzy.height);		
		this.game.load.spritesheet('ant', Config.ant.sprite.src, Config.ant.sprite.width, Config.ant.sprite.height);
		this.game.load.spritesheet('arara_azul', Config.arara.blue.sprite.src, Config.arara.blue.sprite.width, Config.arara.blue.sprite.height);
		this.game.load.spritesheet('insaninho', Config.insaninho.sprite.src, Config.insaninho.sprite.width, Config.insaninho.sprite.height);		

		this.game.load.audio('game', 'assets/sounds/game.mp3');
		this.game.load.audio('gameover', 'assets/sounds/gameover.mp3');
		this.game.load.audio('ambience', 'assets/sounds/ambience.mp3');		
		this.game.load.audio('walking', 'assets/sounds/walking.wav');
		this.game.load.audio('powerUp', 'assets/sounds/powerUp.mp3');
		this.game.load.audio('jumping', 'assets/sounds/jumping.wav');
		this.game.load.audio('getcoin', 'assets/sounds/getcoin.ogg');
		this.game.load.audio('pain', 'assets/sounds/pain.wav');
		this.game.load.audio('shot', 'assets/sounds/shot.wav');
	}
};