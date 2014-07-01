/*global State, Config*/

State.Level1 = function (game) {
	"use strict";
	this.game = game;
    this.map = null;
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
    this.dropCollisionGroup = null;
    this.crabCollisionGroup = null;
    this.hud = new HUD(this.game);
    this.forceSlidingStraw = false;
    this.onAir = false;
    this.hotSandTimerActivated = false;
    this.userDead = false;
    this.dropIsInvincible = false;

    this.countCall = 0; //count how many times the collision function is called.
};
State.Level1.prototype = {
	preload: function () {
		"use strict";

		// Player
		try {
			this.drop = new Character(this.game, 'drop',
					'assets/spritesheets/drop_4590-60.png', [51, 60]);
		} catch(exception) {
			console.log(exception.toString());
		}
        this.drop.preload();

        this.hud.preload();
	},
	create: function () {
		"use strict";

		var background;
		background = this.game.add.tileSprite(0, 0, 4480, 544, 'gameplay-bg');
		background.fixedToCamera = true;

        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('wetsand_40-40', 'wetsand');
        this.map.addTilesetImage('hotsand_40-40', 'hotsand');
        this.map.addTilesetImage('platform_160-80', 'platform');
        this.map.addTilesetImage('seashell_120-40', 'seashell');
        this.map.addTilesetImage('can_320-120', 'can');
        this.map.addTilesetImage('bucket_360-480', 'bucket');
        this.map.addTilesetImage('diagonalstraw_240-280', 'diagonalstraw');
        this.map.addTilesetImage('sunscreen_280-80', 'sunscreen');
        this.map.addTilesetImage('seaurchin_80-40', 'seaurchin');
        this.map.addTilesetImage('glass_280-320', 'glass');
        this.map.addTilesetImage('water_200-40', 'lifedrop');
        this.map.addTilesetImage('energy_200-40', 'energy');
        this.map.addTilesetImage('sunscreendrop_200-40', 'sundrop');
        this.map.addTilesetImage('dropinstraw_3840-80', 'dropinstraw');

        this.mainLayer = this.map.createLayer('mainlayer');
        this.hotSandLayer = this.map.createLayer('hotsandlayer');
        this.irregularLayer = this.map.createLayer('irregularlayer');
        this.mainLayer.resizeWorld();

//      this.map.setCollisionByExclusion([0], true, this.mainLayer);
//      this.map.setCollisionByExclusion([0], true, this.hotSandLayer);
//      this.map.setCollisionByExclusion([0], true, this.irregularLayer);

        this.setupPhysics();
        this.setupLayers();

//		this.setupShell(450, this.game.world.height - 106);
//		this.setupSunscreen(3200, this.game.world.height-59-44);
//		this.setupCan(1620, this.game.world.height-80);
        this.setupCrab();
//		this.setupBucket(2250, 272);
//		this.setupStrawHorizontal();
//		this.setupStrawDiagonal(2720, 270);
		this.setupMolecule();
		this.setupPlayer(3000, 100);
		this.setupSmokeEmitter(1550, this.game.height-80);

        this.hud.create();


        // Sounds
        this.jumpSound = this.game.add.audio("jump");
        this.mainSound = this.game.add.audio("main");
        this.powUpSound = this.game.add.audio("powup");
       // this.inicioSound.stop();
        this.mainSound.loop = true;
        this.mainSound.play();
	},
	update: function () {
		"use strict";
		this.hud.updateFPS();
		this.handleKeyDown();
		this.isOnAir();
		this.drop.playerAnimations();

		this.moveCrab(this.crabs.getAt(0));
		this.moveCrab(this.crabs.getAt(1));
		this.moveCrab(this.crabs.getAt(2));

		if (this.haveEnergy) {
			this.smokeEmitter.x = this.drop.getSpriteObject().x;
			this.smokeEmitter.y = this.drop.getSpriteObject().y + 56;
		}

	    if (this.playerEnteredLeftStraw) {
	        this.game.camera.setPosition(this.game.camera.x + 20,
	                this.game.camera.y);
	    } else if (this.playerEnteredRightStraw) {
	        this.game.camera.setPosition(this.game.camera.x - 20,
	                this.game.camera.y);
	    }

		if(this.userDead == true){
		      this.restartGame();
		      this.userDead = false;
		   }
	},
	handleKeyDown: function () {
		"use strict";

		if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
	        if (this.forceSlidingStraw == true) {
	            this.drop.moveLeft(1);
	            this.drop.getSpriteObject().body.data.force[0] = -1;
	        } else {
				if (!this.onAir) {
					this.drop.animestate = 'right';
				} else {
					this.drop.animestate = 'jumpright';
				}
				this.drop.moveRight(300);
	        }
	    } else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) {
			if (!this.onAir) {
				this.drop.animestate = 'left';
			} else {
				this.drop.animestate = 'jumpleft';
			}
			this.drop.moveLeft(300);
		}  else {
			this.drop.stop();
			this.drop.animestate = 'stop';
		}

		if ( this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) {
			if (this.touchingDown(this.drop.getSpriteObject().body)) {
				this.drop.jump(700);
				this.jumpSound.play();
			}
		}
	},
	setupPhysics: function () {
		this.game.physics.startSystem(Phaser.Physics.P2JS);
	    this.game.physics.p2.gravity.y = 1400;
	    this.game.physics.defaultRestitution = 0;
	    this.game.stage.smoothed = false;  // no antialiasing
	    this.game.world.enableBodySleeping=true;
	    this.game.physics.p2.setImpactEvents(true);
	    this.game.physics.p2.updateBoundsCollisionGroup();

	    // define collision group
		this.playerCG = game.physics.p2.createCollisionGroup();
		this.groundCG = game.physics.p2.createCollisionGroup();
		this.crabCG = game.physics.p2.createCollisionGroup();
		this.coveredStrawCG = game.physics.p2.createCollisionGroup();
		this.moleculeCG = game.physics.p2.createCollisionGroup();
		this.energyCG = game.physics.p2.createCollisionGroup();
		this.sundropCG = game.physics.p2.createCollisionGroup();
		this.urchinsCG = game.physics.p2.createCollisionGroup();
		this.hotsandCG = game.physics.p2.createCollisionGroup();
        this.glassCG = game.physics.p2.createCollisionGroup();

		// Create and Setup Material
	    this.characterMaterial = game.physics.p2.createMaterial('characterMaterial');
	    this.crabMaterial = game.physics.p2.createMaterial('crabMaterial');
	    this.groundMaterial = game.physics.p2.createMaterial('groundMaterial');
	    this.hotsandMaterial = game.physics.p2.createMaterial('hotsandMaterial');
	    this.slidingMaterial = game.physics.p2.createMaterial('slidingMaterial');

		// create contact material
	    this.game.physics.p2.createContactMaterial(this.groundMaterial, this.crabMaterial, {friction: 0.0, restitution: 0.0});
	    this.game.physics.p2.createContactMaterial(this.characterMaterial, this.groundMaterial, {friction: 0.0, restitution: 0.0});
	    this.game.physics.p2.createContactMaterial(this.crabMaterial, this.hotsandMaterial, {friction: 0.0, restitution: 0.0});
	    this.game.physics.p2.createContactMaterial(this.characterMaterial,
                this.slidingMaterial, {friction: 0.1, restitution: 0.0});
	},
	setupLayers: function () {
	    this.tilesMainLayer = game.physics.p2.convertTilemap(this.map,
	            this.mainLayer);
	    this.tilesHotSandLayer = game.physics.p2.convertTilemap(this.map,
	            this.hotSandLayer);
	    this.tilesIrregularLayer = game.physics.p2.convertTilemap(this.map,
	            this.irregularLayer);

	    var basicShapes = game.physics.p2.convertCollisionObjects(this.map,
                'basic-shapes');
	    var strawShapes = game.physics.p2.convertCollisionObjects(this.map,
                'straw-shapes');
	    var glassPolygon = game.physics.p2.convertCollisionObjects(this.map,
                'glass-polygon');

	    //setup all tiles with collisiongroups or materials
	    for (var i=0; i < this.tilesMainLayer.length; i++) {
	    	this.tilesMainLayer[i].setCollisionGroup(this.groundCG);
	    	this.tilesMainLayer[i].collides([this.playerCG, this.crabCG,
	                this.moleculeCG]);
	    	this.tilesMainLayer[i].setMaterial(this.groundMaterial);
	    }
	    for (var i=0; i < this.tilesHotSandLayer.length; i++) {
	    	this.tilesHotSandLayer[i].setCollisionGroup(this.hotsandCG);
	    	this.tilesHotSandLayer[i].collides([this.playerCG, this.crabCG,
	                this.moleculeCG, this.groundCG, this.urchinsCG]);
	    	this.tilesHotSandLayer[i].setMaterial(this.groundMaterial);
	    }
	    for (var i = 0; i < basicShapes.length; i++){
	    	basicShapes[i].setCollisionGroup(this.groundCG);
	    	basicShapes[i].collides([this.playerCG, this.crabCG,
                    this.moleculeCG, this.energyCG, this.sundropCG]);
	    	basicShapes[i].setMaterial(this.groundMaterial);
	    }
	    for (var i = 0; i < strawShapes.length; i++){
	    	strawShapes[i].setCollisionGroup(this.groundCG);
	    	strawShapes[i].collides([this.playerCG, this.moleculeCG,
                    this.energyCG, this.sundropCG]);
	    	strawShapes[i].setMaterial(this.slidingMaterial);
	    }
	    for (var i = 0; i < glassPolygon.length; i++){
	    	glassPolygon[i].setCollisionGroup(this.glassCG);
	    	glassPolygon[i].collides([this.playerCG]);
	    	glassPolygon[i].setMaterial(this.groundMaterial);
	    }

	    this.crabs = game.add.group();
		this.crabs.enableBody = true;
		this.crabs.physicsBodyType = Phaser.Physics.P2JS;
	    this.map.createFromObjects('crab-objects', 275, 'crab', 0, true, false,
	            this.crabs);
	    this.crabs.forEach(this.setupCrab, this);

	    this.urchins = game.add.group();
	    this.map.createFromObjects('seaurchins', 202, 'urchin', 0, true, false,
	            this.urchins);
	    this.urchins.forEach(this.setupUrchins, this);

        this.horizontalStraw = game.add.group();
        this.map.createFromObjects('horizontalstraw', 278, 'dropinstraw', 0,
                true, false, this.horizontalStraw);
        this.horizontalStraw.forEach(this.setupStrawHorizontal, this);
    },
	setupPlayer: function (posX, posY) {
		this.drop.create(posX, posY);
        var dropSprite = this.drop.getSpriteObject();
        this.game.camera.follow(dropSprite);
        this.game.physics.p2.enableBody(dropSprite, false);
        this.drop.setCharacterInicialValues();
        dropSprite.body.setMaterial(this.characterMaterial);
        dropSprite.body.setCollisionGroup(this.playerCG);
        dropSprite.body.collides([this.groundCG, this.crabCG, this.moleculeCG,
                this.urchinsCG, this.hotsandCG, this.glassCG,
                this.coveredStrawCG]);
        // collide callbacks
		dropSprite.body.createGroupCallback(this.crabCG, this.checkOverlapCrabDrop, this);
        dropSprite.body.createGroupCallback(this.urchinsCG, this.checkCollisionUrchins, this);
        dropSprite.body.createGroupCallback(this.moleculeCG, this.checkOverlapWithLifeDrop, this);
		dropSprite.body.createGroupCallback(this.drinkEnergy, this);
		dropSprite.body.createGroupCallback(this.hotsandCG, this.killDrop, this);
        dropSprite.body.createGroupCallback(this.glassCG, this.timeOverKill,
                this);
        dropSprite.body.createGroupCallback(this.coveredStrawCG, this.insideStraw, this);
	},
