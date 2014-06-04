State.Phase1.prototype.create = function(){
        "use strict";
        // game defs
		game.world.setBounds(0, 0, 6250, 4166);
        this.game.physics.startSystem(Phaser.Game.ARCADE);

     /*   // map defs
        var map = this.game.add.tilemap('tilemap');
        // ordem correta: nome do tileset no Tiled, nome do asset no Phaser
        // nesse caso o nome do tileset é texturebreakout, e o nome do assed é tileset
        map.addTilesetImage('texturebreakout', 'tileset');
        this.layer = map.createLayer('Camada de Tiles 1');
        this.layer.resizeWorld();
        map.setCollisionByExclusion([9], true, 'Camada de Tiles 1');*/
		
		this.background = this.game.add.tileSprite(0, -3000,  6250, 4166,  'imageTemp');

        // player defs
        this.createPlayer();
        this.game.camera.follow(this.player);

        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
		
		this.bgmusic = this.game.add.audio('bgmusic');
        this.bgmusic.play('', 0, 1, true);	
	};
State.Phase1.prototype.createPlayer = function (){
        "use strict";
        this.player = this.game.add.sprite(0, 300, 'jogador');
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
    
};