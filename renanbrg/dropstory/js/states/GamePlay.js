/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
    this.map = null;
    this.layer1 = null;
    this.layer2 = null;
    this.player = null;
    this.crabs = null;
    this.shell = null;
    this.sunscreen = null;
    this.can = null;
    this.crabMaterial = null;
    this.groundMaterial = null;
    this.hotsandMaterial = null;
    this.energy = null;
    this.smokeEmitter = null;
    this.haveEnergy = false;
    this.smokeTimer = null;
    this.redSand = null;
    this.userDead = false;
    this.playershape = null;
    this.dropCollisionGroup = null;
    this.crabCollisionGroup = null;
    this.layerBody = null;
    this.hud = new HUD(this.game);
    this.forceSlidingStraw = false;
    this.animestate = 'stop';  //stores if player is walk, jump, die
    this.playersize = 'small'; //stores if player is small or big
    this.playerstate = 'normal'; //stores if player is normal, with sunscreen, with energy
    this.onAir = false;
    this.hotSandTimerActivated = false;
    
    this.countCall = 0; //count how many times the collision function is called. 

    try {
        this.drop = new Character(this.game, 'drop',
                'assets/spritesheets/drop_4590-60.png', [51, 60]);
    } catch(exception) {
        console.log(exception.toString());
    }
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('gameplay-bg',  Config.gamePlay.dir);
		this.game.load.tilemap('map', 'assets/mapaLevel1_4800-600.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('redsand','assets/images/redsand_4440-80.png');
	    this.game.load.image('plataforma','assets/images/barra_160-80.png');
        this.game.load.image('areia','assets/images/areiaSeca_40-40.png');
        this.game.load.image('areia_quente','assets/images/red_40-40.png');
	    this.game.load.spritesheet('crab','assets/spritesheets/crab_150-69.png', 150, 69);
	    this.game.load.spritesheet('energy','assets/spritesheets/energy_200-40.png', 40, 40);
        this.game.load.spritesheet('dropInStraw',
                'assets/spritesheets/dropinstraw_5280-70.png', 480, 70);

        this.game.load.spritesheet('urchin',
                'assets/spritesheets/seaurchin_80-40.png', 40, 40);
        this.game.load.spritesheet('life_drop',
                'assets/spritesheets/water_200-40.png', 40, 40);
        this.game.load.image('wetSand', 'assets/images/areiaMolhada_330-75.png');
		this.game.load.image('bucket', 'assets/images/balde_384-497.png');
	    this.game.load.image('straw1', 'assets/images/straw_15-20.png');
	    this.game.load.image('straw2', 'assets/images/straw2_236-276.png');
	    this.game.load.image('seashell', 'assets/images/seashell_220-68.png');
	    this.game.load.image('smoke', './assets/images/smoke_32-32.png');
	    this.game.load.image('sunscreen', './assets/images/sunscreen_231-59.png');
	    this.game.load.image('coversunscreen', './assets/images/tampasunscreen_50-10.png');
	    this.game.load.image('can', './assets/images/can_313-120.png');
	    
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
        this.map.addTilesetImage('red_40-40', 'areia_quente');
        this.layer1 = this.map.createLayer('Camada de Tiles 1');
        this.layer2 = this.map.createLayer('Camada de Tiles 2');
        this.layer1.resizeWorld();
        this.layer2.resizeWorld();
		        
        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies below.
		//this.map.setCollisionByExclusion([0],true, this.layer);
        this.layermain1 = game.physics.p2.convertTilemap(this.map, this.layer1);
        this.layermain2 = game.physics.p2.convertTilemap(this.map, this.layer2);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.updateBoundsCollisionGroup();
        
        // define collision group
		this.playerCG = game.physics.p2.createCollisionGroup();
		this.groundCG = game.physics.p2.createCollisionGroup();
		this.crabCG = game.physics.p2.createCollisionGroup();
		this.strawCG = game.physics.p2.createCollisionGroup();
		this.coveredStrawCG = game.physics.p2.createCollisionGroup();
		this.lifeDropCG = game.physics.p2.createCollisionGroup();
		this.seashellCG = game.physics.p2.createCollisionGroup();
		this.urchinsCG = game.physics.p2.createCollisionGroup();
		this.hotsandCG = game.physics.p2.createCollisionGroup();
        this.bucketCG = game.physics.p2.createCollisionGroup();
        this.sunscreenCG = game.physics.p2.createCollisionGroup();
		
		// Create and Setup Material
        this.characterMaterial = game.physics.p2.createMaterial('characterMaterial');
        this.slidingMaterial = game.physics.p2.createMaterial('slidingMaterial');            
        this.crabMaterial = game.physics.p2.createMaterial('crabMaterial');           
        this.groundMaterial = game.physics.p2.createMaterial('groundMaterial');
        this.hotsandMaterial = game.physics.p2.createMaterial('hotsandMaterial');

		// wet sand
		this.game.add.image(0, this.game.height-80, 'wetSand');
		
        //setup all tiles with collisiongroups or materials
		for (var i=0; i<this.layermain1.length; i++) {
			this.layermain1[i].setCollisionGroup(this.groundCG);
			this.layermain1[i].collides([this.playerCG, this.crabCG, this.lifeDropCG, this.groundCG]);
			this.layermain1[i].setMaterial(this.groundMaterial);
		}
        for (var i=0; i<this.layermain2.length; i++) {
            this.layermain2[i].setCollisionGroup(this.hotsandCG);
            this.layermain2[i].collides([this.playerCG, this.crabCG,
                    this.lifeDropCG, this.seashellCG, this.groundCG,
                    this.urchinsCG]);
            this.layermain2[i].setMaterial(this.groundMaterial);
        }
        
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

        // Create sunscreen
        this.sunscreen = this.game.add.sprite(3200, this.game.world.height-59-44,'sunscreen');
        this.game.physics.p2.enableBody(this.sunscreen);
        this.sunscreen.body.fixedRotation = true;
        this.sunscreen.body.static = true;
        this.sunscreen.body.setMaterial(this.groundMaterial);
        this.sunscreen.body.setCollisionGroup(this.sunscreenCG);
        this.sunscreen.body.collides([this.groundCG, this.crabCG, this.playerCG]);        
        var cover = this.game.add.sprite(3060, this.game.world.height-78,'coversunscreen');
        this.game.physics.p2.enableBody(cover);
        cover.body.fixedRotation = true;
        cover.body.static = true;
        cover.body.setMaterial(this.groundMaterial);
        cover.body.setCollisionGroup(this.sunscreenCG);
        cover.body.collides([this.groundCG, this.crabCG, this.playerCG]);
        
        // create CAN
        this.can = this.game.add.sprite(1620, this.game.world.height-80,'can');
        this.game.physics.p2.enableBody(this.can, false);
        this.can.body.fixedRotation = true;
        this.can.body.setRectangle(260,120,0,0);
        this.can.body.static = true;
        this.can.body.setMaterial(this.groundMaterial);
        this.can.body.setCollisionGroup(this.groundCG);
        this.can.body.collides([this.groundCG, this.crabCG, this.playerCG]);               

        // create crabs
        this.crabs = game.add.group();
		this.crabs.enableBody = true;
		this.crabs.physicsBodyType = Phaser.Physics.P2JS;		
		this.crabs.create(this.game.width-180, this.game.height-80-69, 'crab');
        this.crabs.create(this.game.width, this.game.height-80-69, 'crab');
        this.crabs.create(4480, this.game.height-80-69, 'crab');        
		for (var i = 0; i < this.crabs.length; i++) {				
			this.crabs.getAt(i).body.setCollisionGroup(this.crabCG);				
			this.crabs.getAt(i).body.fixedRotation = true;	
			this.crabs.getAt(i).body.setMaterial(this.crabMaterial);
			this.crabs.getAt(i).animations.add('walkL', [0, 1, 2], 10, true);
			this.crabs.getAt(i).animations.add('walkR', [0, 1, 2], 10, true);			
			this.crabs.getAt(i).body.collides([this.crabCG, this.playerCG,
                    this.groundCG, this.seashellCG, this.hotsandCG, this.sunscreenCG]);
		}
		this.crabs.getAt(0).body.moveLeft(400);
		this.crabs.getAt(1).body.moveRight(400);
		this.crabs.getAt(2).body.moveRight(400);
		
		// create energy       
        this.energy = this.game.add.sprite(1700, this.game.world.height-80-40, 'energy');
        this.game.physics.p2.enableBody(this.energy, false);
        this.energy.body.fixedRotation = true;
        this.energy.body.setCircle(15, 0, 0);
		this.energy.animations.add('energyMove', [0, 1, 2, 3, 4], 10, true);
		this.energy.animations.play('energyMove');
        this.energy.body.setCollisionGroup(this.groundCG);	
        this.energy.body.collides([this.groundCG, this.crabCG, this.playerCG,
                this.hotsandCG]);

        // Create the sea urchins
        this.urchins = game.add.group();
        this.urchins.enableBody = true;
        this.urchins.physicsBodyType = Phaser.Physics.P2JS;
        this.urchins.create(3430, this.game.height - 80 - 20, 'urchin');
        this.urchins.create(3730, this.game.height - 80 - 20, 'urchin');
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

        // Tip of the straw (in the left of the bucket)
        this.strawLeft = this.game.add.sprite(2010, 510, 'straw1');
        this.game.physics.p2.enableBody(this.strawLeft, false);
        this.strawLeft.body.fixedRotation = true;
        this.strawLeft.body.static = true;
        this.strawLeft.body.setCollisionGroup(this.coveredStrawCG);
        this.strawLeft.body.collides([this.playerCG]);
        this.playerEnteredLeftStraw = false;

        // Straw passing under the ground
        this.strawUnderGround = this.game.add.sprite(2000, 520, 'dropInStraw');
        var strawAnimationRight =
            this.strawUnderGround.animations.add('dropInsideRight',
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, false);
        strawAnimationRight.onComplete.add(this.strawAnimationComplete, this);
        var strawAnimationLeft =
            this.strawUnderGround.animations.add('dropInsideLeft',
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 10], 10, false);
        strawAnimationLeft.onComplete.add(this.strawAnimationComplete, this);
        this.strawUnderGround.animations.add('strawNormal', [10], 10, false);
        this.strawUnderGround.animations.play('strawNormal');

        // Tip of the straw (in the right of the bucket)
        this.strawRight = this.game.add.sprite(2470, 510, 'straw1');
        this.game.physics.p2.enableBody(this.strawRight, false);
        this.strawRight.body.fixedRotation = true;
        this.strawRight.body.static = true;
        this.strawRight.body.setCollisionGroup(this.coveredStrawCG);
        this.strawRight.body.collides([this.playerCG]);
        this.playerEnteredRightStraw = false;

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

        // create player
        this.drop.create(150, this.game.world.height-200);
        var dropSprite = this.drop.getSpriteObject();
        this.game.camera.follow(dropSprite);
        this.game.physics.p2.enableBody(dropSprite, true);		
        this.drop.configureCharacter(this.setCharacterInicialValues);
		this.playershape = dropSprite.body.setCircle(18,0,4);
        dropSprite.body.setMaterial(this.characterMaterial);
        dropSprite.body.setCollisionGroup(this.playerCG);
        dropSprite.body.collides([this.groundCG, this.crabCG, this.strawCG,
                this.lifeDropCG, this.seashellCG, this.urchinsCG,
                this.hotsandCG, this.bucketCG, this.coveredStrawCG, this.sunscreenCG]);

        // collide callbacks
		dropSprite.body.createGroupCallback(this.crabCG, this.checkOverlapCrabDrop, this);
        dropSprite.body.createGroupCallback(this.urchinsCG,
                this.checkCollisionUrchins, this);
        dropSprite.body.createGroupCallback(this.lifeDropCG,
                this.checkOverlapWithLifeDrop, this);
		this.energy.body.createGroupCallback(this.playerCG, this.drinkEnergy, this);
		dropSprite.body.createGroupCallback(this.hotsandCG, this.killDrop, this);
        dropSprite.body.createGroupCallback(this.coveredStrawCG,
                this.insideStraw, this);
        dropSprite.body.createGroupCallback(this.sunscreenCG, this.hitSunscreen, this);
		
		// create contact material
        this.game.physics.p2.createContactMaterial(this.characterMaterial, this.slidingMaterial, {friction: 0.1, restitution: 0});         
        this.game.physics.p2.createContactMaterial(this.groundMaterial, this.crabMaterial, {friction: 0.0, restitution: 0.0});
        this.game.physics.p2.createContactMaterial(this.characterMaterial, this.groundMaterial, {friction: 0.0, restitution: 0.0});
        this.game.physics.p2.createContactMaterial(this.crabMaterial, this.hotsandMaterial, {friction: 0.0, restitution: 0.0});
		
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
    	
    	// normal state
        character.animations.add('leftsmallnormal', [4,5,6], 10, true);
        character.animations.add('rightsmallnormal', [8,9,10], 10, true);                                
        character.animations.add('jumpleftsmallnormal', [3], 10, false);                
        character.animations.add('jumprightsmallnormal', [11], 10, false);
        character.animations.add('stopsmallnormal', [7], 10, true);         
        character.animations.add('leftbignormal', [19,20,21], 10, true);
        character.animations.add('rightbignormal', [23,24,25], 10, true);
        character.animations.add('jumpleftbignormal', [18], 10, true);                
        character.animations.add('jumprightbignormal', [26], 10, true);
        character.animations.add('stopbignormal', [22], 10, true);

		// energy state
        character.animations.add('leftsmallenergy', [34,35,36], 10, true);
        character.animations.add('rightsmallenergy', [38,39,40], 10, true);                                
        character.animations.add('jumpleftsmallenergy', [33], 10, false);                
        character.animations.add('jumprightsmallenergy', [41], 10, false);
        character.animations.add('stopsmallenergy', [37], 10, true);                 
        character.animations.add('leftbigenergy', [49,50,51], 10, true);
        character.animations.add('rightbigenergy', [53,54,55], 10, true);
        character.animations.add('jumpleftbigenergy', [48], 10, true);                
        character.animations.add('jumprightbigenergy', [56], 10, true);
        character.animations.add('stopbigenergy', [52], 10, true);
        
        // sunscreen state
        character.animations.add('leftsmallsunscreen', [64,65,66], 10, true);
        character.animations.add('rightsmallsunscreen', [68,69,70], 10, true);                                
        character.animations.add('jumpleftsmallsunscreen', [63], 10, false);                
        character.animations.add('jumprightsmallsunscreen', [71], 10, false);
        character.animations.add('stopsmallsunscreen', [67], 10, true);                 
        character.animations.add('leftbisunscreen', [79,80,81], 10, true);
        character.animations.add('rightbigsunscreen', [83,84,85], 10, true);
        character.animations.add('jumpleftbigsunscreen', [78], 10, true);                
        character.animations.add('jumprightbigsunscreen', [86], 10, true);
        character.animations.add('stopbigsunscreen', [82], 10, true);
		
    },
	update: function () {
		"use strict";
		this.hud.updateFPS();
		this.handleKeyDown();
		this.isOnAir();
		this.playerAnimations(this.drop.getSpriteObject());
		this.playerOverDiagonalStraw();

		this.moveCrab(this.crabs.getAt(0));
		this.moveCrab(this.crabs.getAt(1));
		this.moveCrab(this.crabs.getAt(2));
		
		if (this.haveEnergy) {
			this.smokeEmitter.x = this.drop.getSpriteObject().x;
			this.smokeEmitter.y = this.drop.getSpriteObject().y + 56;
		}

        if (this.playerEnteredLeftStraw) {
            this.game.camera.setPosition(this.game.camera.x + 8,
                    this.game.camera.y);
        } else if (this.playerEnteredRightStraw) {
            this.game.camera.setPosition(this.game.camera.x - 8,
                    this.game.camera.y);
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
				if (!this.onAir) {
					this.drop.moveRight(4);
					this.animestate = 'right';
				} else {
					this.animestate = 'jumpright';
				}
				this.drop.getSpriteObject().body.moveRight(300);
            }
        } else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) {
			if (!this.onAir) {
				this.drop.moveLeft(4);
				this.animestate = 'left';
			} else {
				this.animestate = 'jumpleft';
			}
			this.drop.getSpriteObject().body.moveLeft(300);
		}  else {
			this.drop.stop();
			this.animestate = 'stop';
		}
		
		if ( this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) {
			if (this.touchingDown(this.drop.getSpriteObject().body)) { 
				this.drop.getSpriteObject().body.moveUp(700);
				this.jumpSound.play();
			}
		}
	},
	
	playerAnimations: function (player) {
		if (this.animestate === 'jumpTop') { player.animations.stop(); player.frame = 2;}
			else if (this.animestate === 'jumpright')  { player.animations.play('jumpright'+this.playersize+this.playerstate);}
			else if (this.animestate === 'jumpleft')  { player.animations.play('jumpleft'+this.playersize+this.playerstate);}
			else if (this.animestate === 'die')  { player.animations.stop(); player.frame = 6;}
			else if (this.animestate === 'win')  { player.animations.stop(); player.frame = 7;}
			else if (this.animestate === 'powerup') { player.animations.stop(); player.frame = 8;}
			else if (this.animestate === 'fall') { player.animations.stop(); player.frame = 9;}
			else if (this.animestate === 'left') { player.animations.play('left'+this.playersize+this.playerstate);}
			else if (this.animestate === 'right') { player.animations.play('right'+this.playersize+this.playerstate);}
		else { player.animations.stop(); player.animations.play('stop'+this.playersize+this.playerstate);}
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
	isOnAir: function () {
		if( this.touchingDown(this.drop.getSpriteObject().body) ||
			this.touchingUp(this.drop.getSpriteObject().body)   ||
			this.touchingLeft(this.drop.getSpriteObject().body) ||
			this.touchingRight(this.drop.getSpriteObject().body)) {
				this.onAir = false;
		} else {
			this.onAir = true;
		}
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
			this.playersize = 'big';
            return true;
        }
        return false;
    },
    drinkEnergy: function() {
		this.countCall++;
		if (this.countCall == 1) {

			this.energy.kill();
			this.drop.getSpriteObject().body.moveUp(1500);		
			this.jumpSound.play();		
			this.smokeEmitter.start(false, 3000, 50);
			this.haveEnergy = true;		
			var self = this;
			this.smokeTimer = setTimeout(function() {
					self.stopSmoke();
			}, 2000);
			
			this.playerstate = 'energy';
		} 				
		if (this.countCall == 2) {
			this.countCall = 0;
		} 			
	},
	hitSunscreen: function () {
		this.playerstate = 'sunscreen';
	},
	killDrop: function (body1, body2) {
        this.countCall++;
        if (this.countCall == 1 && !this.hotSandTimerActivated) {
            console.log('moreeeeeeeeeeeeeeeeeu!!! killlDrop');
            this.hud.decreaseDropBar();
            this.haveEnergy = true;
            this.smokeEmitter.on = true;
            this.smokeEmitter.start(false, 3000, 50);
            if (this.playersize == 'big') {
                var self = this;
                if (this.hud.getDropCounter() == 0) {
                    setTimeout(function(time) {
                        self.hotSandTimerActivated = false;
                        self.stopKillTime(time);
                    }, 2000);
                    this.playersize = 'small';
                    this.hotSandTimerActivated = true;
                } else {
                    setTimeout(function(time) {
                        console.log('* setTimeout called');
                        self.hotSandTimerActivated = false;
                        self.countCall = 0;
                        self.stopDecreaseCounter(time);
                    }, 2000);
                    this.hotSandTimerActivated = true;
                }
            } else if (this.playersize == 'small') {
                // TODO: restart game
                this.drop.getSpriteObject().kill();
            }
        }
        if (this.countCall == 2) {
            this.countCall = 0;
        }
    },
	stopSmoke: function() {
		this.haveEnergy = false;
		this.smokeEmitter.on = false;
		clearTimeout(this.smokeTimer);
		this.playerstate = 'normal';
	},
	stopKillTime: function(time) {
		this.drop.getSpriteObject().body.createGroupCallback(this.hotsandCG, this.timeOverKill, this);
		clearTimeout(time);
	},
    stopDecreaseCounter: function(time) {
		this.drop.getSpriteObject().body.createGroupCallback(this.hotsandCG, this.killDrop, this);
		clearTimeout(time);
    },
	timeOverKill: function () {
		this.drop.getSpriteObject().kill();
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
    insideStraw: function() {
        var dropSprite = this.drop.getSpriteObject();
        if (dropSprite.x < 2300) {
            if (!this.playerEnteredLeftStraw) {
                dropSprite.exists = false;
                this.game.camera.target = null;
                this.playerEnteredLeftStraw = true;
                this.strawUnderGround.animations.play('dropInsideRight');
            }
        } else {
            if (!this.playerEnteredRightStraw) {
                dropSprite.exists = false;
                this.game.camera.target = null;
                this.playerEnteredRightStraw = true;
                this.strawUnderGround.animations.play('dropInsideLeft');
            }
        }
    },
    strawAnimationComplete: function(sprite, animation) {
        var dropSprite = this.drop.getSpriteObject();
        if (this.playerEnteredLeftStraw) {
            dropSprite.reset(2483, this.game.world.height - 140);
            this.playerEnteredLeftStraw = false;
        } else {
            dropSprite.reset(2019, this.game.world.height - 140);
            this.playerEnteredRightStraw = false;
        }
        dropSprite.exists = true;
        dropSprite.body.moveUp(700);
        this.game.camera.follow(dropSprite);
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