//	setupShell: function (posX, posY) {
//		 // Create sea shell
//        this.seashell = this.game.add.sprite(posX, posY, 'seashell');
//        this.game.physics.p2.enableBody(this.seashell);
//        this.seashell.body.clearShapes();
//        this.seashell.body.loadPolygon('seashellPhysics', 'seashell_220-68');
//        this.seashell.body.fixedRotation = true;
//        this.seashell.body.static = true;
//        this.seashell.body.setCollisionGroup(this.groundCG);
//        this.seashell.body.collides([this.groundCG, this.crabCG, this.playerCG]);
//        this.seashell.body.setMaterial(this.groundMaterial);
//	},
//	setupSunscreen: function (posX, posY) {
//		// Create sunscreen
//        this.sunscreen = this.game.add.sprite(posX, posY,'sunscreen');
//        this.game.physics.p2.enableBody(this.sunscreen);
//        this.sunscreen.body.fixedRotation = true;
//        this.sunscreen.body.static = true;
//        this.sunscreen.body.setMaterial(this.groundMaterial);
//        this.sunscreen.body.setCollisionGroup(this.groundCG);
//        this.sunscreen.body.collides([this.groundCG, this.crabCG, this.playerCG]);
//        var cover = this.game.add.sprite(3060, this.game.world.height-78,'coversunscreen');
//        this.game.physics.p2.enableBody(cover);
//        cover.body.fixedRotation = true;
//        cover.body.static = true;
//        cover.body.setMaterial(this.groundMaterial);
//        cover.body.setCollisionGroup(this.groundCG);
//        cover.body.collides([this.groundCG, this.crabCG, this.playerCG]);
//	},
//	setupCan: function(posX, posY) {
//		// create CAN
//        this.can = this.game.add.sprite(posX, posY,'can');
//        this.game.physics.p2.enableBody(this.can, false);
//        this.can.body.fixedRotation = true;
//        this.can.body.setRectangle(260,120,0,0);
//        this.can.body.static = true;
//        this.can.body.setMaterial(this.groundMaterial);
//        this.can.body.setCollisionGroup(this.groundCG);
//        this.can.body.collides([this.groundCG, this.crabCG, this.playerCG]);
//	},
	setupCrab: function() {
		// create crabs
//        this.crabs = game.add.group();
//		this.crabs.create(this.game.width-180, this.game.height-80-69, 'crab');
//        this.crabs.create(this.game.width, this.game.height-80-69, 'crab');
//        this.crabs.create(4480, this.game.height-80-69, 'crab');
		for (var i = 0; i < this.crabs.length; i++) {
			this.crabs.getAt(i).body.fixedRotation = true;
			this.crabs.getAt(i).body.setCollisionGroup(this.crabCG);
			this.crabs.getAt(i).body.setMaterial(this.crabMaterial);
			this.crabs.getAt(i).animations.add('walkL', [0, 1, 2], 10, true);
			this.crabs.getAt(i).animations.add('walkR', [0, 1, 2], 10, true);
			this.crabs.getAt(i).body.collides([this.crabCG, this.playerCG,
                    this.groundCG]);
		}
		this.crabs.getAt(0).body.moveLeft(400);
		this.crabs.getAt(1).body.moveRight(400);
		this.crabs.getAt(2).body.moveRight(400);
	},
