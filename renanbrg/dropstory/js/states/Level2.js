/*global State, Config*/

State.Level2 = function (game) {
	"use strict";

	this.game = game;
    this.map = null;
    this.drop = null;
    this.crabs = null;
    this.shell = null;
    this.sunscreen = null;
    this.crabMaterial = null;
    this.groundMaterial = null;
    this.hotsandMaterial = null;
    this.hotSandLayer = null;
    this.energy = null;
    this.smokeEmitter = null;
    this.haveEnergy = false;
    this.hud = new HUD(this.game);
    this.onAir = false;

    this.countCall = 0; //count how many times the collision function is called.
};
State.Level2.prototype = {
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
		background = this.game.add.tileSprite(0, 0, 4800, 600, 'gameplay-bg');
		background.fixedToCamera = true;

        this.map = this.game.add.tilemap('maplevel2');
        this.map.addTilesetImage('hotsand_40-40', 'hotsand');
        this.map.addTilesetImage('platform_160-80', 'platform');
        this.map.addTilesetImage('glass_280-320', 'glass');
        this.map.addTilesetImage('seashell_120-40', 'seashell');
        this.map.addTilesetImage('seaurchin_80-40', 'seaurchin');

        this.mainLayer = this.map.createLayer('mainlayer2');
        this.hotSandLayer = this.map.createLayer('hotsandlayer');
        this.irregularLayer = this.map.createLayer('irregularlayer');
        this.mainLayer.resizeWorld();

        this.setupPhysics();
        this.setupLayers();
        this.setupPlayer(4000, 100);

        this.hud.create();

        // Sounds
        this.jumpSound = this.game.add.audio("jump");
        this.mainSound = this.game.add.audio("main");
        this.powUpSound = this.game.add.audio("powup");
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
		this.moveCrab(this.crabs.getAt(3));
		this.moveCrab(this.crabs.getAt(4));
		this.moveCrab(this.crabs.getAt(5));

	},
	handleKeyDown: function () {
		"use strict";

		if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
			if (!this.onAir) {
				this.drop.animestate = 'right';
			} else {
				this.drop.animestate = 'jumpright';
			}
			this.drop.moveRight(300);
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
		this.moleculeCG = game.physics.p2.createCollisionGroup();
		this.energyCG = game.physics.p2.createCollisionGroup();
		this.urchinsCG = game.physics.p2.createCollisionGroup();
		this.hotsandCG = game.physics.p2.createCollisionGroup();
        this.glassCG = game.physics.p2.createCollisionGroup();

		// Create and Setup Material
	    this.characterMaterial = game.physics.p2.createMaterial('characterMaterial');
	    this.crabMaterial = game.physics.p2.createMaterial('crabMaterial');
	    this.groundMaterial = game.physics.p2.createMaterial('groundMaterial');
	    this.hotsandMaterial = game.physics.p2.createMaterial('hotsandMaterial');

		// create contact material
	    this.game.physics.p2.createContactMaterial(this.groundMaterial, this.crabMaterial, {friction: 0.0, restitution: 0.0});
	    this.game.physics.p2.createContactMaterial(this.characterMaterial, this.groundMaterial, {friction: 0.0, restitution: 0.0});
	    this.game.physics.p2.createContactMaterial(this.crabMaterial, this.hotsandMaterial, {friction: 0.0, restitution: 0.0});
	    this.game.physics.p2.createContactMaterial(this.characterMaterial,this.slidingMaterial, {friction: 0.1, restitution: 0.0});
	},
	setupLayers: function () {
	    this.tilesMainLayer = game.physics.p2.convertTilemap(this.map,this.mainLayer);
	    this.tilesHotSandLayer = game.physics.p2.convertTilemap(this.map,this.hotSandLayer);
	    
	    this.tilesIrregularLayer = game.physics.p2.convertTilemap(this.map,this.irregularLayer);

	    var basicShapes = game.physics.p2.convertCollisionObjects(this.map,'basic-shapes');
	    var glassPolygon = game.physics.p2.convertCollisionObjects(this.map,'glass-polygon');

	    //setup all tiles with collisiongroups or materials
	    for (var i=0; i < this.tilesMainLayer.length; i++) {
	    	this.tilesMainLayer[i].setCollisionGroup(this.groundCG);
	    	this.tilesMainLayer[i].collides([this.playerCG, this.crabCG,this.moleculeCG]);
	    	this.tilesMainLayer[i].setMaterial(this.groundMaterial);
	    }
	    for (var i=0; i < this.tilesHotSandLayer.length; i++) {
	    	this.tilesHotSandLayer[i].setCollisionGroup(this.hotsandCG);
	    	this.tilesHotSandLayer[i].collides([this.playerCG, this.crabCG,
	                this.moleculeCG, this.groundCG, this.urchinsCG]);
	    	this.tilesHotSandLayer[i].setMaterial(this.groundMaterial);
	    }
	    for (var i = 0; i < basicShapes.length; i++) {
	    	basicShapes[i].setCollisionGroup(this.groundCG);
	    	basicShapes[i].collides([this.playerCG, this.crabCG,this.moleculeCG, this.energyCG]);
	    	basicShapes[i].setMaterial(this.groundMaterial);
	    }
	    for (var i = 0; i < glassPolygon.length; i++) {
	    	glassPolygon[i].setCollisionGroup(this.glassCG);
	    	glassPolygon[i].collides([this.playerCG]);
	    	glassPolygon[i].setMaterial(this.groundMaterial);
	    }

	    this.crabs = game.add.group();
		this.crabs.enableBody = true;
		this.crabs.physicsBodyType = Phaser.Physics.P2JS;
	    this.map.createFromObjects('crab-objects', 10, 'crab', 0, true, false,this.crabs);
	    this.crabs.forEach(this.setupCrab, this);

	    this.urchins = game.add.group();
	    this.map.createFromObjects('seaurchins', 72, 'urchin', 0, true, false, this.urchins);
	    this.urchins.forEach(this.setupUrchins, this);
    },
	setupPlayer: function (posX, posY) {
		this.drop.create(posX, posY);
        var dropSprite = this.drop.getSpriteObject();
        this.game.camera.follow(dropSprite);
        this.game.physics.p2.enableBody(dropSprite, false);
        this.drop.setCharacterInicialValues();
        dropSprite.body.setMaterial(this.characterMaterial);
        dropSprite.body.setCollisionGroup(this.playerCG);
        dropSprite.body.collides([this.groundCG, this.crabCG, this.moleculeCG, this.energyCG,
								  this.urchinsCG, this.hotsandCG, this.glassCG]);
        // collide callbacks
		/*dropSprite.body.createGroupCallback(this.crabCG, this.checkOverlapCrabDrop, this);
        dropSprite.body.createGroupCallback(this.urchinsCG, this.checkCollisionUrchins, this);
        dropSprite.body.createGroupCallback(this.moleculeCG, this.checkOverlapWithLifeDrop, this);
		dropSprite.body.createGroupCallback(this.drinkEnergy, this);
		dropSprite.body.createGroupCallback(this.hotsandCG, this.killDrop, this);
        dropSprite.body.createGroupCallback(this.glassCG, this.restartGame, this);
        dropSprite.body.createGroupCallback(this.coveredStrawCG, this.insideStraw, this);*/
	},
	setupCrab: function() {
		for (var i = 0; i < this.crabs.length; i++) {
			this.crabs.getAt(i).body.fixedRotation = true;
			this.crabs.getAt(i).body.setCollisionGroup(this.crabCG);
			this.crabs.getAt(i).body.setMaterial(this.crabMaterial);
			this.crabs.getAt(i).animations.add('walkL', [0, 1, 2], 10, true);
			this.crabs.getAt(i).animations.add('walkR', [0, 1, 2], 10, true);
			this.crabs.getAt(i).body.collides([this.crabCG, this.playerCG, this.groundCG, this.urchinsCG]);
		}
		this.crabs.getAt(0).body.moveLeft(300);
		this.crabs.getAt(1).body.moveLeft(300);
		this.crabs.getAt(2).body.moveRight(300);
		this.crabs.getAt(3).body.moveLeft(300);
		this.crabs.getAt(4).body.moveRight(300);
		this.crabs.getAt(5).body.moveLeft(300);
	},
    setupUrchins: function(urchin) {
    	game.physics.p2.enable(urchin);
        urchin.body.setCollisionGroup(this.urchinsCG);
        urchin.body.static = true;
        urchin.body.sprite.name = 'urchin';
        urchin.body.collides([this.playerCG, this.groundCG, this.crabCG]);
    },

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
	moveCrab: function (crab) {
		if (crab.name == "crab1") {
			if (this.touchingLeft(crab.body)) {
				crab.body.moveRight(300);
				crab.animations.play('walkR');
			} else if (this.touchingRight(crab.body)) {
				crab.body.moveLeft(300);
				crab.animations.play('walkL');
			} else {
			}
		} else {
			if (this.touchingRight(crab.body)) {
				crab.body.moveLeft(300);
				crab.animations.play('walkL');
			} else if (this.touchingLeft(crab.body)) {
				crab.body.moveRight(300);
				crab.animations.play('walkR');
			} else {
				//this.crab.body.velocity.x = -100;
			}
		}
	},
};
