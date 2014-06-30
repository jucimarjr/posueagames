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

//SponsorSplash
Config.sponsorSplash = {
	dir: 'assets/images/SponsorSplash_960-600.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//GameSplash
Config.gameSplash = {
	dir: {
		background: 'assets/images/GameSplash_960-600.png',
		bar: 'assets/images/ProgressBar_600-120.png'
	},
	x: 0,
	y: 0,
	barX: (Config.global.screen.width - 600) * 0.5,
	barY: (Config.global.screen.height - 120) * 0.4,
	millis: 2000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/MenuBackground_960-600.png',
	x: 0,
	y: 0,
	buttonPlay: {
		dir: 'assets/spritesheets/ButtonPlay_274-50-3.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.55,
		width: 274,
		height: 50,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/ButtonHowToPlay_274-50-3.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.7,
		width: 274,
		height: 50,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/ButtonCredits_274-50-3.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.85,
		width: 274,
		height: 50,
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
	dir: 'assets/images/HowToPlayBoard_960-174.png',
	width: 274,
	height: 50,
	x: 0,
	y: Config.global.screen.height * 0.5
};

//Credits
Config.credits = {
	dir: 'assets/images/Credits_960-600.png',
	x: 0,
	y: 0
};

//GameOver
Config.gameOver = {
	dir: {
		background: 'assets/images/GameOver_960-600.png',
		effect: 'assets/images/GameOverFire_960-600.png'
	},
	x: 0,
	y: 0
};

//YouWin
Config.youWin = {
	dir: {
		background: 'assets/images/YouWin_960-600.png',
		effect: 'assets/images/YouWinDiamonds_960-600.png'
	},
	x: 0,
	y: 0
};