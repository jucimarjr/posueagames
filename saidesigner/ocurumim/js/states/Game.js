/*global State, Config, Phaser*/

State.Game = function (game) {
	"use strict";
	this.game = game;
	this.curumim;
	this.layer;
	this.cursors;
	this.left = false;
	this.right = false;
	this.space = false;
	this.jumps = 0;
};
State.Game.prototype = {
	preload: function () {
		"use strict";

		this.game.load.image('fundo', 'assets/mapa teste.png');
		this.game.load.tilemap('mapa','assets/mapa.json',null,Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tileset','assets/tiles.png');
		this.game.load.image('curumim','assets/player.png');
		this.game.load.image('back','assets/background.jpg');
	},

	create: function () {
		"use strict";
		

		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 800;

	
		var fundo = this.game.add.sprite(0, -300 ,'back');
		//fundo.fixedToCamera = true;


    	var bg = game.add.tileSprite(0,0, 4000,800,'fundo');
    	//bg.fixedToCamera = true;

 		var map = this.game.add.tilemap('mapa');
		map.addTilesetImage('transparente','tileset');
	
		this.layer = map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();

		map.setCollisionBetween(3, 4, true,'Tile Layer 1');
		
		this.curumim = this.game.add.sprite(300, 10 ,'curumim');
		this.game.physics.enable(this.curumim, Phaser.Physics.ARCADE);
		this.curumim.body.acceleration.y = 50;
		this.curumim.body.gravity.y = 100;

		this.curumim.body.checkCollision.up = false;
		this.curumim.body.checkCollision.left = false;
		this.curumim.body.checkCollision.right = false;

    	this.game.camera.follow(this.curumim);
    	this.cursors = game.input.keyboard.createCursorKeys();

	},
	update: function () {
		"use strict";		

		this.game.physics.arcade.collide(this.layer, this.curumim);

		if (this.cursors.up.isDown) {			
			if (/*!this.space &&*/ this.jumps < 2) {
				this.curumim.body.velocity.y = -500;
			}
			this.space = true;
		} else if (this.space) {
			this.space = false;
			this.jumps++;	
		}

		if (this.curumim.body.velocity.y == 0) {
			//this.space = false;
			this.jumps = 0;
		}

		if (this.cursors.left.isDown) {
			this.curumim.body.velocity.x = -200;
			this.left = true;
		} else if (this.left) {
			this.left = false;
			this.curumim.body.velocity.x = 0;
		}

		if (this.cursors.right.isDown) {
			this.curumim.body.velocity.x = 200;
			this.right = true;
		} else if (this.right) {
			this.right = false;
			this.curumim.body.velocity.x = 0;
		}
	}
};
