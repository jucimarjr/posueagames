/*global Phaser*/

//Global
var Config = {
	global: {
		debug: false,
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
		background: 'assets/images/GameSplash_960-600.jpg',
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
		dir: 'assets/spritesheets/buttonjogar_928_98.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.5,
		width: 230,
		height: 98,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/buttoncomojogar_928_98.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.7,
		width: 230,
		height: 98,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/buttoncredito_928_98.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.9,
		width: 230,
		height: 98,
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

// Game

Config.game = {

	gravity: 800

}

// River

Config.river = {

	x: 0,
	y: 525,

	sprite: {
		src: 'assets/spritesheets/river.png', 
		width: 960,
		height: 75
	}
};

// Player

Config.player = {

	x: 260,
	y: 600,

	sprite: {
		src: 'assets/spritesheets/curumim.png', 
		width: 60,
		height: 75
	},

	keys: {
		left: Phaser.Keyboard.LEFT, 
		right: Phaser.Keyboard.RIGHT,
		jump: Phaser.Keyboard.UP,
		run: Phaser.Keyboard.CONTROL,
		fire: Phaser.Keyboard.SPACEBAR 
	},

	velocity: {
		walk: 200,
		walk_fps: 15,
		run: 400,
		run_fps: 20
	},

	jump: {
		max: 2,
		walking_force: -450,
		running_force: -550
	}
};

// Bullet

Config.bullet = {
	src: 'assets/spritesheets/bullet.png',
	number: 5,
	velocity: {
		x: 450,
		y: -200
	},
	acceleration: 100,
	interval: 200
};

// Score

Config.score = {

	lifes : {
		img : {
			x : 10,
			y : 5
		},

		txt : {
			x : 70,
			y : 10,
			style : { font: "35px Bored Fjord", fill: "yellow", align: "center" },
			styleBig : { font: "40px Bored Fjord", fill: "orange", align: "center" }
		}
	},

	points : {
		img : {
			x : 300,
			y : 5
		},

		txt : {
			x : 360,
			y : 10,
			style : { font: "35px Bored Fjord", fill: "yellow", align: "center" },
			styleBig : { font: "40px Bored Fjord", fill: "orange", align: "center" }
		}
	},

	bullets : {
		img : {
			x : 600,
			y : 5
		},

		txt : {
			x : 660,
			y : 10,
			style : { font: "35px Bored Fjord", fill: "yellow", align: "center" },
			styleBig : { font: "40px Bored Fjord", fill: "orange", align: "center" }
		}
	}
};

// Fruits

Config.fruit = {	

	small : {
		src: 'assets/spritesheets/fruits.png',
		width: 30,
		height: 30
	},

	big : {
		src: 'assets/spritesheets/fruitsBig.png',
		width: 60,
		height: 60
	},

	life : {
		gid: 3,
		frame :	1
	},

	energy : {
		gid: 2,
		frame: 0
	},

	bullet : {
		gid : 5,
		frame : 3
	},
	point : {
		gid : 4,
		frame : 2
	}
};

// Ounce

Config.ounce = {

	gid : 18,

	sprite : {
		src : 'assets/spritesheets/ounce.png',
		width : 211,
		height: 97
	},

	tail : {
		src: 'assets/images/ounce_tail.png'
	},

	dizzy : {
		src : 'assets/spritesheets/ounce_dizzy.png',
		width : 127,
		height: 127
	}
};

// Ant

Config.ant = {
	gid: 6,
	sprite : {
		src : 'assets/spritesheets/ant.png',
		width : 72,
		height: 48
	}
};


// Arara

Config.arara = {
	blue : {
		gid: 13,
		sprite : {
			src : 'assets/spritesheets/arara_azul.png',
			width : 100,
			height: 78
		}
	}
};

// Insaninho

Config.insaninho = {
	gid: 23,
	sprite : {
		src : 'assets/spritesheets/insaninho.png',
		width : 67,
		height: 69
	}
};