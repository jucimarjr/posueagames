State.Play = function() {
    var map, layer, hero;
};

State.Play.prototype = {
    preload:function() {
        game.load.tilemap('map', Level.tilemap.path, null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', Level.tileset.path);
        game.load.image('bg', Level.bg.path);
        game.load.image('hero', Hero.path);
    },

    create:function(){
        game.physics.startSystem(Phaser.Game.ARCADE);
        game.physics.arcade.gravity.y=800;

        bg = game.add.sprite(0,0,'bg');
        bg.fixedToCamera = true;

        map = game.add.tilemap('map');
        map.addTilesetImage('tileset','tileset');

        layer = map.createLayer('Camada de Tiles 1');
        layer.resizeWorld();
        map.setCollisionBetween(0, 2, true, 'Camada de Tiles 1');

        hero = game.add.sprite(10,game.world.height - 200,'hero');
        game.physics.enable(hero, Phaser.Physics.ARCADE);

        hero.body.collideWorldBounds = true;
    },

    update:function(){
        game.physics.arcade.collide(layer, hero);
    }

}