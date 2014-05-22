Player = function(/*game*/) {
//	this.game = game;
	this.sprite;
	this.audioVoar;
};

Player.prototype = {
	preload : function() {
		
		console.log('player -> preload');
		
		game.load.spritesheet('player', 'assets/goku_45-62.png', 45, 62);
		//game.load.audio('audioVoar', 'assets/sound/jump.mp3');
	},

	create : function() {
		this.sprite = game.add.sprite(60, 100, 'player');
		this.sprite.animations.add('walk', [ 0, 1 ], 2, true);
		this.sprite.animations.add('jump', [ 2 ], 2, true);
		// physics
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.acceleration.y = 3000;
		this.sprite.body.gravity.y = 1000;

		// Audio
		this.audioVoar = game.add.audio('audioVoar');
	},

	update : function() {
		game.physics.arcade.collide(this.sprite, level.ground);
		game.physics.arcade.collide(this.sprite, enemies.enemies);

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.sprite.body.velocity.y = -500;
			this.sprite.body.velocity.x = 10;
			this.audioVoar.play();
		}

		if (this.sprite.body.touching.down) {
			game.add.tween(this.sprite).to({
				angle : 10
			}, 100).start();
			this.sprite.animations.play('walk');
		} else {
			game.add.tween(this.sprite).to({
				angle : -10
			}, 100).start();
			this.sprite.animations.play('jump');
		}
	}
};