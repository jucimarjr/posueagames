BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {

        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(this.game.camera.width / 2.0 - 148 / 2.0,
                                          this.game.camera.height - 60 - 40, 'preloaderBar');

        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.atlas('playButton', 'assets/playbutton_512-256-3.png', 'assets/playbutton_512-256-3.json');
        this.load.atlas('tryAgain', 'assets/tryagain_512-256-3.png', 'assets/tryagain_512-256-3.json');
        this.load.atlas('textField', 'assets/textfield_349-52-4.png', 'assets/textfield_349-52-4.json');
        this.load.image('mainMenu', 'assets/splash_960-600.png');
        this.load.image('endGame', 'assets/endgame_960-600.png');
        this.load.atlas('mainGameAtlas', 'assets/maingameatlas_512-1024.png', 'assets/maingameatlas_512-1024.json');
        this.load.atlas('lightningAtlas', 'assets/lightningatlas_128x256.png', 'assets/lightningatlas_128x256.json');
        
  		this.load.image('backgroundColor', 'assets/backgroundcolor_960-600.png');
        
        this.load.image('backgroundPhrases', 'assets/backgroundphrases_960-600.png');
        
        this.load.image('backgroundPlanets', 'assets/backgroundplanets_960-600.png');
        this.load.image('backgroundStarsMedium', 'assets/backgroundstarsmedium_960-600.png');
        this.load.image('backgroundStarsSmall', 'assets/backgroundstarssmall_960-600.png');

        this.load.physics('physicsData', 'assets/ship_84-80.json');
        
        this.load.bitmapFont('silkscreenblue', 'assets/silkscreenblue.png', 'assets/silkscreenblue.fnt');
        this.load.bitmapFont('silkscreenred', 'assets/silkscreenred.png', 'assets/silkscreenred.fnt');
        //this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
        //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
        this.load.bitmapFont('hud_default', 'fonts/hud_default.png', 'fonts/hud_default.fnt');

        this.ready = true;
    },

    create: function () {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;

    },

    update: function () {

        //	You don't actually need to do this, but I find it gives a much smoother game experience.
        //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //	You can jump right into the menu if you want and still play the music, but you'll have a few
        //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //	it's best to wait for it to decode here first, then carry on.

        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.


        //if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
        //{
        //this.ready = true;
        //this.state.start('MainMenu');
        //}

        if (this.ready)
            this.state.start('GameManager');
    }
};
