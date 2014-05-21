//Load.js
var loadState = {  
    preload: function() { 
		player = new Player(game);
		level = new Level(game);
		enemies = new Enemies(game);

		level.preload();
		player.preload();
		enemies.preload();
	},

    create: function() {
      this.game.state.start('menu');
    }
};