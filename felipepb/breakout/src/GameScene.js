var BreakoutGame = { };

BreakoutGame.GameScene = function (canvas, targetFPS) {
	this.canvas = canvas;
	this.targetFPS = targetFPS;
	this.game = new GameFramework.Game(canvas, "black", true);
	
	this._resourcesLoadCount = 0;
	
	this._preloadTextures = [
		{ path: "images/whiteBricks.png", isSpriteSheet: true, row: 1, collumns: 7 }
	];
	
	this.loadTextures(this._preloadTextures);
};

BreakoutGame.GameScene.prototype = {
	loadTextures: function (imagesToLoad) {
		this._resourcesLoadCount = imagesToLoad.length;
		
		var self = this;
		var callback = function() {
			self.onResourceLoaded();
		};
		
		var spriteFactory = GameFramework.SpriteFactory;
		
		for (var i = 0; i < imagesToLoad.length; i++) {
			if (!imagesToLoad[i].isSpriteSheet) {
				spriteFactory.loadTexture(imagesToLoad[i].path, callback);
			}
			else  {
				spriteFactory.loadSpriteSheet(imagesToLoad[i].path,
											  imagesToLoad[i].row,
											  imagesToLoad[i].collumns, 
											  callback);
			}
		}
	},
	
	startGame: function () {
		console.log("startGame");
		
		var bigBrick = new BreakoutGame.BigWhiteBrick();
		bigBrick.transform.x = this.canvas.width / 2;
		bigBrick.transform.y = this.canvas.height / 2;

		this.game.addGameObject(bigBrick);
		this.game.startGame(this.targetFPS);
	},
	
	onResourceLoaded: function () {
		if (--this._resourcesLoadCount <= 0)
			this.startGame();
	}
}