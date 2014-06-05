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
	waters:{
		exists: true,
		id: 12
	},
	bees:{
		exists: true,
		id: 9
	},
	tubes:{
		exists: true,
		id: 11
	},
	thorns:{
		exists: true,
		id: 0
	}
};

Config.update = {
	updateLevel: function(x,y,branchesE,watersE,watersId,beesE,beesId,tubesE,tubesId,thornsE,thornsId){
		Config.levelConfig.player.posX = x;
		Config.levelConfig.player.posY = y;

		Config.levelConfig.branches = branchesE;

		Config.levelConfig.waters.exists = watersE;
		Config.levelConfig.waters.id = watersId;

		Config.levelConfig.bees.exists = beesE;
		Config.levelConfig.bees.id = beesId;

		Config.levelConfig.tubes.exists = tubesE;
		Config.levelConfig.tubes.id = tubesId;

		Config.levelConfig.thorns.exists = thornsE;
		Config.levelConfig.thorns.id = thornsId;
	}
}

Config.level = {
	getLevel: function(level){
		//x,y,branches-exists,waters-exists,waters-id, bees-exists,bees-id,tubes-exists,tubes-id,thorns-exists,thorns-id 
		if(level == 1)
			Config.update.updateLevel(75, 150, false, false, 0, false, 0, false, 0, true, 9);
		else if(level == 3)
			Config.update.updateLevel(75, 650, true, true, 12, true, 9, true, 11, false, 0);
		return Config.levelConfig;
	}
};

