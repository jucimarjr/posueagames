/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		//var deadAnimation;
		var jumping;
		var cursors;
		var levelConfig;
		var onCipo;
	},
	create: function () {
		this.game.time.deltaCap = 0.016;		
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 100;
		this.game.stage.smoothed = false;		
		//this.game.world.setBounds(-10, -10, this.game.world.width + 20, this.game.world.height + 20);

		levelConfig = Config.level.getLevel(Config.levelId.level);

		if(this.player)
			this.player.destroy();

		if(levelConfig.checkPoint.x > 0)
			this.addPlayer(levelConfig.checkPoint.x, levelConfig.checkPoint.y);
		else
			this.addPlayer(levelConfig.player.posX, levelConfig.player.posY);		

		//this.game.camera.y = 1000;
		cursors = this.game.input.keyboard.createCursorKeys();
		this.loadLevel(Config.levelId.level);

		// Show FPS
    	this.game.time.advancedTiming = true;
    	this.fpsText = this.game.add.text(
        	20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    	);
	},
	update: function () {

		/*if (this.game.time.fps !== 0) {
        	this.fpsText.setText(this.game.time.fps + ' FPS');
    	}*/

		this.game.physics.arcade.collide(this.layer, this.player);
		this.player.body.velocity.x = 0;
		onCipo = false;
		if(this.level == 3)
			this.updateShadowTexture(this.player.body.x, this.player.body.y);

		if(!this.gameOver){		
			//Config.global.screen.resize(this.game);
			if(levelConfig.bees.id>0) 
				this.game.physics.arcade.overlap(this.player, this.bees, this.collideWithBees, null,this);
			if(levelConfig.thorns.id>0) 
				this.game.physics.arcade.overlap(this.player, this.thorns, this.die, null,this);
			if(levelConfig.waters.id>0){
				this.game.physics.arcade.overlap(this.player, this.waters, this.die, null,this);
				this.game.physics.arcade.overlap(this.waters, this.layer, this.renew, null,this);
			}
			if(levelConfig.checkPoint.id>0){
				this.game.physics.arcade.overlap(this.player, this.checkPoint, this.saveCP, null,this);
			}
			if(levelConfig.cipo.id>0){
				this.game.physics.arcade.overlap(this.player, this.cipo, this.runCipo, null,this);
			}		
			//this.game.physics.arcade.overlap(this.player, this.coin, function () {
			this.game.physics.arcade.overlap(this.player, this.flag, function () {
				levelConfig.checkPoint.x = 0;
				levelConfig.checkPoint.y = 0;
				Config.levelId.level = ++this.level;
				this.game.state.start('GamePlay');
			}, null, this);		
		
        	if (cursors.left.isDown ) {
				this.player.scale.x = 1; 
				this.player.scale.x = -1;			
				this.player.body.velocity.x = -Config.player.velocity.run;
				this.crouched = false;
				if(this.player.body.onFloor()){
					this.player.animations.play('walk');
				}
			}
			else if(cursors.right.isDown){
				this.player.scale.x = -1; 
				this.player.scale.x = 1;
				this.player.body.velocity.x = Config.player.velocity.run;
				this.crouched = false;
				if(this.player.body.onFloor()){
					this.player.animations.play('walk');
				}
			}
			else if(this.player.body.blocked.down)
				this.player.animations.play('stoped');

			if(this.player.body.velocity.y !== 0 && !onCipo){
				//this.player.animations.play('jump');
				this.player.frame = 19;
			}
			if ( this.isToJumping() && (!jumping) ){
			/*if (this.jump && this.player.body.onFloor()){	*/
				jumping = true;
				this.player.animations.play('jump');
				this.player.body.velocity.y = -Config.player.velocity.jump;
			}else if(onCipo){
				if(cursors.up.isDown) 
					this.climb(-Config.player.velocity.climbing);
				else if(cursors.down.isDown) 
					this.climb(Config.player.velocity.climbing);
				else 
					this.player.frame = Config.climbing.frames.max;
			}
			if(!cursors.up.isDown){
				jumping = false;
			}
		}
	},

	addPlayer: function(x,y){
		this.game.camera.x = x;
		this.game.camera.y = y;
		this.player = game.add.sprite(x, y ,'playerS');

		this.player.anchor.setTo(.5, 1);		
		this.player.animations.add('walk',[3,4,5,6,7,8,9,10,11,12,13,14],20,true);
		this.player.animations.add('stoped',[0,1],2,true);
		this.player.animations.add('climbing',[20,21,22,23],5,true);		
		this.player.animations.add('dead',[24,25,26],10,false);
		/*deadAnimation.onComplete.add(function() {
	    								this.loadLevel(this.level);
									}, this);	*/
		this.player.animations.add('jump',[15,16,17,18,19],9,false);
		this.game.physics.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.body.setSize(25, 60, 0, 0);
		this.player.alpha = 1;
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.body.gravity.y = 1000;

		this.player.position.setTo(x,y);
		this.game.camera.follow(this.player);
	},

	isToJumping: function(){
		if(onCipo) return false;

		if( cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ){
			if(this.player.body.onFloor()){
				return true;
			}
		}
		return false;
	},

	loadLevel: function (level) {
		this.gameOver = false;
		this.level = level;
		jumping = false;
		
		

		if (this.layer) this.layer.destroy();
		if (this.flag) this.flag.destroy();
		if (this.branches) this.branches.destroy();
		if (this.waters) this.waters.destroy();
		if (this.bees) this.bees.destroy();
		if (this.tubes) this.tubes.destroy();
		if (this.thorns) this.thorns.destroy();
		if (this.coin) this.coin.destroy();
		if (this.bushes) this.bushes.destroy();
		if (this.acidicWater) this.acidicWater.destroy();
		if (this.checkPoint) this.checkPoint.destroy();
		if (this.cipo) this.cipo.destroy();

		this.bg = this.game.add.tileSprite(0,0,1200,800,'bg'+level);
		this.bg.fixedToCamera = true;		

		this.map = game.add.tilemap('level'+level);
		this.map.addTilesetImage('tileset','tileset');
		this.map.setCollisionBetween(1,12, true,'Camada de Tiles 1');

		if(levelConfig.branches.exists) this.map.addTilesetImage('branches','branches');
		if(levelConfig.waters.id>0) this.addWaters(levelConfig.waters.id);
		
		if(levelConfig.thorns.id>0) this.addThorns(levelConfig.thorns.id);
		if(levelConfig.coin.id>0) this.addCoin(levelConfig.coin.id, levelConfig.coin.image);
		if(levelConfig.cipo.id>0) this.addCipo(levelConfig.cipo.id);

		this.player.bringToTop();

		if(levelConfig.bushes.id>0) this.addBushes(levelConfig.bushes.id);

		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld();
		this.game.physics.enable(this.layer);

		if(levelConfig.bees.id>0) this.addBees(levelConfig.bees.id);
		if(levelConfig.tubes.id>0) this.addTubes(levelConfig.tubes.id);
		if(levelConfig.checkPoint.id>0) this.addCheckPoint(levelConfig.checkPoint.id);

		this.addFlag(levelConfig.flag.id)
		
		if(this.level == 3)
			this.initShadow();
	},

	addFlag: function(id){
		this.flag = game.add.group();
		this.flag.enableBody = true;
		this.flag.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('flag',id,'flag', 0,true,false,this.flag);
		this.flag.callAll('animations.add', 'animations', 'spin', [0,1,2,3,4,5,6,7], 7, true);
		this.flag.callAll('animations.play', 'animations', 'spin');
		this.flag.forEach(function (f){ 
			f.body.allowGravity = false;
			f.body.immovable = true;
		}, this);
	},

	addCipo: function(id){
		this.cipo = game.add.group();
		this.cipo.enableBody = true;
		this.cipo.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('cipo',id,'cipo', 0,true,false,this.cipo);
		this.cipo.forEach(function (c){ 
			c.body.allowGravity = false;
			c.body.immovable = true;
		}, this);
	},

	addCheckPoint: function(id){
		this.checkPoint = game.add.group();
		this.checkPoint.enableBody = true;
		this.checkPoint.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('checkPoint',id,'checkP', 0,true,false,this.checkPoint);
		this.checkPoint.callAll('animations.add', 'animations', 'spin', [0,1,2], 5, false);
		this.checkPoint.forEach(function (c){ 
			c.body.allowGravity = false;
			c.body.immovable = true;
		}, this);
	},

	addCoin: function(id, image){
		this.coin = game.add.group();
		this.coin.enableBody = true;
		this.coin.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('coin',id,image, 0,true,false,this.coin);
		this.coin.callAll('animations.add', 'animations', 'spin', [0,1,2,3,4,5,6,7], 12, true);
    	this.coin.callAll('animations.play', 'animations', 'spin');
		this.coin.forEach(function (c){ 
			c.body.allowGravity = false;
			c.body.immovable = true;
		}, this);
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

	renew: function(water, bloco){
		water.position.setTo(water.initX, water.initY);
	},

	addWaters: function(id){
		this.waters = game.add.group();
		this.waters.enableBody = true;
		this.waters.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('waters',id,'acidicWater', 0,true,false,this.waters);
		this.waters.forEach(function (water){
			water.initX = water.body.x;
			water.initY = water.body.y;
			water.anchor.setTo(.3, 1);
		}, this);
	},

	addBees: function(id){
		this.bees = game.add.group();
		this.bees.enableBody = true;
		this.bees.physicsBodyType = Phaser.Physics.ARCADE;
		this.map.createFromObjects('bees',id,'bee', 0,true,false,this.bees);
		this.bees.callAll('animations.add', 'animations', 'spin', [0,1,2,3], 6, true);
    	this.bees.callAll('animations.play', 'animations', 'spin');
		this.bees.forEach(function (bee){ 
			bee.body.setSize(34, 53, 3, 8);
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

	collideWithBees: function(player, enemie){
		var emitter = game.add.emitter(enemie.body.x, enemie.body.y, 250);
		emitter.minParticleSpeed.setTo(-500, -500);
		emitter.maxParticleSpeed.setTo(500, 500);
		emitter.minParticleScale = 0.5;
		emitter.maxParticleScale = 2;
		emitter.minRotation = 0;
		emitter.maxRotation = 0;
		emitter.makeParticles('caba');
		emitter.gravity = 0;
		emitter.start(false, 1800, 15);
		this.die(player, enemie)
	},

	die: function(player, enemie) {
        /*this.game.add.tween(this.game.camera).to({ x: -10 }, 40, 
        	Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true).start();*/
		enemie.kill();
		this.gameOver = true;
		this.player.animations.stop();
		this.player.body.gravity.y = 0;
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.animations.play('dead');
		this.game.add.tween(this.player).to({alpha:0}, 500).start().onComplete.add(function() {
		    	//this.loadLevel(this.level);
		    	this.game.state.start('GamePlay');
			}, this);		
    },

    saveCP : function(player, cp) {
    	this.checkPoint.callAll('animations.play', 'animations', 'spin');
    	levelConfig.checkPoint.x = this.player.body.x;
    	levelConfig.checkPoint.y = this.player.body.y;
    },

    runCipo : function(player, cipo) {
    	onCipo = true;
    	player.body.velocity.y = Config.player.velocity.down;
    	//player.frame = Config.climbing.frames.min;
    },

    climb : function(velocity) {
    	this.player.animations.play('climbing');
    	this.player.body.velocity.y = velocity;
    	/*frameClimbing++;
    	this.player.frame  = frameClimbing;
    	if(frameClimbing > Config.climbing.frames.max){
    		frameClimbing = Config.climbing.frames.min;
    		this.player.frame = frameClimbing;
    	}*/

    },   

    initShadow: function(){
    	// Create the shadow texture
    	this.shadowTexture = this.game.add.bitmapData(this.game.world.bounds.width, this.game.world.bounds.height);

    	// Create an object that will use the bitmap as a texture
    	var lightSprite = this.game.add.image(0, 0, this.shadowTexture);

    	// Set the blend mode to MULTIPLY. This will darken the colors of
    	// everything below this sprite.
    	lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    },

    updateShadowTexture: function(x, y) {
    	// Draw shadow
    	this.shadowTexture.context.fillStyle = 'rgb(9, 9, 9)';
    	//this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
    	this.shadowTexture.context.fillRect(0, 0, this.game.world.bounds.width, this.game.world.bounds.height);
    	
    	// Draw circle of light with a soft edge
    	var gradient = this.shadowTexture.context.createRadialGradient(
    		x, y, Config.finalPhase.lightRadius * 0.75,
    		x, y, Config.finalPhase.lightRadius);

    	gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    	gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    	this.shadowTexture.context.beginPath();
    	this.shadowTexture.context.fillStyle = gradient;
    	this.shadowTexture.context.arc(x, y, Config.finalPhase.lightRadius, 0, Math.PI*2);
    	this.shadowTexture.context.fill();

    	// This just tells the engine it should update the texture cache
    	this.shadowTexture.dirty = true;
	},

    render: function (){
    	/*game.debug.text(this.game.world.bounds.width,32,32);
    	game.debug.text(this.game.world.bounds.height,32,64);*/
    	game.debug.text(this.player.body.x,32,32);
    	game.debug.text(this.player.body.y,32,64);
    	game.debug.text(levelConfig.checkPoint.x,200,32);
    	game.debug.text(levelConfig.checkPoint.y,200,64);
    	//game.debug.body(this.player);
    	//game.debug.body(this.thorns);
    	//game.debug.text(frameClimbing,32,32);
    	//game.debug.text(levelConfig.checkPoint.x,32,32);

		/*this.thorns.forEach(function (thorn){ 
			game.debug.body(thorn);
		}, this);*/

		/*this.waters.forEach(function (w){ 
			game.debug.body(w);
		}, this);*/

		/*this.bees.forEach(function (bees){ 
			game.debug.body(bees);
		}, this);*/

		/*this.cipo.forEach(function (c){ 
			game.debug.body(c);
		}, this);*/
    },
};