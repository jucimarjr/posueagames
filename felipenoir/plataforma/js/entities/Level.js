var LevelBase = {
    tilemap : {
        path : 'assets/maps/',
        layer:'layer',
        objects : 'objects',
        collisionStart:0,
        collisionEnd:2,
        stair : 'assets/images/escada.png'
    },
    bg : {
        path : 'assets/images/level/',
        x:0,
        y:0
    }
}

var Level1 = {
    tilemap:{
        jsonPath : LevelBase.tilemap.path + 'level1.json',
        tilePath : LevelBase.tilemap.path + 'tile_base.png'
    },
    bg:{
        path : LevelBase.bg.path + 'bg1.jpg'
    }
};

var Level2 = {
    tilemap:{
        jsonPath : LevelBase.tilemap.path + 'level2.json',
        tilePath : LevelBase.tilemap.path + 'tile_base.png'
    },
    bg:{
        path : LevelBase.bg.path + 'bg2.jpg'
    }
};

function Level(game, level) {
    this.game = game,
    this.level = level,
    this.layer,
    this.map,
    this.escadas;
}

Level.prototype = {
    preload : function() {
        this.game.load.tilemap('map', this.level.tilemap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', this.level.tilemap.tilePath);
        this.game.load.image('bg', this.level.bg.path);
        this.game.load.image('escada', LevelBase.tilemap.stair);
    },

    create : function() {
        // background
        bg = this.game.add.sprite(LevelBase.bg.x, LevelBase.bg.y, 'bg');
        bg.fixedToCamera = true;

        // mapa
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tileset','tileset');

        this.layer = this.map.createLayer(LevelBase.tilemap.layer);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(LevelBase.tilemap.collisionStart, LevelBase.tilemap.collisionEnd, true, LevelBase.tilemap.layer);

        //cria escadas
        this.escadas = game.add.group();
        this.escadas.enableBody = true;
        this.map.createFromObjects(LevelBase.tilemap.objects, 4, 'escada', 0, true, false, this.escadas);

        this.escadas.forEach(function(escada) {
                escada.body.allowGravity = false
        }, this);
    },

    update : function(hero) {
        this.upStair(hero, this.escadas, this.checkOverlap(this.escadas, hero.hero));
//        this.game.physics.arcade.overlap(this.escadas, hero.hero, this.upStair, null, this);
    },

    checkOverlap : function(group, hero) {
        return Phaser.Rectangle.intersects(group.getBounds(), hero.getBounds());
    },

    upStair : function(hero, stair, bool){
        if(bool){
            hero.hero.body.allowGravity = false;
            if(cursors.up.isDown || cursors.down.isDown) {
                hero.climb();
            } else if (cursors.up.isUp || cursors.down.isUp) {
                hero.hero.body.velocity.y = 0;
            }
        } else {
            hero.hero.body.allowGravity = true;
        }
    }
}