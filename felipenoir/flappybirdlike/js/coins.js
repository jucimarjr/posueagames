var coins = {

	preload : function() {
		game.load.image('coin', 'assets/coin.png');
	},

	create : function() {
		console.log('coins -> create');
		game.time.events
				.loop(Phaser.Timer.SECOND / 3, this.coinGenerator, this).timer
				.start();
	},

	update : function() {

	},

	coinGenerator : function() {
		console.log('coins -> coinGenerator');
		var coin = game.add.sprite(game.world.width, game.world.height - 90
				- game.cache.getImage('coin').height, 'coin');
		game.physics.arcade.enableBody(coin);
		coin.body.velocity.x = -200;
	}

}