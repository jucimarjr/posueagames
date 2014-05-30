State.Play = function() {
    var map, layer, hero;
};

State.Play.prototype = {
    preload:function() {
        game.load.tilemap('map', Level.tilemap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', Level.tilemap.tilePath);
        game.load.image('bg', Level.bg.path);
        game.load.image('hero', Hero.path);
    },

    create:function(){
        game.physics.startSystem(Phaser.Game.ARCADE);
        game.physics.arcade.gravity.y=800;

        bg = game.add.sprite(Level.bg.x, Level.bg.y, 'bg');
        bg.fixedToCamera = true;

        map = game.add.tilemap('map');
        map.addTilesetImage('tileset','tileset');

        layer = map.createLayer(Level.tilemap.layer);
        layer.resizeWorld();
        map.setCollisionBetween(Level.tilemap.collisionStart, Level.tilemap.collisionEnd, true, Level.tilemap.layer);

        hero = game.add.sprite(10,game.world.height - 200,'hero');
        hero.anchor.setTo(.5,.5);
        game.physics.enable(hero, Phaser.Physics.ARCADE);

        hero.body.collideWorldBounds = true;
        hero.body.drag.x = Hero.dragX;
        hero.body.gravity.y = Hero.gravityY;
        game.camera.follow(hero);
    },

    update:function(){
        game.physics.arcade.collide(layer, hero);

        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            hero.body.velocity.x = Hero.velocityX;
            hero.scale.x = +1;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            hero.body.velocity.x = -Hero.velocityX;
            hero.scale.x = -1;
        } else {
            // TODO quando o herói fica parado
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            if(hero.body.onFloor()) {
                hero.body.velocity.y = Hero.jump;
            }
        }
    }

}