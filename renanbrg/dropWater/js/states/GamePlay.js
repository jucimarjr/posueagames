/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
    this.map = null;
    this.layer = null;
    this.player = null;
    this.crabs = null;
    this.shell = null;
    this.crabMaterial = null;
    this.groundMaterial = null;
    this.energy = null;
    this.smokeEmitter = null;
    this.haveEnergy = false;
    this.smokeTimer = null;
    this.redSand = null;
    
    this.dropCollisionGroup = null;
    this.crabCollisionGroup = null;
    this.layerBody = null;
    this.hud = new HUD(this.game);
    this.forceSlidingStraw = false;

    try {
        this.drop = new Character(this.game, 'dude',
                'assets/images/Dude_32-48.png', [32, 48]);
    } catch(exception) {
        console.log(exception.toString());
    }
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('gameplay-bg',  Config.gamePlay.dir);
		this.game.load.tilemap('map', 'assets/mapaLevel1_4800-600.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('redsand','assets/images/redsand_1480-80.png');
	    this.game.load.image('plataforma','assets/images/barra_160-80.png');
	    this.game.load.image('areia','assets/images/areiaSeca_40-40.png');	    
	    this.game.load.spritesheet('crab','assets/spritesheets/crab_150-69.png', 150, 69);
	    this.game.load.spritesheet('energy','assets/spritesheets/energy_200-40.png', 40, 40);

        this.game.load.spritesheet('urchin',
                'assets/spritesheets/seaurchin_80-40.png', 40, 40);
	    this.game.load.image('wetSand', 'assets/images/areiaMolhada_330-75.png');
	    this.game.load.image('bucket', 'assets/images/balde_384-497.png');
	    this.game.load.image('straw1', 'assets/images/straw1_375-72.png');
	    this.game.load.image('straw2', 'assets/images/straw2_236-276.png');
	    this.game.load.image('seashell', 'assets/images/seashell_220-68.png');
        this.game.load.spritesheet('life_drop',
                'assets/spritesheets/water_200-40.png', 40, 40);
	    this.game.load.image('smoke', './assets/images/smoke_32-32.png');
	    
	    this.game.load.audio('jump','assets/waterDrop.mp3');
	    this.game.load.audio('main','assets/gotaMain.wav');
	    this.game.load.audio('powup','assets/gotaPowerUp.wav');
        this.hud.preload();

		// Player
        this.drop.preload();
        
        // Straw physics
        this.game.load.physics('strawPhysics',
                'assets/polygon/straw-polygon.json');

        this.game.load.physics('seashellPhysics',
                'assets/polygon/seashell-polygon.json');
        this.game.load.physics('bucketPhysics',
        'assets/polygon/bucket-polygon.json');
	},
		
	create: function () {
		"use strict";
		var background;
		background = this.game.add.tileSprite(Config.gamePlay.x, Config.gamePlay.y, 4800, 600, 'gameplay-bg');
		background.fixedToCamera = true;
		this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1400;
        this.game.physics.defaultRestitution = 0;
        this.game.stage.smoothed = false;  // no antialiasing
        this.game.world.enableBodySleeping=true;
        		
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('barra_160-80', 'plataforma');
		this.map.addTilesetImage('areiaSeca_40-40', 'areia');
		this.layer = this.map.createLayer('Camada de Tiles 1');
        this.layer.resizeWorld();
		
		this.game.add.image(2008, 508, 'straw1');
		        
        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies below.
		//this.map.setCollisionByExclusion([0],true, this.layer);
		this.layermain = game.physics.p2.convertTilemap(this.map, this.layer);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.updateBoundsCollisionGroup();
        
        // define collision group
		this.playerCG = game.physics.p2.createCollisionGroup();
		this.groundCG = game.physics.p2.createCollisionGroup();
		this.crabCG = game.physics.p2.createCollisionGroup();
		this.strawCG = game.physics.p2.createCollisionGroup();
		this.lifeDropCG = game.physics.p2.createCollisionGroup();
		this.seashellCG = game.physics.p2.createCollisionGroup();
		this.urchinsCG = game.physics.p2.createCollisionGroup();
		this.hotsandCG = game.physics.p2.createCollisionGroup();
        this.bucketCG = game.physics.p2.createCollisionGroup();
		
		// Create and Setup Material
        this.characterMaterial = game.physics.p2.createMaterial('characterMaterial');
        this.slidingMaterial = game.physics.p2.createMaterial('slidingMaterial');            
        this.crabMaterial = game.physics.p2.createMaterial('crabMaterial');           
        this.groundMaterial = game.physics.p2.createMaterial('groundMaterial');
        
        // red and hot sand
   		this.redSand = this.game.add.sprite(1060, this.game.height-40, 'redsand');
        this.game.physics.p2.enableBody(this.redSand, false);        
		this.redSand.body.fixedRotation = true;
        this.redSand.body.setRectangle(1480, 80, 0, 0);
		this.redSand.body.static = true;
        this.redSand.body.setCollisionGroup(this.hotsandCG);	
        this.redSand.body.collides([this.playerCG]);

		// wet sand
		this.game.add.image(0, this.game.height-80, 'wetSand');
		
        //setup all tiles with collisiongroups or materials
		for (var i=0; i<this.layermain.length; i++){
			this.layermain[i].setCollisionGroup(this.groundCG);
			this.layermain[i].collides([this.playerCG, this.crabCG, this.lifeDropCG, this.groundCG]);
			this.layermain[i].setMaterial(this.groundMaterial);
		}
		
        // create player
        this.drop.create(2000, 50);
        var dropSprite = this.drop.getSpriteObject();   
        this.game.physics.p2.enableBody(dropSprite, false);        
        this.game.camera.follow(dropSprite);
        this.drop.configureCharacter(this.setCharacterInicialValues);
        dropSprite.body.setCollisionGroup(this.playerCG);
        dropSprite.body.collides([this.groundCG, this.crabCG, this.strawCG,
                this.lifeDropCG, this.seashellCG, this.urchinsCG,
                this.hotsandCG, this.bucketCG]);
        dropSprite.body.setMaterial(this.characterMaterial);
        
        // Create sea shell
        this.seashell = this.game.add.sprite(450, this.game.world.height - 106,
                'seashell');
        this.game.physics.p2.enableBody(this.seashell);
        this.seashell.body.clearShapes();
        this.seashell.body.loadPolygon('seashellPhysics', 'seashell_220-68');
        this.seashell.body.fixedRotation = true;
        this.seashell.body.static = true;
        this.seashell.body.setCollisionGroup(this.seashellCG);
        this.seashell.body.collides([this.groundCG, this.crabCG,
                this.playerCG]);
        this.seashell.body.setMaterial(this.groundMaterial);

        // create crabs
        this.crabs = game.add.group();
		this.crabs.enableBody = true;
		this.crabs.physicsBodyType = Phaser.Physics.P2JS;		
		this.crabs.create(this.game.width-180, this.game.height-80-69, 'crab');
        this.crabs.create(this.game.width, this.game.height-80-69, 'crab');				
		for (var i = 0; i < this.crabs.length; i++) {				
			this.crabs.getAt(i).body.setCollisionGroup(this.crabCG);				
			this.crabs.getAt(i).body.fixedRotation = true;	
			this.crabs.getAt(i).body.setMaterial(this.crabMaterial);
			this.crabs.getAt(i).animations.add('walkL', [0, 1, 2], 10, true);
			this.crabs.getAt(i).animations.add('walkR', [0, 1, 2], 10, true);			
			this.crabs.getAt(i).body.collides([this.crabCG, this.playerCG,
                    this.groundCG, this.seashellCG]);
		}
		this.crabs.getAt(0).body.moveLeft(400);
		this.crabs.getAt(1).body.moveRight(400);
		
		// create energy       
        this.energy = this.game.add.sprite(1700, this.game.world.height-80-40, 'energy');
        this.game.physics.p2.enableBody(this.energy, false);
        this.energy.body.fixedRotation = true;
        this.energy.body.setRectangle(35, 26, 0, 0);
		this.energy.animations.add('energyMove', [0, 1, 2, 3, 4], 7, true);
		this.energy.animations.play('energyMove');
        this.energy.body.setCollisionGroup(this.groundCG);	
        this.energy.body.collides([this.groundCG, this.crabCG, this.playerCG]);


        // Create the sea urchins
        this.urchins = game.add.group();
        this.urchins.enableBody = true;
        this.urchins.physicsBodyType = Phaser.Physics.P2JS;
        this.urchins.create(3000, this.game.height - 80 - 20, 'urchin');
        this.urchins.create(3300, this.game.height - 80 - 20, 'urchin');
        for (var i = 0; i < this.urchins.length; i++) {
            this.urchins.getAt(i).body.setCollisionGroup(this.urchinsCG);
            this.urchins.getAt(i).body.static = true;
            this.urchins.getAt(i).animations.add('nohit', [0], 10, true);
            this.urchins.getAt(i).animations.add('hit', [1], 10, true);
            this.urchins.getAt(i).animations.play('nohit');
            this.urchins.getAt(i).body.collides([this.playerCG, this.groundCG]);
        }

        // Add the bucket
        this.bucket = this.game.add.sprite(2250, 272, 'bucket');
        this.game.physics.p2.enableBody(this.bucket, false);
        this.bucket.body.clearShapes();
        this.bucket.body.loadPolygon('bucketPhysics', 'bucket_384-497');
        this.bucket.body.fixedRotation = true;
        this.bucket.body.static = true;
        this.bucket.body.setCollisionGroup(this.bucketCG);
        this.bucket.body.collides([this.groundCG, this.playerCG]);
		      
		// canudo
		this.diagonalStraw = this.game.add.sprite(2720, 270, 'straw2');
		this.game.physics.p2.enableBody(this.diagonalStraw, false);
		this.diagonalStraw.body.clearShapes();
		this.diagonalStraw.body.loadPolygon('strawPhysics', 'straw2_236-276');
		this.diagonalStraw.body.fixedRotation = true;
		this.diagonalStraw.body.static = true;
		this.diagonalStraw.body.setCollisionGroup(this.strawCG);
        this.diagonalStraw.body.collides([this.groundCG, this.playerCG]);

        // Add a "life drop"
        this.lifeDrop = game.add.group();
        this.lifeDrop.enableBody = true;
        this.lifeDrop.physicsBodyType = Phaser.Physics.P2JS;
        this.lifeDrop.create(280, 268, 'life_drop');
        for (var i = 0; i < this.lifeDrop.length; i++) {
            this.lifeDrop.getAt(i).body.setCollisionGroup(this.lifeDropCG);
            this.lifeDrop.getAt(i).body.fixedRotation = true;
            this.lifeDrop.getAt(i).body.static = true;
            this.lifeDrop.getAt(i).animations.add('dropAnimation',
                    [0, 1, 2, 3, 4], 10, true);
            this.lifeDrop.getAt(i).animations.play('dropAnimation');
            this.lifeDrop.getAt(i).body.collides([this.playerCG, this.groundCG]);
            this.lifeDrop.hasCollided = false;
        }

        // collide callbacks
		dropSprite.body.createGroupCallback(this.crabCG, this.checkOverlapCrabDrop, this);
        dropSprite.body.createGroupCallback(this.urchinsCG,
                this.checkCollisionUrchins, this);
        dropSprite.body.createGroupCallback(this.lifeDropCG,
                this.checkOverlapWithLifeDrop, this);
		this.energy.body.createGroupCallback(this.playerCG, this.drinkEnergy, this);
		dropSprite.body.createGroupCallback(this.hotsandCG, this.killDrop, this);
		
		// create contact material
        this.game.physics.p2.createContactMaterial(this.characterMaterial, this.slidingzMaterial, {friction: 0.1, restitution: 0});         
        this.game.physics.p2.createContactMaterial(this.groundMaterial, this.crabMaterial, {friction: 0.0, restitution: 0.0});
		this.game.physics.p2.createContactMaterial(this.characterMaterial, this.groundMaterial, {friction: 0.0, restitution: 0.0});        				          				
		
		// smoke animation
		// add smoke particles
		this.smokeEmitter = this.game.add.emitter(1550, this.game.height-80, 100);
		this.smokeEmitter.gravity = 0;
		this.smokeEmitter.setXSpeed(-15, 15);
		this.smokeEmitter.setYSpeed(-80, -50);

		this.smokeEmitter.setAlpha(1, 0, 3000, Phaser.Easing.Linear.InOut);
		this.smokeEmitter.makeParticles('smoke');
        				
        this.hud.create();
        
		//this.userDead();
		
        // Sounds
        this.jumpSound = this.game.add.audio("jump"); 
        this.mainSound = this.game.add.audio("main");
        this.powUpSound = this.game.add.audio("powup");
       // this.inicioSound.stop();
        this.mainSound.loop = true;
        this.mainSound.play();
    },
    setCharacterInicialValues: function(character) {    	
    	character.smoothed = false;
    	character.body.fixedRotation = true;
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);
    },
	update: function () {
		"use strict";
		this.hud.updateFPS();
		this.handleKeyDown();
		this.playerOverDiagonalStraw();

		this.moveCrab(this.crabs.getAt(0));
		this.moveCrab(this.crabs.getAt(1));
		
		if (this.haveEnergy) {
			this.smokeEmitter.x = this.drop.getSpriteObject().x;
			this.smokeEmitter.y = this.drop.getSpriteObject().y + 56;
		}

//		if(this.userDead()){ 
//		      this.restart();  
//		   }
    },
    playerOverDiagonalStraw: function() {
        var characterSprite = this.drop.getSpriteObject();
        if (characterSprite.x >= 2513.0 && characterSprite.x <= 2750.0 &&
                characterSprite.y <= (this.game.world.height - 200.0) &&
                this.touchingDown(characterSprite.body)) {
            this.forceSlidingStraw = true;
        } else {
            this.forceSlidingStraw = false;
        }
    },
	handleKeyDown: function () {
		"use strict";
		//this.drop.getSpriteObject().body.setZeroVelocity();

		if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
            if (this.forceSlidingStraw == true) {
                this.drop.getSpriteObject().body.moveLeft(1);
                this.drop.getSpriteObject().body.data.force[0] = -1;
            } else {
                this.drop.moveRight(4);
                this.drop.getSpriteObject().body.moveRight(300);
            }
        } else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) {
            this.drop.moveLeft(4);
            this.drop.getSpriteObject().body.moveLeft(300);
		} else {
            this.drop.stop();
		}
		// Jump
		if ( this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) {
			if (this.touchingDown(this.drop.getSpriteObject().body)) { 
				this.drop.getSpriteObject().body.moveUp(700);
				this.jumpSound.play();
			}
		}
	},
	// Funcao Magica!!! Deve existir outro jeito!
	touchingDown: function (someone) {
		var yAxis = p2.vec2.fromValues(0, 1);
		var result = false;
		for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = game.physics.p2.world.narrowphase.contactEquations[i];
			if (c.bodyA === someone.data || c.bodyB === someone.data)        {
				var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
				if (c.bodyA === someone.data) d *= -1;
				if (d > 0.5) result = true;
			}
		} return result;
	},		
	touchingUp: function (someone) {
		var yAxis = p2.vec2.fromValues(0, 1);
		var result = false;
		for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = game.physics.p2.world.narrowphase.contactEquations[i];
			if (c.bodyA === someone.data || c.bodyB === someone.data)        {
				var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
				if (c.bodyA === someone.data) d *= -1;
				if (d < -0.5) result = true;
			}
		} return result;
	},
	touchingLeft: function (someone) {
		var xAxis = p2.vec2.fromValues(1,0);
		var result = false;
		for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = game.physics.p2.world.narrowphase.contactEquations[i];
			if (c.bodyA === someone.data || c.bodyB === someone.data)        {
				var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
				if (c.bodyA === someone.data) d *= -1;
				if (d < -0.5) result = true;
			}
		} return result;
	},
	touchingRight: function (someone) {
		var xAxis = p2.vec2.fromValues(1,0);
		var result = false;
		for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = game.physics.p2.world.narrowphase.contactEquations[i];
			if (c.bodyA === someone.data || c.bodyB === someone.data)        {
				var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
				if (c.bodyA === someone.data) d *= -1;
				if (d > 0.5) result = true;
			}
		} return result;
	},	
	checkOverlapCrabDrop: function (body1, body2) {
		// body1 is the drop, body2 is the crab.
		if (!this.touchingUp(body2)) { 
			console.log('Matou o Player!!!!');
			this.drop.getSpriteObject().kill();
			//this.userDead = true;
			return true;
		}
		return false;
    },
    checkCollisionUrchins: function(body1, body2) {
        // body1 is the drop, body2 is the sea urchin.
        var urchinSprite = body2.sprite;
        urchinSprite.animations.play('hit');
        this.drop.getSpriteObject().kill();
        return true;
    },
    checkOverlapWithLifeDrop: function (body1, body2) {
        // body1 is the drop; body2 is the life drop.
        if (!body2.hasCollided) {
            console.log('Player get the life drop!!!!');
            this.powUpSound.play();
            this.hud.increaseDropBar();
            body2.sprite.kill();
            body2.hasCollided = true;
			this.drop.getSpriteObject().scale.setTo(1.5, 1.5);
            return true;
        }
        return false;
    },
    drinkEnergy: function() {
		this.energy.kill();
		//this.drop.getSpriteObject().body.x = 1890; 
		//this.drop.getSpriteObject().body.y = 50;
		this.drop.getSpriteObject().body.moveUp(1500);		
		this.jumpSound.play();		
		this.smokeEmitter.start(false, 3000, 50);
        this.haveEnergy = true;		
        var self = this;
        this.smokeTimer = setTimeout(function() {
                self.stopSmoke();
        }, 2000);		
	},
	killDrop: function (body1, body2) {
		console.log("aaaaaaaaaaaaaaaaaaa");
		this.haveEnergy = true;
		this.smokeEmitter.on = true;
		this.smokeEmitter.start(false, 3000, 50);
		this.drop.getSpriteObject().scale.setTo(this.drop.getSpriteObject().scale.x-0.2, this.drop.getSpriteObject().scale.y-0.2);
		if (this.drop.getSpriteObject().scale.x < 1) {
				this.drop.getSpriteObject().kill();
		}
		
	},
	stopSmoke: function() {
		this.haveEnergy = false;
		this.smokeEmitter.on = false;
		clearTimeout(this.smokeTimer);
	},
	moveCrab: function (crab) {
		if (crab.name == "crab1") {
			if (this.touchingLeft(crab.body)) {
				crab.body.moveRight(400);
				crab.animations.play('walkR');
			} else if (this.touchingRight(crab.body)) {
				crab.body.moveLeft(400);
				crab.animations.play('walkL');
			} else {
			}								
		} else {
			if (this.touchingRight(crab.body)) {
				crab.body.moveLeft(400);
				crab.animations.play('walkL');
			} else if (this.touchingLeft(crab.body)) {
				crab.body.moveRight(400);
				crab.animations.play('walkR');
			} else {
				//this.crab.body.velocity.x = -100;
			}			
		}		
	},
	crabKillDrop: function () {
		this.drop.getSpriteObject().kill();		
	},
	clickHowToPlay: function () {
		"use strict";
		this.game.state.start('HowToPlay');
	},
	clickCredits: function () {
		"use strict";
		this.game.state.start('Credits');
	}
//	restart: function(){
//		player.resetPosition(); 
//        if (lifeCounter==0){
//        	this.game.state.start('GameOver');
//        }	
//		this.game.state.restart();
//	}
};
