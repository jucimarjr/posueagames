Game.GameWinState = function () {
	
};

Game.GameWinState.prototype = {
	preload: function () {
        this.game.add.image(0, 0, 'gameWin');
        
        Utils.fadeOutScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeOutDuration, null);
        
        var self = this;
        this.game.input.keyboard.onDownCallback = function (args) {
            self.handleInput(args);
        };
    },
    
    create: function() {
        
    },
    
    update: function () {
        
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
