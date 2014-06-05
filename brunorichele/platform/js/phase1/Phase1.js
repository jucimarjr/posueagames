
State.Phase1 = function (game){
    "use strict";
    this.game = game;
}

State.Phase1.prototype = {
    preload: function () {
        "use strict";
    },
    create: function() {
        "use strict";
        // game defs
		game.world.setBounds(0, 0, 3000, 2000);
        this.game.physics.startSystem(Phaser.Game.ARCADE);

     /*   // map defs
        var map = this.game.add.tilemap('tilemap');
        // ordem correta: nome do tileset no Tiled, nome do asset no Phaser
        // nesse caso o nome do tileset é texturebreakout, e o nome do assed é tileset
        map.addTilesetImage('texturebreakout', 'tileset');
        this.layer = map.createLayer('Camada de Tiles 1');
        this.layer.resizeWorld();
        map.setCollisionByExclusion([9], true, 'Camada de Tiles 1');*/
		
		this.background = this.game.add.tileSprite(0, 0,  3000, 2000,  'bgphase1');
				
		game.add.sprite(1764, 1772, 'itemRock9075');
		game.add.sprite(0, 1620, 'itemRock92230');
		game.add.sprite(212, 406, 'itemRock10035');
		game.add.sprite(348, 504, 'itemRock10035');
		game.add.sprite(245, 852, 'itemRock10035');
		game.add.sprite(2510, 1413, 'itemRock10035');
		game.add.sprite(2638, 1505, 'itemRock10035');
		game.add.sprite(2792, 1582, 'itemRock10035');
		game.add.sprite(1336, 1772, 'itemRock12575');
		game.add.sprite(1538, 1772, 'itemRock12575');
		game.add.sprite(0, 240, 'itemRock22085');
		game.add.sprite(1383, 1275, 'itemRock37085');
		game.add.sprite(2634, 1737, 'itemRock371108');
		game.add.sprite(99, 1659, 'itemRock412190');
		game.add.sprite(1996, 1256, 'itemRock500100');
		game.add.sprite(1986, 1716, 'itemRock515130');
		game.add.sprite(738, 1170, 'itemRock540190');
		game.add.sprite(681, 1686, 'itemRock550165');
		game.add.sprite(0, 1021, 'itemRock655230');
		this.foorTheDoors = game.add.sprite(3000, 354, 'itemRock655230');
		this.foorTheDoors.scale.x *= -1;
		game.add.sprite(1552, 704, 'itemRock825100');
		game.add.sprite(478, 587, 'itemRock925220');

        // player defs
        this.createPlayer();
        this.game.camera.follow(this.player);
		
		this.backgroundAlpha = game.add.sprite(0, 0, 'bgphase1-alpha');

        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
		
		//this.playBgSound(); /* Comentado pq encomoda durante o desenvolvimento*/
    },
    update: function(){
        "use strict";
        Config.global.screen.resize(this.game);
        this.game.physics.arcade.collide(this.layer, this.player, this.wallCollision, null, this);
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -100;
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = 100;
        }
        else this.player.body.velocity.x = 0;
        if(this.cursors.up.isDown){
            this.player.body.velocity.y = -100;
        }
        else if(this.cursors.down.isDown){
            this.player.body.velocity.y = 100;
        }
        else this.player.body.velocity.y = 0;

    },
    createPlayer : function (){
        "use strict";
        this.player = this.game.add.sprite(0, 300, 'jogador');
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
    },

    wallCollision : function (){
        //do something
    },
	/* Adicionar depois a classe Phase1.World*/
	playBgSound : function(){
		this.bgmusic = this.game.add.audio('bgmusic');
        this.bgmusic.play('', 0, 1, true);	
	}
};