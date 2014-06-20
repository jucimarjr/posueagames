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
        this.game.load.image('spark_particle_medium', 'assets/game/particle_spark_16-16.png');
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
		
		// Game Win
		this.game.load.image('gameWin', 'assets/screens/gamewin_960-600.png');
		
		// Game Loose
		this.game.load.image('gameLoose', 'assets/screens/gameloose_960-600.png');
		
		// Fonts
		this.game.load.bitmapFont('silkscreenRed', 'assets/fonts/silkscreen_red.png', 'assets/fonts/silkscreen_red.fnt');
		this.game.load.bitmapFont('silkscreenGray', 'assets/fonts/silkscreen_gray.png', 'assets/fonts/silkscreen_gray.fnt');
		this.game.load.bitmapFont('silkscreenWhite', 'assets/fonts/silkscreen_white.png', 'assets/fonts/silkscreen_white.fnt');

		// Audio
		this.game.load.audio('gate_openned', ['audio/wav/gate_openned.wav', 'audio/mp3/gate_openned.mp3']);
		this.game.load.audio('jump_01', ['audio/wav/jump_01.wav', 'audio/mp3/jump_01.mp3']);
		this.game.load.audio('jump_02', ['audio/wav/jump_02.wav', 'audio/mp3/jump_02.mp3']);
		this.game.load.audio('jump_03', ['audio/wav/jump_03.wav', 'audio/mp3/jump_03.mp3']);
		this.game.load.audio('touchdown_01', ['audio/wav/touchdown_01.wav', 'audio/mp3/touchdown_01.mp3']);
		this.game.load.audio('touchdown_02', ['audio/wav/touchdown_02.wav', 'audio/mp3/touchdown_02.mp3']);
		this.game.load.audio('touchdown_03', ['audio/wav/touchdown_03.wav', 'audio/mp3/touchdown_03.mp3']);
		this.game.load.audio('key_collected', ['audio/wav/key_collected.wav', 'audio/mp3/key_collected.mp3']);
		this.game.load.audio('footstep_01', ['audio/wav/footstep_01.wav', 'audio/mp3/footstep_01.mp3']);
		this.game.load.audio('footstep_02', ['audio/wav/footstep_02.wav', 'audio/mp3/footstep_02.mp3']);
		this.game.load.audio('footstep_03', ['audio/wav/footstep_03.wav', 'audio/mp3/footstep_03.mp3']);
		this.game.load.audio('death_sfx', ['audio/wav/death.wav', 'audio/mp3/death.mp3']);
		this.game.load.audio('spawn_sfx', ['audio/wav/spawn.wav', 'audio/mp3/spawn.mp3']);
		this.game.load.audio('run_sfx', ['audio/wav/run.wav', 'audio/mp3/run.mp3']);
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
