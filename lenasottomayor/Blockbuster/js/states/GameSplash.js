/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		
		var sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		var progressBar = this.game.add.sprite(0, 500, 'progress-bar');
		this.game.load.setPreloadSprite(progressBar);
		this.game.load.onLoadComplete.add(this.nextState, this);
		this.loadAssets();
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	nextState: function () {
		"use strict";
		setTimeout(
			function () {
				this.game.state.start('Menu');
			}, 
			Config.gameSplash.nextState
		);
	},
	loadAssets: function () {
		
		//Credits
		this.game.load.image('credits', Config.credits.dir);
		
		//HowToPlay
		this.game.load.image('how-to-play', Config.howToPlay.dir);
		
		//Story
		this.game.load.image('story', Config.story.dir);
		
		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);

		//TileMap
		this.load.tilemap('fase01', Config.tilemap.fase01.dir, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', Config.tilemap.tiles.tileset.dir);
		this.game.load.image('coin', Config.tilemap.tiles.coins.dir);
		this.game.load.image('powerlife', Config.tilemap.tiles.powerlifes.dir);
		this.game.load.image('powerstar', Config.tilemap.tiles.powerstars.dir);
		this.game.load.image('thorn', Config.tilemap.tiles.thorn.dir);
		
		//Player
		this.game.load.spritesheet('oscar', Config.player.dir, Config.player.width, Config.player.height);
		
		//Enemies
		this.game.load.spritesheet('cruella', Config.enemy.cruella.dir,  Config.enemy.cruella.width,  Config.enemy.cruella.height, Config.enemy.cruella.frames);
		this.game.load.spritesheet('freddy', Config.enemy.freddy.dir,  Config.enemy.freddy.width,  Config.enemy.freddy.height, Config.enemy.freddy.frames);
		this.game.load.spritesheet('hannibal', Config.enemy.hannibal.dir,  Config.enemy.hannibal.width,  Config.enemy.hannibal.height, Config.enemy.hannibal.frames);
		this.game.load.spritesheet('jason', Config.enemy.jason.dir,  Config.enemy.jason.width,  Config.enemy.jason.height, Config.enemy.jason.frames);
		this.game.load.spritesheet('joker', Config.enemy.joker.dir,  Config.enemy.joker.width,  Config.enemy.joker.height, Config.enemy.joker.frames);
		this.game.load.spritesheet('vader', Config.enemy.vader.dir,  Config.enemy.vader.width,  Config.enemy.vader.height, Config.enemy.vader.frames);
		
		//Background
		this.game.load.image('game-background', Config.background.game.dir);

		//Game Over
		this.game.load.image('game-over', Config.gameOver.dir);
		
		//Game Win
		this.game.load.image('game-win', Config.gameWin.dir);
		
		//Fonts
		this.game.load.bitmapFont('font-coins', Config.fonts.coins.image, Config.fonts.coins.dir);
		this.game.load.bitmapFont('font-life', Config.fonts.life.image, Config.fonts.life.dir);
		this.game.load.bitmapFont('font-score', Config.fonts.score.image, Config.fonts.score.dir);
		
		//Icons
		this.game.load.image('icon-coins', Config.icon.coin);
		this.game.load.image('icon-life', Config.icon.life);
		
		//Audio
		this.game.load.audio('music', 'assets/audios/xycexyceBaby.mp3');
		this.game.load.audio('jumpSound', 'assets/audios/jump.wav');
		this.game.load.audio('coinSound', 'assets/audios/coin.wav');
		this.game.load.audio('hurtSound', 'assets/audios/hurt.wav');
		this.game.load.audio('powerupSound', 'assets/audios/powerup.wav');
		
	}
};