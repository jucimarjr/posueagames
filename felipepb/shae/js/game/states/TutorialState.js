Game.TutorialState = function () {
    this.redBackText;
    this.regularBackText;
    this.regularBackTextBoundingBox;
};

Game.TutorialState.prototype = {
    preload: function () {
        this.game.add.image(0, 0, 'gameLoading');
		
		Utils.fadeOutScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeOutDuration, null);
		
		var self = this;
        this.game.input.keyboard.onDownCallback = function (args) {
            self.handleInput(args);
        };
    },
    
    create: function() {
        var fontSize = ScreensConsts.fontSize * 0.6;
        var cameraWidth = this.game.camera.width;
        var cameraHeight = this.game.camera.height;
        // back button
        this.regularBackText = this.game.add.bitmapText(cameraWidth - 160,
                                                        25,
                                                        'silkscreenGray',
                                                        '( )ack',
                                                        fontSize);
        this.regularBackTextBoundingBox = new Phaser.Rectangle(this.regularBackText.x, this.regularBackText.y,
                                                               this.regularBackText.textWidth, this.regularBackText.textHeight);

        this.redBackText = this.game.add.bitmapText(this.regularBackText.x,
                                                    this.regularBackText.y,
                                                    'silkscreenRed',
                                                    'b',
                                                    fontSize);
        this.redBackText.x += (this.redBackText.textWidth / 2.0) * 1.1;
    },
    
    update: function () {
        var pointer = this.game.input.activePointer;
        var regularBackTextBoundingBox = this.regularBackTextBoundingBox;
        
        if (pointer.isDown) {
            if (regularBackTextBoundingBox.contains(pointer.x, pointer.y)) {
                this.navigateToMainMenu();
            }
        }
    },
	
	handleInput: function (args) {
		args.preventDefault();

        var keyCode = args.keyCode;
        var letter = String.fromCharCode(keyCode);
        
        if (letter == 'B' ||
            keyCode == Phaser.Keyboard.BACKSPACE ||
            keyCode == Phaser.Keyboard.SPACEBAR) {
            this.navigateToMainMenu();
        }
    },
	
	navigateToMainMenu: function () {
		var self = this;
		self.game.input.keyboard.onDownCallback = null;
		Utils.fadeInScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeInDuration, function () {
            self.state.start('MainMenuState');
        });
	}
};
