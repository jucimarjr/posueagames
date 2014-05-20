Player = function(game) {
	this.game = game;
	this.sprite;
	this.audioVoar;
}

Player.prototype = {
	preload : function() {
		console.log('player -> preload');
		this.game.load.spritesheet('player', 'assets/player_125-80-3.png', 125,80);
		game.load.audio('audioVoar', 'assets/laser_jump.wav');
	},

	create : function() {
		this.sprite = this.game.add.sprite(60, 100, 'player');
		this.sprite.animations.add('floating', [ 0, 1, 2 ], 2, true);
		this.sprite.animations.play('floating');
		// physics
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.acceleration.y = 3000;
		this.sprite.body.gravity.y = 1000;
		
		//Audio
		this.audioVoar = game.add.audio('audioVoar');
	},
	
	update : function() {
		this.game.physics.arcade.collide(this.sprite, level.ground);
		this.game.physics.arcade.collide(this.sprite, level.objects);
		
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.sprite.body.velocity.y = -500;
			this.sprite.body.velocity.x = 10;
			
			if(!this.sprite.body.touching.down){
				this.game.add.tween(this.sprite).to({angle: -10}, 100).start();
		    }
		}
		
		if(this.sprite.body.touching.down){
			this.game.add.tween(this.sprite).to({angle: 0}, 100).start();
		}
	}
}