BasicGame.BackgroundManager = function (gameManager) {
	this.gameManager = gameManager;

	this.background;
	this.parallaxLayers = new Array();
	this.parallaxEffectLayers = new Array();
	this.glitchFXAmount;
	this.glitchFXStep;
};

BasicGame.BackgroundManager.prototype = {
	create: function () {
		this.glitchFXAmount = 0.0;
		this.glitchFXStep = 0.1;

		var cameraWidth = this.gameManager.camera.width;
        var cameraHeight = this.gameManager.camera.height;

        this.background = this.gameManager.add.sprite(0, 0, 'backgroundColor');

        var phrases = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundPhrases');
        var phrasesEffect = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundPhrases');

        var starsBig = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundPlanets');
        var starsBigEffect = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundPlanets');
        
        var starsMedium = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundStarsMedium');
		var starsMediumEffect = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundStarsMedium');

		var starsSmall = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundStarsSmall');
		var starsSmallEffect = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundStarsSmall');

        this.parallaxLayers.push(phrases);
        this.parallaxEffectLayers.push(phrasesEffect);

        this.parallaxLayers.push(starsBig);
        this.parallaxEffectLayers.push(starsBigEffect);

        this.parallaxLayers.push(starsMedium);
        this.parallaxEffectLayers.push(starsMediumEffect);

        this.parallaxLayers.push(starsSmall);
        this.parallaxEffectLayers.push(starsSmallEffect);
	},

	update: function () {
		for (var i = 0; i < this.parallaxLayers.length; i ++) {
			this.parallaxLayers[i].tilePosition.x += BasicGame.Obstacle.velocity / (i + 2);
		}

		for (var i = 0; i < this.parallaxEffectLayers.length; i ++) {
			var offsetX = this.random(-this.glitchFXAmount, this.glitchFXAmount);
			var offsetY = this.random(-this.glitchFXAmount, this.glitchFXAmount);
			this.parallaxEffectLayers[i].tilePosition.x = this.parallaxLayers[i].tilePosition.x + offsetX;
			this.parallaxEffectLayers[i].tilePosition.y = this.parallaxLayers[i].tilePosition.y + offsetY;
		}			
	},

	random: function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    },

    increaseGlitchFX: function () {
    	this.glitchFXAmount += this.glitchFXStep;
    }
};