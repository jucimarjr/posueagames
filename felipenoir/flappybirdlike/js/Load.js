//Load.js
var loadState = {  
    preload: function() { 
		player = new Player(game);
		level = new Level(game);

		level.preload();
		player.preload();
	},

    create: function() {
      this.game.state.start('menu');
    }
};