var Level1 = {

    tilemap:{
        jsonPath:'assets/maps/level1.json',
        tilePath:'assets/maps/tile_base.png',
        layer:'layer',
        objects : 'objects',
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

var Level2 = {

    tilemap:{
        jsonPath : 'assets/maps/level2.json',
        tilePath:'assets/maps/tile_base.png',
        layer : 'layer',
        objects : 'objects',
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

function Level(game, level) {
    this.game = game,
    this.level = level,
    this.layer,
    this.map;
}

Level.prototype = {
    preload : function() {
        this.game.load.tilemap('map', this.level.tilemap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', this.level.tilemap.tilePath);
        this.game.load.image('bg', this.level.bg.path);
        this.game.load.image('escada', this.level.tilemap.stair);
    },

    create : function() {
        // background
        bg = this.game.add.sprite(this.level.bg.x, this.level.bg.y, 'bg');
        bg.fixedToCamera = true;

        // mapa
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tileset','tileset');

        this.layer = this.map.createLayer(this.level.tilemap.layer);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(this.level.tilemap.collisionStart, this.level.tilemap.collisionEnd, true, this.level.tilemap.layer);

        //cria escadas
        escadas = game.add.group();
        escadas.enableBody = true;
        this.map.createFromObjects(this.level.tilemap.objects, 4, 'escada', 0, true, false, escadas);

        escadas.forEach(function(escada) {
                escada.body.allowGravity = false
        }, this);
    }
}