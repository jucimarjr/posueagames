//Load.js
var loadState = function(game) {
	
	this.preload = function() { 
		player = new Player(/*game*/);
		level = new Level(/*game*/);
		enemies = new Enemies(game);

		level.preload();
		player.preload();
		enemies.preload();
		
		console.log('loadState::preload::end');
	};

	this.create = function() {
		
		console.log('loadState::create');
		
		game.state.start(STATE_MENU);
//		game.state.start(STATE_PLAY);
	};
	
};

//var loadState = {
//		
//	
//	preload: function() { 
//		player = new Player(game);
//		level = new Level(/*game*/);
//		enemies = new Enemies(game);
//
//		level.preload();
//		player.preload();
//		enemies.preload();
//		
//		console.log('loadState::preload::end');
//	},
//
//	create: function() {
//		
//		console.log('loadState::create');
//		
//		game.state.start(STATE_MENU);
////		game.state.start(STATE_PLAY);
//	}
//	
//};