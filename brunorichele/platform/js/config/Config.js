/*global Phaser*/

//Global
var Config = {
	global: {
		animationVelocity: 6,
		screen: {
			width: 1920,
			height: 1080,
			resize: function (game) {
				"use strict";
				game.scale.minWidth = 320;
				game.scale.minHeight = 240;
				game.scale.maxWidth = 1920;
				game.scale.maxHeight = 1080;
				
				game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				game.scale.setScreenSize();	
			}
		}
	}
};

//LudusSplash
Config.ludusSplash = {
	dir: 'assets/images/LudusSplash_1920-1080.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//SponsorSplash
Config.sponsorSplash = {
	dir: 'assets/images/SponsorSplash_1920-1080.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/bgmenu_1920-1080.jpg',
	x: 0,
	y: 0,
	buttonPlay: {
		dir: 'assets/spritesheets/jogar_474-55-2.png',
		x: Config.global.screen.width * 0.6,
		y: Config.global.screen.height * 0.73,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/tutorial_474-55-2.png',
		x: Config.global.screen.width * 0.6,
		y: Config.global.screen.height * 0.79,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/creditos_474-55-2.png',
		x: Config.global.screen.width * 0.6,
		y: Config.global.screen.height * 0.85,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonBack: {
		dir: 'assets/spritesheets/voltar_474-55-2.png',
		x: Config.global.screen.width * 0.1,
		y: Config.global.screen.height * 0.9,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonNext: {
		dir: 'assets/spritesheets/avancar_474-55-2.png',
		x: Config.global.screen.width * 0.9,
		y: Config.global.screen.height * 0.9,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonInit: {
		dir: 'assets/spritesheets/inicio_474-55-2.png',
		x: Config.global.screen.width * 0.9,
		y: Config.global.screen.height * 0.9,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},				
	textStyle: {
		font: '25px Ms Sans Serif',
		fill: '#ffffff'
	}
};

//HowToPlay
Config.howToPlay = {
	dir: 'assets/images/tutorial_1920-1080.jpg',
	x: 0,
	y: 0
};

//Credits
Config.credits = {
	dir: 'assets/images/creditos_1920-1080.jpg',
	x: 0,
	y: 0
};