/*global Phaser*/

//Global
var Config = {
	global: {
		animationVelocity: 6,
		screen: {
			width: 450,
			height: 600,
			resize: function (game) {
				"use strict";
				//if (window.innerHeight < 600 || window.innerWidth < 960) {
				if(!game.device.desktop){
					game.scale.setExactFit();
					game.scale.refresh();
					document.getElementById('game_div').style.width = '100%';
				}
			}
		}
	}
};

//LudusSplash
Config.tucandeiraSplash = {
	dir: 'assets/images/TucandeiraSplash_450-600.png',
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
		background: 'assets/images/GameSplash_450-600.jpg',
		bar: 'assets/images/ProgressBar_960-30.png'
	},
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/MenuBackground_960-600.jpg',
	x: 0,
	y: 0,
	buttonPlay: {
		dir: 'assets/spritesheets/buttons/Play_220-75.png',
		x: Config.global.screen.width * 0.3,
		y: Config.global.screen.height * 0.7,
		width: 220,
		height: 75,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/buttons/HowToPlay_220-75.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.7,
		width: 220,
		height: 75,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/buttons/Creditis_220-75.png',
		x: Config.global.screen.width * 0.7,
		y: Config.global.screen.height * 0.7,
		width: 220,
		height: 75,
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
	dir: 'assets/images/HowToPlay_960-600.jpg',
	x: 0,
	y: 0
};

//Credits
Config.credits = {
	dir: 'assets/images/Credits_960-600.jpg',
	x: 0,
	y: 0
};

Config.audio = {
	menu: 'assets/audio/menu.mp3',
	phase1: 'assets/audio/phase1.mp3',
	phase2: 'assets/audio/phase2.mp3',
	jump: 'assets/audio/jump.mp3',
	die: 'assets/audio/die.mp3',
	coin: 'assets/audio/coin.mp3',
	gameWin: 'assets/audio/gameWin.mp3',	
	cp: 'assets/audio/cp.mp3'
};

