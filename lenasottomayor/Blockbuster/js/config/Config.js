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
		bar: 'assets/images/ProgressBar_960-30.png'
	},
	progressBar: {
		x: 0,
		y: 500
	},
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/MenuBackground_960-600.png',
	x: 0,
	y: 0,
	buttonPlay: {
		dir: 'assets/spritesheets/ButtonPlay_600-95.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.4,
		width: 150,
		height: 95,
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

//GamePlay
Config.game = {
	gravity: 800,
	camera: {
		y: 1000
	}
};

Config.background = {
	game: {
		dir: 'assets/images/background_960-600.png'
	}
};

//TileMap
Config.tilemap = {
	fase01: {
		dir: 'assets/maps/Fase01/map01.json'
	},
	tiles: {
		tileset: {
			dir: 'assets/images/tileset_360-280.png',
			name: 'tileset_360-280',
			platform: 'Platform',
			thorn: 'Thorn',
			height: 360,
			width: 280
		},
		powerlifes: {
			dir: 'assets/images/powerlife_42-42.png',
			name: 'PowerLife',
			gid: 64,
			frame: 0
		},
		powerstars: {
			dir: 'assets/images/powerstar_42-42.png',
			name: 'PowerStar',
			gid: 65,
			frame: 0
		},
		coins: {
			dir: 'assets/images/coin_36-36.png',
			name: 'Coins',
			gid: 66,
			frame: 0
		}
	}
};

//Level
Config.level1 = {
	x: 0,
	y: 0,
	worldBounds: {
		xi: 0,
		yi: 0,
		xf: 12000,
		yf: 600
	}
};

//Player
Config.player = {
	dir: 'assets/images/player_95-55.png',
	gravity: 800,
	jump: 600,
	speed: 250,
	height: 95,
	width: 55,
	anchor: {
		x: 0.5,
		y: 0.5
	},
	position: {
		x: 50,
		y: 450
	}
};

//HowToPlay
Config.howToPlay = {
	dir: 'assets/images/HowToPlay_960-600.png',
	x: 0,
	y: 0
};

//Credits
Config.credits = {
	dir: 'assets/images/Credits_960-600.png',
	x: 0,
	y: 0
};