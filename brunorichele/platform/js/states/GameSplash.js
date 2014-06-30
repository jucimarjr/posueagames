/*global setTimeout, State, Config, Phaser*/
var GameSplashProperties = {
	dir: {
		background: 'assets/images/GameSplash_1920-1080.jpg',
		bar: 'assets/images/splashtext_4000-300-8.png'
	},
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
	this.player = new Player(game);
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		var sprite = this.game.add.sprite(GameSplashProperties.x, GameSplashProperties.y, 'game-splash'); // Carregar bg
		
		this.bar = this.game.add.sprite((1920 - 500)/2, (1080 - 300)/2, 'progress-bar'); // Carregar animacao do splash
        this.bar.animations.add('play', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
        this.bar.animations.play('play');	
		
		this.game.load.onLoadComplete.add(function () {
			setTimeout(function () {this.game.state.start('Menu');}, GameSplashProperties.millis);
		}, this);

		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-back', Config.menu.buttonBack.dir, Config.menu.buttonBack.width, Config.menu.buttonBack.height);
		this.game.load.spritesheet('button-next', Config.menu.buttonNext.dir, Config.menu.buttonNext.width, Config.menu.buttonNext.height);
		this.game.load.spritesheet('button-init', Config.menu.buttonInit.dir, Config.menu.buttonInit.width, Config.menu.buttonInit.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);
		
		this.game.load.image('game-intro1', GameIntro1Properties.background);
		this.game.load.image('game-intro2', GameIntro2Properties.background);
		this.game.load.image('game-over', GameOverProperties.background);

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