//	setupBucket: function(posX, posY) {
//		// Add the bucket
//        this.bucket = this.game.add.sprite(posX, posY, 'bucket');
//        this.game.physics.p2.enableBody(this.bucket, false);
//        this.bucket.body.clearShapes();
//        this.bucket.body.loadPolygon('bucketPhysics', 'bucket_384-497');
//        this.bucket.body.fixedRotation = true;
//        this.bucket.body.static = true;
//        this.bucket.body.setCollisionGroup(this.groundCG);
//        this.bucket.body.collides([this.groundCG, this.playerCG]);
//	},
    setupStrawHorizontal: function(straw) {
        // Tip of the straw (in the left of the bucket)
        this.strawLeft = this.game.add.sprite(2091, 510, 'strawtip');
        this.game.physics.p2.enableBody(this.strawLeft, false);
        this.strawLeft.body.fixedRotation = true;
        this.strawLeft.body.static = true;
        this.strawLeft.body.setCollisionGroup(this.coveredStrawCG);
        this.strawLeft.body.collides([this.playerCG]);
        this.playerEnteredLeftStraw = false;

        // Straw passing under the ground
        var strawAnimationRight = straw.animations.add('dropInsideRight',
                [0, 1, 2, 3, 4, 5, 6, 7, 0], 10, false);
        strawAnimationRight.onComplete.add(this.strawAnimationComplete, this);
        var strawAnimationLeft = straw.animations.add('dropInsideLeft',
                [7, 6, 5, 4, 3, 2, 1, 0], 10, false);
        strawAnimationLeft.onComplete.add(this.strawAnimationComplete, this);
        straw.animations.add('strawNormal', [0], 10, false);
        straw.animations.play('strawNormal');

        // Tip of the straw (in the right of the bucket)
        this.strawRight = this.game.add.sprite(2555, 510, 'strawtip');
        this.game.physics.p2.enableBody(this.strawRight, false);
        this.strawRight.body.fixedRotation = true;
        this.strawRight.body.static = true;
        this.strawRight.body.setCollisionGroup(this.coveredStrawCG);
        this.strawRight.body.collides([this.playerCG]);
        this.playerEnteredRightStraw = false;
	},
	setupMolecule: function () {
		// Add a "life drop"
        this.molecule = game.add.group();
        this.molecule.enableBody = true;
        this.molecule.physicsBodyType = Phaser.Physics.P2JS;

        this.molecule.create(200, 310, 'lifedrop');
        this.molecule.create(1750, this.game.world.height-210, 'energy');
        this.molecule.create(2920, this.game.world.height - 160, 'sundrop');

        for (var i = 0; i < this.molecule.length; i++) {
            this.molecule.getAt(i).body.setCollisionGroup(this.moleculeCG);
            this.molecule.getAt(i).body.fixedRotation = true;
            this.molecule.getAt(i).body.static = true;
            this.molecule.getAt(i).animations.add('dropAnimation',
                    [0, 1, 2, 3, 4], 10, true);
            this.molecule.getAt(i).animations.play('dropAnimation');
            this.molecule.getAt(i).body.collides([this.playerCG, this.groundCG]);
            this.molecule.hasCollided = false;
        }

        this.molecule.getAt(0).body.sprite.name='lifedrop';
        this.molecule.getAt(1).body.sprite.name='energy';
        this.molecule.getAt(2).body.sprite.name = 'sunscreendrop';
    },
	setupSmokeEmitter: function(posX, posY) {
		// smoke animation
		// add smoke particles
		this.smokeEmitter = this.game.add.emitter(posX, posY, 100);
		this.smokeEmitter.gravity = 0;
		this.smokeEmitter.setXSpeed(-15, 15);
		this.smokeEmitter.setYSpeed(-80, -50);
		this.smokeEmitter.setAlpha(1, 0, 3000, Phaser.Easing.Linear.InOut);
		this.smokeEmitter.makeParticles('smoke');
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
    setupUrchins: function(urchin) {
    	game.physics.p2.enable(urchin);
        urchin.body.setCollisionGroup(this.urchinsCG);
        urchin.body.static = true;
        urchin.body.sprite.name = 'urchin';
        urchin.body.collides([this.playerCG, this.groundCG]);
    },
	// Funcao Magica!!! Deve existir outro jeito!
	touchingDown: function (someone) {
		var yAxis = p2.vec2.fromValues(0, 1);
		var result = false;
		for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = game.physics.p2.world.narrowphase.contactEquations[i];
			if (c.bodyA === someone.data || c.bodyB === someone.data)        {
				var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
				if (c.bodyA === someone.data){d *= -1;}
				if (d > 0.5){result = true;}
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
				if (c.bodyA === someone.data){d *= -1;}
				if (d < -0.5){result = true;}
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
				if (c.bodyA === someone.data){d *= -1;}
				if (d < -0.5){result = true;}
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
				if (c.bodyA === someone.data){d *= -1;}
				if (d > 0.5){result = true;}
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
			this.drop.kill();
			this.userDead = true;
			return true;
		}
		return false;
    },
    checkCollisionUrchins: function(body1, body2) {
        // body1 is the drop, body2 is the sea urchin.
        this.drop.kill();
        this.userDead = true;
        return true;
    },
    checkOverlapWithLifeDrop: function (body1, body2) {
        // body1 is the drop; body2 is the life drop.
        if (!body2.hasCollided) {
			if (body2.sprite.name == 'lifedrop') {
				console.log('Player get the life drop!!!!');
				this.powUpSound.play();
				this.hud.increaseDropBar();
				body2.sprite.kill();
				body2.hasCollided = true;
				this.drop.playersize = 'big';
			} else if (body2.sprite.name == 'energy') {
				this.drinkEnergy(body1, body2);
            } else if (body2.sprite.name == 'sunscreendrop') {
                this.hitSunscreenDrop(body1, body2);
            }
            return true;
        }

        return false;
    },
    drinkEnergy: function(body1, body2) {
		this.countCall++;
		if (this.countCall == 1) {
			body2.sprite.kill();
			body2.hasCollided = true;
			this.drop.jump(1500);
			this.jumpSound.play();
			this.smokeEmitter.start(false, 3000, 50);
			this.haveEnergy = true;
			var self = this;
			this.smokeTimer = setTimeout(function() {
					self.stopSmoke();
			}, 2000);

			this.drop.playerstate = 'energy';
		}
		if (this.countCall == 2) {
			this.countCall = 0;
		}
	},
	hitSunscreenDrop: function (body1, body2) {
		this.drop.playerstate = 'sunscreen';
		this.countCall++;
        if (this.countCall == 1) {
            body2.sprite.kill();
            body2.hasCollided = true;
            this.dropIsInvincible = true;
            var self = this;
            setTimeout(function() {
                self.dropIsInvincible = false;
                self.drop.playerstate = 'normal';
            }, 5500);
        }
        if (this.countCall == 2) {
            this.countCall = 0;
        }
	},
	killDrop: function (body1, body2) {
        if (this.dropIsInvincible) {
            return;
        }

        this.countCall++;
        if (this.countCall == 1 && !this.hotSandTimerActivated) {
            console.log('moreeeeeeeeeeeeeeeeeu!!! killlDrop');
            this.hud.decreaseDropBar();
            this.haveEnergy = true;
            this.smokeEmitter.on = true;
            this.smokeEmitter.start(false, 3000, 50);
            if (this.drop.playersize == 'big') {
                var self = this;
                if (this.hud.getDropCounter() == 0) {
                    setTimeout(function(time) {
                        self.hotSandTimerActivated = false;
                        self.stopKillTime(time);
                    }, 2000);
                    this.drop.playersize = 'small';
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
            } else if (this.drop.playersize == 'small') {
                // TODO: restart game
                this.drop.kill();
                this.userDead = true;
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
		this.drop.playerstate = 'normal';
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
		console.log('chamou');
		this.drop.kill();
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
		this.drop.kill();
	},
    insideStraw: function() {
        var dropSprite = this.drop.getSpriteObject();
        if (dropSprite.x < 2300) {
            if (!this.playerEnteredLeftStraw) {
                dropSprite.exists = false;
                this.game.camera.target = null;
                this.playerEnteredLeftStraw = true;
                var straw = this.horizontalStraw.getAt(0);
                straw.animations.play('dropInsideRight');
            }
        } else {
            if (!this.playerEnteredRightStraw) {
                dropSprite.exists = false;
                this.game.camera.target = null;
                this.playerEnteredRightStraw = true;
                var straw = this.horizontalStraw.getAt(0);
                straw.animations.play('dropInsideLeft');
            }
        }
    },
    strawAnimationComplete: function(sprite, animation) {
        var dropSprite = this.drop.getSpriteObject();
        if (this.playerEnteredLeftStraw) {
            dropSprite.reset(2555, this.game.world.height - 160);
            this.playerEnteredLeftStraw = false;
        } else {
            dropSprite.reset(2091, this.game.world.height - 160);
            this.playerEnteredRightStraw = false;
        }
        dropSprite.exists = true;
        this.drop.jump(700);
        this.game.camera.follow(dropSprite);
    },
	clickHowToPlay: function () {
		"use strict";
		this.game.state.start('howtoplay-state');
	},
	clickCredits: function () {
		"use strict";
		this.game.state.start('credits-state');
	},
	restartGame: function () {
	    this.hud.decreaseLife();
		if ( this.hud.getLifeCounter()==0){
			this.game.state.start('gameOver-state');
		}
		this.mainSound.stop();
		this.game.state.restart();
	},
};
