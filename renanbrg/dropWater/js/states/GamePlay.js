/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
    this.map = null;
    this.layer = null;
    this.player = null;
    this.crab = null;
    this.dropCollisionGroup = null;
    this.crabCollisionGroup = null;
    this.layerBody = null;
    this.hud = new HUD(this.game);

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
		this.game.load.tilemap('map', 'assets/mapLevel1_960-600.json', null, Phaser.Tilemap.TILED_JSON);
	    this.game.load.image('tileset','assets/images/tileset.png');
	    this.game.load.image('crab','assets/images/crab_80-80.png');
	    this.game.load.image('life_drop', 'assets/images/lifedrop_40-40.png');

	    this.game.load.audio('jump','assets/waterDrop.mp3');
        this.hud.preload();

		// Player
        this.drop.preload();
	},
	create: function () {
		"use strict";
		var background;
		background = this.game.add.tileSprite(Config.gamePlay.x, Config.gamePlay.y, this.game.world.width, this.game.world.height, 'gameplay-bg');
		background.fixedToCamera = true;
		this.crab = game.add.sprite(this.game.width+130, this.game.height-160, 'crab');
		
		this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 800;
        //this.game.physics.p2.restitution = 0.8;
		
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Camada de Tile 1');
        this.layer.resizeWorld();
        
        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies below.
        this.map.setCollisionBetween(1, 3);                
        this.game.physics.p2.convertTilemap(this.map, this.layer);
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
                
        // create player
        this.drop.create(300, this.game.world.height-200);
        var dropSprite = this.drop.getSpriteObject();   
        this.game.physics.p2.enableBody(dropSprite, false);        
        this.game.camera.follow(dropSprite);
        this.drop.configureCharacter(this.setCharacterInicialValues);
        
        // create enemy crab
        this.game.physics.p2.enableBody(this.crab);
		this.crab.body.setRectangle(60, 60, 0, 0);
		this.crab.body.fixedRotation = true;
        //this.crab.body.collideWorldBounds = false;
        this.crab.body.moveLeft(500);
        this.crab.name = 'crab';

        // Add a 'life drop"
        this.lifeDrop = this.game.add.sprite(380, 320, 'life_drop');
        this.game.physics.p2.enableBody(this.lifeDrop);
        this.lifeDrop.body.setRectangle(40, 40, 0, 0);
        this.lifeDrop.body.fixedRotation = true;
        this.lifeDrop.name = 'lifeDrop';
		
		dropSprite.body.createBodyCallback(this.crab, this.checkOverlapCrabDrop, this); // check collision between drop and crab
		this.lifeDrop.body.createBodyCallback(dropSprite,
		        this.checkOverlapWithLifeDrop, this);
		this.game.physics.p2.setImpactEvents(true);
		//this.game.physics.p2.setPostBroadphaseCallback(this.checkOverlap, this);   //this is used to start the check

        this.hud.create();
		
        // Sounds
        this.jumpSound = this.game.add.audio("jump");                
    },
    setCharacterInicialValues: function(character) {    	
    	character.smoothed = false;
        character.body.fixedRotation = true;
        character.name = 'drop';
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);
    },
	update: function () {
		"use strict";
		this.handleKeyDown();					
		this.moveCrab();
	},	
	handleKeyDown: function () {
		"use strict";
		//this.drop.getSpriteObject().body.setZeroVelocity();

		if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
            this.drop.moveRight(4);
			this.drop.getSpriteObject().body.moveRight(150);

		} else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) {
            this.drop.moveLeft(4);
            this.drop.getSpriteObject().body.moveLeft(150);

		} else {
            this.drop.stop();
		}
		// Jump
		if ( this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) {
			if (this.touchingDown(this.drop.getSpriteObject().body)) { 
				this.drop.jump(450);  
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
			return true;
		}
		return false;
    },
    checkOverlapWithLifeDrop: function (body1, body2) {
        // body1 is the drop; body2 is the life drop.
        if (!this.touchingUp(body2)) {
            console.log('Player get the life drop!!!!');
            this.hud.increaseDropBar();
            this.lifeDrop.kill();
            return true;
        }
        return false;
    },
	moveCrab: function () {
		if (this.touchingLeft(this.crab.body)) {
			//this.crab.body.velocity.x = 100;
			this.crab.body.moveRight(500);
		} else if (this.touchingRight(this.crab.body)) {
			this.crab.body.moveLeft(500);
		} else {
			//this.crab.body.velocity.x = -100;
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
};
