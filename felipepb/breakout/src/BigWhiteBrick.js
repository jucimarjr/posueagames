BreakoutGame.BigWhiteBrick = function () {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedSpriteSheets["images/whiteBricks.png"]);
	
	this.onDestroyed;
	
	this._maxIndex = this.spriteSheet.totalCollumns;
	this.glow = GameFramework.SpriteFactory.spriteFromTexture('images/whiteGlow.png');
	this.opacity = 0.15;
	this.glow.opacity = this.opacity;
	this._active = false;
	this._dead = false;
	this._activateAnimFinnished = false;
	var self = this;
	this._activateAnim = new GameFramework.PropertyAnimation(this, "opacity", 0.5, 1.0, 2000, GameFramework.Easing.Type.InQuart, function () {
		self.onActivateAnimFinnished();
	});
    this._glowAnimation = new GameFramework.SequentialAnimation();
	this._glowAnimation.add(new GameFramework.PropertyAnimation(this.glow,
                            									'opacity',
                                                                0.0,
                                                                1.0,
                                                                250,
                                                                GameFramework.Easing.Type.OutQuart));
	this._glowAnimation.add(new GameFramework.PropertyAnimation(this.glow,
                            									'opacity',
                                                                0.0,
                                                                1.0,
                                                                250,
                                                                GameFramework.Easing.Type.OutQuart));
	this._glowAnimation.add(new GameFramework.PropertyAnimation(this.glow,
                            									'opacity',
                                                                1.0,
                                                                0.0,
                                                                1500,
                                                                GameFramework.Easing.Type.OutQuart));
																
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
	
	if (!this._dead) {
		this._glowAnimation.update(time);
	}
};

BreakoutGame.BigWhiteBrick.prototype.onHit = function () {
	if (this.spriteIndex() == this._maxIndex - 1) {
		
		if (this.onDestroyed)
			this.onDestroyed();
		
		GameFramework.Animation.play(new GameFramework.PropertyAnimation(this, "opacity", 1.0, 0.0, 2000, GameFramework.Easing.OutQuart));
		GameFramework.Animation.play(new GameFramework.PropertyAnimation(this.glow, "opacity", 1.0, 0.0, 2000, GameFramework.Easing.OutQuart));
		
		this._dead = true;
		
		return;
	}
	
	this.spriteIndex((this.spriteIndex() + 1) % this._maxIndex);
};

BreakoutGame.BigWhiteBrick.prototype.render = function (time, context2D, debugDraw) {
    this.glow.render(time, context2D, false);
    GameFramework.Sprite.prototype.render.apply(this, [time, context2D, debugDraw]);
};

BreakoutGame.BigWhiteBrick.prototype.dispose = function () {
    GameFramework.Sprite.prototype.dispose.apply(this);
    this.glow.dispose();
    this.glow = undefined;
    this._maxIndex = undefined;
};

BreakoutGame.BigWhiteBrick.prototype.playGlowAnimation = function () {
	if (this._activateAnimFinnished)
		this._glowAnimation.begin();
};

BreakoutGame.BigWhiteBrick.prototype.onActivateAnimFinnished = function () {
	this._activateAnimFinnished = true;
};
