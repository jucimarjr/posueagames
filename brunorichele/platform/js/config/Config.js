/*global Phaser*/

//Global
var Config = {
	global: {
		animationVelocity: 6
	},
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
};

//Menu
Config.menu = {
	buttonBack: {
		dir: 'assets/spritesheets/voltar_474-55-2.png',
		x: Config.screen.width * 0.1,
		y: Config.screen.height * 0.9,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonNext: {
		dir: 'assets/spritesheets/avancar_474-55-2.png',
		x: Config.screen.width * 0.9,
		y: Config.screen.height * 0.9,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonInit: {
		dir: 'assets/spritesheets/inicio_474-55-2.png',
		x: Config.screen.width * 0.9,
		y: Config.screen.height * 0.9,
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