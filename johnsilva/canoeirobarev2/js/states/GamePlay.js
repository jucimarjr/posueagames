/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
	var deadAnimation;
	var jumping;
	var cursors;
	var levelConfig;
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
		this.level = 1;
		//this.game.world.setBounds(0, -600, 1600, 1200);

		this.player = game.add.sprite(10,1000 ,'playerS');
		this.player.anchor.setTo(.5, 1);
		
		//player.smoothed = false;
		//player.body.checkCollision.up = false;
		//player.body.checkCollision.left = false;
		//player.body.checkCollision.right = false;
		//player.animations.add('walk',[1,2,1,3],12,true);
		this.player.animations.add('walk',[3,4,5,6,7,8,9,10,11,12,13,14],20,true);
		this.player.animations.add('stoped',[0,1],2,true);
		this.player.animations.add('down',[3,4],12,true);		
		this.player.animations.add('dead',[24,25,26],10,false);
		/*deadAnimation.onComplete.add(function() {
	    								this.loadLevel(this.level);
									}, this);	*/
		this.player.animations.add('jump',[15,16,17,18,19],4,false);

		

		this.game.physics.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.game.physics.enable(this.player);
		this.player.body.setSize(25, 60, 0, 0);
		this.game.camera.y = 1000;

		this.loadLevel(this.level);
		
		
		cursors = this.game.input.keyboard.createCursorKeys();
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

		//if(!this.gameOver){
		
		//Config.global.screen.resize(this.game);
		//player.animations.play('walk');

		game.physics.arcade.collide(this.layer, this.player);

		if(levelConfig.bees.id>0) game.physics.arcade.overlap(this.player, this.bees, this.die, null,this);
		if(levelConfig.thorns.id>0) game.physics.arcade.overlap(this.player, this.thorns, this.die, null,this);
		
		this.player.body.velocity.x = 0;
		//this.branches.tilePosition.x = this.player.body.x;
        if (cursors.left.isDown ) {
        //if (this.back){
			this.player.scale.x = 1; 
			this.player.scale.x = -1;			
			this.player.body.velocity.x = -150;
			this.crouched = false;
			if(this.player.body.onFloor()){
				this.player.animations.play('walk');
			}
			//this.bg.tilePosition.x+=1;
		}
		else if(cursors.right.isDown){
		//else if(this.run){
			this.player.scale.x = -1; 
			this.player.scale.x = 1;
			this.player.body.velocity.x = 150;
			this.crouched = false;
			if(this.player.body.onFloor()){
				this.player.animations.play('walk');
			}
			//this.bg.tilePosition.x-=1;
		}
		else if(this.player.body.blocked.down){
			//this.player.animations.stop();
			//this.player.frame = 0;
			this.player.animations.play('stoped');
		}
		if(this.player.body.velocity.y !== 0){
			this.player.animations.play('jump');
		}
		if ( this.isToJumping() && (!jumping) ){
		/*if (this.jump && this.player.body.onFloor()){	*/
			jumping = true;
			this.player.animations.play('jump');
			this.player.body.velocity.y = -450;
		}
		if(!cursors.up.isDown){
			jumping = false;
		}
	//}
	},

	isToJumping: function(){
		if( cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ){
			if(this.player.body.onFloor()){
				return true;
			}
		}
		return false;
	},

	loadLevel: function (level) {
		this.level = level;
		levelConfig = Config.level.getLevel(level);

		jumping = false;
		
		this.player.alpha = 1;
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.body.gravity.y = 1000;
		this.player.position.setTo(levelConfig.player.posX, levelConfig.player.posY);
		this.game.camera.follow(this.player);

		if (this.layer) this.layer.destroy();
		if (this.flag) this.flag.destroy();
		if (this.bees) this.bees.destroy();
		if (this.waters) this.waters.destroy();
		if (this.tubes) this.tubes.destroy();
		if (this.thorns) this.thorns.destroy();

		this.bg = this.game.add.tileSprite(0,0,1200,800,'bg'+level);
		this.bg.fixedToCamera = true;		

		this.map = game.add.tilemap('level'+level);
		this.map.addTilesetImage('tileset','tileset');
		this.map.setCollisionBetween(1,12, true,'Camada de Tiles 1');

		if(levelConfig.branches.exists) this.map.addTilesetImage('branches','branches');
		if(levelConfig.waters.id>0) this.addWaters(levelConfig.waters.id);
		if(levelConfig.bees.id>0) this.addBees(levelConfig.bees.id);
		if(levelConfig.tubes.id>0) this.addTubes(levelConfig.tubes.id);
		if(levelConfig.thorns.id>0) this.addThorns(levelConfig.thorns.id);

		this.player.bringToTop();

		if(levelConfig.bushes.id>0) this.addBushes(levelConfig.bushes.id);

		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld();
		this.game.physics.enable(this.layer);
	},

	addBushes: function(id){
		this.bushes = game.add.group();
		this.bushes.enableBody = true;
		this.bushes.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('bushes',id,'bush', 0,true,false,this.bushes);
		this.bushes.callAll('animations.add', 'animations', 'spin', [0, 1, 2], 3, true);
    	this.bushes.callAll('animations.play', 'animations', 'spin');
		this.bushes.forEach(function (bush){ 
			bush.body.allowGravity = false;
			bush.body.immovable = true;
		}, this);
	},

	addWaters: function(id){
		this.waters = game.add.group();
		this.waters.enableBody = true;
		this.waters.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('waters',id,'acidicWater', 0,true,false,this.waters);
		this.waters.forEach(function (water){ 
			water.body.allowGravity = false;
			water.body.immovable = true;
			//water.anchor.setTo(.5, 1);
			this.addEmmiter(water.body.x, water.body.y);
		}, this);
	},

	addBees: function(id){
		this.bees = game.add.group();
		this.bees.enableBody = true;
		this.bees.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('Camada de Objetos 1',id,'bee', 0,true,false,this.bees);
		this.bees.callAll('animations.add', 'animations', 'spin', [0, 1], 3, true);
    	this.bees.callAll('animations.play', 'animations', 'spin');
		this.bees.forEach(function (bee){ 
			bee.body.allowGravity = false;
			bee.body.immovable = true;
		}, this);
	},

	addTubes: function(id){
		this.tubes = game.add.group();
		this.tubes.enableBody = true;
		this.tubes.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('tubes',id,'tube', 0,true,false,this.tubes);
		this.tubes.forEach(function (tube){ 
			tube.body.allowGravity = false;
			tube.body.immovable = true;
		}, this);
	},

	addThorns: function(id){
		this.thorns = game.add.group();
		this.thorns.enableBody = true;
		this.thorns.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('thorns',id,'thorn', 0,true,false,this.thorns);
		this.thorns.forEach(function (thorn){ 
			thorn.body.setSize(75, 30, 0, 10);
			thorn.body.allowGravity = false;
			thorn.body.immovable = true;
		}, this);
	},

	addEmmiter: function(x,y){
		var emitter = game.add.emitter(x,y,1);
		//var emitter = game.add.emitter(game.world.centerX, game.world.centerY);

		//emitter.width = game.world.width;
		// emitter.angle = 30; // uncomment to set an angle for the rain.

		emitter.makeParticles('acidicWater');

		/*emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;*/
		emitter.setYSpeed(80);
		emitter.setXSpeed(0);
		//emitter.setYSpeed(300, 500);
		//emitter.setXSpeed(-5, 5);

		/*emitter.minParticleSpeed.setTo(-300, -300);
    	emitter.maxParticleSpeed.setTo(300, 300);*/

		emitter.minRotation = 0;
		emitter.maxRotation = 0;

		emitter.start(false, 1800, 1,0);
	},

	die : function(player, enemie) {
		//this.gameOver = true;
		//this.player.anchor.setTo(0.5, 0.5);
		this.player.animations.play('dead');
		var t = this.game.add.tween(this.player).to({alpha:0}, 1000).start();
		enemie.kill();	
		this.player.body.gravity.y = 0;
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
	
		t.onComplete.add(function() {
		    this.loadLevel(this.level);
		}, this);
    },

    //game

    render: function (){
    	//game.debug.body(this.player);
    	//game.debug.body(this.thorns);

		/*this.thorns.forEach(function (thorn){ 
			game.debug.body(thorn);
		}, this);*/
    },
};