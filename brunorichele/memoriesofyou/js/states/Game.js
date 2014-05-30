    // Main game state

State.Game = function (game){
    "use strict";
    this.game = game;
}

State.Game.prototype = {
    preload: function () {
        "use strict"; 
    },
    create: function() {
        "use strict";
        // game defs
        this.game.physics.startSystem(Phaser.Game.ARCADE);

        // map defs
        var map = this.game.add.tilemap('tilemap');
        // ordem correta: nome do tileset no Tiled, nome do asset no Phaser
        // nesse caso o nome do tileset é texturebreakout, e o nome do assed é tileset
        map.addTilesetImage('texturebreakout', 'tileset');
        this.layer = map.createLayer('Camada de Tiles 1');
        this.layer.resizeWorld();
        map.setCollisionByExclusion([9], true, 'Camada de Tiles 1');
        // player defs
        this.createPlayer();
        this.game.camera.follow(this.player);

        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
		
		this.bgmusic = this.game.add.audio('bgmusic');
        this.bgmusic.play('', 0, 1, true);

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
        this.player = this.game.add.sprite(0, 0, 'jogador');
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
    },

    wallCollision : function (){
        //do something
    }
}