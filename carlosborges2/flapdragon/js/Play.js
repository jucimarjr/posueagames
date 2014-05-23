//Play.js


var playState = function(game) {
	
	this.create = function() {
		console.log('playState-create');
		
		level.create();
		player.create();
		enemies.create();
		
	};
	
	this.update = function() {
		player.update();
		
	};
	
};


//var playState = {
//		
//	create : function() {
//		
//		console.log('playState-create');
//		
//		game.physics.startSystem(Phaser.Physics.ARCADE);
//		
////		game.world.setBounds(0, 0, game.stage.bounds.width, game.cache.getImage('bg').height);
//		
//		console.log('pre-create');
//		
//		level.create();
//		console.log('level.create()');
//		player.create();
//		console.log('player.create()');
//		enemies.create();
//		console.log('enemies.create()');
//		
////		game.camera.follow(player.sprite);
//	},
//
//	update : function() {
//		player.update();
//		level.bg.tilePosition.x -= 1;
//	}
//
//};