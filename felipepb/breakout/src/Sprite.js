BreakoutGame.Sprite = function (image) {
	
	BreakoutGame.GameObject.call(this);
	
	this.texture = image;
	this.boundingBox;
	this.opacity = 1.0;
	this.spriteIndex;
	this.zOrder;
	
	this._sourceRect;
	
	return this;
};

BreakoutGame.Sprite.prototype = new BreakoutGame.GameObject();

BreakoutGame.Sprite.prototype.init = function () { };

BreakoutGame.Sprite.prototype.update = function (deltaTime) { };

BreakoutGame.Sprite.prototype.render = function (deltaTime, context2D) { };
