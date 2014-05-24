Player = function() {
	this.sprite;
	this.audioVoar;
}

Player.prototype = {
	preload : function() {
		console.log('player -> preload');
		game.load
				.spritesheet('player', 'assets/player_110-134-4.png', 110, 130);
		game.load.audio('audioVoar', 'assets/jump.mp3');
	},

	create : function(audioMenu) {
		this.sprite = game.add.sprite(60, 100, 'player');
		this.sprite.animations.add('walk', [ 0, 1 ], 2, true);
		this.sprite.animations.add('jump', [ 2 ], 2, true);
		// physics
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.acceleration.y = 2000;
		this.sprite.body.gravity.y = 400;
		this.sprite.body.collideWorldBounds = true;

		// Audio
		this.audioVoar = game.add.audio('audioVoar');
	},
	
	update : function() {

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
				&& (this.sprite.body.touching.down || this.sprite.body.velocity.y > 100)) {
			this.sprite.body.velocity.y = -1000;
			this.audioVoar.play();
		}

		if (this.sprite.body.touching.down) {
			game.add.tween(this.sprite).to({
				angle : 0
			}, 100).start();
			this.sprite.animations.play('walk');
		} else {
			game.add.tween(this.sprite).to({
				angle : -10
			}, 100).start();
			this.sprite.animations.play('jump');
		}
	}

}
