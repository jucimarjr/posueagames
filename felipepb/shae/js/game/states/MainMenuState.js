Game.MainMenuState = function () {
    this.redPlayText;
	this.regularPlayText;
	this.regularPlayTextBoundingBox;
	
	this.redTutorialText;
	this.regularTutorialText;
	this.regularTutorialTextBoundingBox;
	
	this.redCreditsText;
	this.regularCreditsText;
	this.regularCreditsTextBoundingBox;
};

Game.MainMenuState.prototype = {
    preload: function () {
		this.game.add.image(0, 0, 'gameStart');
		
		var self = this;
        this.game.input.keyboard.onDownCallback = function (args) {
            self.handleInput(args);
        };
	},
	
	create: function () {
		var fontSize = ScreensConsts.fontSize;
		var cameraWidth = this.game.camera.width;
		var cameraHeight = this.game.camera.height;
		var buttonMargin = 10;
        
		// play
		this.regularPlayText = this.game.add.bitmapText(cameraWidth - 450,
		                                                cameraHeight - 250,
														'silkscreenGray',
														'( )lay',
														fontSize);
		this.regularPlayTextBoundingBox = new Phaser.Rectangle(this.regularPlayText.x, this.regularPlayText.y,
                                                               this.regularPlayText.textWidth, this.regularPlayText.textHeight);
        
		// tutorial
		this.regularTutorialText = this.game.add.bitmapText(this.regularPlayText.x,
		                                                    this.regularPlayText.y + this.regularPlayText.textHeight + buttonMargin,
															'silkscreenGray',
															'( )utorial',
															fontSize);
		this.regularTutorialTextBoundingBox = new Phaser.Rectangle(this.regularTutorialText.x, this.regularTutorialText.y,
                                                                   this.regularTutorialText.textWidth, this.regularTutorialText.textHeight);

        // credits
		this.regularCreditsText = this.game.add.bitmapText(this.regularTutorialText.x,
													       this.regularTutorialText.y + this.regularTutorialText.textHeight + buttonMargin,
													       'silkscreenGray',
													       '( )redits',
													       fontSize);
        this.regularCreditsTextBoundingBox = new Phaser.Rectangle(this.regularCreditsText.x, this.regularCreditsText.y,
                                                                  this.regularCreditsText.textWidth, this.regularCreditsText.textHeight);
        
		// play
	    this.redPlayText = this.game.add.bitmapText(this.regularPlayText.x,
                                                    this.regularPlayText.y,
                                                    'silkscreenRed',
                                                    'p',
                                                    fontSize);
        this.redPlayText.x += (this.redPlayText.textWidth / 2.0) * 1.1;
		
		// tutorial
		this.redTutorialText = this.game.add.bitmapText(this.regularTutorialText.x,
                                                        this.regularTutorialText.y,
                                                        'silkscreenRed',
                                                        't',
                                                        fontSize);
        this.redTutorialText.x += (this.redTutorialText.textWidth / 2.0) * 1.4;
		
		// credits
		this.redCreditsText = this.game.add.bitmapText(this.regularCreditsText.x,
                                                       this.regularCreditsText.y,
                                                       'silkscreenRed',
                                                       'c',
                                                       fontSize);
        this.redCreditsText.x += (this.redCreditsText.textWidth / 2.0);
		
		Utils.fadeOutScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeOutDuration, null);
    },
	
	handleInput: function (args) {
        var keyCode = args.keyCode;
        var letter = String.fromCharCode(keyCode);
		
		switch (letter) {
			case 'P':
			    this.navigateToGameplay();
                break;
			case 'T':
			    this.navigateToTutorial();
			    break;
			case 'C':
			    this.navigateToCredits();
			    break;
		}
		
		args.preventDefault();
	},

	navigateToGameplay: function () {
		var self = this;
        self.game.input.keyboard.onDownCallback = null;
        Utils.fadeInScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeInDuration, function () {
        	Game.GameState.currentLevel = 0;
            self.state.start('GameState');
        });
	},

	navigateToTutorial: function () {
        var self = this;
        self.game.input.keyboard.onDownCallback = null;
	    Utils.fadeInScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeInDuration, function () {
            self.state.start('TutorialState');
        });
	},

	navigateToCredits: function () {
		var self = this;
        self.game.input.keyboard.onDownCallback = null;
		Utils.fadeInScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeInDuration, function () {
            self.state.start('CreditsState');
        });
	},
	
	update: function () {
        var pointer = this.game.input.activePointer;
		var regularPlayTextBoundingBox = this.regularPlayTextBoundingBox;
		var regularTutorialTextBoundingBox = this.regularTutorialTextBoundingBox;
		var regularCreditsTextBoundingBox = this.regularCreditsTextBoundingBox;
		
		if (pointer.isDown) {
            if (regularPlayTextBoundingBox.contains(pointer.x, pointer.y)) {
                this.navigateToGameplay();
            } else if (regularTutorialTextBoundingBox.contains(pointer.x, pointer.y)) {
                this.navigateToTutorial();
            } else if (regularCreditsTextBoundingBox.contains(pointer.x, pointer.y)) {
                this.navigateToCredits();
            }
        }
	}
};
