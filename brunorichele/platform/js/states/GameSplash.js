/*global setTimeout, State, Config, Phaser*/
var GameSplashProperties = {
	background: 'assets/images/GameSplash_1920-1080.jpg',
	bar: 'assets/spritesheets/splashtext_4000-300-8.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};
GameSplash = function (game) {
	this.game = game;
	this.menu = new Menu(game);
	this.credits = new Credits(game);
	this.howToPlay = new HowToPlay(game);
	this.player = new Player(game);
	this.door = new Door(game);
};
GameSplash.prototype = {
	init: function(){
		this.game.load.image('game-splash', GameSplashProperties.background);
		this.game.load.spritesheet('progress-bar', GameSplashProperties.bar, 500, 300);	
	},
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
		this.menu.init();
		
		Config.button.load(this.game);
		
		this.game.load.image('game-intro1', GameIntro1Properties.background);
		this.game.load.image('game-intro2', GameIntro2Properties.background);
		this.game.load.image('game-intro3', GameIntro3Properties.background);
		this.game.load.image('game-intro4', GameIntro4Properties.background);				
		this.game.load.image('game-over', GameOverProperties.background);
		this.game.load.image('game-final', GameFinalProperties.background);

		this.credits.init();
		this.howToPlay.init();

	    Phase2.World.game = this.game;
	    Phase2.World.init();
	    Phase2.Enemy.game = this.game;
        Phase2.Enemy.init();

	    Phase3.World.game = this.game;
        Phase3.World.init();

        Phase1.World.game = this.game;
        Phase1.World.init();
        Phase1.Trap.game = this.game;
        Phase1.Trap.init();
	    Phase1.Enemy.game = this.game;
        Phase1.Enemy.init();
		
		this.door.preload();
		this.player.preload();
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	}
};
State.GameSplash = GameSplash;