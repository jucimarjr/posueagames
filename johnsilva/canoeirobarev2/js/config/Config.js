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
	}
};

Config.update = {
	updateLevel: function(x,y,branchesE,bushId,watersId,beesId,tubesId,thornsId,coinId,coinImage){
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
	}
}

Config.level = {
	getLevel: function(level){
		//x,y,branches-exists,bush-id,waters-id,bees-id,tubes-id,thorns-id,cois-id
		if(level == 1)
			Config.update.updateLevel(75, 150, false, 13, 0, 0, 0, 18, 19, 'coin');
		else if(level == 3)
			Config.update.updateLevel(75, 650, true, 13, 12, 9, 11, 0, 0, 'coinIara');
		return Config.levelConfig;
	}
};

