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
		dir: 'assets/spritesheets/buttons/Play_350-120.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.4,
		width: 350,
		height: 120,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/buttons/HowToPlay_350-120.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.6,
		width: 350,
		height: 120,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/buttons/Creditis_350-120.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.8,
		width: 350,
		height: 120,
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

Config.audio = {
	menu: 'assets/audio/menu.mp3',
	phase1: 'assets/audio/phase1.mp3',
	phase2: 'assets/audio/phase2.mp3',
	jump: 'assets/audio/jump.mp3',
	die: 'assets/audio/die.mp3'
};

Config.player = {
	velocity:{
		run: 150,
		jump: 550,
		climbing: 100,
		down: 4
	}
};

Config.climbing = {
	frames: {
		min: 20,
		max: 23
	}
};

Config.levelId = {
	level: 1
};

Config.finalPhase = {
	lightRadius: 150,
	id: 7
};

Config.levelConfig = {
	player:{
		posX: 0,
		posY: 0
	},
	branches:{
		exists: true
	},
	bushes:{
		id: 0
	},
	waters:{
		id: 0
	},
	bees:{
		id: 0
	},
	tubes:{
		id: 0
	},
	thorns:{
		id: 0
	},
	coin:{
		id: 0,
		image: 'coin'
	},
	checkPoint:{
		id: 0,
		x: 0,
		y: 0
	},
	cipo:{
		id:0
	},
	flag:{
		id:0
	},
	cannons:{
		id:0
	},
	dardos:{
		id:0
	}
};

Config.update = {
	updateLevel: function(x,y,branchesE,bushId,watersId,beesId,tubesId,thornsId,coinId,coinImage,ccpId,cipoId,flagId,cannonsId,dardosId){
		Config.levelConfig.player.posX = x;
		Config.levelConfig.player.posY = y;
		Config.levelConfig.branches.exists = branchesE;
		Config.levelConfig.bushes.id = bushId;
		Config.levelConfig.waters.id = watersId;
		Config.levelConfig.bees.id = beesId;
		Config.levelConfig.tubes.id = tubesId;
		Config.levelConfig.thorns.id = thornsId;		
		Config.levelConfig.coin.id = coinId;		
		Config.levelConfig.coin.image = coinImage;
		Config.levelConfig.checkPoint.id = ccpId;
		Config.levelConfig.cipo.id = cipoId;
		Config.levelConfig.flag.id = flagId;
		Config.levelConfig.cannons.id = cannonsId;
		Config.levelConfig.dardos.id = dardosId;
	}
}

Config.level = {
	getLevel: function(level){
		//x,y,branches-exists,bush-id,waters-id,bees-id,tubes-id,thorns-id,coin-id,coin-image,checkPoint-Id,cipo-id,win-id,cannon-id,dardo-id
		if(level == 1)
			Config.update.updateLevel(75, 150, false, 13, 0, 0, 0, 18, 19, 'coin', 0,0,27,0,0);
		else if(level == 2)
		    Config.update.updateLevel(65, 600, true, 13, 0, 18, 0, 22, 23, 'coinIara', 31,0,35,0,0);
		else if(level == 3)
		    Config.update.updateLevel(65, 600, true, 13, 18, 19, 23, 24, 25, 'coin', 33,0,37,0,0);
		else if (level == 4)
		    Config.update.updateLevel(75, 650, true, 13, 18, 19, 23, 24, 25, 'coinIara', 33,0,37,0,0);
		else if (level == 5)
		    Config.update.updateLevel(75, 2050, true, 13, 18, 19, 23, 24, 25, 'coin', 33, 0, 37,0,0);
		else if (level == 6)
		    Config.update.updateLevel(2400, 400, true, 13, 18, 19, 23, 24, 25, 'coin', 42, 33, 34,0,0);
		else if (level == 7)
		    Config.update.updateLevel(75, 1100, false, 16, 0, 0, 0, 19, 0, 'coin', 0, 20, 0,21,22);
		/*else if (level == 9)
		    Config.update.updateLevel(2000, 2000, true, 0, 19, 0, 20, 0, 0, 'coin', 0, 18,0,0,0);*/

		return Config.levelConfig;
	}
};

