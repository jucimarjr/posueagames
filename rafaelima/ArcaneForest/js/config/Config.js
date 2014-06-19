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
	spriteSheets: 'assets/spritesheets/'
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
		bar: 'assets/images/ProgressBar_960-30.png',
		bg: 'assets/images/Splash_screen_bg_960-540.png',
	},
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000,
	text: {
		dir: 'assets/images/Loading_342_399.png',
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
	alphaWait: 4500,
	nextStateWait: 1000
};


//Animation fall
Config.animationFall = {
	fallGif: [],
	dir: 'assets/images/gif_fall/screen_rotate_000'
};

//Play
Config.game = {
	dirBg1: 'assets/images/BgForest01_3000-540.png',
	dirBg2: 'assets/images/BgForest02_3000-540.png',
	dirBg3: 'assets/images/BgForest03_3000-540.png',
	dirBg4: 'assets/images/BgCave01_3955-540.png',
	dirBg5: 'assets/images/Glow_3905-540.png',
	dirBg6: 'assets/images/bg_cave01-part2_2364-540.png',
	x: 0,
	y: 0,
	tilemap:{
		dir: 'assets/images/arcane_forest_level_01_map.json',
		x: 0,
		y: 0
	},
	tilemapRotate:{
		dir: 'assets/images/arcane_forest_level_01_rotate_map.json',
		x: 0,
		y: 0
	},
	tileset:{
		dir: 'assets/spritesheets/tileset_arcane_forest_1404-36.png'
	},
	player:{
		dir: 'assets/spritesheets/dude.png',
		items: [],
		width: 32,
		height: 48,
		x: 3500,
		y: 1393,
		xRotate: 2346,
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
				frames: [0, 1, 2, 3, 4, 5],
				speed: 10,
				loop: true
			},
			jump: {
				key: 'player_jump',
				frames: [4, 5],
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
		damageCooldown: 2000,
		attackCooldown: 200,
		gravityY: 2000,
		forceY: 1000,
		jumpForce: 800,
	},
	monstercat:{
		dir: 'assets/spritesheets/monstercat_40_18_3.png',
		width: 40,
		height: 18
	},
	bigbosjumping:{
		dir: 'assets/spritesheets/bigbosjumping_104_214_4_.png',
		width: 104,
		height: 214
	},
	bigbossattack:{
		dir: 'assets/spritesheets/bigbossattack_114_208_6_.png',
		width: 114,
		height: 208
	},
	bigbossattackfire:{
		dir: 'assets/spritesheets/bigbossattack_fire_50_42_4_.png',
		width: 50,
		height: 42
	},
	bluemonster:{
		dir: 'assets/spritesheets/bluemonster_62_50_3.png',
		width: 62,
		height: 50
	},
	emmaattack:{
		dir: 'assets/spritesheets/emmaattack_110_113_3.png',
		width: 110,
		height: 113
	},
	emmajumping:{
		dir: 'assets/spritesheets/emmajumping_104_97_3.png',
		width: 104,
		height:97
	},
	emmarun:{
		dir: 'assets/spritesheets/emmarun_104_104_5.png',
		width: 104,
		height:104
	},
	greenmonster:{
		dir: 'assets/spritesheets/greenmonsterleft_76_62_5.png',
		width: 76,
		height:62
	},
	raybrother:{
		dir: 'assets/spritesheets/ray_49_56_2.png',
		width: 49,
		height:56
	},
	blue:{
		dir: 'assets/images/bluediamond_13-25.png'
	},
	red:{
		dir: 'assets/images/reddiamond_13-25.png'
	},
	pink:{
		dir: 'assets/images/pinkdiamond_13-25.png'
	},
	key:{
		dir: 'assets/images/keytopbar_13-25.png'
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
		dir: 'assets/audio/arcane_forest_soundtrack.mp3'
	},
	bar:{
		dir: 'assets/images/horizontalbar_139-32.png',
		startX: 3770,
		startY: 3470,
		startRotateX: 1270,
		startRotateY: 444,
		widthAreaRotate: 1725,
		widthArea: 3650,
	},
	verticalbar:{
		dir: 'assets/images/verticalbar_72-252.png',
	},
	barRotate:{
		x: 1793, 
		y: 500
	},
	transparentwall:{
		dir: 'assets/images/transparentwall_10-540.png',
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
		dir: 'assets/images/Splash_screen_bg_960-540.png',
		x: 0,
		y: 0,
		buttonPlay: {
			dir: 'assets/images/Play_416_334.png',
			selector: 'assets/images/Play_selector_337_335.png',
			x: 415,
			y: 320
		},
		buttonCredits: {
			dir: 'assets/images/Credits_372_432.png',
			selector: 'assets/images/Credits_selector_293_431.png',
			x: 370,
			y: 430
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
	dir: 'assets/images/Gamecredits_170_261.png',
	x: 0,
	y: 0
};