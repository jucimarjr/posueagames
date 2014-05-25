//Play
State.Play = function(game){
	this.game = game;
	var map, layer, robo, objetos, jump = 1;
}

State.Play.prototype = {
	preload : function(){
		this.game.load.tilemap('map', 'assets/spritesheets/tileJungle.json', null,
			Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tileset', 'assets/images/tiles.png');
		this.game.load.image('item', 'assets/images/item.png');
		this.game.load.image('jungle', 'assets/images/background.jpg');
		this.game.load.spritesheet('robo', 'assets/images/robo_33-38-3.png', 33, 38, 3);
	},
	create : function(){
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 800;
		
		var jungle = game.add.tileSprite(0, 0, 600, 1200, 'jungle');
		jungle.fixedToCamera = true;
		
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('tileset', 'tileset');
		
		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld();
		this.map.setCollision(1, true, 'Camada de Tiles 1');
		
		this.objetos = this.game.add.group();
		this.objetos.enableBody = true;
		
		this.map.createFromObjects('Camada de Objetos 1', 3, 'item', 0, true, false,
			this.objetos);
			
		this.objetos.forEach(function(objeto) {
			objeto.body.allowGravity = false
		}, this);
		
		this.robo = game.add.sprite(50, 10, 'robo', 0);
		this.robo.animations.add('walk', [ 1, 2 ], 6, true);
		this.game.physics.enable(this.robo, Phaser.Physics.ARCADE);

		this.robo.body.collideWorldBounds = true;
		this.robo.body.drag.x = 200;
		this.robo.anchor.setTo(.5, .5);
		this.robo.body.gravity.y = 100;
		this.game.camera.follow(this.robo);
		
	},
	update : function(){
		this.game.physics.arcade.collide(this.layer, this.robo);
		this.game.physics.arcade.overlap(this.objetos, this.robo, this.pega, null, this);
		
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.robo.body.velocity.x = 100;
			this.robo.scale.x = +1;
			this.robo.animations.play('walk');
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.robo.body.velocity.x = -100;
			this.robo.scale.x = -1;
			this.robo.animations.play('walk');
		} else {
			this.robo.animations.stop();
			this.robo.frame = 0;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				if(this.robo.body.onFloor() || (this.jump > 0 && this.robo.body.velocity.y > -100)){
					this.robo.body.velocity.y = -350;
					this.jump --;
				}
		}
		if(this.robo.body.onFloor()){
			this.jump = 1;
		}
	},
	pega : function(robo, item) {
		item.kill();
	}
	
};