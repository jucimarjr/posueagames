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

        var statusLabelPosX = 160;
        var statusLabelPosY = cameraHeight - 28;
        this.statusLabel = this.gameManager.add.bitmapText(statusLabelPosX, 
        												   statusLabelPosY, 	
        												   'hud_default');
        this.statusLabel.fontSize = 28;
        this.setStatus('serious relationship');

		var scoreLabelPosX = cameraWidth - 120;
        var scoreLabelPosY = cameraHeight - 28;
        this.scoreLabel = this.gameManager.add.bitmapText(scoreLabelPosX, 
        												   scoreLabelPosY, 	
        												   'hud_default');
        this.scoreLabel.fontSize = 28;
        // console.log(this.scoreLabel.textWidth);
		this.setScore(1000);
	},

	setScore: function (newScore) {
		if (newScore === undefined)
			return;

		var cameraWidth = this.gameManager.camera.width;
		this.scoreLabel.text = new String(parseInt(newScore)) + 'm';
		this.scoreLabel.updateText();
		this.scoreLabel.x = cameraWidth - this.scoreLabel.textWidth - 20;
	},

	setStatus: function (newStatus) {
		if (newStatus === undefined)
			return;

		this.statusLabel.text = newStatus;
	}
};