/*global State, Config, Phaser*/

State.Game = function (game) {
	"use strict";
	this.game = game;
	this.curumim;
	this.layer;
	this.cursors;
    this.jumpButton;
	this.left = false;
	this.right = false;
	this.space = false;
	this.jumps = 0;
    this.fundo;
};
State.Game.prototype = {
	preload: function () {
		"use strict";

		this.game.load.image('fundo', 'assets/cenario_curumim.jpg');
		this.game.load.tilemap('mapa','assets/mapa.json',null,Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tileset','assets/tiles.png');
		this.game.load.spritesheet('curumim','assets/spritesheets/curumim.png', 64, 78);
		this.game.load.image('back','assets/background.jpg');

		//spritesheet('health', 'assets/health_396-54.png', 396, 54);
	},

	create: function () {
		"use strict";

		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 800;
	
		//this.fundo = this.game.add.sprite(0, -300 ,'back');
		//this.fundo.fixedToCamera = true;
        
    	var bg = game.add.tileSprite(0,0, 4000, 1000,'fundo');
    	
 		var map = this.game.add.tilemap('mapa');
		map.addTilesetImage('transparente','tileset');
	
		this.layer = map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();

		map.setCollisionBetween(1, 4, true,'Tile Layer 1', false);
		
		this.curumim = this.game.add.sprite(300, 10 ,'curumim');
		this.game.physics.enable(this.curumim, Phaser.Physics.ARCADE);
        this.curumim.smoothed = false
        this.curumim.anchor.setTo(.5, 1);		
		this.curumim.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 0], 15, true);
		this.curumim.animations.add('jump', [8], 0, false);
		this.curumim.body.acceleration.y = 50;
		this.curumim.body.gravity.y = 100;
        this.curumim.body.collideWorldBounds = true;
		this.curumim.body.checkCollision.up = false;
		this.curumim.body.checkCollision.left = false;
		this.curumim.body.checkCollision.right = false;

    	this.game.camera.follow(this.curumim);
    	this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    	Config.global.screen.resize(this.game);

	},
	update: function () {
		"use strict";		

		this.game.physics.arcade.collide(this.layer, this.curumim);

		this.curumim.body.velocity.x = 0;        

		
		if (this.cursors.left.isDown) {
            this.curumim.scale.x = -1;
			this.curumim.body.velocity.x = -200;                    
            this.curumim.animations.play('walk');
		} else if (this.cursors.right.isDown) { 
            this.curumim.scale.x = 1;            
            this.curumim.animations.play('walk');
			this.curumim.body.velocity.x = 200;	            
		} else if (this.curumim.body.blocked.down) {
            this.curumim.animations.stop();
            this.curumim.frame = 0;
        }

        if (this.curumim.body.velocity.y !== 0) {
			this.curumim.animations.play('jump');
		}
		
		if (this.jumpButton.isDown) {			
			if (!this.space) {
				if (this.jumps < 2) {
					this.jumps++;
					this.curumim.body.velocity.y = -450;
				}
				this.space = true;
			}
		} else if (this.space) {
            this.space = false;
		}

		if (this.curumim.body.velocity.y == 0) {			
			this.jumps = 0;
		}		
	}
};