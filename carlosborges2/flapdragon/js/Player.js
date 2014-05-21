Player = function(game) {
	this.game = game;
	this.sprite;
	this.audioVoar;
}

Player.prototype = {
	preload : function() {
		console.log('player -> preload');
		this.game.load.spritesheet('player', 'assets/goku_45-62.png',45, 62);
		game.load.audio('audioVoar', 'assets/jump.mp3');
	},

	create : function() {
		this.sprite = this.game.add.sprite(60, 100, 'player');
		this.sprite.animations.add('walk', [ 0, 1 ], 2, true);
		this.sprite.animations.add('jump', [ 2 ], 2, true);
		// physics
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.acceleration.y = 3000;
		this.sprite.body.gravity.y = 1000;

		// Audio
		this.audioVoar = game.add.audio('audioVoar');
	},

	update : function() {
		this.game.physics.arcade.collide(this.sprite, level.ground);
		this.game.physics.arcade.collide(this.sprite, enemies.enemies);

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.sprite.body.velocity.y = -500;
			this.sprite.body.velocity.x = 10;
			this.audioVoar.play();
		}

		if (this.sprite.body.touching.down) {
			this.game.add.tween(this.sprite).to({
				angle : 10
			}, 100).start();
			this.sprite.animations.play('walk');
		} else {
			this.game.add.tween(this.sprite).to({
				angle : -10
			}, 100).start();
			this.sprite.animations.play('jump');
		}
	}
}