/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
    this.map = null;
    this.layer = null;
    this.player = null;
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('gameplay-bg',  Config.gamePlay.dir);
		this.game.load.tilemap('map', 'assets/mapLevel1_480-1600.json', null, Phaser.Tilemap.TILED_JSON);
	    this.game.load.image('tileset','assets/images/tileset.png');
		// Player
	    this.game.load.spritesheet('dude', 'assets/images/Dude_32-48.png', 32, 48);
	},
	create: function () {
		"use strict";
		var background; 
		background = this.game.add.tileSprite(Config.gamePlay.x, Config.gamePlay.y, 480, 900, 'gameplay-bg');
		background.fixedToCamera = true;
				
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset','tileset');
		this.layer = this.map.createLayer('Camada de Tiles 1');
        this.layer.resizeWorld(); 
        this.map.setCollisionBetween(1, 3, true,'Camada de Tiles 1');
        
                
		// Creating player
		this.player = this.game.add.sprite(50, game.world.height-400 , 'dude');
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 800;
		this.player.scale.set(1.5,1.5);
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);
		this.game.camera.follow(this.player);
		this.game.camera.y += 600;
	},
	update: function () {
		"use strict";
		//Config.global.screen.resize(this.game); //dont resize game
        this.game.physics.arcade.collide(this.player, this.layer);        

		this.handleKeyDown();
	},
	handleKeyDown: function () {
		"use strict";
		
		this.player.body.velocity.x = 0;
		
		if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) { 

			this.player.x += 10;
			this.player.animations.play('right');

		} else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { 			
			this.player.x -= 10;
			this.player.animations.play('left');

		} else {			
			this.player.animations.stop();
			this.player.frame = 4;
		}
		// Jump
		if ( this.game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { 

			if (this.player.body.onFloor() || this.player.body.touching.down) {
			
				this.player.body.velocity.y = -600;    
			}		
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
