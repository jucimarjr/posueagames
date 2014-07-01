

(function(){
	
	function HUD (game) {
		
		this.game = game || null;

		this.lifes = 5;
		this.score = 0;
		this.totalItems = 0;
		this.items_collected = 0;

		this.scoreText = null;
		this.itemsCollectedText = 0;		
		this.lifeSymbols = [];
	}

	HUD.prototype.init = function(totalItems) {
		this.totalItems = totalItems;
		this.create();
	}

	HUD.prototype.formatNumber = function(value, size) {
	    
	    var formattedNumber = "000000000" + value;
	    return formattedNumber.substr(formattedNumber.length - size);
	}

	HUD.prototype.create = function() {

		console.log("HUD.create()");

		var style = { font: "45px pixelFont", fill: "#ffffff"};

		this.scoreText = this.game.add.text(630, 10, "Score: " + this.formatNumber(this.score, 4), style);

		this.scoreText.fixedToCamera = true;

		style = { font: "28px pixelFont", fill: "#ffffff"};

		this.itemsCollectedText = this.game.add.text(10, 50, "medals: " + this.formatNumber(this.score, 2) + "/" + this.formatNumber(this.totalItems, 2), style);

		this.itemsCollectedText.fixedToCamera = true;

		for (var i = 0; i < this.lifes; i++) {
			this.lifeSymbols[i] = this.game.add.image(10 + 40 * i, 20, "ninja_life");
			this.lifeSymbols[i].fixedToCamera = true;
		}

	}

	HUD.prototype.updateScore = function(value) {

		if (typeof value !== 'number') {
			return -1;
		}

		this.score += value;
		this.scoreText.setText("Score: " + this.formatNumber(this.score, 4));
	}

	HUD.prototype.updateItemsCollected = function(value) {

		if (typeof value !== 'number') {
			return -1;
		}

		this.items_collected += value;
		this.itemsCollectedText.setText("medals: " + this.formatNumber(this.items_collected, 2) + "/" + this.formatNumber(this.totalItems, 2));
	}

	HUD.prototype.updateLifes = function(value) {

		if (typeof value !== 'number') {
			return -1;
		}

		this.lifes += value;

		for (var i = 1; i <= this.lifeSymbols.length; i++) {

			if (i <= this.lifes) {
				this.lifeSymbols[i-1].revive();
			} else {
				this.lifeSymbols[i-1].kill();
			}
		}

	}

	window.HUD = HUD;

})()