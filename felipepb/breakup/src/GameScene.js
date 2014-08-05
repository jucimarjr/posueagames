var BreakoutGame = { };

BreakoutGame.GameScene = function (canvas, targetFPS, playerLives) {
	this.canvas = canvas;
	this.targetFPS = targetFPS;
	this.game = new GameFramework.Game(canvas, "black", false);
	this.player;
	this.ball;
	this.bricks = new Array();
	this.bigBrick;
	this.gamePhysics;
	this.gameSound;
	this.gameRetryScreen;
	this.gameStartScreen;
	this.gameWinScreen;
	
	this._resourcesLoadCount = 0;
	
	this._preloadTextures = [
	    { path: "images/ludusSplash_600-480.png", isSpriteSheet: false },
	    { path: "images/sponsor_600-480.png", isSpriteSheet: false },
	    { path: "images/gamestart.png", isSpriteSheet: false },
	    { path: "images/gameretry.png", isSpriteSheet: false },
	    { path: "images/gamewin.png", isSpriteSheet: false },
		{ path: "images/player_racket_block.png", isSpriteSheet: false },	
		{ path: "images/player_racket_glow.png", isSpriteSheet: false },
		{ path: "images/player_life.png", isSpriteSheet: false },
		{ path: "images/player_ball.png", isSpriteSheet: false },
		{ path: "images/whiteBricks.png", isSpriteSheet: true, rows: 1, collumns: 7 },
		{ path: "images/whiteGlow.png", isSpriteSheet: false },
		{ path: "images/bricksGlow.png", isSpriteSheet: true, rows: 1, collumns: 5 },
		{ path: "images/bricks.png", isSpriteSheet: true, rows: 8, collumns: 3 }
	];
	
	this.loadTextures(this._preloadTextures);
	this.playerLives = playerLives;
	this.heartSprites = new Array();
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
	
	showStartScreen: function() {
	    var self = this;

	    this.gameStartScreen = GameFramework.SpriteFactory.spriteFromTexture('images/gamestart.png');
	    this.gameStartScreen.x(this.canvas.width / 2.0);
	    this.gameStartScreen.y(this.canvas.height / 2.0);
	    this.game.addGameObject(this.gameStartScreen);

	    var sponsorSplash = GameFramework.SpriteFactory.spriteFromTexture('images/sponsor_600-480.png');
	    sponsorSplash.x(this.canvas.width / 2.0);
	    sponsorSplash.y(this.canvas.height / 2.0);
	    this.game.addGameObject(sponsorSplash);

	    var ludusSplash = GameFramework.SpriteFactory.spriteFromTexture('images/ludusSplash_600-480.png');
	    ludusSplash.x(this.canvas.width / 2.0);
	    ludusSplash.y(this.canvas.height / 2.0);
	    this.game.addGameObject(ludusSplash);
	    
	    var splashAnimation = function(screen, callback) {
	    	var animation = new GameFramework.PauseAnimation(
					                2000,
					                function () {
										var animation = new GameFramework.PropertyAnimation(
																screen,
						    					                'opacity',
						    					                1.0,
						    					                0.0,
						    					                500,
						    					                GameFramework.Easing.Type.Linear,
						    					                function () {
						    		    							if (typeof(callback) === 'function')
						    		    								callback();
						    					                });
										GameFramework.Animation.play(animation);
			                		});
	    	GameFramework.Animation.play(animation);
	    };

	    var showMenu = function () {
	    	document.addEventListener('keydown', function (args) {
		        if (self.player == null && args.keyCode == GameFramework.KeyCode.EnterKey) {
		            var animation = new GameFramework.PropertyAnimation(self.gameStartScreen,
		                                                                'opacity',
		                                                                1.0,
		                                                                0.0,
		                                                                250,
		                                                                GameFramework.Easing.Type.Linear,
		                                                                function () {
		                                                                    self.startGame();
		                                                                    self.game.removeGameObject(ludusSplash);
		                                                                    self.game.removeGameObject(sponsorSplash);
		                                                                    self.game.removeGameObject(self.gameStartScreen);
		                                                                });
		            GameFramework.Animation.play(animation);
		        }
		    });
	    };

	    splashAnimation(ludusSplash, function () {
	    	splashAnimation(sponsorSplash, function () {
	    		showMenu();
	    	});
	    });

	    this.game.startGame(this.targetFPS);
	},
	
	showGameRetryScreen: function () {
	    var self = this;
        this.gameRetryScreen = GameFramework.SpriteFactory.spriteFromTexture('images/gameretry.png'); 
        this.gameRetryScreen.x(this.canvas.width / 2.0);
        this.gameRetryScreen.y(this.canvas.height / 2.0);
        this.gameRetryScreen.zOrder = 1000;
        this.game.addGameObject(this.gameRetryScreen);
        
        var callback = function () {
            document.addEventListener('keydown', function (args) {
                if (self.player != null && args.keyCode == GameFramework.KeyCode.EnterKey) {
                    location.reload();
                }
            });
        };
        
        var animation = new GameFramework.PropertyAnimation(self.gameRetryScreen,
                                                            'opacity',
                                                            0.0,
                                                            1.0,
                                                            3500,
                                                            GameFramework.Easing.Type.InQuart,
                                                            callback);
        GameFramework.Animation.play(animation);
        
        
	},
	
	showGameWinScreen: function() {
        this.gameWinScreen = GameFramework.SpriteFactory.spriteFromTexture('images/gamewin.png'); 
        this.gameWinScreen.x(this.canvas.width / 2.0);
        this.gameWinScreen.y(this.canvas.height / 2.0);
        this.game.addGameObject(this.gameWinScreen);
        
        var opacityAnimation = new GameFramework.PropertyAnimation(this.gameWinScreen,
                                                                    'opacity',
                                                                    0.0,
                                                                    1.0,
                                                                    6000,
                                                                    GameFramework.Easing.Type.InQuart);
        GameFramework.Animation.play(opacityAnimation);
    },
	
	startGame: function () {
		//console.log("startGame");
		
		this.createBrickRows();
		this.createPlayer();
		this.createBall();
		this.createPhysicsManager();
		this.setUpLives();
		this.createSoundManager();
		
		this.gamePhysics.onBallHit = this.gameSound.onBallHit;
		
		//this.createAudioAndTweenDemo();
	},
	
	createAudioAndTweenDemo: function () {
		// TODO: delete this later...
		var sound = GameFramework.SoundFactory.loadSound('sounds/3star.mp3',
		                                                 GameFramework.SoundFactory.Format.MP3);
		// ******************** Animation and Audio Demo ********************
		var brick = new BreakoutGame.Brick(0);
        this.game.addGameObject(brick);
        brick.transform.x = brick.boundingBox().width / 2.0;
        brick.transform.y = this.canvas.height - brick.boundingBox().height / 2;
        
        var translation = new GameFramework.PropertyAnimation(brick,
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

        var opacity = new GameFramework.PropertyAnimation(brick,
                                                          'opacity',
                                                          0.0,
                                                          1.0,
                                                          4000,     // milliseconds
                                                          GameFramework.Easing.Type.Linear);
        opacity.begin();
        this.game.addGameObject(opacity);
        
        var angle = new GameFramework.PropertyAnimation(brick,
                                                        'angle',
                                                        0.0,
                                                        2 * Math.PI,
                                                        3000,     // milliseconds
                                                        GameFramework.Easing.Type.InOutBack);
        angle.begin();
        this.game.addGameObject(angle);
        
        
        brick = new BreakoutGame.Brick(1);
        this.game.addGameObject(brick);
        brick.transform.x = this.canvas.width -  brick.boundingBox().width / 2.0;
        brick.transform.y = this.canvas.height - brick.boundingBox().height / 2;
        
        var sequentialAnimation = new GameFramework.SequentialAnimation(function () {
            console.log('sequential animation completed');
        });
        sequentialAnimation.add(new GameFramework.PropertyAnimation(brick,
                                                                    'x',
                                                                    brick.x(),
                                                                    brick.boundingBox().width / 2.0,
                                                                    3000,     // milliseconds
                                                                    GameFramework.Easing.Type.OutInBack,
                                                                    function () {
                                                                        console.log('translation 2 completed');
                                                                    }));
        sequentialAnimation.add(new GameFramework.PauseAnimation(2000));
        sequentialAnimation.add(new GameFramework.PropertyAnimation(brick,
                                                                    'x',
                                                                    brick.boundingBox().width / 2.0,
                                                                    this.canvas.width -  brick.boundingBox().width / 2.0,
                                                                    3000,     // milliseconds
                                                                    GameFramework.Easing.Type.OutInBack,
                                                                    function () {
                                                                        console.log('translation 3 completed');
                                                                    }));
        
        GameFramework.Animation.Play(sequentialAnimation);
        
        
        BreakoutGame.MonitorBeat.play();
        BreakoutGame.MonitorBeat.dying();
        BreakoutGame.HeartBeat.play();
        // ******************** Animation and Audio Demo ********************
	},
	
	createBrickRows: function () {
	    this.game.clearGameObjects();
	    GameFramework.clearArray(this.bricks);
		
	    var topMargin = 15;
	    
	    var bigBrick = new BreakoutGame.BigWhiteBrick();
        this.game.addGameObject(bigBrick);
		this.bigBrick = bigBrick;
        bigBrick.transform.x = this.canvas.width / 2;
        bigBrick.transform.y = bigBrick.boundingBox().height / 2 + topMargin;
		
		var self = this;
		this.bigBrick.onDestroyed = function () {
			self.onBigBrickDestroyed();
		};
        
        // first brick collumn
        var brickY = bigBrick.boundingBox().y;
        var brickTopMargin = 28;
        var brickRightMargin = 10;
        
        for (var i = 0; i < 5; i++) {
            var index = (i * 4) <= 12 ? i * 4 : 19;
            var brick = new BreakoutGame.Brick(index);
            this.game.addGameObject(brick);
			this.bricks.push(brick);
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
			this.bricks.push(brick);
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
			this.bricks.push(brick);
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
			this.bricks.push(brick);
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
				this.bricks.push(brick);
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
	
	createBall: function () {
		this.ball = new BreakoutGame.Ball(this.player);
		this.game.addGameObject(this.ball);
		this.ball.transform.x = this.player.transform.x;
		this.ball.transform.y = this.player.transform.y -
								this.player.boundingBox().height / 2.0 -
								this.ball.boundingBox().height / 2.0;
		
		if (this.gamePhysics) {
			this.gamePhysics.ball = this.ball;
		}
	},
	
	createPhysicsManager: function () {
		this.gamePhysics = new BreakoutGame.GamePhysics(this.canvas, 
														this.bricks, 
														this.bigBrick, 
														this.player, 
														this.ball);
		this.game.addGameObject(this.gamePhysics);
		
		var self = this;
		this.gamePhysics.onPlayerLooseLife = function () { 
			self.onPlayerLooseLife();
		};
		this.gamePhysics.onBallHitBrick = function (arg) {
			self.onBallHitBrick(arg);
		};
		
		this.gamePhysics.start();
	},
	
	setUpLives: function () {
		for (var i = 0; i < this.playerLives; i++) {
			var sprite = GameFramework.SpriteFactory.spriteFromTexture("images/player_life.png");
			this.game.addGameObject(sprite);
			this.heartSprites.push(sprite);
			sprite.transform.x = this.canvas.width - (sprite.boundingBox().width + 5) * (this.playerLives - i);
			sprite.transform.y = this.canvas.height - sprite.boundingBox().height;
			GameFramework.Animation.play(new GameFramework.PropertyAnimation(this.heartSprites[i], "opacity", 0.0, 1.0, 500 * (this.playerLives - i), GameFramework.Easing.Type.Linear));
		}
	},
	
	createSoundManager: function () {
		this.gameSound = new BreakoutGame.GameSound(this.bricks, this.bigBrick, this.player);
		this.game.addGameObject(this.gameSound);
		this.gameSound.heartSoundFrequence = 1000.0;
	},
	
	onPlayerLooseLife: function () {
		if (--this.playerLives >= 0) {
			var heart = this.heartSprites[0];
			this.game.removeGameObject(heart);
			GameFramework.removeObjectFromArray(this.heartSprites, heart);
			
			if (this.playerLives != 0) {
				var self = this;
				setTimeout(function () {
					self.createBall();
				}, 1000);
			} else {
				this.player.onGameOver();
				this.showGameRetryScreen();
			}
		}
		
		this.game.removeGameObject(this.ball);
		this.ball = null;
	},
	
	onBallHitBrick: function (brick) {
		this.game.removeGameObject(brick);
		GameFramework.removeObjectFromArray(this.bricks, brick);
		
		if (this.bricks.length == 0) {
			this.player.slowDownGlowAnimation();
			this.gameSound.heartSoundFrequence = 2000;
		}
	},
	
	onBigBrickDestroyed: function () {
	    var self = this;
		this.player.onGameWin();
		this.ball.onGameOver();
		this.gamePhysics.stop();		
		this.gameSound.playGameWinSound();
		this.gameSound.heartSoundFrequence = -1;
		
		for (var i = 0; i < this.heartSprites.length; i++) {
			GameFramework.Animation.play(new GameFramework.PropertyAnimation(this.heartSprites[i],
			                             "opacity",
			                             1.0,
			                             0.0,
			                             500 * i,
			                             GameFramework.Easing.Type.Linear,
			                             i == this.heartSprites.length ? function () {
			                                 self.showGameWinScreen();
			                             } : null));
		}
		
		this.showGameWinScreen();
	},
	
	onResourceLoaded: function () {
		if (--this._resourcesLoadCount <= 0)
			this.showStartScreen();
	}
};
