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
    this.fakeplatform = null;
    this.energy = null;
    this.smokeEmitter = null;
    this.haveEnergy = false;
    this.smokeTimer = null;
    this.dropIsInvincible = false;
    this.molecule = null;
    this.acidgroup = null;
    this.smokeEmitter = null;
    this.timerEventRain = [];
    this.fakePositions = [];
    this.onAir = false;

    this.countCall = 0; //count how many times the collision function is called.
};
State.Level2.prototype = {
	preload: function () {
		"use strict";

		// Player
		try {
			this.drop = new Character(this.game, 'drop',
					'assets/spritesheets/drop_4590-60.png', [51, 60],
                    hud.getDropCounter());
		} catch(exception) {
			console.log(exception.toString());
		}
        this.drop.preload();
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

        this.mainLayer = this.map.createLayer('mainlayer2');
        this.hotSandLayer = this.map.createLayer('hotsandlayer');
        this.irregularLayer = this.map.createLayer('irregularlayer');
        this.mainLayer.resizeWorld();

        this.setupPhysics();
        this.setupLayers();
        this.setupPlayer(100, 100);
        this.setupMolecule();
        this.setupAcidDrop();

		// falling acid rain
		this.timerEventRain[0]=game.time.events.loop(Phaser.Timer.SECOND, this.fallRain, this, 1360,0);
		this.timerEventRain[1]=game.time.events.loop(Phaser.Timer.SECOND*1.2, this.fallRain, this, 2640,0,1);		
		this.timerEventRain[2]=game.time.events.loop(Phaser.Timer.SECOND*1.3, this.fallRain, this, 2800,0);
		this.timerEventRain[3]=game.time.events.loop(Phaser.Timer.SECOND*1.2, this.fallRain, this, 2960,0,3);
		this.timerEventRain[4]=game.time.events.loop(Phaser.Timer.SECOND*1.3, this.fallRain, this, 3120,0);
		this.timerEventRain[5]=game.time.events.loop(Phaser.Timer.SECOND*1.2, this.fallRain, this, 3280,0,5);
		this.timerEventRain[6]=game.time.events.loop(Phaser.Timer.SECOND*1.4, this.fallRain, this, 6200,0);		
		this.timerEventRain[7]=game.time.events.loop(Phaser.Timer.SECOND*1.1, this.fallRain, this, 6600,0,7);
		this.timerEventRain[8]=game.time.events.loop(Phaser.Timer.SECOND*1.4, this.fallRain, this, 7040,0);
		
		this.setupSmokeEmitter(1550, this.game.height-80);
        hud.create();

        // Sounds
        this.jumpSound = this.game.add.audio("jump");
        this.mainSound = this.game.add.audio("main");
        this.powUpSound = this.game.add.audio("powup");
        this.mainSound.loop = true;
        this.mainSound.play();
	},
	update: function () {
		"use strict";
		hud.updateFPS();
		this.handleKeyDown();
		this.isOnAir();
		this.drop.playerAnimations();
		this.moveCrab(this.crabs.getAt(0), 350);
		this.moveCrab(this.crabs.getAt(1), 350);
		this.moveCrab(this.crabs.getAt(2), 350);
		this.moveCrab(this.crabs.getAt(3), 350);
		this.moveCrab(this.crabs.getAt(4), 300);
		this.moveCrab(this.crabs.getAt(5), 300);
		this.moveCrab(this.crabs.getAt(6), 300);

		if (this.haveEnergy) {
			this.smokeEmitter.x = this.drop.getSpriteObject().x;
			this.smokeEmitter.y = this.drop.getSpriteObject().y + 56;
		}
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
    stopSmoke: function() {
		this.haveEnergy = false;
		this.smokeEmitter.on = false;
		this.drop.playerstate = 'normal'; //temporario
		this.smokeTimer.destroy();
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
		this.fakeCG = game.physics.p2.createCollisionGroup();
		this.crabCG = game.physics.p2.createCollisionGroup();
		this.moleculeCG = game.physics.p2.createCollisionGroup();
		this.energyCG = game.physics.p2.createCollisionGroup();
		this.urchinsCG = game.physics.p2.createCollisionGroup();
		this.hotsandCG = game.physics.p2.createCollisionGroup();
        this.glassCG = game.physics.p2.createCollisionGroup();
        this.acidCG = game.physics.p2.createCollisionGroup();

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
	    	this.tilesMainLayer[i].collides([this.playerCG, this.crabCG,this.moleculeCG, this.acidCG]);
	    	this.tilesMainLayer[i].setMaterial(this.groundMaterial);
	    }
	    for (var i=0; i < this.tilesHotSandLayer.length; i++) {
	    	this.tilesHotSandLayer[i].setCollisionGroup(this.hotsandCG);
	    	this.tilesHotSandLayer[i].collides([this.playerCG, this.crabCG,
	                this.moleculeCG, this.groundCG]);
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

	    this.fakeplatform = game.add.group();
		this.fakeplatform.enableBody = true;
		this.fakeplatform.physicsBodyType = Phaser.Physics.P2JS;
	    this.map.createFromObjects('fakeplatform', 75, 'fakeplatform', 0, true, false,this.fakeplatform);
	    this.fakeplatform.forEach(this.setupFakePlatform, this);

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
								  this.urchinsCG, this.hotsandCG, this.glassCG, this.acidCG, this.fakeCG]);
        // collide callbacks
		dropSprite.body.createGroupCallback(this.crabCG, this.checkOverlapCrabDrop, this);
        dropSprite.body.createGroupCallback(this.urchinsCG, this.checkCollisionUrchins, this);
        dropSprite.body.createGroupCallback(this.moleculeCG, this.checkOverlapWithLifeDrop, this);
		dropSprite.body.createGroupCallback(this.hotsandCG, this.killDrop, this);
        dropSprite.body.createGroupCallback(this.glassCG, this.restartGame, this);
        dropSprite.body.createGroupCallback(this.acidCG, this.acidHitPlayer, this);
        dropSprite.body.createGroupCallback(this.fakeCG, this.hitFakePlatform, this);
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
		this.crabs.getAt(0).body.moveLeft(350);
		this.crabs.getAt(1).body.moveRight(350);
		this.crabs.getAt(2).body.moveLeft(350);
		this.crabs.getAt(3).body.moveLeft(350);
		this.crabs.getAt(4).body.moveLeft(300);
		this.crabs.getAt(5).body.moveRight(300);
		this.crabs.getAt(6).body.moveLeft(300);
	},
	setupFakePlatform: function() {
		for (var i = 0; i < this.fakeplatform.length; i++) {
			this.fakeplatform.getAt(i).body.fixedRotation = true;
			this.fakeplatform.getAt(i).body.kinematic=true;
			this.fakeplatform.getAt(i).body.collideWorldBounds=false;
			this.fakeplatform.getAt(i).body.setCollisionGroup(this.fakeCG);
			this.fakeplatform.getAt(i).body.sprite.name = i;
			this.fakeplatform.getAt(i).body.setMaterial(this.groundMaterial);
			this.fakeplatform.getAt(i).body.collides([this.playerCG, this.acidCG]);
			this.fakePositions.push({x: this.fakeplatform.getAt(i).body.x, y: this.fakeplatform.getAt(i).body.y});
		}
	},
    setupUrchins: function(urchin) {
    	game.physics.p2.enable(urchin);
        urchin.body.setCollisionGroup(this.urchinsCG);
        urchin.body.static = true;
        urchin.body.sprite.name = 'urchin';
        urchin.body.collides([this.playerCG, this.crabCG]);
    },
	setupMolecule: function () {
		// Add a "life drop"
        this.molecule = game.add.group();
        this.molecule.enableBody = true;
        this.molecule.enableBodyDebug = true;
        this.molecule.physicsBodyType = Phaser.Physics.P2JS;

        this.molecule.create(1040, 150, 'lifedrop'); //lifedrop1
        this.molecule.create(1675, 190, 'lifedrop'); //lifedrop2
        this.molecule.create(3600, this.game.world.height-80, 'energy'); //energy1
        this.molecule.create(4200, this.game.world.height-120, 'energy'); //energy2
        // evildrop
        this.molecule.create(1990, 300, 'evildrop'); //evildrop1
        this.molecule.create(2115, 300, 'evildrop'); //evildrop2
        this.molecule.create(2195, 300, 'evildrop'); //evildrop3
        this.molecule.create(2320, 300, 'evildrop'); //evildrop4
        // life UP
        this.molecule.create(2960, 150, 'lifeup'); //1 life
        
        this.molecule.getAt(0).body.sprite.name='lifedrop';
        this.molecule.getAt(1).body.sprite.name='lifedrop';
        this.molecule.getAt(2).body.sprite.name='energy';
        this.molecule.getAt(3).body.sprite.name='energy';
        // evil drop
        this.molecule.getAt(4).body.sprite.name='evildrop';
        this.molecule.getAt(5).body.sprite.name='evildrop';
        this.molecule.getAt(6).body.sprite.name='evildrop';
        this.molecule.getAt(7).body.sprite.name='evildrop';

        this.molecule.getAt(8).body.sprite.name='lifeup';

        for (var i = 0; i < this.molecule.length; i++) {
            this.molecule.getAt(i).body.setCollisionGroup(this.moleculeCG);
            this.molecule.getAt(i).body.fixedRotation = true;
            this.molecule.getAt(i).body.static = true;
            if (this.molecule.getAt(i).body.sprite.name == 'evildrop') {
				// animation is different to evildrop
				this.molecule.getAt(i).animations.add('dropAnimation',[0, 1], 10, true);
			} else if (this.molecule.getAt(i).body.sprite.name != 'lifeup') {
				this.molecule.getAt(i).animations.add('dropAnimation',[0, 1, 2, 3, 4], 10, true);
			}
            this.molecule.getAt(i).animations.play('dropAnimation');
            this.molecule.getAt(i).body.collides([this.playerCG, this.groundCG, this.fakeCG]);
            this.molecule.getAt(i).hasCollided = false;
        }
    },
    setupAcidDrop: function() {
		this.acidgroup = game.add.group();
		this.acidgroup.enableBody = true;
		this.acidgroup.physicsBodyType = Phaser.Physics.P2JS;
	},
    fallRain: function(posX, posY) {
        //this.acidgroup.getAt(index).reset(posX, posY);
        var aciddrop;
        aciddrop = this.acidgroup.create(posX, posY, 'aciddrop');
		aciddrop.body.collideWorldBounds=false;
		aciddrop.body.allowSleep=true;
		aciddrop.body.sprite.name = 'aciddrop';
		aciddrop.body.setCollisionGroup(this.acidCG);
		aciddrop.body.fixedRotation = true;
		aciddrop.body.collides([this.playerCG, this.groundCG, this.fakeCG]);
		// kill acid drop when collides to ground
		aciddrop.body.createGroupCallback(this.groundCG, this.collidesAcidRain, this);
		aciddrop.body.createGroupCallback(this.fakeCG, this.collidesAcidRain, this);
	},
	collidesAcidRain: function(body1, body2) {
		var timerAcidRain;
		timerAcidRain = this.game.time.create();
		body1.sprite.frame = 1;

		timerAcidRain.add(200, function() {
			var timerSplitAcid = this.game.time.create();
			body1.sprite.frame = 2;
			timerAcidRain.destroy();

			timerSplitAcid.add(100, function() {
				body1.sprite.kill();
				timerSplitAcid.destroy();
			}, this);
			timerSplitAcid.start();
			
		}, this);
		timerAcidRain.start();
	},
	acidHitPlayer: function(body1, body2) {
		var timerAcidRain;
		timerAcidRain = this.game.time.create();
		body2.sprite.frame = 1;

		timerAcidRain.add(200, function() {
			var timerSplitAcid = this.game.time.create();
			body2.sprite.frame = 2;
			timerAcidRain.destroy();

			timerSplitAcid.add(50, function() {
				body2.sprite.kill();
				this.restartGame();
				timerSplitAcid.destroy();
			}, this);
			timerSplitAcid.start();
			
		}, this);
		timerAcidRain.start();
	},
	checkOverlapCrabDrop: function (body1, body2) {
		// body1 is the drop, body2 is the crab.
		if (!this.touchingUp(body2)) {
			console.log('Matou o Player!!!!');
            this.restartGame();

			return true;
		}
		return false;
    },
    checkCollisionUrchins: function(body1, body2) {
        // body1 is the drop, body2 is the sea urchin.
        this.restartGame();

        return true;
    },
    checkOverlapWithLifeDrop: function (body1, body2) {
        // body1 is the drop; body2 is the life drop.
        if (!body2.hasCollided) {
			if (body2.sprite.name == 'lifedrop') {
				console.log('Player get the life drop!!!!');
				//this.powUpSound.play();
				hud.increaseDropBar();
				body2.sprite.kill();
				body2.hasCollided = true;
				this.drop.playersize = 'big';
			} else if (body2.sprite.name == 'energy') {
				this.drinkEnergy(body1, body2);
            } else if (body2.sprite.name == 'evildrop') {
				this.hitEvilDrop(body1, body2);
			} else if (body2.sprite.name == 'lifeup') {
				this.hud.increaseLife();
				body2.sprite.kill();
			}
            return true;
        }

        return false;
    },
    hitEvilDrop: function(body1, body2) {
		if (hud.getDropCounter() > 0) {
			hud.decreaseDropBar();
			if (hud.getDropCounter() == 0){this.drop.playersize = 'small';}
		} else if(hud.getDropCounter() == 0) {
			this.restartGame();
		}
		// stop animation
		body2.sprite.animations.stop();
		body2.sprite.frame = 2;
		var timerEvilDrop = this.game.time.create();
		timerEvilDrop.add(2000, function() {
			body2.sprite.animations.play('dropAnimation');
			timerEvilDrop.destroy();
		}, this);
		timerEvilDrop.start();
	},
	hitFakePlatform: function(body1, body2) {
		var timerFakeFall = this.game.time.create();
		var timerBackPlatform;
		timerFakeFall.add(1500, function() {
			timerBackPlatform = this.game.time.create();
			body2.velocity.y=240;
			timerFakeFall.destroy();
			timerBackPlatform.add(4000, function() {
				body2.velocity.y=0;
				body2.sprite.reset(this.fakePositions[body2.sprite.name].x, this.fakePositions[body2.sprite.name].y);
				timerBackPlatform.destroy();
			}, this);
			timerBackPlatform.start();
		}, this);
		timerFakeFall.start();
	},
    drinkEnergy: function(body1, body2) {
        console.log('Player get the energy drop!!!!');

        this.drop.jump(1500);
        //this.jumpSound.play();
        this.smokeEmitter.start(false, 3000, 50);
        this.haveEnergy = true;
        var self = this;
        if (this.smokeTimer != null) {
            clearTimeout(this.smokeTimer);
            this.smokeTimer = null;
        }
        this.smokeTimer = setTimeout(function() {
                self.stopSmoke();
        }, 2000);
        this.drop.playerstate = 'energy';
    },
    killDrop: function (body1, body2) {
        if (this.dropIsInvincible) {
            return;
        }

        this.countCall++;
        if (this.countCall == 1 && !this.hotSandTimerActivated) {
            console.log('moreeeeeeeeeeeeeeeeeu!!! killlDrop');
            if (this.drop.playersize == 'big') {
                hud.decreaseDropBar();
                this.haveEnergy = true;
                this.smokeEmitter.on = true;
                this.smokeEmitter.start(false, 3000, 50);
                if (hud.getDropCounter() == 0) {
                    this.lastDropTimer = setTimeout(function(time) {
                        self.hotSandTimerActivated = false;
                        if (self.map.getTileWorldXY(body1.x, body1.y + 23, 40,
                                40, self.hotSandLayer)) {
                            self.restartGame();
                        }
                        self.countCall = 0;
                    }, 2000);
                    this.drop.playersize = 'small';
                    this.hotSandTimerActivated = true;
                } else {
                    this.decreaseDropTimer = setTimeout(function() {
                        self.hotSandTimerActivated = false;
                        self.countCall = 0;
                        if (self.map.getTileWorldXY(body1.x, body1.y + 23, 40,
                                40, self.hotSandLayer)) {
                            self.killDrop(body1, null);
                        }
                    }, 2000);
                    this.hotSandTimerActivated = true;
                }
            } else if (this.drop.playersize == 'small') {
                this.restartGame();
            }
        }
        if (this.countCall == 2) {
            this.countCall = 0;
        }
    },
    restartGame: function () {
		this.drop.kill();
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
	moveCrab: function (crab, velocity) {
		if (crab.name == "crab1") {
			if (this.touchingLeft(crab.body)) {
				crab.body.moveRight(velocity);
				crab.animations.play('walkR');
			} else if (this.touchingRight(crab.body)) {
				crab.body.moveLeft(velocity);
				crab.animations.play('walkL');
			} else {
			}
		} else {
			if (this.touchingRight(crab.body)) {
				crab.body.moveLeft(velocity);
				crab.animations.play('walkL');
			} else if (this.touchingLeft(crab.body)) {
				crab.body.moveRight(velocity);
				crab.animations.play('walkR');
			} else {
				//this.crab.body.velocity.x = -100;
			}
		}
	},
};

