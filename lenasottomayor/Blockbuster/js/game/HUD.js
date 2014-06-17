HUD = function(game, lifes, score, coinsCollected) {
		this.game = game;
		this.lifes = lifes;
		this.score = score;
		this.coinsCollected = coinsCollected;
		this.lifeIcon = null;
		this.coinsCollectedIcon = null;
		this.lifeText = null;
		this.scoreText = null;
		this.coinsCollectedText = null;
};

HUD.prototype = {
	create: function () {
		if (this.coinsCollected<10){
			this.coinsCollectedText = this.game.add.bitmapText(this.game.camera.width-130, 20, 'font-coins', '00'+this.coinsCollected, 28);
		} else if (this.coinsCollected<100){
			this.coinsCollectedText = this.game.add.bitmapText(this.game.camera.width-130, 20, 'font-coins', '0'+this.coinsCollected, 28);
		}
		this.coinsCollectedIcon = this.game.add.sprite(this.game.camera.width-70, 20, 'coin');
		
		this.coinsCollectedIcon.fixedToCamera = true;
		this.coinsCollectedText.fixedToCamera = true;
	},
	update: function() {
		window.HUD = HUD;
	},
	
	updateCoins: function(value) {
		if (typeof value !== 'number') {
			return -1;
		}

		this.coinsCollected += value;
		
		if (this.coinsCollected == 100) {
			this.coinsCollected = 0;
		}
		
		if (this.coinsCollected<10){
			this.coinsCollectedText.setText('00' + this.coinsCollected);
		} else if (this.coinsCollected<100){
			this.coinsCollectedText.setText('0' + this.coinsCollected);
		}
	}
};