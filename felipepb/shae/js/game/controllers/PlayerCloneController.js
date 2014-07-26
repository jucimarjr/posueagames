Game.PlayerCloneController = function (gameState) {
	this.gameState = gameState;
	this.game = gameState.game;
	this.sprite;
};

Game.PlayerCloneController.prototype = {
	create: function () {
		this.sprite = this.gameState.game.add.sprite(0, 0, 'main_sprite_atlas');
	},

	update: function () {
		var playerSprite = this.gameState.player.sprite;
		if (playerSprite) {
			var camera = this.game.camera;

			this.sprite.frameName = playerSprite.frameName;
	        this.sprite.anchor.setTo(playerSprite.anchor.x, playerSprite.anchor.y);
	        this.sprite.x = camera.width - playerSprite.x;
	        this.sprite.y = playerSprite.y;
	        this.sprite.scale.x = playerSprite.scale.x * -1;
		}
		
		if (playerSprite && playerSprite.body)
	        this.sprite.alpha = Math.min(playerSprite.alpha, 0.2);
		else
			this.sprite.alpha = 0;
	}
};
