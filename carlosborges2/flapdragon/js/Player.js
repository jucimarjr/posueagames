
var IMAGE_PLAYER = PATH_ASSETS + 'goku_62-62.png';
var IMAGE_PLAYER = PATH_ASSETS + 'goku2_62-62.png';

var ANIME_PLAYER_UP = 'ANIME_PLAYER_UP';
var ANIME_PLAYER_DOWN = 'ANIME_PLAYER_DOWN';

var SOUND_CLOUD = PATH_SOUND + 'nimbus_dive.wav';

Player = function(/*game*/) {
//	this.game = game;
//	this.sprite;
	this.player;
	this.audioVoar;
	
	this.spaceIsUped = true;
	
	this.playerYAcceleration = 700;
	this.playerYGravity = 1000;
	this.playerYJump = -500;
};

Player.prototype = {
	preload : function() {
		
		console.log('player -> preload');
		
		game.load.spritesheet(IMAGE_PLAYER, IMAGE_PLAYER, 62, 62);
		//game.load.audio('audioVoar', 'assets/sound/jump.mp3');
		
		game.load.audio(SOUND_CLOUD, SOUND_CLOUD);
	},

	create : function() {
		
		this.player = game.add.sprite(60, 100, IMAGE_PLAYER);
		
//		this.player.animations.add(ANIME_PLAYER_UP, [ 0, 1 ], 2, true);
//		this.player.animations.add(ANIME_PLAYER_DOWN, [ 2 ], 2, true);
		// physics
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.acceleration.y = this.playerYAcceleration;
		this.player.body.gravity.y = this.playerYGravity;
		this.player.body.collideWorldBounds = true;
		// Audio
//		this.audioVoar = game.add.audio('audioVoar');
		
		this.soundCloud = game.add.audio(SOUND_CLOUD);
	},

	update : function() {
		game.physics.arcade.collide(this.player, level.ground);
		game.physics.arcade.collide(this.player, enemies.enemies,this.explode,null, this);

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.spaceIsUped) {
			
			this.spaceIsUped = false;
			
			this.player.body.velocity.y = this.playerYJump;
			
			this.soundCloud.play();
		}
		
		// to player not hold space jump bar
		if(game.input.keyboard.justReleased(Phaser.Keyboard.SPACEBAR, 100) ) {
			this.spaceIsUped = true;
		}
		
		
		if(this.player.body.velocity.y < 0) {
			game.add.tween(this.player).to({
				angle : -15
			}, 100).start();
		}
		else {
			game.add.tween(this.player).to({
				angle : 15
			}, 100).start();
		}
		
//		if (this.player.body.touching.down) {
//			game.add.tween(this.player).to({
//				angle : 10
//			}, 100).start();
//			this.player.animations.play(ANIME_PLAYER_UP);
//		} else {
//			game.add.tween(this.player).to({
//				angle : -10
//			}, 100).start();
//			this.player.animations.play(ANIME_PLAYER_DOWN);
//		}
	},
	
	explode: function () {
		enemies.enemies.removeAll();
		this.player.reset(60, 100);
		
		this.player.body.acceleration.y = this.playerYAcceleration;
		this.player.body.gravity.y = this.playerYGravity;
	}
};