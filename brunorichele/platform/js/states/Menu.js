var MenuProperties = {
	background: 'assets/images/bgmenu_1920-1080.jpg',
	x: 0,
	y: 0,
	buttonPlay: {
		background: 'assets/spritesheets/jogar_474-55-2.png',
		x: Config.screen.width * 0.6,
		y: Config.screen.height * 0.73,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		background: 'assets/spritesheets/tutorial_474-55-2.png',
		x: Config.screen.width * 0.6,
		y: Config.screen.height * 0.79,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		background: 'assets/spritesheets/creditos_474-55-2.png',
		x: Config.screen.width * 0.6,
		y: Config.screen.height * 0.85,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	page : null
};

function Menu(game) {
    this.game = game
};

Menu.prototype = {
	init: function(){
		this.game.load.image('menu-background',  MenuProperties.background);
		this.game.load.spritesheet('button-play', MenuProperties.buttonPlay.background, MenuProperties.buttonPlay.width, MenuProperties.buttonPlay.height);
		this.game.load.spritesheet('button-credits', MenuProperties.buttonCredits.background, MenuProperties.buttonCredits.width, MenuProperties.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', MenuProperties.buttonHowToPlay.background, MenuProperties.buttonHowToPlay.width, MenuProperties.buttonHowToPlay.height);	
		this.game.load.audio('musicmenu', "assets/audio/Light the Way.mp3");	
	},
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		this.background = this.game.add.sprite(MenuProperties.x, MenuProperties.y, 'menu-background');
		this.background.alpha = 0;
				
		this.buttonPlay = this.game.add.button(MenuProperties.buttonPlay.x, MenuProperties.buttonPlay.y, 'button-play', this.clickPlay, this, 1, 0, 1, 0);
		this.buttonPlay.anchor.setTo(MenuProperties.buttonPlay.anchor.x, MenuProperties.buttonPlay.anchor.y);
		this.buttonPlay.alpha = 0;
		
		this.buttonHowToPlay = this.game.add.button(MenuProperties.buttonHowToPlay.x, MenuProperties.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, 1, 0, 1, 0);
		this.buttonHowToPlay.anchor.setTo(MenuProperties.buttonHowToPlay.anchor.x, MenuProperties.buttonHowToPlay.anchor.y);
		this.buttonHowToPlay.alpha = 0;		
		
		this.buttonCredits = this.game.add.button(MenuProperties.buttonCredits.x, MenuProperties.buttonCredits.y, 'button-credits', this.clickCredits, this, 1, 0, 1, 0);
		this.buttonCredits.anchor.setTo(MenuProperties.buttonCredits.anchor.x, MenuProperties.buttonCredits.anchor.y);
		this.buttonCredits.alpha = 0;		
		
		if(MenuProperties.page == null){
			this.createSound();
		}
		
		game.add.tween(this.background).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonPlay).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonHowToPlay).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonCredits).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();							
	},
	createSound : function(){
		this.bgmusic = this.game.add.audio('musicmenu');
        this.bgmusic.play('', 0, 1, true);	
		
		return this.bgmusic;
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	},
	clickPlay: function () {
		"use strict";
		this.carro = this.game.add.audio('music-carro');
        this.carro.play();	
		this.bgmusic.stop();
		var FadeOut = game.add.tween(this.background).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			MenuProperties.page = null;
			game.state.start('GameIntro1');
		});
		FadeOut.start();
		game.add.tween(this.buttonPlay).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonHowToPlay).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonCredits).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();						
	},
	clickHowToPlay: function () {
		"use strict";
		var FadeOut = game.add.tween(this.background).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			MenuProperties.page = "howtoplay";
			game.state.start('HowToPlay');
		});
		FadeOut.start();
		game.add.tween(this.buttonPlay).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonHowToPlay).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonCredits).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();						
	},
	clickCredits: function () {
		"use strict";
		var FadeOut = game.add.tween(this.background).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			MenuProperties.page = "credits";
			game.state.start('Credits');
		});
		FadeOut.start();	
		game.add.tween(this.buttonPlay).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonHowToPlay).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.buttonCredits).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();					
	}	
};


State.Menu = function (game) {
	"use strict";
	this.game = game;
};
State.Menu.prototype = Menu.prototype;