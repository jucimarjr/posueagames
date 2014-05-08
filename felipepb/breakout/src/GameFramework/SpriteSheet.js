BreakoutGame.SpriteSheet = function (textureUrl, totalRows, totalCollumns) {

	Image.call(this);

	if (textureUrl === undefined || textureUrl.length === 0)
		console.error("BreakoutGame.SpriteSheet -> invalid textureUrl!");

	this.onload = BreakoutGame.SpriteSheet._onload;
	this.onTextureLoaded;
	this.totalRows = parseInt(Math.floor(totalRows));
	this.totalCollumns = parseInt(Math.floor(totalCollumns));
	this.src = textureUrl;
	
	return this;
};

BreakoutGame.SpriteSheet.prototype = new Image();

BreakoutGame.SpriteSheet.prototype._onload = function () {

	if (typeof(this.onTextureLoaded) === 'function')
		this.onTextureLoaded(this);
};

BreakoutGame.SpriteSheet.prototype.sourceRectForIndex = function (index) {

	if (!this.complete) {
		console.error("BreakoutGame.SpriteSheet::sourceRectForIndex -> image not loaded!");
		return null;
	}
	
	var spriteWidth = parseInt(Math.floor(this.width / this.totalCollumns));
	var spriteHeight = parseInt(Math.floor(this.height / this.totalRows));
	
	var frameY = parseInt(Math.floor(index / this.totalCollumns));
	var sourceRect = {
		x: spriteWidth * (index - frameY * this.totalCollumns),
		y: spriteHeight * frameY,
		width: spriteWidth,
		height: spriteHeight
	};
	
	return sourceRect;
};