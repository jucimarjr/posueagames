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
		this.game.load.image('text_splash_load',   Config.gameSplash.text.dir);
	},
	create: function() {
		"use strict";
		
		this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'bg_splash_load');
		this.game.add.sprite(Config.gameSplash.text.y, Config.gameSplash.text.y, 'text_splash_load');
		
		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.image('button-play', Config.menu.buttonPlay.dir);
		this.game.load.image('button-play-selector', Config.menu.buttonPlay.selector);
		this.game.load.image('button-credits', Config.menu.buttonCredits.dir);
		this.game.load.image('button-credits-selector', Config.menu.buttonCredits.selector);
		
		// STORY
		this.game.load.image(Config.story.key, Config.story.dir);
		
		//Game
		game.load.audio(Config.game.audio.bg.key, Config.game.audio.bg.dir);
		game.load.audio(Config.game.audio.attack.key, Config.game.audio.attack.dir);
		
		this.game.load.image('bg1', Config.game.dirBg1);
		this.game.load.image('bg2', Config.game.dirBg2);
		this.game.load.image('bg3', Config.game.dirBg3);
		this.game.load.image('bg4', Config.game.dirBg4);
		this.game.load.image('bg5', Config.game.dirBg5);
		this.game.load.image('bg6', Config.game.dirBg6);
		
		this.game.load.image('bar', Config.game.bar.dir);
		
		this.game.load.tilemap('stage', Config.game.tilemap.dir, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('stageRotate', Config.game.tilemapRotate.dir, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tileset', Config.game.tileset.dir);
		this.game.load.spritesheet('dude', Config.game.player.dir , Config.game.player.width, Config.game.player.height);
		this.game.load.spritesheet('monstercat', Config.game.monstercat.dir,  Config.game.monstercat.width, Config.game.monstercat.height);
		this.game.load.spritesheet('bigbosjumping', Config.game.bigbosjumping.dir, Config.game.bigbosjumping.width, Config.game.bigbosjumping.height);
		this.game.load.spritesheet('bigbossattack', Config.game.bigbossattack.dir, Config.game.bigbossattack.width, Config.game.bigbossattack.height);
		this.game.load.spritesheet('bigbossattackfire', Config.game.bigbossattackfire.dir, Config.game.bigbossattackfire.width, Config.game.bigbossattackfire.height);
		this.game.load.spritesheet('bluemonster', Config.game.bluemonster.dir, Config.game.bluemonster.width, Config.game.bluemonster.height);
//		this.game.load.spritesheet('emmaattack', Config.game.emmaattack.dir, Config.game.emmaattack.width, Config.game.emmaattack.height);
//		this.game.load.spritesheet('emmajumping', Config.game.emmajumping.dir, Config.game.emmajumping.width, Config.game.emmajumping.height);
//		this.game.load.spritesheet('emmarun', Config.game.emmarun.dir, Config.game.emmarun.width, Config.game.emmarun.height);
		this.game.load.spritesheet('greenmonster', Config.game.greenmonster.dir, Config.game.greenmonster.width, Config.game.greenmonster.height);
		this.game.load.spritesheet('raybrother', Config.game.raybrother.dir, Config.game.raybrother.width, Config.game.raybrother.height);
		this.game.load.image('blue', Config.game.blue.dir);
		this.game.load.image('red', Config.game.red.dir);
		this.game.load.image('pink', Config.game.pink.dir);
		this.game.load.image('key', Config.game.key.dir);
		this.game.load.image(Config.game.verticalbar.key, Config.game.verticalbar.dir);
		this.game.load.image(Config.game.verticalbar.collider.key, Config.game.verticalbar.collider.dir);
		this.game.load.image('transparentwall', Config.game.transparentwall.dir);
		this.game.load.image('magic', 'assets/images/magic3.png');
		this.game.load.image('darkmask', 'assets/images/darkmask_480-135.png');
		
		// lifes
		this.game.load.image(Config.game.life.full.key, Config.game.life.full.dir);
		this.game.load.image(Config.game.life.empty.key, Config.game.life.empty.dir);
		
		// PLAYER
		this.game.load.spritesheet(Config.game.player.sword.key, Config.game.player.sword.dir, Config.game.player.sword.width, Config.game.player.sword.height);
		this.game.load.image(Config.game.player.collider.emma.key, Config.game.player.collider.emma.dir);
		this.game.load.image(Config.game.player.collider.sword.key, Config.game.player.collider.sword.dir);
		
		
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
        
      //gif ray help
        for (var i = 8; i < 77; i++) {
            var zeros = "";
            if (i < 10){
                zeros = "0";
            }
            var name = Config.story.rayHelp.dir + zeros + i;
            this.game.load.spritesheet(name, name + ".png", 0, 0);
            Config.story.rayHelp.ray[i-8] = name;
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