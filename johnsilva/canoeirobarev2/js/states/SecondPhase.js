/*global State, Config*/

State.SecondPhase = function (game) {
	"use strict";
	this.game = game;
	/*var player;
	var level;
	var map;
	var bees;
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
		this.player.animations.add('stoped',[0,1],2,true);
		this.player.animations.add('down',[3,4],12,true);
		this.player.animations.add('jump',[1],1,false);
		this.game.physics.enable(this.player);
		//player.animations.play('walk');
		this.player.body.collideWorldBounds = true;
		//this.game.camera.follow(player);

		this.loadLevel(3);
	
		
		this.game.camera.y = 1000;
		
		//cursors = this.game.input.Keyboardboard.createCursorKeys();
		//jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		/*this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.right.onDown.add(function() {this.run=true;}, this);
		this.right.onUp.add(function() {this.run=false;}, this);
		this.left.onDown.add(function() {this.back=true;}, this);
		this.left.onUp.add(function() {this.back=false;}, this);
		this.down.onDown.add(function() {this.crouch=true;}, this);
		this.down.onUp.add(function() {this.crouch=false;}, this);
		this.up.onDown.add(function() {this.jump=true;}, this);
		this.up.onUp.add(function() {this.jump=false;}, this);
		this.spaceBar.onDown.add(function() {this.jump=true;}, this);
		this.spaceBar.onUp.add(function() {this.jump=false;}, this);*/
	},
	update: function () {
		Config.global.screen.resize(this.game);
		//player.animations.play('walk');

		game.physics.arcade.collide(this.layer, this.player);
		game.physics.arcade.overlap(this.bees, this.player, this.die, null,this);
		
		this.player.body.velocity.x = 0;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
        //if (this.back){
			this.player.scale.x = 1; 
			this.player.scale.x = -1;
			this.player.animations.play('walk');		
			this.player.body.velocity.x = -150;
			this.crouched = false;
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		//else if(this.run){
			this.player.scale.x = -1; 
			this.player.scale.x = 1;
			this.player.animations.play('walk');
			this.player.body.velocity.x = 150;
			this.crouched = false;
		}
		else if(this.player.body.blocked.down){
			//this.player.animations.stop();
			//this.player.frame = 0;
			this.player.animations.play('stoped');
		}
		if(this.player.body.velocity.y !== 0){
			this.player.animations.play('jump');
		}
		if ( (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || 
			this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) && 
			this.player.body.onFloor()){
		/*if (this.jump && this.player.body.onFloor()){	*/
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
		this.map.setCollisionBetween(0,3, true,'Camada de Tiles 1');
		//this.map.setCollisionBetween(0,3);
	
		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld();		

		this.bees = game.add.group();
		this.bees.enableBody = true;
		this.bees.physicsBodyType = Phaser.Physics.ARCADE;

		this.map.createFromObjects('Camada de Objetos 1',7, 'bee', 0,true,false,this.bees);

		this.bees.forEach(function (bee){ 
			bee.body.allowGravity = false;
			bee.body.immovable = true;
		}, this);

		this.game.physics.enable([this.player, this.layer]);

		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.position.setTo(100, this.game.world.height - 300);
		this.player.body.gravity.y = 800;

		this.game.camera.follow(this.player);
		this.level = level;
	},

	die : function() {
	this.player.anchor.setTo(0.5, 0.5);
	var t = this.game.add.tween(this.character).to({angle:360}, 300).start();
	this.player.body.gravity.y = 0;
	this.player.body.velocity.x = 0;
	this.player.body.velocity.y = 0;
	t.onComplete.add(function() {
	    this.loadLevel(this.level);
	}, this);
    },
};