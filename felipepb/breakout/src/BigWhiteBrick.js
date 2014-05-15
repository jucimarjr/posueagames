BreakoutGame.BigWhiteBrick = function () {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedSpriteSheets["images/whiteBricks.png"]);
	
	this._maxIndex = this.spriteSheet.totalCollumns;
	this.glow = GameFramework.SpriteFactory.spriteFromTexture('images/whiteGlow.png');
	this.opacity = 0.5;
	this._active = false;
	this._activateAnim = new GameFramework.Animation(this, "opacity", 0.5, 1.0, 0.2, GameFramework.Easing.Type.InQuart);
};

BreakoutGame.BigWhiteBrick.prototype = new GameFramework.Sprite();

BreakoutGame.BigWhiteBrick.prototype.init = function () {
    GameFramework.Sprite.prototype.init.apply(this);
    this.glow.init();
};

BreakoutGame.BigWhiteBrick.prototype.active = function (value) {
	if (value === undefined) {
		return this._active;
	} else if (value === true) {
		this._active = true;
		this._activateAnim.begin();
	} else if (value === false) {
		this._active = false;
		this._activateAnim.to = 0.5;
		this._activateAnim.from = this.opacity;
		this._activateAnim.begin();
	}
};

BreakoutGame.BigWhiteBrick.prototype.update = function (time) {
    GameFramework.Sprite.prototype.update.apply(this, [time]);
	
	this._activateAnim.update(time);
	
	this.glow.transform = this.transform;
	this.glow.update(time);
};

BreakoutGame.BigWhiteBrick.prototype.onHit = function () {
	if (this.spriteIndex == this._maxIndex) {
		// TODO: callback to game with win condition.
		return;
	}
	
	this.spriteIndex((this.spriteIndex() + 1) % this._maxIndex);
};

BreakoutGame.BigWhiteBrick.prototype.render = function (time, context2D, debugDraw) {
	this.glow.opacity = this.opacity;
    this.glow.render(time, context2D, false);
    GameFramework.Sprite.prototype.render.apply(this, [time, context2D, debugDraw]);
};

BreakoutGame.BigWhiteBrick.prototype.dispose = function () {
    GameFramework.Sprite.prototype.dispose.apply(this);
    this.glow.dispose();
    this.glow = undefined;
    this._maxIndex = undefined;
};
