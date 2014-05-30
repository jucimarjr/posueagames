State.Play = function() {
    var map, layer, hero, cursors, bulletGroup;
};

State.Play.prototype = {
    preload:function() {
        game.load.atlasJSONHash('hero', Hero.path, Hero.json);
        game.load.tilemap('map', Level.tilemap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', Level.tilemap.tilePath);
        game.load.image('bg', Level.bg.path);
        game.load.image('bullet', 'assets/images/hero/bullet.png');
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
        hero.animations.add(Hero.animations.run.name, Hero.animations.run.frames, 6, true);
        hero.anchor.setTo(.5,.5);
        game.physics.enable(hero, Phaser.Physics.ARCADE);

        hero.body.collideWorldBounds = true;
        hero.body.drag.x = Hero.dragX;
        hero.body.gravity.y = Hero.gravityY;
        game.camera.follow(hero);

        bulletGroup = game.add.group();
        for(var i = 0; i < Weapon.number_of_bullets; i++) {
            bullet = game.add.sprite(0,0,'bullet');
            bulletGroup.add(bullet);
            bullet.anchor.setTo(.5,.5);
            game.physics.enable(bullet, Phaser.Physics.ARCADE);
            bullet.kill();
        }

        cursors = game.input.keyboard.createCursorKeys();
    },

    update:function(){
        game.physics.arcade.collide(layer, hero);

        if (cursors.right.isDown) {
            hero.body.velocity.x = Hero.velocityX;
            hero.scale.x = +1;
            hero.animations.play(Hero.animations.run.name);
        } else if (cursors.left.isDown) {
            hero.body.velocity.x = -Hero.velocityX;
            hero.scale.x = -1;
            hero.animations.play(Hero.animations.run.name);
        } else {
            hero.animations.stop();
            hero.frame = 0;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            this.shoot();
        }

        if(cursors.up.isDown) {
            if(hero.body.onFloor()) {
                hero.body.velocity.y = Hero.jump;
            }
        }
    },

    shoot:function(){
        if(this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
        if(game.time.now - this.lastBulletShotAt < Weapon.shot_delay) return;

        bullet = bulletGroup.getFirstDead();

        if(bullet === null || bullet === undefined) return;

        bullet.revive();

        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;

        bullet.reset(hero.x, hero.y);

        bullet.body.velocity.x = Weapon.bullet_speed;
        bullet.body.velocity.y = 0;
        bullet.body.allowGravity = false;
    }

}