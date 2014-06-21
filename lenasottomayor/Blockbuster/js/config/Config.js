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
		},
		key: {
			nextScreen: Phaser.Keyboard.ENTER
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

//Story
Config.story = {
	dir: 'assets/images/Story_960-600.png',
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
	}
};

//GamePlay
Config.game = {
	gravity: 800
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
		},
		thorn: {
			dir: 'assets/images/Thorn_40-40.png',
			name: 'Thorn_40-40',
			thorns: 'Thorn',
			height: 40,
			width: 40
		}
	}
};

//Level 1
Config.level1 = {
	x: 0,
	y: 0,
	coins: 0,
	life: 3,
	score: 0,
	text: 'Level 1-1',
	worldBounds: {
		xi: 0,
		yi: 0,
		xf: 12800,
		yf: 800
	}
};

//Fonts
Config.fonts = {
	coins: {
		dir: 'assets/fonts/font_gray.fnt',
		image: 'assets/fonts/font_gray.png'
	},
	life: {
		dir: 'assets/fonts/font_white.fnt',
		image: 'assets/fonts/font_white.png'
	},
	score: {
		dir: 'assets/fonts/font_yellow.fnt',
		image: 'assets/fonts/font_yellow.png'
	}
};

//Scores
Config.scores = {
	powerlife: 5,
	powerstar: 10,
	coin: 2,
	enemy: 25
};

//Icons
Config.icon = {
	coin: 'assets/images/coinscore_25-25.png',
	life: 'assets/images/lifescore_48-27.png'
};

//Player
Config.player = {
	dir: 'assets/spritesheets/Oscar_spritesheet_900-95-18.png',
	jump: 575,
	speed: 175,
	run: 300,
	height: 95,
	width: 50,
	anchor: {
		x: 0.5,
		y: 0.5
	},
	position: {
		x: 50,
		y: 625
	}
};

//Enemy
Config.enemy = {
	cruella: {
		dir: 'assets/spritesheets/Cruella_305-97-5.png',
		height: 97,
		width: 61,
		frames: 5,
		name: 'Cruella',
		anchor: {
			x: 0.5,
			y: 0.5
		},
		walk: {
			x: 50,
			y: 0,
			gid: 67,
			frame: 0
		},
		jump: {
			x: 0,
			y: 200,
			gid: 68,
			frame: 1
		}
	},
	freddy: {
		dir: 'assets/spritesheets/Freddy_472-95-8.png',
		height: 95,
		width: 59,
		frames: 8,
		name: 'Freddy',
		anchor: {
			x: 0.5,
			y: 0.5
		},
		walk: {
			x: 100,
			y: 0,
			gid: 72,
			frame: 0
		},
		jump: {
			y:350,
			gid: 75,
			frame: 3
		}
	},
	hannibal: {
		dir: 'assets/spritesheets/Hannibal_432-97-8.png',
		height: 97,
		width: 54,
		frames: 8,
		name: 'Hannibal',
		anchor: {
			x: 0.5,
			y: 0.5
		},
		walk: {
			x: 100,
			y: 0,
			gid: 80,
			frame: 0
		},
		jump: {
			x: 0,
			y: 300,
			gid: 83,
			frame: 3
		}
	},
	jason: {
		dir: 'assets/spritesheets/Jason_400-97-8.png',
		height: 97,
		width: 50,
		frames: 8,
		name: 'Jason',
		anchor: {
			x: 0.5,
			y: 0.5
		},
		walk: {
			x: 100,
			y: 0,
			gid: 88,
			frame: 0
		},
		jump: {
			x: 0,
			y:400,
			gid: 91,
			frame: 3
		}
	},
	joker: {
		dir: 'assets/spritesheets/Joker_448-97-8.png',
		height: 97,
		width: 56,
		frames: 8,
		name: 'Joker',
		anchor: {
			x: 0.5,
			y: 0.5
		},
		walk: {
			x: 100,
			y: 0,
			gid: 96,
			frame: 0
		},
		jump: {
			x: 0,
			y: 450,
			gid: 99,
			frame: 3
		}
	},
	vader: {
		dir: 'assets/spritesheets/Vader_1500-217-10.png',
		height: 217,
		width: 150,
		frames: 10,
		name: 'Vader',
		distancePlayer: 900,
		velocity: 200,
		hp: 5,
		timeDie: 2000,
		anchor: {
			x: 0.5,
			y: 0.5
		},
		gid: 104,
		frame: 0
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

//Game Over
Config.gameOver = {
	dir: 'assets/images/GameOver_960-600.png',
	x: 0,
	y: 0	
};

//Game Win
Config.gameWin = {
	dir: 'assets/images/GameWin_960-600.png',
	x: 0,
	y: 0	
};