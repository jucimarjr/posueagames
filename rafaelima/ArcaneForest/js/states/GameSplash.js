/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};

var progressBar;

State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('bg_splash_load',  Config.gameSplash.dir.bg);
		this.game.load.image('text_splash_load',   Config.gameSplash.dir.text);
		
	},
	create: function() {
		"use strict";
		
		this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'bg_splash_load');
		this.game.add.sprite(387, 390, 'text_splash_load');
		
		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.image('button-play', Config.menu.buttonPlay.dir);
		this.game.load.image('button-play-selector', Config.menu.buttonPlay.selector);
		this.game.load.image('button-credits', Config.menu.buttonCredits.dir);
		this.game.load.image('button-credits-selector', Config.menu.buttonCredits.selector);
		
		//Game
		this.game.load.image('bg1', Config.game.dirBg1);
		this.game.load.image('bg2', Config.game.dirBg2);
		this.game.load.image('bg3', Config.game.dirBg3);
		this.game.load.image('bg4', Config.game.dirBg4);
		this.game.load.image('bg5', Config.game.dirBg5);
		this.game.load.image('bar', Config.game.bar.dir);
		this.game.load.tilemap('stage', Config.game.tilemap.dir, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('stageRotate', Config.game.tilemapRotate.dir, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tileset', Config.game.tileset.dir);
		this.game.load.spritesheet('dude', Config.game.player.dir , 32, 48);
		this.game.load.spritesheet('monstercat', 'assets/spritesheets/monstercat_38_18_3.png', 38, 18);
		this.game.load.spritesheet('bigbosjumping', 'assets/spritesheets/bigbosjumping_104_214_4_.png', 104, 214);
		this.game.load.spritesheet('bigbosjumping', 'assets/spritesheets/bigbosjumping_114_208_6_.png', 114, 208);
		this.game.load.spritesheet('bigbossattackcompose', 'assets/spritesheets/bigbossattack_compose_270_208_6_.png', 270, 208);
		this.game.load.spritesheet('bigbossattackfire', 'assets/spritesheets/bigbossattack_fire_50_42_4_.png', 50, 42);
		this.game.load.spritesheet('bluemonster', 'assets/spritesheets/bluemonster_60_50_3.png', 60, 50);
		this.game.load.spritesheet('emmaattack', 'assets/spritesheets/emmaattack_110_113_3.png', 110, 113);
		this.game.load.spritesheet('emmajumping', 'assets/spritesheets/emmajumping_104_97_3.png', 104, 97);
		this.game.load.spritesheet('emmarun', 'assets/spritesheets/emmarun_104_104_5.png', 104, 104);
		this.game.load.spritesheet('greenmonsterleft', 'assets/spritesheets/greenmonsterleft_74_62_5.png', 74, 62);
		this.game.load.spritesheet('greenmonsterright', 'assets/spritesheets/greenmonsterright_74_62_5.png', 74, 62);
		this.game.load.spritesheet('greenmonsterright', 'assets/spritesheets/ray_47_56_2.png', 47, 52);
		this.game.load.image('blue', 'assets/images/bluediamond_13-25.png');
		this.game.load.image('red', 'assets/images/reddiamond_13-25.png');
		this.game.load.image('pink', 'assets/images/pinkdiamond_13-25.png');
		this.game.load.image('key', 'assets/images/keytopbar_13-25.png');
		this.game.load.image('life', 'assets/images/life_28-22.png');
		this.game.load.image('nolife', 'assets/images/emptylife_28-22.png');

		//gif fall
        for (var i = 0; i < 30; i++) {
            var zeros = "";
            if (i < 10){
                zeros = "0";
            }
            var name = Config.animationFall.dir + zeros + i;
            this.game.load.spritesheet(name, name + ".png", 0, 0);
            Config.animationFall.fallGif[i] = name;
        }
		
		//Credits
		this.game.load.image('credits', Config.credits.dir);
		
		//HowToPlay
//		this.game.load.image('how-to-play', Config.howToPlay.dir);
		
		this.game.load.onLoadComplete.add(this.loadComplete, this);
		this.game.load.start();
		
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	loadComplete: function() {
		game.state.start('Menu');
	}
};