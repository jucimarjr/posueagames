/*global State, Config*/

State.SecondPhase = function (game) {
	"use strict";
	this.game = game;
	/*var player;
	var level;
	var map;
	var group;
	var layer;*/
};
State.SecondPhase.prototype = {
	preload: function () {
		
	},
	create: function () {

		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 100;
		this.game.stage.smoothed = false;

		this.player = game.add.sprite(10,1000 ,'playerS');
		this.player.anchor.setTo(.5, 1);
		
		//player.smoothed = false;
		//player.body.checkCollision.up = false;
		//player.body.checkCollision.left = false;
		//player.body.checkCollision.right = false;
		//player.animations.add('walk',[1,2,1,3],12,true);
		this.player.animations.add('walk',[3,4,5,6,7,8,9,10,11,12,13],15,true);
		this.player.animations.add('down',[3,4],12,true);
		this.player.animations.add('jump',[1],1,false);
		this.game.physics.enable(this.player);
		//player.animations.play('walk');
		this.player.body.collideWorldBounds = true;
		//this.game.camera.follow(player);

		this.loadLevel(2);
	
		
		//this.game.camera.y = 1000;
		
		//cursors = this.game.input.Keyboardboard.createCursorKeys();
		//jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function () {
		Config.global.screen.resize(this.game);
		//player.animations.play('walk');

		game.physics.arcade.collide(this.layer, this.player);
		//game.physics.arcade.overlap(group, this.sprite, collision, null,this);
		
		this.player.body.velocity.x = 0;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
			this.player.scale.x = 1; 
			this.player.scale.x = -1;
			this.player.animations.play('walk');		
			this.player.body.velocity.x = -150;
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.player.scale.x = -1; 
			this.player.scale.x = 1;
			this.player.animations.play('walk');		
			this.player.body.velocity.x = 150;
		}
		else if(this.player.body.blocked.down){
			this.player.animations.stop();
			this.player.frame = 0;
		}
		if(this.player.body.velocity.y !== 0){
			this.player.animations.play('jump');
		}
		if ( (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || 
			this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) && 
			this.player.body.onFloor()){
			this.player.animations.play('jump');
			this.player.body.velocity.y = -450;
		}
	},

	loadLevel: function (level) {
		var bg = this.game.add.tileSprite(0,-600,2000,1200,'bg'+level);
		bg.fixedToCamera = true;

		this.player.bringToTop();

		this.map = game.add.tilemap('level'+level);
		this.map.addTilesetImage('tileset','tileset');
		//this.map.setCollisionBetween(0,30, true,'Camada de Tiles 1');
		this.map.setCollisionBetween(0,30);
	
		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld();		

		this.group = game.add.group();
		this.group.enableBody = true;
		this.group.physicsBodyType = Phaser.Physics.ARCADE;

		this.map.createFromObjects('Camada de Objetos 1',17, 'star', 0,true,false,this.group);
		this.group.forEach(function (star){ 
			star.body.allowGravity = false;
			star.body.immovable = true;
		}, this);

		//this.game.physics.enable([this.player, this.layer]);
		
		//this.game.physics.enable(this.layer);

		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.position.setTo(100, this.game.world.height - 300);
		this.player.body.gravity.y = 800;

		this.game.camera.follow(this.player);
		this.level = level;
	},
};