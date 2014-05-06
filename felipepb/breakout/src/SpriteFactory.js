BreakoutGame.SpriteFactory = {
	
	loadedSpriteSheets: { },
	loadedTextures: { },
	
	loadSpriteSheet: function (textureUrl) {		
		
		var spriteSheet = new BreakoutGame.SpriteSheet(textureUrl);
		BreakoutGame.SpriteFactory.loadedSpriteSheets[spriteSheet.src] = spriteSheet;
	},
	
	spriteFromTexture: function (textureUrl) {
		
	},
	
	spriteFromSpriteSheet: function (textureUrl) {
				
		var sprite;
		
		if (BreakoutGame.SpriteFactory.loadedSpriteSheets[textureUrl] !== undefined) {
			sprite = new BreakoutGame.Sprite(loadedSheets[textureUrl]);
		} else {
			BreakoutGame.loadSpriteSheet(textureUrl);
			sprite = new BreakoutGame.Sprite(BreakoutGame.SpriteFactory.loadedSpriteSheets[textureUrl]);
		}
		
		return sprite;
	}
};