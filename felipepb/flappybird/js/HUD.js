BasicGame.HUD = function (gameManager) {
	this.gameManager = gameManager;

	this.background;
	this.statusLabel;
	this.scoreLabel;
};

BasicGame.HUD.prototype = {
	create: function () {
		var cameraWidth = this.gameManager.camera.width;
        var cameraHeight = this.gameManager.camera.height;

        this.background = this.gameManager.add.sprite(0, 0, 'mainGameAtlas');
        this.background.frameName = 'hudBase_960-40.png';
        this.background.anchor.setTo(0.5, 1.0);
        this.background.x = cameraWidth / 2.0;
        this.background.y = cameraHeight;
	}
};