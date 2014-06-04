var LevelBase = {
    tilemap : {
        path : 'assets/maps/',
        layer:'layer',
        objects : 'objects',
        collisionStart:0,
        collisionEnd:2,
        weapon1:4,
        weapon2:5,
        weapon3:6,
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
    this.weapons,
    this.map,
    this.escadas;
}

Level.prototype = {
    preload : function() {
        this.game.load.tilemap('map', this.level.tilemap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', this.level.tilemap.tilePath);
        this.game.load.image('bg', this.level.bg.path);
        this.game.load.image('escada', LevelBase.tilemap.stair);
        this.game.load.image('weapon1', Weapon1.weaponImg);
        this.game.load.image('weapon2', Weapon2.weaponImg);
        this.game.load.image('weapon3', Weapon3.weaponImg);
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

        // criar armas
        this.weapons = this.game.add.group();
        this.weapons.enableBody = true;
        this.map.createFromObjects('objects', 5, 'weapon1', 0, true, false, this.weapons);
        this.map.createFromObjects('objects', 6, 'weapon2', 0, true, false, this.weapons);
        this.map.createFromObjects('objects', 7, 'weapon3', 0, true, false, this.weapons);
        this.weapons.forEach(function(weapon) {weapon.body.allowGravity = false}, this);

        //cria escadas
        this.escadas = game.add.group();
        this.escadas.enableBody = true;
        this.map.createFromObjects(LevelBase.tilemap.objects, 4, 'escada', 0, true, false, this.escadas);

        this.escadas.forEach(function(escada) {
                escada.body.allowGravity = false
        }, this);
    },

    update : function(hero) {
        this.upStair(hero, this.checkOverlap(this.escadas, hero.hero));
        this.game.physics.arcade.overlap(this.weapons, hero.hero, this.grabsGun, null, this);
    },

    checkOverlap : function(group, hero) {
        return Phaser.Rectangle.intersects(group.getBounds(), hero.getBounds());
    },

    upStair : function(hero, bool){
        hero.climb(bool);
    },

    grabsGun : function(hero, weapon) {
        weapon.kill();
    },
	updateEnemyAttack : function(enemy,hero){
		var muduloHero = Math.round(Math.abs(hero.hero.body.x));
		enemy.enemies.forEach(function(enemy){
			var moduloEnemy =  Math.round(Math.abs(enemy.body.x));
			
			if(Math.abs(moduloEnemy - muduloHero) < 300){
				
			}
		},this);
	}
}