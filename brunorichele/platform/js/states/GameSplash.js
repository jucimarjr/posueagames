/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		var progressBar = this.game.add.sprite(0, 800, 'progress-bar');
		var sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		this.game.load.setPreloadSprite(progressBar);
		this.game.load.onLoadComplete.add(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start(); 
			setTimeout(function () {this.game.state.start('Menu');}, Config.gameSplash.millis);
		}, this);

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
		this.loadWorld();
		this.game.load.tilemap('tilemap', Config.game.dir.tilemap, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tileset', Config.game.dir.tileset);
		this.game.load.image('jogador', Config.game.jogador.dir);

		Phase1.World.init(this.game);
		Phase1.Rock.init(this.game);	
		Phase1.Smoke.init(this.game);	
		Phase1.Door.init(this.game);
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
		/* Adicionar depois a classe Phase1.World*/
	loadWorld : function(){		
		this.game.load.spritesheet('spearTrap', Phase1.World.spearTrap, 10, 305);
		//this.game.load.spritesheet('greatspeartrap', Phase1.World.greatSpearTrap);
	}
};