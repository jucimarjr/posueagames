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
	}
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
	},
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		var background, buttonPlay, buttonCredits, buttonHowToPlay ;
		background = this.game.add.sprite(MenuProperties.x, MenuProperties.y, 'menu-background');
		buttonPlay = this.game.add.button(MenuProperties.buttonPlay.x, MenuProperties.buttonPlay.y, 'button-play', this.clickPlay, this, 1, 0, 1, 0);
		buttonPlay.anchor.setTo(MenuProperties.buttonPlay.anchor.x, MenuProperties.buttonPlay.anchor.y);
		buttonHowToPlay = this.game.add.button(MenuProperties.buttonHowToPlay.x, MenuProperties.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, 1, 0, 1, 0);
		buttonHowToPlay.anchor.setTo(MenuProperties.buttonHowToPlay.anchor.x, MenuProperties.buttonHowToPlay.anchor.y);
		buttonCredits = this.game.add.button(MenuProperties.buttonCredits.x, MenuProperties.buttonCredits.y, 'button-credits', this.clickCredits, this, 1, 0, 1, 0);
		buttonCredits.anchor.setTo(MenuProperties.buttonCredits.anchor.x, MenuProperties.buttonCredits.anchor.y);
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	},
	clickPlay: function () {
		"use strict";
		this.game.state.start('GameIntro1');
	},
	clickHowToPlay: function () {
		"use strict";
		this.game.state.start('HowToPlay');
	},
	clickCredits: function () {
		"use strict";
		this.game.state.start('Credits');
	}	
};


State.Menu = function (game) {
	"use strict";
	this.game = game;
};
State.Menu.prototype = Menu.prototype;