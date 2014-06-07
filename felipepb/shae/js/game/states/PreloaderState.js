Game.PreloaderState = function () {

    // this.background = null;
    // this.preloadBar = null;

    this.ready = false;

};

Game.PreloaderState.prototype = {

    preload: function () {

        // Tile Maps
        this.game.load.tilemap('map', 'assets/game/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('ground_1x1', 'assets/game/tilemaps/tiles/ground_1x1.png');

        // this.game.load.image('walls_1x2', 'assets/game/tilemaps/tiles/walls_1x2.png');
        // this.game.load.image('tiles2', 'assets/game/tilemaps/tiles/tiles2.png');

        this.game.load.image('walls_1x2', 'assets/game/tilemaps/tiles/walls_1x2.png');
        this.game.load.image('tiles2', 'assets/game/tilemaps/tiles/tiles2.png');
        
        this.game.load.image('light', 'assets/game/light.png');
		this.game.load.image('block', 'assets/game/block.png');

        // Player
        this.game.load.atlas('main_sprite_atlas', 'assets/game/spriteatlases/main_sprite_atlas.png', 'assets/game/spriteatlases/main_sprite_atlas.json');

        this.ready = true;
    },

    create: function () {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        // this.preloadBar.cropEnabled = false;

    },

    update: function () {

        if (this.ready)
            this.state.start('GameState');
    }
};
