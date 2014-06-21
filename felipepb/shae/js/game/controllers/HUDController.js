Game.HUDController = function (gameState) {
	this.gameState = gameState;
	this.game = this.gameState.game;

	this.livesIcon;
	this.livesLabel;
	this.livesCount;

	this.keyIcon;
};

Game.HUDController.prototype = {
	create: function () {
		this.livesIcon = this.game.add.sprite(10, 10, 'main_sprite_atlas', 'hud_life_26-27.png');
		this.livesIcon.fixedToCamera = true;

		this.livesCount = PlayerConsts.startingLifeTotal;
		this.livesLabel = this.game.add.bitmapText(this.livesIcon.x + this.livesIcon.width,
												   this.livesIcon.y + 6,
												   'silkscreenWhite',
												   'x' + new String(this.livesCount),
												   24);
		this.livesLabel.fixedToCamera = true;

		this.keyIcon = this.game.add.sprite(0, 10, 'main_sprite_atlas', 'hud_key_33-16.png');
		this.keyIcon.x = this.game.camera.width - this.keyIcon.width - 10;
		this.keyIcon.fixedToCamera = true;

	    this.hideKeyIcon();
	},

	showKeyIcon: function () {
		this.keyIcon.alpha = 1;
	},

	hideKeyIcon: function () {
		this.keyIcon.alpha = 0;
	},

	decreaseLife: function (callback) {
		this.livesCount -= 1;
		
		if (this.livesCount < 0) {
			callback();
		} else {
			this.livesLabel.text = 'x' + new String(this.livesCount);
		}
	}
};