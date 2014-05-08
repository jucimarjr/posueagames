BreakoutGame.BigWhiteBrick = function () {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedSpriteSheets["images/whiteBricks.png"]);
	
	this._maxIndex = this.spriteSheet.totalCollumns;
	this.glow = GameFramework.SpriteFactory.spriteFromTexture('images/whiteGlow.png');
};

BreakoutGame.BigWhiteBrick.prototype = new GameFramework.Sprite();

BreakoutGame.BigWhiteBrick.prototype.init = function () {
    GameFramework.Sprite.prototype.init.apply(this);
    this.glow.init();
};

BreakoutGame.BigWhiteBrick.prototype.update = function (time) {
    GameFramework.Sprite.prototype.update.apply(this, [time]);
    
	this._timeInCurrentIndex += time.deltaTime;
	
	// this.spriteIndex((this.spriteIndex() + 1) % this._maxIndex);
	
	this.glow.transform = this.transform;
	this.glow.update(time);
};

BreakoutGame.BigWhiteBrick.prototype.render = function (time, context2D, debugDraw) {
    GameFramework.Sprite.prototype.render.apply(this, [time, context2D, debugDraw]);
    this.glow.render(time, context2D, false);
};

BreakoutGame.BigWhiteBrick.prototype.dispose = function () {
    GameFramework.Sprite.prototype.dispose();
    this.glow.dispose();
};
