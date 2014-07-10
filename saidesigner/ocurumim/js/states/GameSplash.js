/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		
		var sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		var progressBar = this.game.add.sprite(0, 500, 'progress-bar');
		this.game.load.setPreloadSprite(progressBar);

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
		this.game.load.image('ounce_tail', Config.ounce.tail.src);
		
		this.game.load.spritesheet('river', Config.river.sprite.src, Config.river.sprite.width, Config.river.sprite.height);
		this.game.load.spritesheet('fruits', Config.fruit.small.src, Config.fruit.small.width, Config.fruit.small.height);
		this.game.load.spritesheet('fruitsBig', Config.fruit.big.src, Config.fruit.big.width, Config.fruit.big.height);
		this.game.load.spritesheet('ounce', Config.ounce.sprite.src, Config.ounce.sprite.width, Config.ounce.sprite.height);
		this.game.load.spritesheet('ounce_dizzy', Config.ounce.dizzy.src, Config.ounce.dizzy.width, Config.ounce.dizzy.height);		
		this.game.load.spritesheet('ant', Config.ant.sprite.src, Config.ant.sprite.width, Config.ant.sprite.height);
		this.game.load.spritesheet('arara_azul', Config.arara.blue.sprite.src, Config.arara.blue.sprite.width, Config.arara.blue.sprite.height);
		this.game.load.spritesheet('insaninho', Config.insaninho.sprite.src, Config.insaninho.sprite.width, Config.insaninho.sprite.height);		
	}
};