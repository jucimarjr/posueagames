GameFramework.SpriteSheet = function (textureUrl, totalRows, totalCollumns) {

	Image.call(this);

	if (textureUrl === undefined || textureUrl.length === 0)
		console.error("GameFramework.SpriteSheet -> invalid textureUrl!");

	this.onload = GameFramework.SpriteSheet._onload;
	this.onTextureLoaded;
	this.totalRows = parseInt(Math.floor(totalRows));
	this.totalCollumns = parseInt(Math.floor(totalCollumns));
	this.src = textureUrl;
	
	return this;
};

GameFramework.SpriteSheet.prototype = new Image();

GameFramework.SpriteSheet.prototype._onload = function () {

	if (typeof(this.onTextureLoaded) === 'function')
		this.onTextureLoaded(this);
};

GameFramework.SpriteSheet.prototype.sourceRectForIndex = function (index) {

	if (!this.complete) {
		console.error("GameFramework.SpriteSheet::sourceRectForIndex -> image not loaded!");
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