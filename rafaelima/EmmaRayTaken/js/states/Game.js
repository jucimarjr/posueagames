State.Game = function (game) {
	"use strict";
	this.game = game;
};

var layer;
var player;
var cursors;
var jumpButton;
var background2;
var map;
var rotate;

State.Game.prototype = {
		preload: function () {
			"use strict";
		},
		create: function () {
			"use strict";
			
			rotate = 0.05;
			
			this.game.physics.startSystem(Phaser.Physics.P2JS);
			this.game.physics.p2.setImpactEvents(true);
		    this.game.stage.backgroundColor = '#2d2d2d';
		    
		    this.game.physics.p2.updateBoundsCollisionGroup();

		    //Map
		    map = this.game.add.tilemap('stage');
			map.addTilesetImage('tileset_arcane_forest', 'tileset');
			
			layer = map.createLayer('Camada de Tiles 1');
			map.setCollisionBetween(1, 12);
			this.game.physics.p2.enable(layer);
			var tileObjects = this.game.physics.p2.convertTilemap(map, layer);

			this.game.physics.p2.restitution = 0.8;
		    this.game.physics.p2.gravity.y = 800;

		    var playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    var obstacleCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    var monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    var tileCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    
		    //Tile collision
		    for( var i=0; i<tileObjects.length; i++)
		    {
		    	tileObjects[i].setCollisionGroup(tileCollisionGroup);
		    	tileObjects[i].collides(playerCollisionGroup);
		    }

		    //player
		    player = this.game.add.sprite(60, 3300, 'dude');
		    player.animations.add('left', [0, 1, 2, 3], 10, true);
		    player.animations.add('turn', [4], 20, true);
		    player.animations.add('right', [5, 6, 7, 8], 10, true);

		    
		    this.game.physics.p2.enable(player, true);
//		    player.body.clearShapes();
//		    player.body.loadPolygon('physicsData', 'dude');
		    
		    player.body.fixedRotation = true;
		    this.game.camera.follow(player);
		    player.body.setCollisionGroup(playerCollisionGroup);
		    
		    //Collision tile/player
		    player.body.collides(tileCollisionGroup);
		    
			layer.resizeWorld();
		    
//		    this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
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
			} else if(cursors.up.isDown){
//				layer.rotation -=0.05;
				layer.resizeWorld();
				map.setCollisionBetween(1, 12);
				this.game.physics.p2.enable(layer);
			}else if(cursors.down.isDown){
//				layer.rotation +=0.05;
				layer.resizeWorld();
			}else{
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