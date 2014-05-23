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

