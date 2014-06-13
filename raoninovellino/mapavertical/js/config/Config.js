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
	},
	
	assets: 'assets/',
	images: 'assets/images/',
	spriteSheets: 'assets/spritesheet/'
};

//LudusSplash
Config.ludusSplash = {
	dir: 'assets/images/LudusSplash_960-600.png',
	x: 0,
	y: 0,
	millis: 1000,
	nextState: 1000
};

//SponsorSplash
Config.sponsorSplash = {
	dir: 'assets/images/SponsorSplash_960-600.png',
	x: 0,
	y: 0,
	millis: 1000,
	nextState: 1000
};

//GameSplash
Config.gameSplash = {
	dir: {
		background: 'assets/images/GameSplash_960-600.png',
		bar: 'assets/images/ProgressBar_960-30.png'
	},
	x: 0,
	y: 0,
	millis: 1000,
	nextState: 1000
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


Config.game = {
	
	bgKey: 'game_background',
	//dir: Config.images + 'fundovertical_960-1920.png',
	dir: Config.images + 'background_3200-2133.png',
	x: 0,
	y: 0,
	
	map: {
		key: 'game_map',
//		dir: Config.assets + 'mapavertical.json',
		dir: Config.assets + 'map.json',
		tileSetKey: 'textura',
		tileSetDir: Config.images + 'textura.png',
//		layerName: 'Camada de Tiles 1',
		layerName: 'platforms',
	},
	
	player: {
		key: 'player_sheet',
		dir: Config.images + 'player_45-60-4.png',
		x: 100,
		y: 1400,
		width: 45,
		height: 60,
		anchor: {
			x: 0.5,
			y: 0.5
		},
		anim: {
			walk: 'player_walk',
			jump: 'player_jump'
		},
		shotTime: 300,
	},
	playerBullet: {
		key: 'player_bullet',
		dir: Config.images + 'player_bullet_5-5.png',
		anchor: {
			x: 0.5,
			y: 0.5
		},
		velocity: 250,
	},
	
	enemy: {
		key: 'enemy_sheet',
		dir: Config.images + 'enemy_45-60-4.png',
		x: [100, 100,  500, 700, 1000, 1500, 2000, 2500, 3000, 2500],
		y: [100, 800,  500, 100, 500,  100,  700,  1000, 1400, 100],
		width: 45,
		height: 60,
		anchor: {
			x: 0.5,
			y: 0.5
		},
		anim: {
			shot: 'enemy_shot',
		},
		shotTime: 1000
	},
	enemyBullet: {
		key: 'enemy_bullet',
		dir: Config.images + 'enemy_bullet_5-5.png',
		anchor: {
			x: 0.5,
			y: 0.5
		},
		velocity: 150,
	}
	
};

Config.states = {
	
	keyGame: 'Game'
	
};
