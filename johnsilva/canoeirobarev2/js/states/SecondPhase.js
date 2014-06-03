/*global State, Config*/

State.SecondPhase = function (game) {
	"use strict";
	this.game = game;
	var player;
	var map;
	var group;
	var layer;
	var cursors;
	var jumpButton;
};
State.SecondPhase.prototype = {
	preload: function () {
		this.game.load.tilemap('stage', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tileset', 'assets/tileset.png');
		this.game.load.image('star', 'assets/star.png');
		this.game.load.image('background', 'assets/bg.png');

		this.game.load.spritesheet('playerSheet', 'assets/player.png', 40,80,5);
	},
	create: function () {

		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 800;
		var bg = this.game.add.tileSprite(0,-600,2000,1200,'background');
		bg.fixedToCamera = true;
	
		map = game.add.tilemap('stage');
		map.addTilesetImage('tileset','tileset');
	
		layer = map.createLayer('Camada de Tiles 1');
		layer.resizeWorld();
		map.setCollisionBetween(0,30, true,'Camada de Tiles 1');

		group = game.add.group();
		group.enableBody = true;
		map.createFromObjects('Camada de Objetos 1',17, 'star', 0,true,false,group);
		group.forEach(function (star){ star.body.allowGravity = false}, this);

		this.game.camera.y = 1000;
		player = game.add.sprite(10,1000 ,'playerSheet');
		player.anchor.setTo(.5, 1);
		this.game.physics.enable(player);	
		player.smoothed = false;
		//player.body.checkCollision.up = false;
		//player.body.checkCollision.left = false;
		//player.body.checkCollision.right = false;
		//player.animations.add('walk',[1,2,1,3],12,true);
		player.animations.add('walk',[1,2],12,true);
		player.animations.add('down',[3,4],12,true);
		player.animations.add('jump',[1],1,false);
		player.animations.add('stop',[0],1,false);
		//player.animations.play('walk');
		player.body.collideWorldBounds = true;
		this.game.camera.follow(this.sprite);
		cursors = this.game.input.Keyboardboard.createCursorKeys();
		jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function () {
		Config.global.screen.resize(this.game);
		//player.animations.play('walk');

		game.physics.arcade.collide(layer, player);
		//game.physics.arcade.overlap(group, this.sprite, collision, null,this);
		
		player.body.velocity.x = 0;
		if(cursors.left.isDown){
			player.scale.x = 1; 
			player.scale.x = -1;
			player.animations.play('walk');		
			player.body.velocity.x = -150;
		}
		else if(cursors.right.isDown){
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
		}
	}
};