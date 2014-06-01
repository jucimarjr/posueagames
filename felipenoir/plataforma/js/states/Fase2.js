State.Fase2 = function(){
	var map, layer, hero, cursors, bulletGroup,escadas;
    this.weapon = new Weapon(game);
}

State.Fase2.prototype = {
	preload:function() {
        game.load.atlasJSONHash('hero', Hero.path, Hero.json);
        game.load.tilemap('map', Level.tilemap.jsonPathLevel2, null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', Level.tilemap.tilePath);
        game.load.image('bg', Level.bg.path);
        game.load.image('escada', Level.tilemap.stair);
        this.weapon.preload();
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

        layer = map.createLayer(Level.tilemap.layerFase2);
        layer.resizeWorld();
        map.setCollisionBetween(Level.tilemap.collisionStart, Level.tilemap.collisionEnd, true, Level.tilemap.layerFase2);



        //cria escadas
        escadas = game.add.group();
        escadas.enableBody = true;
        map.createFromObjects(Level.tilemap.objectFase2, 4, 'escada', 0, true, false,escadas);
		
        escadas.forEach(function(escada) {
				escada.body.allowGravity = false
		}, this);

        // heroi
        hero = game.add.sprite(200,game.world.height - 400,'hero');
        hero.animations.add(Hero.animations.run.name, Hero.animations.run.frames, 6, true);
        hero.anchor.setTo(.5,.5);
        game.physics.enable(hero, Phaser.Physics.ARCADE);

        hero.body.collideWorldBounds = true;
        hero.body.drag.x = Hero.dragX;
        hero.body.gravity.y = Hero.gravityY;
        game.camera.follow(hero);

        // arma
        this.weapon.create();

        // setas do teclado
        cursors = game.input.keyboard.createCursorKeys();
    },

    update:function(){
        game.physics.arcade.collide(layer, hero);
        game.physics.arcade.overlap(escadas,hero, this.upStair, null, this);

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

        this.weapon.update(hero.x, hero.y);

        if(cursors.up.isDown) {

            if(hero.body.onFloor()) {
                hero.body.velocity.y = Hero.jump;
            }
        }


    },
    upStair : function(hero, stair){
    	if(cursors.up.isDown) {
    		hero.body.velocity.y = Hero.up;
    	}
    }
};