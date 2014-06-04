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
		this.game.load.audio('bgmusic', Config.game.dir.worldAudio);
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
		this.game.load.image('bgphase1', Phase1.World.bgImage);
		this.game.load.image('bgphase1-alpha', Phase1.World.bgImageAlpha);	
		
		this.game.load.image('itemRock9075', Phase1.World.itemRock9075);			
		this.game.load.image('itemRock92230', Phase1.World.itemRock92230);
		this.game.load.image('itemRock10035', Phase1.World.itemRock10035);
		this.game.load.image('itemRock12575', Phase1.World.itemRock12575);
		this.game.load.image('itemRock22085', Phase1.World.itemRock22085);	
		this.game.load.image('itemRock37085', Phase1.World.itemRock37085);			
		this.game.load.image('itemRock371108', Phase1.World.itemRock371108);
		this.game.load.image('itemRock412190', Phase1.World.itemRock412190);
		this.game.load.image('itemRock500100', Phase1.World.itemRock500100);
		this.game.load.image('itemRock515130', Phase1.World.itemRock515130);			
		this.game.load.image('itemRock540190', Phase1.World.itemRock540190);			
		this.game.load.image('itemRock550165', Phase1.World.itemRock550165);
		this.game.load.image('itemRock655230', Phase1.World.itemRock655230);
		this.game.load.image('itemRock825100', Phase1.World.itemRock825100);
		this.game.load.image('itemRock925220', Phase1.World.itemRock925220);						
	}
};