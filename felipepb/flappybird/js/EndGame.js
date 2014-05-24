BasicGame.EndGame = function () {
    this.player;
    this.breakup;
    this.breakupBoundingBox;
    this.endMessage;
    this.tryAgainButton;
    this.statistics;
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
        var lastRunStats = BasicGame.GameManager.lastRunStats;

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
                                                'silkscreenred',
                                                '<broke up>',
                                                fontSize);
                                                
        var withText = this.game.add.bitmapText(0, 0,
                                                'silkscreenblue',
                                                'with',
                                                fontSize);
                                                    
        this.breakup.x = leftMargin + windowWidth / 2.0 - (this.breakup.textWidth + withText.textWidth) / 2.0;
        this.breakup.y = this.player.y + this.player.textHeight + 10;
        var breakupTween = this.game.add.tween(this.breakup);
        breakupTween.to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
        
        // break up bounding box
        this.breakupBoundingBox = new Phaser.Rectangle(this.breakup.x, this.breakup.y,
                                                       this.breakup.textWidth, this.breakup.textHeight);
        
        
        
        withText.x = this.breakup.x + this.breakup.textWidth + 10;
        withText.y = this.breakup.y;
                                                
        // end message
        this.beloved = this.game.add.bitmapText(0, 0,
                                                'silkscreenblue',
                                                BasicGame.MainMenu.belovedName,
                                                fontSize);
        this.beloved.x = leftMargin + windowWidth / 2.0 - this.beloved.textWidth / 2.0;
        this.beloved.y = this.breakup.y + this.breakup.textHeight + 10;
        
        // try again button
        this.tryAgainButton = this.game.add.button((cameraWidth - 314) / 2.0 + 50, cameraHeight - 210,
                                                   'tryAgain',
                                                   this.onTryAgainButtonClicked,
                                                   this,
                                                   'buttonTryAgainHover_314-66.png',
                                                   'buttonTryAgainNone_314-66.png',
                                                   'buttonTryAgainActive_314-66.png');
                                                   
        // last run stats
        var stats = lastRunStats.mission.stats;
        var statsLength = stats.length;
        
        if (statsLength) {
            var eventsText = this.game.add.bitmapText(10, 10, 'silkscreenblue', 'run stats\n', fontSize / 2.5);
            eventsText.align = 'left';
            
            var eventCount;
            var lastEvent = lastRunStats.mission._lastEvent;
            
            for (var i = 0; i < statsLength; i++) {
                var event = lastRunStats.mission._constEvents[i];
                event.name = event.name.replace(/\n/g," ");
                // if (i == 0)
                    // eventsText.text = event.name + ': ' + stats[i] + '\n';
                // else
                    eventsText.text += event.name + ': ' + stats[i] + '\n';
                    
                if (event.name == lastEvent.name) {
                    eventCount = stats[i];
                }
            }
        }
        
        var statistics = this.game.add.bitmapText(0, 0, 'silkscreenblue', 'because of ', fontSize / 2);
        statistics.align = 'center';
        if (eventCount) {
            statistics.text += '#' + eventCount + ' ' + lastEvent.name + '\n';
        }
        statistics.text += ' during ' + lastRunStats.mission.currentPeriod().name + '\n their love flew through '
                         + lastRunStats.distanceTravelled.toFixed(2) + 'M';
        
        this.statistics = statistics;
    },
    
    update: function () {
        var pointer = this.game.input.activePointer;
        if (pointer.isDown) {
            if (this.breakupBoundingBox.contains(pointer.x, pointer.y)) {
                this.showBreakUpGame();
            }
        }

        var statistics = this.statistics;
        statistics.x = this.tryAgainButton.x + 314 / 2.0 - statistics.textWidth / 2.0;
        statistics.y = this.tryAgainButton.y - statistics.textHeight - 40;
    },
    
    showBreakUpGame: function () {
        window.location.href = BasicGame.EndGame.breakupGameUrl;
    },
    
    onTryAgainButtonClicked: function (button) {
        window.location.reload();
    }
};
