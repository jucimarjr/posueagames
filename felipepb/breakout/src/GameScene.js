var BreakoutGame = { };

BreakoutGame.GameScene = function (canvas, targetFPS) {
	this.canvas = canvas;
	this.targetFPS = targetFPS;
	this.game = new GameFramework.Game(canvas, "black", true);
	
	this._resourcesLoadCount = 0;
	
	this._preloadTextures = [
		{ path: "images/whiteBricks.png", isSpriteSheet: true, rows: 1, collumns: 7 },
		{ path: "images/whiteGlow.png", isSpriteSheet: false },
		{ path: "images/bricksGlow.png", isSpriteSheet: true, rows: 1, collumns: 5 },
		{ path: "images/bricks.png", isSpriteSheet: true, rows: 8, collumns: 3 }
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
											  imagesToLoad[i].rows,
											  imagesToLoad[i].collumns, 
											  callback);
			}
		}
	},
	
	startGame: function () {
		console.log("startGame");
		
		this.createBrickRows();
        
		this.game.startGame(this.targetFPS);
	},
	
	createBrickRows: function () {
	    var bigBrick = new BreakoutGame.BigWhiteBrick();
        this.game.addGameObject(bigBrick);
        bigBrick.transform.x = this.canvas.width / 2;
        bigBrick.transform.y = bigBrick.boundingBox().height / 2 + 10;
        
        var brick = new BreakoutGame.Brick(15);
        this.game.addGameObject(brick);
        brick.transform.x = this.canvas.width / 2;
        brick.transform.y = 300;
	},
	
	onResourceLoaded: function () {
		if (--this._resourcesLoadCount <= 0)
			this.startGame();
	}
}