BreakoutGame.BigWhiteBrick = function () {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedSpriteSheets["images/whiteBricks.png"]);
	
	this._maxIndex = this.spriteSheet.totalCollumns;
	this._timeInCurrentIndex = 0;
};

BreakoutGame.BigWhiteBrick.prototype = new GameFramework.Sprite();

BreakoutGame.BigWhiteBrick.prototype.update = function (time) {
	this._timeInCurrentIndex += time.deltaTime;
	
	if (this._timeInCurrentIndex > 1000) {
		this._timeInCurrentIndex = 0;
		
		this.spriteIndex((this.spriteIndex() + 1) % this._maxIndex);
	}
}

