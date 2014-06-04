/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
	/*var player;
	var level;
	var map;
	var bees;
	var layer;*/
};
State.GamePlay.prototype = {
	preload: function () {
		
	},
	create: function () {

		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 100;
		this.game.stage.smoothed = false;
		//this.game.world.setBounds(0, -600, 1600, 1200);

		this.player = game.add.sprite(10,1000 ,'playerS');
		this.player.anchor.setTo(.5, 1);
		
		//player.smoothed = false;
		//player.body.checkCollision.up = false;
		//player.body.checkCollision.left = false;
		//player.body.checkCollision.right = false;
		//player.animations.add('walk',[1,2,1,3],12,true);
		this.player.animations.add('walk',[3,4,5,6,7,8,9,10,11,12,13,14],15,true);
		this.player.animations.add('stoped',[0,1],2,true);
		this.player.animations.add('down',[3,4],12,true);
		this.player.animations.add('jump',[15,16,17,18,19],6,false);
		this.game.physics.enable(this.player);
		//player.animations.play('walk');
		this.player.body.collideWorldBounds = true;
		//this.game.camera.follow(player);
		this.game.physics.enable(this.player);
		this.player.body.setSize(20, 60, 0, 0);

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
		game.physics.arcade.overlap(this.player, this.bees, this.die, null,this);
		
		this.player.body.velocity.x = 0;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
        //if (this.back){
			this.player.scale.x = 1; 
			this.player.scale.x = -1;
			this.player.animations.play('walk');		
			this.player.body.velocity.x = -150;
			this.crouched = false;
			//this.bg.tilePosition.x+=1;
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		//else if(this.run){
			this.player.scale.x = -1; 
			this.player.scale.x = 1;
			this.player.animations.play('walk');
			this.player.body.velocity.x = 150;
			this.crouched = false;

			//this.bg.tilePosition.x-=1;
		}
		else if(this.player.body.blocked.down){
			this.player.animations.stop();
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
		if (this.layer) this.layer.destroy();
		//if (this.flag) this.flag.destroy();
		if (this.bees) this.bees.destroy();
		if (this.tubes) this.bees.destroy();

		this.bg = this.game.add.tileSprite(0,-600,2000,2400,'bg'+level);
		this.bg.fixedToCamera = true;

		this.player.bringToTop();

		this.map = game.add.tilemap('level'+level);
		this.map.addTilesetImage('tileset','tileset');
		this.map.setCollisionBetween(0,5, true,'Camada de Tiles 1');
		//this.map.setCollisionBetween(0,3);
	
		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld();		

		this.bees = game.add.group();
		this.bees.enableBody = true;
		this.bees.physicsBodyType = Phaser.Physics.ARCADE;

		this.map.createFromObjects('Camada de Objetos 1',4,'bee', 0,true,false,this.bees);
		this.bees.callAll('animations.add', 'animations', 'spin', [0, 1], 3, true);
    	this.bees.callAll('animations.play', 'animations', 'spin');
		this.bees.forEach(function (bee){ 
			bee.body.allowGravity = false;
			bee.body.immovable = true;
		}, this);

		this.tubes = game.add.group();
		this.tubes.enableBody = true;
		this.tubes.physicsBodyType = Phaser.Physics.ARCADE;

		this.map.createFromObjects('tubes',6,'tube', 0,true,false,this.tubes);
		this.tubes.forEach(function (tube){ 
			tube.body.allowGravity = false;
			tube.body.immovable = true;
		}, this);

		this.game.physics.enable(this.layer);

		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.position.setTo(100, this.game.world.height - 300);
		this.player.body.gravity.y = 800;

		this.game.camera.follow(this.player);
		this.level = level;
	},

	die : function(player, bee) {
	this.player.anchor.setTo(0.5, 0.5);
	var t = this.game.add.tween(this.player).to({angle:360}, 300).start();
	this.player.body.gravity.y = 0;
	this.player.body.velocity.x = 0;
	this.player.body.velocity.y = 0;
	t.onComplete.add(function() {
	    this.loadLevel(this.level);
	}, this);
    },

    render: function (){
    	game.debug.body(this.player);
    	game.debug.body(this.bees);
    },
};