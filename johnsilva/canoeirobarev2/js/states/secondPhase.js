/*global State, Config*/

State.SecondPhase = function (game) {
	"use strict";
	this.game = game;
	//	var player;
};
State.SecondPhase.prototype = {
	preload: function () {
		"use strict";
		/*game.load.tilemap('stage', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON);
		
		game.load.image('tileset', 'assets/tileset.png');
		game.load.image('star', 'assets/star.png');*/
		//this.game.load.image('background', 'assets/LudusSplash_960-600.png');
		//this.game.load.image('background', 'assets/bg.png');
		//this.game.load.spritesheet('player', 'assets/mario.png', 180,54);
	},
	create: function () {
		"use strict";

		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 800;
		var bg = this.game.add.tileSprite(0,-600,2000,1200,'background');
		bg.fixedToCamera = true;
	
		/*this.map = game.add.tilemap('stage');
		this.map.addTilesetImage('tileset','tileset');
	
		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld();
		this.map.setCollisionBetween(0,30, true,'Camada de Tiles 1');

		group = game.add.group();
		group.enableBody = true;
		this.map.createFromObjects('Camada de Objetos 1',17, 'star', 0,true,false,group);
		group.forEach(function (star){ star.body.allowGravity = false}, this);*/

		//this.game.camera.y = 1000;
		//player = game.add.sprite(10,100 ,'player');
		//player.anchor.setTo(.5, 1);
		//game.physics.enable(this.sprite);
		//player.smoothed = false;
		//player.body.checkCollision.up = false;
		//player.body.checkCollision.left = false;
		//player.body.checkCollision.right = false;
		//player.animations.add('walk',[1,2,1,3],12,true);
		/*player.animations.add('walk',[1,2],12,true);
		player.animations.add('down',[3,4],12,true);
		player.animations.add('jump',[1],1,false);
		player.animations.add('stop',[0],1,false);
		player.animations.play('walk');*/
		//player.body.collideWorldBounds = true;
		/*game.camera.follow(this.sprite);
		var cursors = game.input.keyboard.createCursorKeys();
		var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);*/
	},
	update: function () {
		"use strict";
		//Config.global.screen.resize(this.game);
		//player.animations.play('walk');

		/*game.physics.arcade.collide(this.layer, this.sprite);
		game.physics.arcade.overlap(group, this.sprite, collision, null,this);
		*/
		/*player.body.velocity.x = 0;
		if(this.cursors.left.isDown){
			player.scale.x = 1; 
			player.scale.x = -1;
			player.animations.play('walk');		
			player.body.velocity.x = -150;
		}
		else if(this.cursors.right.isDown){
			player.scale.x = -1; 
			player.scale.x = 1;
			player.animations.play('walk');		
			player.body.velocity.x = 150;
		}
		else if(player.body.blocked.down){
			player.animations.stop();
			player.frame = 0;
		}
		if(player.body.velocity.y !== 0){
			player.animations.play('jump');
		}
		if (this.jumpButton.isDown && player.body.onFloor()){
			player.body.velocity.y = -450;
		}*/
	}
};