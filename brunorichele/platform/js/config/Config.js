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

//GameSplash
Config.gameSplash = {
	dir: {
		background: 'assets/images/GameSplash_1920-1080.png',
		bar: 'assets/images/ProgressBar_1920-30.png'
	},
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
		dir: 'assets/spritesheets/botaojogar_474-55.png',
		x: Config.global.screen.width * 0.7,
		y: Config.global.screen.height * 0.7,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/ButtonHowToPlay_600-95.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.6,
		width: 150,
		height: 95,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/ButtonCredits_600-95.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.8,
		width: 150,
		height: 95,
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
	dir: 'assets/images/HowToPlay_1920-1080.png',
	x: 0,
	y: 0
};

//Credits
Config.credits = {
	dir: 'assets/images/creditos_1920-1080.jpg',
	x: 0,
	y: 0
};