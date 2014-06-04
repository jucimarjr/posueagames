/*global Phaser*/

//Global
var Config = {
	global: {
		animationVelocity: 6,
		screen: {
			width: 600,
			height: 960,
			resize: function (game) {
				"use strict";
				if (window.innerHeight < Config.global.screen.height || window.innerWidth < Config.global.screen.width) {
					game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				    game.scale.setScreenSize();
				}
			}
		}
	}
};

//LudusSplash
Config.ludusSplash = {
	dir: 'assets/images/LudusSplash_600-960.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//GameSplash
Config.gameSplash = {
	dir: {
		bar: 'assets/images/ProgressBar_600-30.png',
		background: 'assets/images/gameSplash_600-960.png'
	},
	x: 0,
	y: 0,
	millis: 3000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/menuTracajet_600-960.png',
	x: 0,
	y: 0,
	buttonHowToPlay: {
		dir: 'assets/sprites/button_instruction_247-16.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.60,
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
		y: Config.global.screen.height * 0.69,
		width:90,
		height: 33,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/sprites/button_credits_192-16.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.79,
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
	dir: 'assets/images/howToPlay_600-960.png',
	x: 0,
	y: 0
};

// Credits
Config.credits = {
	dir: 'assets/images/credits_600-960.png',
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
