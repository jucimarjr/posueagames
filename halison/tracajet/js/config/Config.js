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
		background: 'assets/images/ad_600-600.png'
	},
	x: Config.global.screen.width * 0.5,
	y: Config.global.screen.height * 0.5,
	anchor: {
		x: 0.5,
		y: 0.5
	},
	millis: 2000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/tela_menu_960-600.png',
	x: 0,
	y: 0,
	buttonHowToPlay: {
		dir: 'assets/sprites/buttonintructions_266-58-4.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.47,
		width: 266,
		height: 58,
		anchor: {
			x: 0.5,
			y: 0.5
		},
	},
	buttonPlay: {
		dir: 'assets/sprites/buttonplay_166-60-4.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.59,
		width:166,
		height: 60,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/sprites/buttoncredits_216-58-4.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.72,
		width: 216,
		height: 58,
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
	dir: 'assets/images/tela_instrucoes_960-600.png'
};

// Credits
Config.credits = {
	dir: 'assets/images/tela_credito_960-600.png'
};

//Global
Config.game = {
		score :{
			score : 0,
			lifes : 5
		},
		ad: {
			dir: 'assets/images/ad_600-600.png',
			width: 600,
			height: 600,
			x: 340,
			y: 300
		},
		tracajet: {
			dir: 'assets/sprites/tracajet_80-80-8.png',
			width: 80,
			height: 80,
			x: 340,
			y: 300
		},
		tracajetFlying: {
			dir: 'assets/sprites/tracajet_60-80-4.png',
			width: 60,
			height: 80,
			frames: 4,
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
		bird:{
			dir: 'assets/sprites/passaros_115-115-4.png',
		},
		fase1: {
			background: "assets/images/bg1_2880-1200.png",
			
		},
		fase2: {
			background: "assets/images/bg2_2880-1200.png",
		},
		fase3: {
			background: "assets/images/bg3_2880-1200.png",
	        json: "assets/Fase3.json",
			nuvens: { 
				dir: "assets/sprites/nuvens_120-40-4.png",
				width: 120,
				height: 40
			},
			frutas: "assets/sprites/frutas_24-30-5.png"
		}
};
