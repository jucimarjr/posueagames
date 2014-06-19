Game.PreloaderState = function () {
    this.preloadBar = null;
    this.ready = false;
};

Game.PreloaderState.prototype = {

    preload: function () {
        this.game.add.image(0, 0, 'gameLoading');
		this.game.add.image(this.game.camera.width / 2.0 - 562 / 2.0,
                            this.game.camera.height - 60 - 40, 'progressbarEmpty');
        this.preloadBar = this.game.add.sprite(this.game.camera.width / 2.0 - 562 / 2.0,
                                               this.game.camera.height - 60 - 40, 'progressbarFilled');
											   
        Utils.fadeOutScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeOutDuration, null);

        //  This sets the preloadBar sprite as a loader sprite.
        //  What that does is automatically crop the sprite from 0 to full-width
        //  as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        // Tile Maps
        this.game.load.tilemap('map', 'assets/game/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('walls_tileset', 'assets/game/tilemaps/tiles/walls_tileset.png');
        
        // Images
        this.game.load.image('smoke_particle_small', 'assets/game/smoke_particle_8-8.png');
        this.game.load.image('light', 'assets/game/light.png');
		this.game.load.image('block', 'assets/game/block.png');

        // Game Atlas
        this.game.load.atlas('main_sprite_atlas', 'assets/game/spriteatlases/main_sprite_atlas.png', 'assets/game/spriteatlases/main_sprite_atlas.json');

        // Player
        this.game.load.atlas('main_sprite_atlas',
		                     'assets/game/spriteatlases/main_sprite_atlas.png',
							 'assets/game/spriteatlases/main_sprite_atlas.json');
							 
        // Main Menu
		this.game.load.image('gameStart', 'assets/screens/gamestart_960-600.png');
		
		// Credits
		this.game.load.image('credits', 'assets/screens/creditsnicks_960-600.png');
		
		// Fonts
		this.game.load.bitmapFont('silkscreenRed', 'assets/fonts/silkscreen_red.png', 'assets/fonts/silkscreen_red.fnt');
		this.game.load.bitmapFont('silkscreenGray', 'assets/fonts/silkscreen_gray.png', 'assets/fonts/silkscreen_gray.fnt');
    },

    create: function () {
        this.preloadBar.cropEnabled = false;
		var delayTween = this.game.add.tween(this.preloadBar);
		delayTween.to(null, 3000, Phaser.Easing.Linear.None, true, 0);
		delayTween.onComplete.add(this.onReady, this);
    },
	
	onReady: function () {
		this.ready = true;
	},

    update: function () {
		var self = this;
        if (self.ready) {
			Utils.fadeInScreen(this.game, TweensConsts.fadeFillStyle, TweensConsts.fadeInDuration, function () {
	            self.state.start('MainMenuState');
	        });
		}
    }
};
