

(function(){
	
	function HUD (game) {
		
		this.game = game || null;

		this.lifes = 5;
		this.score = 0;

		this.scoreText = null;
		this.lifeSymbols = [];
	}

	HUD.prototype.init = function() {

		this.create();
	}

	HUD.prototype.formatScore = function(size) {
	    
	    var formattedNumber = "000000000" + this.score;
	    return formattedNumber.substr(formattedNumber.length - size);
	}

	HUD.prototype.create = function() {

		console.log("HUD.create()");

		var style = { font: "45px pixelFont", fill: "#ffffff"};

		this.scoreText = this.game.add.text(630, 10, "Score: " + this.formatScore(4), style);

		this.scoreText.fixedToCamera = true;

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
		this.scoreText.setText("Score: " + this.formatScore(4));
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