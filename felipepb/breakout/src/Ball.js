BreakoutGame.Ball = function () {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedTextures["images/player_ball.png"]);
	
	this.velocity = {
		x: 0.0,
		y: 0.0
	}
}

BreakoutGame.Ball.prototype = new GameFramework.Sprite();
