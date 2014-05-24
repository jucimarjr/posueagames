//Play.js
var playState = {

	preload : function() {
		player = new Player(game);
		level = new Level(game);
		enemies = new Enemies(game);
		coins = new Coin(game);

		level.preload();
		player.preload();
		enemies.preload();
		coins.preload();
	},

	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.world.setBounds(0, 0, 600, game.cache.getImage('mountains').width);
		// game.world.setBounds(0, 0, game.stage.bounds.width,
		// game.cache.getImage('trees').height);
		level.create();
		player.create();
		enemies.create();
		coins.create();
		game.camera.follow(player.sprite);
	},

	update : function() {
		game.physics.arcade.overlap(player.sprite, enemies.enemies,
				player.lost, null, null);
		player.update();
		level.update();
		coins.update();
	}

};