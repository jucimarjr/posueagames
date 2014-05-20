//Play.js
var playState = {

	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0, 0, game.stage.bounds.width, game.cache.getImage('bg').height);
		level.create();
		player.create();
		game.camera.follow(player.sprite);
		
	},

	update : function() {
		player.update();
		level.bg.tilePosition.x -= 1;
	}
};