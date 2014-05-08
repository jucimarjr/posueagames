GameFramework.Sprite = function (sprite) {
    
    if (sprite === undefined)
        return;

	GameFramework.GameObject.call(this);

	this.texture = null;
	this.spriteSheet = null;
	if (sprite instanceof Image) {
		// console.log("simple sprite texture");
		this.texture = sprite;
	} else if (sprite instanceof GameFramework.SpriteSheet) {
		// console.log("init with spritesheet");
		this.spriteSheet = sprite;
		this.texture = sprite.image;
	} else {
		// console.error("error initiating sprite");
	}

	this.opacity = 1.0;
	this.zOrder = 0;

	this._debugDrawFillColor = "rgba(255,0,0,0.25)";
	this._debugDrawStrokeColor = "rgba(255,0,0,1)";
	this._spriteIndex = 0;
	this._sourceRect;
	this._boundingBox = {
		x: 0.0, y: 0.0,
		width: 0.0, height: 0.0
	}

	return this;
};

GameFramework.Sprite.prototype = new GameFramework.GameObject();

GameFramework.Sprite.prototype.init = function () { 
	GameFramework.GameObject.prototype.init.apply(this);
	
	this.spriteIndex(this._spriteIndex);
	
	this.boundingBox();
};

GameFramework.Sprite.prototype.render = function (time, context2D, debugDraw) { 
	if (!this.texture || !this.texture.complete) {
		return;
	}
	
	context2D.save();
	context2D.transform(Math.cos(this.transform.angle), Math.sin(this.transform.angle),
	                    -Math.sin(this.transform.angle), Math.cos(this.transform.angle),
						this.transform.x, this.transform.y);

    context2D.globalAlpha = this.opacity;
	
	var offsetX =  - this._sourceRect.width * this.transform.scaleX / 2;
	var offsetY =  - this._sourceRect.height * this.transform.scaleY / 2;
	var width = this._sourceRect.width * this.transform.scaleX;
	var height = this._sourceRect.height * this.transform.scaleY;
	
	context2D.drawImage(this.texture, this._sourceRect.x, this._sourceRect.y,
						this._sourceRect.width, this._sourceRect.height,
						offsetX, offsetY, width, height);
   	
	if (debugDraw) {
		context2D.fillStyle = this._debugDrawFillColor;
		context2D.strokeStyle = this._debugDrawStrokeColor;
		context2D.lineWidth = 3;
		
		var boundingBox = this.boundingBox();
		
		context2D.strokeRect(boundingBox.x - this.transform.x, 
						   boundingBox.y - this.transform.y, 
						   boundingBox.width, 
						   boundingBox.height);
   		context2D.fillRect(boundingBox.x - this.transform.x, 
   						   boundingBox.y - this.transform.y, 
   						   boundingBox.width, 
   						   boundingBox.height);
	}
	
	context2D.restore();
};

GameFramework.Sprite.prototype.boundingBox = function () {
	this._boundingBox.x = this.transform.x - this._sourceRect.width * this.transform.scaleX / 2;
	this._boundingBox.y = this.transform.y - this._sourceRect.height * this.transform.scaleY / 2;
	this._boundingBox.width = this._sourceRect.width * this.transform.scaleX;
	this._boundingBox.height = this._sourceRect.height * this.transform.scaleY;
	
	return this._boundingBox;
};

GameFramework.Sprite.prototype.spriteIndex = function (newIndex) {
	if (newIndex === undefined) {
		return this._spriteIndex;
	} else if (this.spriteSheet) {
		this._spriteIndex = newIndex;
		this._sourceRect = this.spriteSheet.sourceRectForIndex(this._spriteIndex);
	} else {
		this._spriteIndex = newIndex;
		this._sourceRect = {
		    x: 0,
            y: 0,
            width: this.texture.width,
            height: this.texture.height
        };
	}
};
