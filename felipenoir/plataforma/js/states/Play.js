State.Play = function() {
    var map, layer, hero, cursors;
};

State.Play.prototype = {
    preload:function() {
        game.load.atlasJSONHash('hero', 'assets/images/hero/h.png', 'assets/images/hero/h.json');
        game.load.tilemap('map', Level.tilemap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', Level.tilemap.tilePath);
        game.load.image('bg', Level.bg.path);
        //game.load.spritesheet('hero', Hero.path, Hero.width, Hero.height, Hero.frames);
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

        //hero = game.add.sprite(10,game.world.height - 200,'hero', 0);
        hero = game.add.sprite(10,game.world.height - 200,'hero');
        hero.animations.add('run', [1,2,3], 6, true);
        hero.anchor.setTo(.5,.5);
        game.physics.enable(hero, Phaser.Physics.ARCADE);

        hero.body.collideWorldBounds = true;
        hero.body.drag.x = Hero.dragX;
        hero.body.gravity.y = Hero.gravityY;
        game.camera.follow(hero);

        cursors = game.input.keyboard.createCursorKeys();
    },

    update:function(){
        game.physics.arcade.collide(layer, hero);

        if (cursors.right.isDown) {
            hero.body.velocity.x = Hero.velocityX;
            hero.scale.x = +1;
            hero.animations.play('run');
        } else if (cursors.left.isDown) {
            hero.body.velocity.x = -Hero.velocityX;
            hero.scale.x = -1;
            hero.animations.play('run');
        } else {
            hero.animations.stop();
            hero.frame = 0;
        }

        if(cursors.up.isDown) {
            if(hero.body.onFloor()) {
                hero.body.velocity.y = Hero.jump;
            }
        }
    }

}