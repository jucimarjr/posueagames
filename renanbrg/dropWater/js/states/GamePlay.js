/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
    this.map = null;
    this.layer = null;
    this.player = null;
    this.crabs = null;
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
		
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset','tileset');
		this.layer = this.map.createLayer('Camada de Tile 1');
        this.layer.resizeWorld();
        this.map.setCollisionBetween(1, 3, true,'Camada de Tile 1');
        
        //Sounds
        this.jumpSound = this.game.add.audio("jump");

		// Creating player
        this.drop.create(300, game.world.height-200);

        // Remember that you first have to define the physics of the sprite
        // to be able to set values in the body property.
        var dropSprite = this.drop.getSpriteObject();        
        this.game.physics.enable(dropSprite, Phaser.Physics.ARCADE);
        this.drop.configureCharacter(this.setCharacterInicialValues);

        this.game.camera.follow(dropSprite);
        this.game.camera.x += 600;
        
        // add enemy crab
        this.crabs = this.game.add.group();
        this.crabs.create(this.game.width+130, this.game.height-160, 'crab');
        this.crabs.create(this.game.width+210, this.game.height-160, 'crab');
        this.crabs.enableBody = true;
        this.game.physics.enable(this.crabs, Phaser.Physics.ARCADE);
        this.crabs.setAll("body.immovable", true); //dont move when it collides        
        this.crabs.forEach(function (item){ 
            item.body.collideWorldBounds = true;
            item.body.checkCollision.up = true;
            item.body.checkCollision.left = true;
            item.body.checkCollision.right = true;            
            item.body.bounce.x = 0.8;            
        }, this);
        // to left side
        this.crabs.getAt(0).body.velocity.x = -100;
        // to right side
        this.crabs.getAt(1).body.velocity.x = 100;        
        
    },
    setCharacterInicialValues: function(character) {    	
    	character.smoothed = false;
    	character.body.checkCollision.up = true;
    	character.body.checkCollision.left = true;
    	character.body.checkCollision.right = true;
    	character.body.gravity.y = 800;
        character.scale.set(1.5, 1.5);        
        character.body.collideWorldBounds = true;        
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);
    },
	update: function () {
		"use strict";
        this.game.physics.arcade.collide(this.drop.getSpriteObject(), this.layer); 
        this.game.physics.arcade.collide(this.crabs, this.layer);
        this.game.physics.arcade.collide(this.drop.getSpriteObject(), this.crabs, this.crabKillDrop, null, this); //collide with crabs and drop                
        this.game.physics.arcade.overlap(this.crabs.getAt(0), this.crabs.getAt(1), this.moveCrab, null, this); //collide crab with crab
                        
		this.handleKeyDown();
	},
	handleKeyDown: function () {
		"use strict";

		this.drop.setVelocityX(0);

		if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
            this.drop.moveRight(4);

		} else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) {
            this.drop.moveLeft(4);

		} else {
            this.drop.stop();
		}
		// Jump
		if ( this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) {
            this.drop.jump(450);
            if ( this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR)&& (this.drop.getSpriteObject().body.onFloor())) 
            this.jumpSound.play();
		}
	},
	moveCrab: function () {
    	this.crabs.getAt(0).body.velocity.x = 0;
    	this.crabs.getAt(1).body.velocity.x = 0;
		this.crabs.getAt(0).body.velocity.x = -100;		
		this.crabs.getAt(1).body.velocity.x = 100;		
	},
	crabKillDrop: function () {
		if (this.drop.getSpriteObject().body.onFloor() 
				&& (this.drop.getSpriteObject().body.touching.left 
				|| this.drop.getSpriteObject().body.touching.right)) {
			
			this.drop.getSpriteObject().kill();		
		}
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
