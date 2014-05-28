/*global Phaser*/

//Global
var Config = {
	global: {
		animationVelocity: 6,
		screen: {
			width: 960,
			height: 600,
			resize: function (game) {
				"use strict";
				if (window.innerHeight < 600 || window.innerWidth < 960) {
					game.scale.setExactFit();
					game.scale.refresh();
				}
			}
		}
	}
};

//LudusSplash
Config.ludusSplash = {
	dir: 'assets/images/LudusSplash_960-600.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//GameSplash
Config.gameSplash = {
	dir: {
		background: 'assets/images/background_960-600.png',
		bar: 'assets/images/ProgressBar_960-30.png'
	},
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/main_960-600.png',
	x: 0,
	y: 0,
	buttonOpening: {
		dir: 'assets/spritesheets/button_openning_186-17.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.4,
		width: 186,
		height: 17,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonPlay: {
		dir: 'assets/spritesheets/buttom_start_140-16.png',
//		dir: 'assets/spritesheets/button_play_180-33.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.4,
		width: 140,
		height: 16,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/button_instruction_247-16.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.6,
		width: 247,
		height: 16,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/button_credits_192-16.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.8,
		width: 192,
		height: 16,
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
	dir: 'assets/images/how_to_play_960-600.png',
	x: 0,
	y: 0
};

//Credits
Config.credits = {
	dir: 'assets/images/credits_960-600.png',
	x: 0,
	y: 0
};