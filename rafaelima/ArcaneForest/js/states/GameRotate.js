State.GameRotate = function (game) {
	"use strict";
	this.game = game;
};

var layer, player, map, rotate, bar; 
var collects;
var cursors, jumpButton, pauseButton;
var bg1, bg2, bg3, bg4, bg5; 
var previousX, previousY, result;
var itemsTaken, idPlayer, helper, flagI, flagNamePlayer;

State.GameRotate.prototype = {
		preload: function () {
			"use strict";
			itemsTaken = 0;
			flagId = true;
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
		    bg1 = game.add.tileSprite(0, 0, 3000, 540, 'bg1');
		    bg2 = game.add.tileSprite(0, 0, 3000, 540, 'bg2');
		    bg3 = game.add.tileSprite(0, 0, 3000, 540, 'bg3');
		    bg4 = game.add.tileSprite(0, 0, 3000, 540, 'bg4');

		    //Map
		    map = this.game.add.tilemap('stageRotate');
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
		    var barCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    
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

		    //player
		    player = this.game.add.sprite(2395, 300, 'dude');
		    player.animations.add('left', [0, 1, 2, 3], 10, true);
		    player.animations.add('turn', [4], 20, true);
		    player.animations.add('right', [5, 6, 7, 8], 10, true);
		    player.name = 'player';

		    this.game.physics.p2.enable(player, true);
		    player.body.fixedRotation = true;
		    this.game.camera.follow(player);
		    player.body.setCollisionGroup(playerCollisionGroup);

		    //DEBUG LAYER - deletar
//		    layer.debug = true;
		    result = 'inicio';
		    
		    //Collision tile/player
		    player.body.collides(tileCollisionGroup);
		    player.body.collides(collectCollisionGroup, this.collectItems, this);

		    bar = this.game.add.sprite(Config.game.bar.startRotateX, Config.game.bar.startRotateY, 'bar');
		    this.game.physics.p2.enable(bar, true);
		    bar.body.kinematic = true;
		    bar.body.setCollisionGroup(barCollisionGroup);
		    bar.body.collides([barCollisionGroup, playerCollisionGroup]);
		    player.body.collides(barCollisionGroup);
		    
		    bar.timer = 0;
		    
			layer.resizeWorld();
		    
		    previousX = 0;
		    previousY = 0;
		    
		    cursors = this.game.input.keyboard.createCursorKeys();
			jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
			pauseButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER); 
			pauseButton.onDown.add(this.pauseGame, this);
			
		},
		
		pauseGame: function (){
			this.game.paused = !this.game.paused;
		},
		
		collectItems: function (varPlayer, collect) {
			"use strict";
			if(flagId){
				flagId = false;
				idPlayer = varPlayer.data.id;
			}
			if(idPlayer == varPlayer.data.id){
				console.log(varPlayer.data.id, collect.data.id);
				collect.sprite.kill();
				itemsTaken ++;
				
				//DEBUG
				result = varPlayer.data.id;
				
				if(itemsTaken > 0){
					var fixedItem = this.game.add.sprite(0 , 0, 'collect');
					fixedItem.fixedToCamera = true;
					fixedItem.cameraOffset.setTo(720 + (40*itemsTaken), 40);
				}
			}
		},
		update: function () {
			"use strict";
//			Config.global.screen.resize(this.game);
			
			this.moveBar(bar, 320);
			
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
			"use strict";
			//DEBUG
//		    this.game.debug.spriteInfo(player, 32, 32);
		    this.game.debug.text( " + " + player.x +  " - " + player.y, 100, 380 );
		},
		
		moveMonster: function (obj, velocity) {
			"use strict";
			obj.timer++;
			if(obj.timer >= 100 ){
				obj.body.moveLeft(velocity);
				if(obj.timer >= 200){obj.timer = 0;}
			}else {
				obj.body.moveRight(velocity);
			}
		},
		
};