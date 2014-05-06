BreakoutGame.SpriteFactory = {
	
	loadedSpriteSheets: { },
	loadedTextures: { },
	
	loadSpriteSheet: function (textureUrl, totalRows, totalCollumns, callback) {		
		var spriteSheet = new BreakoutGame.SpriteSheet(textureUrl, totalRows, totalCollumns);
		BreakoutGame.SpriteFactory.loadedSpriteSheets[spriteSheet.src] = spriteSheet;
		
		if (callback) {
			spriteSheet.addEventListener('load', function(e) { 
				callback();
			});
		}
	},
	
	loadTexture: function (textureUrl, callback) {
		var texture = new Image();
		texture.src = textureUrl;

		if (callback) {
			texture.addEventListener('load', function(e) { 
				callback();
			});
		}

		BreakoutGame.SpriteFactory.loadedTextures[textureUrl] = texture;
	},
	
	spriteFromTexture: function (textureUrl) {
		var sprite;
		
		if (BreakoutGame.SpriteFactory.loadedTextures[textureUrl] === undefined)
			BreakoutGame.SpriteFactory.loadTexture(textureUrl);
		
		sprite = new BreakoutGame.Sprite(BreakoutGame.SpriteFactory.loadedTextures[textureUrl]);
		
		return sprite;
	},
	
	spriteFromSpriteSheet: function (textureUrl, totalRows, totalCollumns) {
		var sprite;
		
		if (BreakoutGame.SpriteFactory.loadedSpriteSheets[textureUrl] === undefined)
			BreakoutGame.SpriteFactory.loadSpriteSheet(textureUrl, totalRows, totalCollumns);
		
		sprite = new BreakoutGame.Sprite(BreakoutGame.SpriteFactory.loadedSpriteSheets[textureUrl]);
		
		return sprite;
	}
};