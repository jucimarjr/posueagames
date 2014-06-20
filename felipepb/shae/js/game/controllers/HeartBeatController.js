Game.HeartBeatController = function (game) {
	this.game = game;
	this.hearts;
	this.frequence = 5000;
	this.time = 0;
};

Game.HeartBeatController.prototype = {
	setHearts: function (hearts) {
		this.hearts = hearts;
	},
	
	update: function () {
		this.time += this.game.time.elapsed;
		if (this.time >= this.frequence) {
			this.time = 0;
			var hearts = this.hearts;
			if (hearts) {
				var length = hearts.length;
				for (var i = 0; i < length; i++) {
					hearts[i].playBeat();
				}
			}
		}
	}
};
