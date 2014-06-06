State.Game = function (game) {
	"use strict";
	this.game = game;
};

var layer;
var player;
var cursors;
var jumpButton;
var map;
var rotate;
var bg1;
var bg2;
var bg3;
var bg4;
var bg5;
var bar;
var previousX;
var previousY;
var collects;
var itemsTaken;
var idPlayer;
var helper;
var flagId;

State.Game.prototype = {
		preload: function () {
			"use strict";
			itemsTaken = 0;
			flagId = false;
			idPlayer = 0;
		},
		create: function () {
			"use strict";
			
			rotate = 0.05;
			
			//set p2
			this.game.physics.startSystem(Phaser.Physics.P2JS);
			this.game.physics.p2.setImpactEvents(true);
		    this.game.stage.backgroundColor = '#2d2d2d';
		    this.game.physics.p2.updateBoundsCollisionGroup();
		    
		    //bg
		    bg1 = game.add.tileSprite(0, 3060, 3000, 540, 'bg1');
		    bg2 = game.add.tileSprite(0, 3060, 3000, 540, 'bg2');
		    bg3 = game.add.tileSprite(0, 3060, 3000, 540, 'bg3');
		    bg4 = game.add.tileSprite(2560, 3060, 3000, 540, 'bg4');

		    //Map
		    map = this.game.add.tilemap('stage');
			map.addTilesetImage('tileset_arcane_forest', 'tileset');
			layer = map.createLayer('Camada de Tiles 1');
			map.setCollisionBetween(1, 5);
			map.setCollisionBetween(8, 22);
			map.setCollisionBetween(25, 32);
			map.setCollisionBetween(34, 37);
			this.game.physics.p2.enable(layer);
			var tileObjects = this.game.physics.p2.convertTilemap(map, layer);

			this.game.physics.p2.restitution = 0.8;
		    this.game.physics.p2.gravity.y = 800;

		    //var
		    var playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    var obstacleCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    var monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    var collectCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    var tileCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    
		    //Tile collision
		    for( var i=0; i<tileObjects.length; i++)
		    {
		    	tileObjects[i].setCollisionGroup(tileCollisionGroup);
		    	tileObjects[i].collides(playerCollisionGroup);
		    }
		    
		    //Group Item
		    var collects = this.game.add.group();
		    
		    //Collect Items 1
		    var collect = collects.create(90, 3500, 'collect');
		    this.game.physics.p2.enable(collect, true);
		    collect.body.fixedRotation = true; //no circle movement 
		    collect.body.kinematic = true;
		    collect.body.setCollisionGroup(collectCollisionGroup);
		    collect.body.collides([collectCollisionGroup ,playerCollisionGroup]);
		    
		    //Collect Items 2
		    var collect = collects.create(150, 3500, 'collect');
		    this.game.physics.p2.enable(collect, true);
		    collect.body.fixedRotation = true; //no circle movement 
		    collect.body.kinematic = true;
		    collect.body.setCollisionGroup(collectCollisionGroup);
		    collect.body.collides([collectCollisionGroup ,playerCollisionGroup]);
		    
		    //Collect Items 3
		    var collect = collects.create(200, 3500, 'collect');
		    this.game.physics.p2.enable(collect, true);
		    collect.body.fixedRotation = true; //no circle movement 
		    collect.body.kinematic = true;
		    collect.body.setCollisionGroup(collectCollisionGroup);
		    collect.body.collides([collectCollisionGroup ,playerCollisionGroup]);

		    //bar
		    bar = game.add.sprite(Config.game.bar.startX, Config.game.bar.startY, 'bar');
		    game.add.tween(bar).to({ x: Config.game.bar.widthArea }, Config.game.bar.startX, Phaser.Easing.Linear.None, true, 0, 1000, true)
		    
		    //player
		    player = this.game.add.sprite(60, 3300, 'dude');
		    player.animations.add('left', [0, 1, 2, 3], 10, true);
		    player.animations.add('turn', [4], 20, true);
		    player.animations.add('right', [5, 6, 7, 8], 10, true);

		    this.game.physics.p2.enable(player, true);
		    player.body.fixedRotation = true;
		    this.game.camera.follow(player);
		    player.body.setCollisionGroup(playerCollisionGroup);

		    //DEBUG LAYER - deletar
		    layer.debug = true;
		    
		    //Collision tile/player
		    player.body.collides(tileCollisionGroup);
		    player.body.collides(collectCollisionGroup, this.collectItems, this);
		    
			layer.resizeWorld();
		    
		    previousX = 0;
		    previousY = 0;
		    
		    cursors = this.game.input.keyboard.createCursorKeys();
			jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
		},
		collectItems: function (varPlayer, collect) {
			"use strict";
			if ((collect.data.id != idPlayer) && !flagId) {
				idPlayer = collect.data.id;
	
				console.log(varPlayer.data.id, collect.data.id);
				collect.sprite.kill();
				itemsTaken++;
	
				if (itemsTaken > 0) {
					var fixedItem = this.game.add.sprite(0, 0, 'collect');
					fixedItem.fixedToCamera = true;
					fixedItem.cameraOffset.setTo(720 + (40 * itemsTaken), 40);
					flagId = true;
				}
			}
	
			if ((collect.data.id == idPlayer) && flagId) {
				flagId = false;
			}

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
			
			if( parseInt(player.x) > (Config.global.screen.width/2) && previousX!= parseInt(player.x)){
				if(previousX>player.x){
					bg2.tilePosition.x += 0.2;
					bg3.tilePosition.x += 0.3;
				}else{
					bg2.tilePosition.x -= 0.2;
					bg3.tilePosition.x -= 0.3;
				}
			}
			
			previousX = parseInt(player.x);
		},
		
		onClick: function () {
			"use strict";
		},
		
		render: function () {
			//DEBUG
		    this.game.debug.spriteInfo(player, 32, 32);
		}

};