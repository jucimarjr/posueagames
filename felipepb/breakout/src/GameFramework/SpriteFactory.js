GameFramework.SpriteFactory = {
	
	loadedSpriteSheets: { },
	loadedTextures: { },
	
	loadSpriteSheet: function (textureUrl, totalRows, totalCollumns, callback) {		
		var spriteSheet = new GameFramework.SpriteSheet(textureUrl, totalRows, totalCollumns);
		GameFramework.SpriteFactory.loadedSpriteSheets[spriteSheet.src] = spriteSheet;
		
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

		GameFramework.SpriteFactory.loadedTextures[textureUrl] = texture;
	},
	
	spriteFromTexture: function (textureUrl) {
		var sprite;
		
		if (GameFramework.SpriteFactory.loadedTextures[textureUrl] === undefined)
			GameFramework.SpriteFactory.loadTexture(textureUrl);
		
		sprite = new GameFramework.Sprite(GameFramework.SpriteFactory.loadedTextures[textureUrl]);
		
		return sprite;
	},
	
	spriteFromSpriteSheet: function (textureUrl, totalRows, totalCollumns) {
		var sprite;
		
		if (GameFramework.SpriteFactory.loadedSpriteSheets[textureUrl] === undefined)
			GameFramework.SpriteFactory.loadSpriteSheet(textureUrl, totalRows, totalCollumns);
		
		sprite = new GameFramework.Sprite(GameFramework.SpriteFactory.loadedSpriteSheets[textureUrl]);
		
		return sprite;
	}
};