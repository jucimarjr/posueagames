State.Game = function (game) {
	"use strict";
	this.game = game;
};

var layer;
var player;
var cursors;
var jumpButton;
var background2;

State.Game.prototype = {
		preload: function () {
			"use strict";
		},
		create: function () {
			"use strict";
			
			
			this.game.physics.startSystem(Phaser.Physics.P2JS);
		    this.game.stage.backgroundColor = '#2d2d2d';
		    
			var map = this.game.add.tilemap('stage');
			map.addTilesetImage('tileset_arcane_forest', 'tileset');

			layer = map.createLayer('Camada de Tiles 1');
			layer.resizeWorld();
			map.setCollisionBetween(1, 12);
			
			this.game.physics.p2.convertTilemap(map, layer);

		    this.game.physics.p2.restitution = 0.5;
		    this.game.physics.p2.gravity.y = 800;

		    player = this.game.add.sprite(32, 150, 'dude');
		    player.animations.add('left', [0, 1, 2, 3], 10, true);
		    player.animations.add('turn', [4], 20, true);
		    player.animations.add('right', [5, 6, 7, 8], 10, true);

		    this.game.physics.p2.enable(player);
		    
		    player.body.fixedRotation = true;

		    this.game.camera.follow(player);
			
		    cursors = this.game.input.keyboard.createCursorKeys();
			jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
		},
		update: function () {
			"use strict";
//			Config.global.screen.resize(this.game);
			if (cursors.left.isDown){
				player.body.moveLeft(200);
				player.animations.play('left');
			} else if (cursors.right.isDown) {
				player.body.moveRight(200);
				player.animations.play('right');
			} else {
				player.body.velocity.x = 0;
				player.animations.stop();
				player.frame = 4;
			}

			if (jumpButton.isDown){
				player.body.moveUp(300);
				player.frame = 4;
			}		
		},
		
		onClick: function () {
			"use strict";
		},
};