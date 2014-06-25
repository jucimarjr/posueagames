Game.PauseController = function (gameState) {
	this.gameState = gameState;
	this.game = gameState.game;
	this.group;
	
	this.redPauseText;
	this.regularPauseText;
	this.regularPauseTextBoundingBox;
	
	this.redContinueText;
	this.regularContinueText;
	this.regularContinueTextBoundingBox;
	
	this.redRetryLevelText;
	this.regularRetryLevelText;
	this.regularRetryLevelTextBoundingBox;
	
	this.redMainMenuText;
	this.regularMainMenuText;
	this.regularMainMenuTextBoundingBox;
};

Game.PauseController.prototype = {
	create: function () {
		var fontSize = ScreensConsts.fontSize * 0.4;
        var cameraWidth = this.game.camera.width;
        var cameraHeight = this.game.camera.height;
		
		this.createGroup();
		
		this.regularPauseText = this.game.add.bitmapText(cameraWidth - 120,
                                                         cameraHeight - 35,
                                                         'silkscreenGray',
                                                         '( )ause',
                                                         fontSize);
		this.regularPauseText.fixedToCamera = true;
        this.regularPauseTextBoundingBox = new Phaser.Rectangle(this.regularPauseText.x, this.regularPauseText.y,
                                                                this.regularPauseText.textWidth, this.regularPauseText.textHeight);

        this.redPauseText = this.game.add.bitmapText(this.regularPauseText.x,
                                                     this.regularPauseText.y,
                                                     'silkscreenRed',
                                                     'p',
                                                     fontSize);
        this.redPauseText.x += (this.redPauseText.textWidth / 2.0) * 1.1;
		this.redPauseText.fixedToCamera = true;
		
		this.visible(false);
		
		this.game.input.keyboard.addCallbacks(this, this.handleInput);
	},
	
	createGroup: function () {
		var fontSize = ScreensConsts.fontSize;
        var cameraWidth = this.game.camera.width;
        var cameraHeight = this.game.camera.height;

		this.group = this.game.add.group(undefined, 'pause-controller', true);
		this.group.create(0, 0, 'gamePaused');
		
		// <game paused>
		var gamePausedTitle = new Phaser.BitmapText(this.game, 0, 0, 'silkscreenWhite', '<game paused>', fontSize);
		gamePausedTitle.x = (cameraWidth - gamePausedTitle.textWidth) / 2.0;
		gamePausedTitle.y = 60;
		this.group.add(gamePausedTitle);
		
		fontSize *= 0.55;
		var margin = 60;
		
		// (c)ontinue
		this.regularContinueText = new Phaser.BitmapText(this.game,
		                                                 margin, gamePausedTitle.y + gamePausedTitle.textHeight + 50,
														 'silkscreenWhite',
														 '( )ontinue',
														 fontSize);
		this.redContinueText = new Phaser.BitmapText(this.game,
		                                             this.regularContinueText.x,
                                                     this.regularContinueText.y,
                                                     'silkscreenRed',
                                                     'c',
                                                     fontSize);
        this.redContinueText.x += (this.redContinueText.textWidth / 2.0);
		this.regularContinueTextBoundingBox = new Phaser.Rectangle(this.regularContinueText.x, this.regularContinueText.y,
                                                                   this.regularContinueText.textWidth, this.regularContinueText.textHeight);
		
		this.group.add(this.redContinueText);
		this.group.add(this.regularContinueText);
		
		// (r)etry level
		this.regularRetryLevelText = new Phaser.BitmapText(this.game, 0, this.regularContinueText.y, 'silkscreenWhite',
                                                           '( )etry level',
                                                           fontSize);
        this.regularRetryLevelText.x = (cameraWidth - this.regularRetryLevelText.textWidth) / 2.0;
        this.redRetryLevelText = new Phaser.BitmapText(this.game,
                                                       this.regularRetryLevelText.x,
                                                       this.regularRetryLevelText.y,
                                                       'silkscreenRed',
                                                       'r',
                                                       fontSize);
		this.redRetryLevelText.x += (this.redRetryLevelText.textWidth / 2.0);
		this.regularRetryLevelTextBoundingBox = new Phaser.Rectangle(this.regularRetryLevelText.x, this.regularRetryLevelText.y,
                                                                     this.regularRetryLevelText.textWidth, this.regularRetryLevelText.textHeight);
        
        this.group.add(this.redRetryLevelText);
        this.group.add(this.regularRetryLevelText);
		
		// (m)ain menu
		this.regularMainMenuText = new Phaser.BitmapText(this.game, 0, this.regularContinueText.y, 'silkscreenWhite',
                                                         '( )ain menu',
                                                         fontSize);
		this.regularMainMenuText.x = cameraWidth - this.regularMainMenuText.textWidth - margin;
		this.redMainMenuText = new Phaser.BitmapText(this.game,
                                                     this.regularMainMenuText.x,
                                                     this.regularMainMenuText.y,
                                                     'silkscreenRed',
                                                     'm',
                                                     fontSize);
        this.redMainMenuText.x += (this.redMainMenuText.textWidth / 2.0) * 0.7;
		this.regularMainMenuTextBoundingBox = new Phaser.Rectangle(this.regularMainMenuText.x, this.regularMainMenuText.y,
                                                                   this.regularMainMenuText.textWidth, this.regularMainMenuText.textHeight);
        
        this.group.add(this.redMainMenuText);
        this.group.add(this.regularMainMenuText);
	},

    visible: function (value) {
		if (value === undefined)
            return this.group.visible;
		this.group.visible = value;
		
		if (value) {
			this.redPauseText.alpha = 0;
			this.regularPauseText.alpha = 0;
		    this.game.paused = true;
		} else {
			this.redPauseText.alpha = 1
			this.regularPauseText.alpha = 1;
			this.game.paused = false;
		}
	},
	
	handleInput: function (args) {
        var keyCode = args.keyCode;
        var letter = String.fromCharCode(keyCode);
        
		if (!this.gameState.stageComplete && this.gameState.hud && this.gameState.playerLife() >= 0) {
			if (!this.group.visible) {
				if (letter == 'P') {
				    this.visible(true);
				}
			} else {
				if (letter == 'C') {
				    this.visible(false);
				} else if (letter == 'R') {
					this.navigateToGameState();
				} else if (letter == 'M') {
					this.navigateToMainMenuState();
				}
			}
		}

		args.preventDefault();
    },

	update: function () {
		var pointer = this.game.input.activePointer;

        if (!this.gameState.stageComplete && this.gameState.hud && this.gameState.playerLife() >= 0 &&
		    pointer.isDown) {
            if (!this.group.visible) {
                if (this.regularPauseTextBoundingBox.contains(pointer.x, pointer.y)) {
                    this.visible(true);
                }
			}
		}
	},
	
	pauseUpdate: function () {
		var pointer = this.game.input.activePointer;
		if (pointer.isDown) {
			if (this.regularContinueTextBoundingBox.contains(pointer.x, pointer.y)) {
                this.visible(false);
            } else if (this.regularRetryLevelTextBoundingBox.contains(pointer.x, pointer.y)) {
				this.navigateToGameState();
			} else if (this.regularMainMenuTextBoundingBox.contains(pointer.x, pointer.y)) {
				this.navigateToMainMenuState();
			}
		}
	},
	
	navigateToGameState: function () {
		this.navigate('GameState');
	},
	
	navigateToMainMenuState: function () {
	    this.navigate('MainMenuState');
	},
	
	navigate: function (state) {
		this.game.paused = false;
        this.visible(false);
        this.group.destroy();
        this.gameState.navigate(state);
	}
};
