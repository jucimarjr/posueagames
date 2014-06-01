State.Play = function() {
    var map, layer;
    this.weapon = new Weapon(game),
    this.hero = new Hero(game);
};

State.Play.prototype = {
    preload:function() {
        game.load.tilemap('map', Level.tilemap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', Level.tilemap.tilePath);
        game.load.image('bg', Level.bg.path);
        this.weapon.preload();
        this.hero.preload();
    },

    create:function(){
        game.physics.startSystem(Phaser.Game.ARCADE);
        game.physics.arcade.gravity.y=800;

        // background
        bg = game.add.sprite(Level.bg.x, Level.bg.y, 'bg');
        bg.fixedToCamera = true;

        // mapa
        map = game.add.tilemap('map');
        map.addTilesetImage('tileset','tileset');

        layer = map.createLayer(Level.tilemap.layer);
        layer.resizeWorld();
        map.setCollisionBetween(Level.tilemap.collisionStart, Level.tilemap.collisionEnd, true, Level.tilemap.layer);

        // heroi
        this.hero.create();

        // arma
        this.weapon.create();
    },

    update:function(){
        game.physics.arcade.collide(layer, this.hero.hero);
        this.hero.update();
        this.weapon.update(this.hero.hero.x, this.hero.hero.y);
    },

}