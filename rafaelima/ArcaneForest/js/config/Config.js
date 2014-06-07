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
		bar: 'assets/images/ProgressBar_960-30.png',
		bg: 'assets/images/Splash_screen_bg_960-540.png',
		text: 'assets/images/Loading_342_399.png'
	},
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
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
		dir: 'assets/spritesheets/dude.png'
	},
	bar:{
		dir: 'assets/images/bar.png',
		startX: 3770,
		startY: 3470,
		startRotateX: 1270,
		startRotateY: 444,
		widthAreaRotate: 1725,
		widthArea: 3650,
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
	dir: 'assets/images/Credits_960-600.png',
	x: 0,
	y: 0
};