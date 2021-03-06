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
//					game.scale.setExactFit();
//					game.scale.refresh();
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
	millis: 3500,
	nextState: 4000
};

//GameSplash
Config.gameSplash = {
	dir: {
		bar: 'assets/images/ProgressBar_960-30.png'
	},
	x: 0,
	y: 0,
	millis: 6000,
	nextState: 7000
};

//Menu
Config.menu = {
	dir: 'assets/images/main_960-600.png',
	x: 0,
	y: 0,
	buttonOpening: {
		dir: 'assets/sprites/button_opening_206-17.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.62,
		width: 103,
		height: 17,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonPlay: {
		dir: 'assets/sprites/button_start_140-16.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.68,
		width: 70,
		height: 16,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/sprites/button_instruction_247-16.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.74,
		width: 123,
		height: 16,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/sprites/button_credits_192-16.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.8,
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

//Global
Config.game = {
		nave: {
			dir: 'assets/images/nave_100-40.png',
			x: 440,
			y: 300
		},
		gameover: {
			dir: 'assets/images/gameover_436-82.png',
			x: Config.global.screen.width/2 - 218,
			y: Config.global.screen.height/2 -41,
			time: 3000
		},
		asteroid: {
			dir: 'assets/images/asteroid1_80-80.png',
			x: Config.global.screen.width/2 - 436/2,
			y: Config.global.screen.height/2 - 82/2,
			number: 3,
			velocityRangeIni: 150,
			velocityRangeEnd: 420
		},
		background: {
			dir: 'assets/images/game_background_960-600.png',
			x: 0,
			y: 0
		},
		foreground: {
			dir: 'assets/images/game_foreground_960-600.png',
			x: 0,
			y: 0
		},
		coins: {
			number: 10,
			velocity: 100,
			green: {
				dir1: 'assets/images/coins/coin_green_1_50_51.png',
				dir2: 'assets/images/coins/coin_green_2_50_50.png',
				dir3: 'assets/images/coins/coin_green_3_50_50.png',
				dir4: 'assets/images/coins/coin_green_4_50_50.png',
				dir5: 'assets/images/coins/coin_green_5_50_51.png',
				dir6: 'assets/images/coins/coin_green_6_50_51.png',
				dir7: 'assets/images/coins/coin_green_7_50_50.png',
				dir8: 'assets/images/coins/coin_green_8_50_50.png'
			},
			yellow: {
				dir1: 'assets/images/coins/coin_yellow_1_50_50.png',
				dir2: 'assets/images/coins/coin_yellow_2_50_50.png'
			},
			red: {
				dir1: 'assets/images/coins/coin_red_1_50_49.png',
				dir2: 'assets/images/coins/coin_red_2_50_50.png',
				dir3: 'assets/images/coins/coin_red_3_50_50.png',
				dir4: 'assets/images/coins/coin_red_4_50_50.png'
			}
		},
		score: {
			dir: 'assets/images/score_asteroid_263-85.png',
			x: 10,
			y: 10,
			textX: 77,
			textY: 42,
			lifeX: 650,
			lifeY: 20
		},
		planet: {
			dir: 'assets/images/planet_507-507.png',
			x: Config.global.screen.width-200,
			y: 400,
		}
};
