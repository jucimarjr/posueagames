/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
    this.map = null;
    this.layer = null;
    this.player = null;
    this.crabs = null;
    
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
	    this.game.load.image('plataforma','assets/images/barra_160-80.png');
	    this.game.load.image('areia','assets/images/areiaSeca_40-40.png');
	    this.game.load.spritesheet('crab','assets/images/crab_150-69.png', 150, 69);
	    this.game.load.image('wetSand', 'assets/images/areiaMolhada_330-75.png');
	    this.game.load.image('bucket', 'assets/images/balde_384-497.png');
	    this.game.load.image('straw1', 'assets/images/straw1_375-72.png');
	    this.game.load.image('straw2', 'assets/images/straw2_236-276.png');
	    this.game.load.image('seashell', 'assets/images/seashell_160-50.png');
	    this.game.load.spritesheet('life_drop',
	            'assets/spritesheets/molecula_110-48.png', 55, 48);
	    
	    this.game.load.audio('jump','assets/waterDrop.mp3');
	    this.game.load.audio('main','assets/gotaMain.wav');
	    this.game.load.audio('powup','assets/gotaPowerUp.wav');
        this.hud.preload();

		// Player
        this.drop.preload();
        
        // Straw physics
        this.game.load.physics('strawPhysics', 'assets/straw-polygon.json');

        this.game.load.physics('seashellPhysics',
                'assets/polygon/seashell-polygon.json');
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
		
		this.game.add.image(0, this.game.height-80, 'wetSand');
		this.game.add.image(2008, 23, 'bucket');
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
		
        //setup all tiles with collisiongroups or materials
		for (var i=0; i<this.layermain.length; i++){
			console.log("Entrou no loooooooooooooooop");
			this.layermain[i].setCollisionGroup(this.groundCG);
			this.layermain[i].collides([this.playerCG, this.crabCG, this.lifeDropCG]);
			//layermain_tiles[i].setMaterial(groundMaterial);
		}
		
        // create player
        this.drop.create(200, this.game.world.height-200);
        var dropSprite = this.drop.getSpriteObject();   
        this.game.physics.p2.enableBody(dropSprite, false);        
        this.game.camera.follow(dropSprite);
        this.drop.configureCharacter(this.setCharacterInicialValues);
        dropSprite.body.setCollisionGroup(this.playerCG);
        dropSprite.body.collides([this.groundCG, this.crabCG, this.strawCG,
                this.lifeDropCG, this.seashellCG]);
        
        // Create sea shell
        this.seashell = this.game.add.sprite(450, this.game.world.height - 100,
                'seashell');
        this.game.physics.p2.enableBody(this.seashell);
        this.seashell.body.clearShapes();
        this.seashell.body.loadPolygon('seashellPhysics', 'seashell_160-50');
        this.seashell.body.fixedRotation = true;
        this.seashell.body.static = true;
        this.seashell.body.setCollisionGroup(this.seashellCG);
        this.seashell.body.collides([this.groundCG, this.crabCG,
                this.playerCG]);

        // create crabs
        this.crabs = game.add.group();
		this.crabs.enableBody = true;
		this.crabs.physicsBodyType = Phaser.Physics.P2JS;		
		this.crabs.create(this.game.width-180, this.game.height-80-69, 'crab');
        this.crabs.create(this.game.width, this.game.height-80-69, 'crab');				
		for (var i = 0; i < this.crabs.length; i++) {				
			this.crabs.getAt(i).body.setCollisionGroup(this.crabCG);				
			this.crabs.getAt(i).body.collides([this.crabCG, this.playerCG,
                    this.groundCG, this.seashellCG]);
		}
		this.crabs.getAt(0).body.moveLeft(1000);
		this.crabs.getAt(1).body.moveRight(1000);
		
		// Material
        this.characterMaterial =
            game.physics.p2.createMaterial('characterMaterial');
        this.slidingMaterial =
            game.physics.p2.createMaterial('slidingMaterial');

        this.game.physics.p2.createContactMaterial(this.characterMaterial,
        		this.slidingzMaterial, {friction: 0.1, restitution: 0});        
        
		// canudo
		this.diagonalStraw = this.game.add.sprite(2640, 270, 'straw2');
		this.game.physics.p2.enableBody(this.diagonalStraw, false);
		this.diagonalStraw.body.clearShapes();
		this.diagonalStraw.body.loadPolygon('strawPhysics', 'straw2_236-276');
		this.diagonalStraw.body.fixedRotation = true;
		this.diagonalStraw.body.static = true;
		this.diagonalStraw.body.setCollisionGroup(this.strawCG);
        this.diagonalStraw.body.collides([this.groundCG, this.playerCG]);

        // Add a "life drop"
        this.lifeDrop = this.game.add.sprite(280, 220, 'life_drop');
        this.game.physics.p2.enableBody(this.lifeDrop);
        this.lifeDrop.body.setRectangle(40, 40, 0, 0);
        this.lifeDrop.body.fixedRotation = true;
        this.lifeDrop.name = 'lifeDrop';
        this.lifeDrop.animations.add('move_molecule', [0, 1, 2, 3], 10, true);
        this.lifeDrop.animations.play('move_molecule');        
   		this.lifeDrop.body.setCollisionGroup(this.lifeDropCG);
        this.lifeDrop.body.collides([this.groundCG, this.playerCG]);

        // collide callbacks
		dropSprite.body.createGroupCallback(this.crabCG, this.checkOverlapCrabDrop, this);
		this.lifeDrop.body.createGroupCallback(this.playerCG, this.checkOverlapWithLifeDrop, this);
				
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
                this.drop.getSpriteObject().body.data.force[0] = 300;
            }
        } else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) {
            this.drop.moveLeft(4);
            this.drop.getSpriteObject().body.moveLeft(300);
            this.drop.getSpriteObject().body.data.force[0] = -300;
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
    checkOverlapWithLifeDrop: function (body1, body2) {
        // body1 is the drop; body2 is the life drop.
        if (!this.touchingUp(body2)) {
            console.log('Player get the life drop!!!!');
            this.powUpSound.play();
            this.hud.increaseDropBar();
            this.lifeDrop.kill();
            return true;
        }
        return false;
    },
	moveCrab: function (crab) {
		if (crab.name == "crab1") {
			if (this.touchingLeft(crab.body)) {
				crab.body.moveRight(1000);
			} else if (this.touchingRight(crab.body)) {
				crab.body.moveLeft(1000);
			} else {
			}								
		} else {
			if (this.touchingRight(crab.body)) {
				crab.body.moveLeft(1000);
			} else if (this.touchingLeft(crab.body)) {
				crab.body.moveRight(1000);
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
