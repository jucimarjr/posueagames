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
	    
	    this.game.load.audio('jump','assets/waterDrop.mp3');

		// Player
        this.drop.preload();
	},
	create: function () {
		"use strict";
		var background;
		background = this.game.add.tileSprite(Config.gamePlay.x, Config.gamePlay.y, game.world.width, game.world.height, 'gameplay-bg');
		background.fixedToCamera = true;

		this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 800;
		
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Camada de Tile 1');
        this.layer.resizeWorld();
        
        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies below.
        this.map.setCollisionBetween(1, 3);                
        this.game.physics.p2.convertTilemap(this.map, this.layer);
                
        // create player
        this.drop.create(300, this.game.world.height-200);
        var dropSprite = this.drop.getSpriteObject();   
        this.game.physics.p2.enable(dropSprite, false);
        dropSprite.body.collideWorldBounds = true; 
        
        this.game.camera.follow(dropSprite);
        this.drop.configureCharacter(this.setCharacterInicialValues);
        
        // Sounds
        this.jumpSound = this.game.add.audio("jump");
                
    },
    setCharacterInicialValues: function(character) {    	
    	//character.smoothed = false;
        character.body.collideWorldBounds = true;    
        character.body.fixedRotation = true;
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);
    },
	update: function () {
		"use strict";
		this.handleKeyDown();
	},
	// Funcao Magica!!! Deve existir outro jeito!
	checkIfCanJump: function () {

	    var yAxis = p2.vec2.fromValues(0, 1);
	    var result = false;

	    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
	    {
	        var c = game.physics.p2.world.narrowphase.contactEquations[i];

	        if (c.bodyA === this.drop.getSpriteObject().body.data || c.bodyB === this.drop.getSpriteObject().body.data)
	        {
	            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
	            if (c.bodyA === this.drop.getSpriteObject().body.data) d *= -1;
	            if (d > 0.5) result = true;
	        }
	    }	    
	    return result;
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
			if (this.checkIfCanJump()) { 
				this.drop.jump(450);  
				this.jumpSound.play();
			}
		}
	},
	moveCrab: function () {
    	this.crabs.getAt(0).body.velocity.x = 0;
    	this.crabs.getAt(1).body.velocity.x = 0;
		this.crabs.getAt(0).body.velocity.x = -100;		
		this.crabs.getAt(1).body.velocity.x = 100;		
	},
	crabKillDrop: function () {
		//if (this.drop.getSpriteObject().body.onFloor() 
				//&& (this.drop.getSpriteObject().body.touching.left 
				//|| this.drop.getSpriteObject().body.touching.right)) {
			
			this.drop.getSpriteObject().kill();		
		//}
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
