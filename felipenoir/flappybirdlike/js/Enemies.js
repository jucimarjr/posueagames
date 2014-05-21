Enemies = function(game) {
	this.game = game;
	this.enemies;
}

Enemies.prototype = {
	preload : function() {
		this.game.load
				.spritesheet('char1', 'assets/char_121-134.png', 121, 134);
	},

	create : function() {
		this.enemies = this.game.add.group();

		this.game.time.events.loop(Phaser.Timer.SECOND * 2,
				this.generateBarrier, this).timer.start();
	},

	generateBarrier : function() {
		console.log('level -> generateBarrier');
		var enemy = this.enemies.create(this.game.world.width,
				this.game.world.height - 224, 'char1');
		enemy.animations.add('run', [ 0, 1 ], 2, true);
		enemy.animations.play('run');
		this.game.physics.arcade.enableBody(enemy);
		enemy.body.allowGravity = false;
		enemy.body.immovable = true;
		enemy.body.velocity.x = -200;
	}
}