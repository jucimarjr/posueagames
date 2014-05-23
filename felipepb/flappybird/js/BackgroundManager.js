BasicGame.BackgroundManager = function (gameManager) {
	this.gameManager = gameManager;

	this.background;
	this.parallaxLayers = new Array();
};

BasicGame.BackgroundManager.prototype = {
	create: function () {
		var cameraWidth = this.gameManager.camera.width;
        var cameraHeight = this.gameManager.camera.height;

        this.background = this.gameManager.add.sprite(0, 0, 'backgroundColor');

        var phrases = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundPhrases');

        // var starsBig = this.gameManager.add.sprite(cameraWidth / 2.0, cameraHeight / 2.0, 'backgroundStarsBig');
        var starsMedium = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundStarsMedium');
		var starsSmall = this.gameManager.add.tileSprite(0, 0, cameraWidth, cameraHeight, 'backgroundStarsSmall');

        this.parallaxLayers.push(phrases);
        // this.parallaxLayers.push(starsBig);
        this.parallaxLayers.push(starsMedium);
        this.parallaxLayers.push(starsSmall);
	},

	update: function () {
		for (var i = 0; i < this.parallaxLayers.length; i ++) {
			this.parallaxLayers[i].tilePosition.x += BasicGame.Obstacle.velocity / (i + 1);
		}
	}
};