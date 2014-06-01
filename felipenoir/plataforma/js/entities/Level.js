var Level1 = {

    tilemap:{
        jsonPath:'assets/maps/level1.json',
        jsonPathLevel2 : 'assets/maps/level2.json',
        tilePath:'assets/maps/tile_base.png',
        layer:'Camada de Tiles 1',
        layerFase2 : 'Tile Layer 1',
        objectFase2 : 'Object Layer 1',
        collisionStart:0,
        collisionEnd:2,
        stair : 'assets/images/escada.png'
    },

    bg:{
        path:'assets/images/level_1/bg1.jpg',
        x:0,
        y:0
    }

};

function Level(game) {
    this.game = game,
    this.layer,
    this.map;
}

Level.prototype = {
    preload : function() {
        this.game.load.tilemap('map', Level1.tilemap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', Level1.tilemap.tilePath);
        this.game.load.image('bg', Level1.bg.path);
    },

    create : function() {
        // background
        bg = this.game.add.sprite(Level1.bg.x, Level1.bg.y, 'bg');
        bg.fixedToCamera = true;

        // mapa
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tileset','tileset');

        this.layer = this.map.createLayer(Level1.tilemap.layer);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(Level1.tilemap.collisionStart, Level1.tilemap.collisionEnd, true, Level1.tilemap.layer);
    }
}