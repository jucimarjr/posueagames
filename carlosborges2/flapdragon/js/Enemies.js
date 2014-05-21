Enemies = function(game) {
	this.game = game;
	this.enemies;
	this.sprites = [ 'char1', 'char2', 'char3' ];
}

Enemies.prototype = {
	preload : function() {
		this.game.load.spritesheet(this.sprites[0], 'assets/dragon1_480-90.png', 480, 90);
		this.game.load.spritesheet(this.sprites[1], 'assets/dragon2_480-90.png', 480, 90);
		this.game.load.spritesheet(this.sprites[2], 'assets/dragon3_480-90.png', 480, 90);
		
		//this.game.load.spritesheet(this.sprites[1], 'assets/char2_110-134.png',	 110, 134);
		//this.game.load.spritesheet(this.sprites[2], 'assets/char3_111-134.png',	 111, 134);
	},

	create : function() {
		this.enemies = this.game.add.group();
		this.game.time.events.loop(Phaser.Timer.SECOND * 2,
				this.generateBarrier, this).timer.start();
	},

	generateBarrier : function() {
		console.log('level -> generateBarrier');
		var enemy = this.enemies.create(this.game.world.width,
				this.game.world.height - 224, this.sprites[this.game.rnd
						.integerInRange(0, 2)]);
		enemy.animations.add('run', [ 0, 1 ], 2, true);
		enemy.animations.play('run');
		this.game.physics.arcade.enableBody(enemy);
		enemy.body.allowGravity = false;
		enemy.body.immovable = true;
		enemy.body.velocity.x = -200;
	}
}