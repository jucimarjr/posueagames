GameFramework.SpriteSheet = function (textureUrl, totalRows, totalCollumns) {

	if (textureUrl === undefined || textureUrl.length === 0)
		console.error("GameFramework.SpriteSheet -> invalid textureUrl!");

	this.onTextureLoaded;
	this.totalRows = parseInt(Math.floor(totalRows));
	this.totalCollumns = parseInt(Math.floor(totalCollumns));
	
	this.image = new Image();
	this.image.onload = GameFramework.SpriteSheet._onload;
	this.image.src = textureUrl;
	
	return this;
};

GameFramework.SpriteSheet.prototype = {
	_onload: function () {
		if (typeof(this.onTextureLoaded) === 'function')
			this.onTextureLoaded(this);
	},

	sourceRectForIndex: function (index) {

		if (!this.image.complete) {
			console.error("GameFramework.SpriteSheet::sourceRectForIndex -> image not loaded!");
			return null;
		}
	
		var spriteWidth = parseInt(Math.floor(this.image.width / this.totalCollumns));
		var spriteHeight = parseInt(Math.floor(this.image.height / this.totalRows));
	
		var frameY = parseInt(Math.floor(index / this.totalCollumns));
		var sourceRect = {
			x: spriteWidth * (index - frameY * this.totalCollumns),
			y: spriteHeight * frameY,
			width: spriteWidth,
			height: spriteHeight
		};
	
		return sourceRect;
	}
};