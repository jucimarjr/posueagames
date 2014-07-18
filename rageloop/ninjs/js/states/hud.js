

(function(){
	
	function HUD (game) {
		
		this.game = game || null;

		this.lifes = 5;
		this.bossLifes = -1;
		this.score = 0;
		this.totalItems = 0;
		this.items_collected = 0;

		this.scoreText = null;
		this.itemsCollectedText = 0;		
		this.lifeSymbols = [];
	}

	HUD.prototype.init = function(totalItems, bossLifes) {

		this.totalItems = totalItems;
		this.bossLifes = bossLifes || -1;
		this.create();
	}

	HUD.prototype.formatNumber = function(value, size) {
	    
	    var formattedNumber = "000000000" + value;
	    return formattedNumber.substr(formattedNumber.length - size);
	}

	HUD.prototype.create = function(hasBossLifeBar) {

		console.log("HUD.create()");

		var style = { font: "28px pixelFont", fill: "#ffffff"};

		if (this.bossLifes < 0) {
			this.scoreText = this.game.add.text(10, 80, "Score: " + this.formatNumber(this.score, 4), style);
			this.scoreText.fixedToCamera = true;
		}		

		this.itemsCollectedText = this.game.add.text(10, 50, "medals: " + this.formatNumber(this.score, 2) + "/" + this.formatNumber(this.totalItems, 2), style);

		this.itemsCollectedText.fixedToCamera = true;

		/*for (var i = 0; i < this.lifes; i++) {
			this.lifeSymbols[i] = this.game.add.image(10 + 40 * i, 20, "ninja_life");
			this.lifeSymbols[i].fixedToCamera = true;
		}*/

		/* player bar life */
		var lifebarbg = this.game.add.sprite(100, 30, 'ninja_barlife_bg');
		lifebarbg.anchor.setTo(0.5, 0.5);
		lifebarbg.fixedToCamera = true;
		this.lifebar = this.game.add.sprite(lifebarbg.x - 68, lifebarbg.y -2, 'ninja_barlife');
		this.lifebar.anchor.setTo(0, 0.5);
		this.lifebar.fixedToCamera = true;


		/* boss bar life */
		if (this.bossLifes > 0) {
			var bosslifebarbg = this.game.add.sprite(this.game.width - 100, 30, 'boss_barlife_bg');
			bosslifebarbg.anchor.setTo(0.5, 0.5);
			bosslifebarbg.scale.x *= -1;
			bosslifebarbg.fixedToCamera = true;
			this.bosslifebar = this.game.add.sprite(bosslifebarbg.x  + 68, bosslifebarbg.y -2, 'boss_barlife');
			this.bosslifebar.anchor.setTo(0, 0.5);
			this.bosslifebar.scale.x *= -1;
			this.bosslifebar.fixedToCamera = true;	
		}		

	}

	HUD.prototype.updateScore = function(value) {

		if (typeof value !== 'number') {
			return -1;
		}

		if (!this.scoreText) {
			return;
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

		this.lifebar.width = 30 * this.lifes;

		/*for (var i = 1; i <= this.lifeSymbols.length; i++) {

			if (i <= this.lifes) {
				this.lifeSymbols[i-1].revive();
			} else {
				this.lifeSymbols[i-1].kill();
			}
		}*/

	}

	HUD.prototype.updateBossLifes = function(value) {

		console.log("updateBossLifes: " + value);

		if (typeof value !== 'number') {
			return -1;
		}

		if (this.bossLifes < 0) {
			return;
		}

		this.bossLifes += value;

		this.bosslifebar.width = 30 * this.bossLifes;
		this.bosslifebar.scale.x *= -1;
	}

	window.HUD = HUD;

})()