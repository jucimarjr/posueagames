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
			this.coinsCollectedText = this.game.add.bitmapText(this.game.camera.width-130, 18, 'font-coins', '00'+this.coinsCollected, 32);
		} else if (this.coinsCollected<100){
			this.coinsCollectedText = this.game.add.bitmapText(this.game.camera.width-130, 18, 'font-coins', '0'+this.coinsCollected, 32);
		}
		
		if (this.score<10){
			this.scoreText = this.game.add.bitmapText(this.game.camera.width-210, 60, 'font-score', '0000000'+this.score, 40);
		} else if (this.score<100){
			this.scoreText = this.game.add.bitmapText(this.game.camera.width-260, 60, 'font-score', '000000'+this.score, 40);
		} else if (this.score<1000){
			this.scoreText = this.game.add.bitmapText(this.game.camera.width-260, 60, 'font-score', '00000'+this.score, 40);
		} else if (this.score<10000){
			this.scoreText = this.game.add.bitmapText(this.game.camera.width-260, 60, 'font-score', '0000'+this.score, 40);
		} else if (this.score<100000){
			this.scoreText = this.game.add.bitmapText(this.game.camera.width-260, 60, 'font-score', '000'+this.score, 40);
		} else if (this.score<1000000){
			this.scoreText = this.game.add.bitmapText(this.game.camera.width-260, 60, 'font-score', '00'+this.score, 40);
		} else if (this.score<10000000){
			this.scoreText = this.game.add.bitmapText(this.game.camera.width-260, 60, 'font-score', '0'+this.score, 40);
		} else if (this.score<100000000){
			this.scoreText = this.game.add.bitmapText(this.game.camera.width-260, 60, 'font-score', ''+this.score, 40);
		}
		
		if (this.lifes<10){
			this.lifeText = this.game.add.bitmapText(this.game.camera.width-153, 105, 'font-life', '0'+this.lifes+' x', 28);
		} else {
			this.lifeText = this.game.add.bitmapText(this.game.camera.width-153, 105, 'font-life', ''+this.lifes+' x', 28);
		}
		
		this.coinsCollectedIcon = this.game.add.sprite(this.game.camera.width-70, 20, 'icon-coins');
		this.lifeIcon = this.game.add.sprite(this.game.camera.width-93, 105, 'icon-life');
		
		this.coinsCollectedIcon.fixedToCamera = true;
		this.coinsCollectedText.fixedToCamera = true;
		this.lifeIcon.fixedToCamera = true;
		this.lifeText.fixedToCamera = true;
		this.scoreText.fixedToCamera = true;
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
			this.updateLife(1);
		}
		
		if (this.coinsCollected<10){
			this.coinsCollectedText.setText('00' + this.coinsCollected);
		} else if (this.coinsCollected<100){
			this.coinsCollectedText.setText('0' + this.coinsCollected);
		}
	},
	
	updateLife: function(value) {
		if (typeof value !== 'number') {
			return -1;
		}

		this.lifes += value;
		
		if (this.lifes<10){
			this.lifeText.setText('x 0' + this.lifes);
		} else {
			this.lifeText.setText('x ' + this.lifes);
		}
	},
	
	updateScore: function(value) {
		if (typeof value !== 'number') {
			return -1;
		}

		this.score += value;
		
		if (this.score<10){
			this.scoreText.setText('0000000'+this.score);
		} else if (this.score<100){
			this.scoreText.setText('000000'+this.score);
		} else if (this.score<1000){
			this.scoreText.setText('00000'+this.score);
		} else if (this.score<10000){
			this.scoreText.setText('0000'+this.score);
		} else if (this.score<100000){
			this.scoreText.setText('000'+this.score);
		} else if (this.score<1000000){
			this.scoreText.setText('00'+this.score);
		} else if (this.score<10000000){
			this.scoreText.setText('0'+this.score);
		} else if (this.score<100000000){
			this.scoreText.setText(''+this.score);
		}
	}
};