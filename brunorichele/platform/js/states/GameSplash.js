/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
	this.player = new Player(game);
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
		
		Phase1.World.game = this.game;
		Phase1.World.init();
		Phase1.Rock.game = this.game;
		Phase1.Rock.init();
		Phase1.Smoke.game = this.game;	
		Phase1.Smoke.init();
		Phase1.Door.game = this.game;	
		Phase1.Door.init();
		Phase1.Trap.game = this.game;
		Phase1.Trap.init();
		Phase1.Enemy.game = this.game;
		Phase1.Enemy.init();	
		
				this.player.preload();	
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};