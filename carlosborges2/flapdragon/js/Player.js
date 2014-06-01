
var IMAGE_PLAYER = PATH_ASSETS + 'goku_81-102-2.png';
var ANIME_PLAYER_FLY = 'ANIME_PLAYER_FLY';

var SOUND_CLOUD = PATH_SOUND + 'nimbus_dive.wav';

//var COLLIDE_PLAYER = PATH_ASSETS + 'boo_collider.json';


Player = function(/*game*/) {
//	this.game = game;
//	this.sprite;
	this.player;
	this.audioVoar;
	
	this.spaceIsUped = true;
	
	this.playerYAcceleration = 700;
	this.playerYGravity = 1000;
	this.playerYJump = -500;
	
	this.playerYStart = 300;
};

Player.prototype = {
	preload : function() {
		
		console.log('player -> preload');
		
		game.load.spritesheet(IMAGE_PLAYER, IMAGE_PLAYER, 81, 102);
		
		game.load.audio(SOUND_CLOUD, SOUND_CLOUD);
	},

	create : function() {
		
		this.player = game.add.sprite(100, this.playerYStart, IMAGE_PLAYER);
		this.player.anchor.setTo(0.5, 0.5);
		
		// physics
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.collideWorldBounds = false;
		
		this.player.animations.add(ANIME_PLAYER_FLY, [0, 1], 8, true);
		this.player.animations.play(ANIME_PLAYER_FLY);
		
		
		// Audio
		this.soundCloud = game.add.audio(SOUND_CLOUD);
		
		
	},

	
	updatePlayStation: function() {
		
		game.physics.arcade.collide(this.player, level.groundCoolide, this.explode, null, this);
		game.physics.arcade.overlap(this.player, enemies.enemies, this.explode, null, this);

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.spaceIsUped && this.player.body.y > 0) {
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
	},
	
	updateGameOverState: function() {
		
		game.physics.arcade.collide(this.player, level.groundCoolide);
		
		game.add.tween(this.player).to({
			angle : 90
		}, 100).start();
		
	},
	
	updatePauseState: function() {
		
	},
	
	initGravity: function() {
		this.player.body.acceleration.y = this.playerYAcceleration;
		this.player.body.gravity.y = this.playerYGravity;
	},
	
	explode: function () {
		
		gamePlayState = GAME_OVER_TRANSITION_STATE;
		
		this.player.animations.stop(ANIME_PLAYER_FLY);
		
//		enemies.enemies.removeAll();
		
//		this.player.reset(60, 100);
//		this.player.body.acceleration.y = this.playerYAcceleration;
//		this.player.body.gravity.y = this.playerYGravity;
//		score = 0;
	}
};