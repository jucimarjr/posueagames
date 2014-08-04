var BasicGame = {};

BasicGame.Boot = function (game) {
	this.ludusImage;
    this.sponsorImage;
};

BasicGame.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'assets/promo_960-600.png');
        this.load.image('preloaderBar', 'assets/hit.png');
        
        this.load.image('ludusSplash', 'assets/ludussplash_960-600.png');
        this.load.image('sponsor', 'assets/sponsor_960-600.png');
    },

    create: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        } else {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }
        
        this.sponsorImage = this.game.add.image(0, 0, 'sponsor');
        this.ludusImage = this.game.add.image(0, 0, 'ludusSplash');
        
        var ludusImagePauseAnimation = this.game.add.tween(this.ludusImage);
		ludusImagePauseAnimation.to(null, 3000, Phaser.Easing.Linear.None, true, 0);
		ludusImagePauseAnimation.onComplete.add(function () {
			var ludusImageAnimation = this.game.add.tween(this.ludusImage);
			ludusImageAnimation.to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0);
            ludusImageAnimation.onComplete.add(this.onLudusImageAnimationCompleted, this);
		}, this);
    },
    
    onLudusImageAnimationCompleted: function () {
        var sponsorImageAnimation = this.game.add.tween(this.sponsorImage);
        sponsorImageAnimation.to(null, 2000, Phaser.Easing.Linear.None, true, 0);
        sponsorImageAnimation.onComplete.add(this.onSponsorImageAnimationCompleted, this);
    },
    
    onSponsorImageAnimationCompleted: function () {
		var self = this;
		Utils.fadeInScreen(this.game, 300, 300, function () {
			//  By this point the preloader assets have loaded to the cache, we've set the game settings
	        //  So now let's start the real preloader going
            self.state.start('Preloader');
        });
    }
};