BasicGame.EndGame = function () {
    this.player;
    this.breakup;
    this.breakupBoundingBox;
    this.endMessage;
    this.tryAgainButton;
};

BasicGame.EndGame.fontSize = 40;
BasicGame.EndGame.breakupGameUrl = 'http://computacao.uea.edu.br/ludus/posueagames/felipepb/breakout';

BasicGame.EndGame.prototype = {

    create: function () {
        var cameraWidth = this.game.camera.width;
        var cameraHeight = this.game.camera.height;
        var fontSize = BasicGame.EndGame.fontSize;
        var leftMargin = 229;
        var topMargin = 60
        var windowWidth = 620;
        var windowHeight = 440;

        // background
        this.game.add.sprite(0, 0, 'endGame');
        
        // player
        this.player = this.game.add.bitmapText(0, 0,
                                               'silkscreenblue',
                                               BasicGame.MainMenu.playerName,
                                               fontSize);
        this.player.x = leftMargin + windowWidth / 2.0 - this.player.textWidth / 2.0;
        this.player.y = topMargin + 30;
       
        // break up link
        this.breakup = this.game.add.bitmapText(0, 0,
                                                'silkscreenblue',
                                                'broke up',
                                                fontSize);
                                                    
        this.breakup.x = this.player.x + this.player.textWidth / 2.0 - this.breakup.textWidth / 2.0;
        this.breakup.y = this.player.y + this.player.textHeight + 10;
        
        // break up bounding box
        this.breakupBoundingBox = new Phaser.Rectangle(this.breakup.x, this.breakup.y,
                                                       this.breakup.textWidth, this.breakup.textHeight);
        
        // end message
        this.endMessage = this.game.add.bitmapText(0, 0,
                                                   'silkscreenblue',
                                                   'with ' + BasicGame.MainMenu.belovedName,
                                                   fontSize);
        this.endMessage.x = this.breakup.x + this.breakup.textWidth / 2.0 - this.endMessage.textWidth / 2.0;
        this.endMessage.y = this.breakup.y + this.breakup.textHeight + 10;
        
        // try again button
        this.tryAgainButton = this.game.add.button((cameraWidth - 314) / 2.0 + 50, cameraHeight - 210,
                                                   'tryAgain',
                                                   this.onTryAgainButtonClicked,
                                                   this,
                                                   'buttonTryAgainHover_314-66.png',
                                                   'buttonTryAgainNone_314-66.png',
                                                   'buttonTryAgainActive_314-66.png');
    },
    
    update: function () {
        var pointer = this.game.input.activePointer;
        if (pointer.isDown) {
            if (this.breakupBoundingBox.contains(pointer.x, pointer.y)) {
                this.showBreakUpGame();
            }
        }
    },
    
    showBreakUpGame: function () {
        window.location.href = BasicGame.EndGame.breakupGameUrl;
    },
    
    onTryAgainButtonClicked: function (button) {
        window.location.reload();
    }
};
