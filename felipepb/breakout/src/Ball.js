BreakoutGame.Ball = function (canvas) {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedTextures["images/player_ball.png"]);
}

BreakoutGame.Ball.prototype = new GameFramework.Sprite();
