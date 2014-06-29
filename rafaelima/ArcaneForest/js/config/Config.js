/*global Phaser*/

//Global
var Config = {
	global: {
		animationVelocity: 6,
		screen: {
			width: 960,
			height: 540,
			resize: function (game) {
				"use strict";
				if (window.innerHeight < 540 || window.innerWidth < 960) {
					game.scale.setExactFit();
					game.scale.refresh();
				}
			}
		}
	},

	assets: 'assets/',
	images: 'assets/images/',
	spriteSheets: 'assets/spritesheets/',
	audio: 'assets/audio/',
	font: 'assets/font'
};

//LudusSplash
Config.ludusSplash = {
	key: 'ludus-splash',
	dir: Config.images+'LudusSplash_960-540.png',
	x: 0,
	y: 0,
	alphaTime: 500,
	alphaWait: 1500,
	nextStateWait: 2000
};

//SponsorSplash
Config.sponsorSplash = {
	dir: Config.images+'/SponsorSplash_960-600.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//GameSplash
Config.gameSplash = {
	dir: {
		background: Config.images+'/GameSplash_960-600.png',
		bar: Config.images+'/ProgressBar_960-30.png',
		bg: Config.images+'/Splash_screen_bg_960-540.png',
	},
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000,
	text: {
		dir: Config.images+'/Loading_342_399.png',
		x: 387, 
		y: 390
	}
};

Config.story = {
	key: 'story_image',
	dir: Config.images+'story_screen-960_540.png',
	x: 0,
	y: 0,
	alphaTime: 500,
	alphaWait: 4000,
	nextStateWait: 4500,
	rayHelp: {
		ray: [],
		dir: Config.images+'/ray_help/ray_help_000'
	}
};


//Animation fall
Config.animationFall = {
	fallGif: [],
	dir: Config.images+'/gif_fall/giro_da_tela_000',
	xCameraFirstWorld: 2120,
	yCameraFirstWorld: 342.2,
	speedCamera: 10,
	xCamera: 1700
};

//Play
Config.game = {
	dirBg1: Config.images+'/BgForest01_3000-540.png',
	dirBg2: Config.images+'/BgForest02_3000-540.png',
	dirBg3: Config.images+'/BgForest03_3000-540.png',
	dirBg4: Config.images+'/BgCave01_3955-540.png',
	dirBg5: Config.images+'/Glow_3905-540.png',
	dirBg6: Config.images+'/bg_cave01-part2_2364-540.png',
	x: 0,
	y: 0,
	tilemap:{
		dir: Config.images+'/arcane_forest_level_01_map.json',
		x: 0,
		y: 0
	},
	tilemapRotate:{
		dir: Config.images+'/arcane_forest_level_01_rotate_map.json',
		x: 0,
		y: 0
	},
	tileset:{
		dir: Config.spriteSheets+'tileset_arcane_forest_1404-36.png'
	},
	player:{
		dir: Config.spriteSheets+'dude.png',
		items: [],
		width: 32,
		height: 48,
		//posicao depois das barras verticais
		x: 3146,
		y: 349,
		//posicao inicial
//		x: 70,
//		y: 1393,
		xRotate: 2334,
		yRotate: 385,
		lifes: 3,
		sword:{
			key: 'emmasword_spritesheet',
			dir: Config.spriteSheets + 'emma_sword_115_113_9.png',
			width: 115,
			height: 113,
		},
		nosword:{
			key: 'emma_spritesheet',
			dir: Config.spriteSheets + 'emma_nosword_72_101_8.png',
			width: 112,
			height: 113,
		},
		anchor: {
			x: 0.5,
			y: 0.5
		},
		collider: {
			emma: {
				key: "player_collider",
				dir: Config.images + 'emma_collider-36_93.png',
				offset: {
					right: {
						x: 25,
						y: -10,
					},
					left: {
						x: -25,
						y: -10,
					}
				},
			},
			sword: {
				key: "sword_collider",
				dir: Config.images + 'sword_collider-64_102.png',
				offset: {
					right: {
						x: 50,
						y: -5,
					},
					left: {
						x: -50,
						y: -5,
					}
				},
			}
		},
		anim: {
			stop: {
				key: 'player_stop',
				frames: [6],
				speed: 10,
				loop: false
			},
			walk: {
				key: 'player_walk',
				frames: [6, 2, 3, 4, 5],
				speed: 10,
				loop: true
			},
			jump: {
				key: 'player_jump',
				frames: [6, 0, 1],
				speed: 10,
				loop: false
			},
			attack: {
				key: 'player_attack',
				frames: [6, 7, 8],
				speed: 8,
				loop: false
			},
		},
		// walk no sword: 3 ~ 8
		// jump no sword: 3 - 1 - 2
		// walk sword: 7, 3, 4, 5, 6
		// jump sword: 7, 1, 2
		// attack: 7 ~ 9
		damageCooldown: 2000,
		attackCooldown: 400,
		alphaCooldown:400,
		gravityY: 2000,
		forceY: 1000,
		jumpForce: 800,
	},
	monstercat:{
		dir: Config.spriteSheets+'monstercat_40_18_3.png',
		width: 40,
		height: 18
	},
	bigbosjumping:{
		dir: Config.spriteSheets+'bigbosjumping_104_214_4_.png',
		width: 104,
		height: 214
	},
	bigbossattack:{
		dir: Config.spriteSheets+'bigbossattack_114_208_6_.png',
		width: 114,
		height: 208
	},
	bigbossattackfire:{
		dir: Config.spriteSheets+'bigbossattack_fire_50_42_4_.png',
		width: 50,
		height: 42
	},
	bluemonster:{
		dir: Config.spriteSheets+'bluemonster_62_50_3.png',
		width: 62,
		height: 50
	},
//	emmaattack:{
//		dir: Config.spriteSheets+'emmaattack_110_113_3.png',
//		width: 110,
//		height: 113
//	},
//	emmajumping:{
//		dir: Config.spriteSheets+'emmajumping_104_97_3.png',
//		width: 104,
//		height:97
//	},
//	emmarun:{
//		dir: Config.spriteSheets+'emmarun_104_104_5.png',
//		width: 104,
//		height:104
//	},
	greenmonster:{
		dir: Config.spriteSheets+'greenmonsterleft_76_62_5.png',
		width: 76,
		height:62
	},
	raybrother:{
		dir: Config.spriteSheets+'ray_49_56_2.png',
		width: 49,
		height:56
	},
	blue:{
		key:'blue',
		dir: Config.images+'/bluediamond_13-25.png'
	},
	red:{
		key:'red',
		dir: Config.images+'/reddiamond_13-25.png'
	},
	pink:{
		key:'pink',
		dir: Config.images+'/pinkdiamond_13-25.png'
	},
	key:{
		key:'key',
		dir: Config.images+'/keytopbar_13-25.png'
	},
	life:{
		full: {
			key: 'player_life',
			dir: Config.images + 'life_28-22.png'
		},
		empty: {
			key: 'player_nolife',
			dir: Config.images + 'emptylife_28-22.png'
		},
		x: 40,
		y: 8,
	},
	audio:{
		bg: {
			key: 'bgSound',
			dir: Config.audio + 'arcane_forest_soundtrack.mp3',
		},
		attack: {
			key: 'attackSound',
			dir: Config.audio + 'sword_attack.mp3',
		},
		gameOver: {
			key: 'gameOverSound',
			dir: Config.audio + 'game_over.mp3',
		},
	},
	bar:{
		dir: Config.images+'/horizontalbar_139-32.png',
		startX: 3770,
		startY: 3470,
		startRotateX: 1270,
		startRotateY: 444,
		widthAreaRotate: 1725,
		widthArea: 3650,
	},
	horizontalBar: {
		key: 'bar',
		dir: Config.images+'/horizontalbar_139-32.png',
		x: [3850, 4250],
		y: [1415, 1315],
		
	},
	verticalbar:{
		key: 'verticalBar',
		dir: Config.images+'/verticalbar_72-252.png',
		x: [3460, 3610, 3750, 3835],
		y: [91, 91, 91, 91],
		collider: {
			key: 'verticalBarCollider',
			dir: Config.images+'/verticalBarDieCollider-144_20.png',
			x: [3388, 3538, 3678, 3763],
			y: [490, 490, 490, 490],
		}
	},
	barRotate:{
		x: 1443, 
		y: 455
	},
	barRotate2:{
		x: 1693, 
		y: 415
	},
	transparentwall:{
		key: 'transparentwall',
		dir: Config.images+'/transparentwall_10-540.png',
		x: 0, 
		y: 800
	},
	gameRotate:{
		bg1y: 0,
		bg2x: 100,
		bg2y: 0,
		bg3x: 200,
		bg3y: 0,
		bg4x: 180,
		bg4y: 0
	}
};

//Menu
Config.menu = {
		dir: Config.images+'/Splash_screen_bg_960-540.png',
		x: 0,
		y: 0,
		buttonPlay: {
			dir: Config.images+'/Play_416_334.png',
			selector: Config.images+'/Play_selector_337_335.png',
			x: 415,
			y: 320
		},
		buttonCredits: {
			dir: Config.images+'/Credits_372_432.png',
			selector: Config.images+'/Credits_selector_293_431.png',
			x: 370,
			y: 430
		}
};

//HowToPlay
Config.howToPlay = {
	dir: Config.images+'/HowToPlay_960-600.png',
	x: 0,
	y: 0
};

//Credits
Config.credits = {
	dir: Config.images+'/Gamecredits_170_261.png',
	x: 0,
	y: 0
};

//GameOver
Config.gameOver = {
	dir: Config.images+'/game_over_960-540.png',
	tweet: Config.images+'/twitterPixel.png',
	facebook: Config.images+'/facebook.png',
	gplus: Config.images+'/gplus.png',
	x: 0,
	y: 0
}

//Victory
Config.Victory = {
	dir: Config.images+'/victory.png',
	x: 0,
	y: 0
}