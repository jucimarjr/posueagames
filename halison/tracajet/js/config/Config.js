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
		bar: 'assets/images/ProgressBar_960-30.png',
		background: 'assets/images/gameSplash_960-600.png'
	},
	x: 0,
	y: 0,
	millis: 3000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/menuTracajet_960-600.png',
	x: 0,
	y: 0,
	buttonHowToPlay: {
		dir: 'assets/sprites/button_instruction_247-16.png',
		x: Config.global.screen.width * 0.23,
		y: Config.global.screen.height * 0.88,
		width: 123,
		height: 16,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonPlay: {
		dir: 'assets/sprites/button_play_180-33.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.88,
		width:90,
		height: 33,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/sprites/button_credits_192-16.png',
		x: Config.global.screen.width * 0.76,
		y: Config.global.screen.height * 0.88,
		width: 96,
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

// How To Play
Config.howToPlay = {
	dir: 'assets/images/howToPlay_960-600.png',
	x: Config.global.screen.width/2,
	y: Config.global.screen.height/2
};

// Credits
Config.credits = {
	dir: 'assets/images/credits_960-600.png',
	x: 0,
	y: 0
};

//Global
Config.game = {
		ad: {
			dir: 'assets/images/ad_600-600.png',
			width: 600,
			height: 600,
			x: 340,
			y: 300
		},
		tracajet: {
			dir: 'assets/sprites/tracajet_320-40.png',
			width: 40,
			height: 40,
			x: 340,
			y: 300
		},
		star: {
			dir: 'assets/images/star.png',
		},
		tileset: {
			dir: 'assets/images/tileset.png',
		},
		background: {
			dir: 'assets/bg3_600-1920.png',
		},
		floor: {
			dir: 'assets/images/chao.jpg',
		},

};
