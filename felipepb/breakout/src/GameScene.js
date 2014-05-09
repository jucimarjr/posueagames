var BreakoutGame = { };

BreakoutGame.GameScene = function (canvas, targetFPS) {
	this.canvas = canvas;
	this.targetFPS = targetFPS;
	this.game = new GameFramework.Game(canvas, "black", false);
	
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
	    this.game.clearGameObjects();
	    
	    var topMargin = 15;
	    
	    var bigBrick = new BreakoutGame.BigWhiteBrick();
        this.game.addGameObject(bigBrick);
        bigBrick.transform.x = this.canvas.width / 2;
        bigBrick.transform.y = bigBrick.boundingBox().height / 2 + topMargin;
        
        // first brick collumn
        var brickY = bigBrick.boundingBox().y;
        var brickTopMargin = 28;
        var brickRightMargin = 10;
        
        for (var i = 0; i < 5; i++) {
            var index = (i * 4) <= 12 ? i * 4 : 19;
            var brick = new BreakoutGame.Brick(index);
            this.game.addGameObject(brick);
            brickY += brick.boundingBox().height / 2.0;
            brick.transform.x = bigBrick.boundingBox().x - brick.boundingBox().width * 1.5 - brickRightMargin;
            brick.transform.y = brickY;
            brickY += brickTopMargin;
        }
        
        // second brick collumn
        brickY = bigBrick.boundingBox().y;
        brickRightMargin = 5;
        
        for (var i = 0; i < 5; i++) {
            var index = ((i * 4) + 1) <= 13 ? ((i * 4) + 1) : 20;
            var brick = new BreakoutGame.Brick(index);
            this.game.addGameObject(brick);
            brickY += brick.boundingBox().height / 2.0;
            brick.transform.x = bigBrick.boundingBox().x - brick.boundingBox().width * 0.5 - brickRightMargin;
            brick.transform.y = brickY;
            brickY += brickTopMargin;
        }
        
        // second last brick collumn
        brickY = bigBrick.boundingBox().y;
        brickRightMargin = 5;
        
        for (var i = 0; i < 4; i++) {
            var index = ((i * 4) + 2) <= 13 ? ((i * 4) + 2) : 17;
            var brick = new BreakoutGame.Brick(index);
            this.game.addGameObject(brick);
            brickY += brick.boundingBox().height / 2.0;
            brick.transform.x = bigBrick.boundingBox().x
                                + bigBrick.boundingBox().width
                                + brick.boundingBox().width * 0.5 + brickRightMargin;
            brick.transform.y = brickY;
            brickY += brickTopMargin;
        }
        
        // last brick collumn
        brickY = bigBrick.boundingBox().y;
        brickRightMargin = 10;
        
        for (var i = 0; i < 4; i++) {
            var index = ((i * 4) + 3) <= 14 ? ((i * 4) + 3) : 18;
            var brick = new BreakoutGame.Brick(index);
            this.game.addGameObject(brick);
            brickY += brick.boundingBox().height / 2.0;
            brick.transform.x = bigBrick.boundingBox().x
                                + bigBrick.boundingBox().width
                                + brick.boundingBox().width * 1.5 + brickRightMargin;
            brick.transform.y = brickY;
            brickY += brickTopMargin;
        }
        
        // "to love you" and "to kill you" 
        topMargin = 28;
        brickRightMargin = 5;
        brickY = bigBrick.boundingBox().y + bigBrick.boundingBox().height + topMargin;
        var brickX;

        for (var i = 0; i < 2; i++) {
            brickX = bigBrick.boundingBox().x;
            for (var j = 0; j < 3; j++) {
                var index = (14 + j) + (7 * i);
                var brick = new BreakoutGame.Brick(index);
                this.game.addGameObject(brick);
                if (j == 0)
                    brickX += brick.boundingBox().width / 2.0;
                brick.transform.x = brickX;
                brick.transform.y = brickY;
                brickX += brick.boundingBox().width + brickRightMargin;
            }
            brickY += brick.boundingBox().height / 2.0 + topMargin;
        }

	},
	
	onResourceLoaded: function () {
		if (--this._resourcesLoadCount <= 0)
			this.startGame();
	}
}