//Play.js
var playState = {

	preload : function() {
		player = new Player(game);
		level = new Level(game);
		enemies = new Enemies(game);

		level.preload();
		player.preload();
		enemies.preload();
		coins.preload();
	},

	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.world.setBounds(0, 0, 600,   game.cache.getImage('mountains').width);
//		game.world.setBounds(0, 0, game.stage.bounds.width, game.cache.getImage('trees').height);
		level.create();
		player.create();
		enemies.create();
		coins.create();
		game.camera.follow(player.sprite);
	},

	update : function() {
		player.update();
		level.mountains.tilePosition.x -= 1;
	}

};