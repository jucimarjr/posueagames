var BreakoutGame = { };

BreakoutGame.GameScene = function (canvas, targetFPS) {
	this.canvas = canvas;
	this.targetFPS = targetFPS;
	this.game = new GameFramework.Game(canvas, "black", false);
	this.player;
	
	this._resourcesLoadCount = 0;
	
	this._preloadTextures = [
		{ path: "images/player_racket_block.png", isSpriteSheet: false },
		{ path: "images/player_racket_glow.png", isSpriteSheet: false },
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
		// console.log("startGame");
		
		this.createBrickRows();
		this.createPlayer();
		
		this.createAudioAndTweenDemo();
        
		this.game.startGame(this.targetFPS);
	},
	
	createAudioAndTweenDemo: function () {
		// TODO: delete this later...
		var sound = GameFramework.SoundFactory.loadSound('sounds/3star.mp3', 'audio/mp3');
		// ******************** Animation and Audio Demo ********************
		var brick = new BreakoutGame.Brick(0);
        this.game.addGameObject(brick);
        brick.transform.x = brick.boundingBox().width / 2.0;
        brick.transform.y = this.canvas.height - brick.boundingBox().height / 2;
        
        var translation = new GameFramework.Animation(brick,
                                                      'x',
                                                      brick.x(),
                                                      this.canvas.width / 2.0,
                                                      3000,     // milliseconds
                                                      GameFramework.Easing.Type.OutInBack,
                                                      function () {
                                                          console.log('translation completed');
                                                          sound.play();
                                                      });
        translation.begin();
        this.game.addGameObject(translation);

        var opacity = new GameFramework.Animation(brick,
                                                  'opacity',
                                                  0.0,
                                                  1.0,
                                                  4000,     // milliseconds
                                                  GameFramework.Easing.Type.Linear);
        opacity.begin();
        this.game.addGameObject(opacity);
        
        var angle = new GameFramework.Animation(brick,
                                                'angle',
                                                0.0,
                                                2 * Math.PI,
                                                3000,     // milliseconds
                                                GameFramework.Easing.Type.InOutBack);
        angle.begin();
        this.game.addGameObject(angle);
        // ******************** Animation and Audio Demo ********************
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
	
	createPlayer: function () {
		this.player = new BreakoutGame.Player(this.canvas);
		this.game.addGameObject(this.player);
		this.player.transform.x = this.canvas.width / 2;
		this.player.transform.y = this.canvas.height * 3 / 4;
	},
	
	onResourceLoaded: function () {
		if (--this._resourcesLoadCount <= 0)
			this.startGame();
	}
}
