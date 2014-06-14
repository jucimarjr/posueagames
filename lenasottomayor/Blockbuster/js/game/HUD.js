HUD = function(game, lifes) {
		this.game = game;
		this.lifes = lifes;
		this.score = 0;
		this.coinsCollected = 0;
		this.lifeText = null;
		this.scoreText = null;
		this.coinsCollectedText = null;
};

HUD.prototype = {
	create: function () {
		
	},
	
	update: function() {
		window.HUD = HUD;
	}
};