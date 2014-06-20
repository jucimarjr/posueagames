State.Game = function(game) {
	"use strict";
	this.game = game;
};

var layer, player, map, transparentWall, collects, health, rotate, monster, monsters, timer, timerBV, timerMonst;
var itemsTaken, flagId, isGameRotate, idPlayer, helper;
var imgPlayerFall, contFrameGif;
var cursors, attackButton, pauseButton;
var bg1, bg2, bg3, bg4, bg5, bg6;
var bar, bar2;
var previousX, previousY;
var playerCollisionGroup, obstacleCollisionGroup, monsterCollisionGroup, tileCollisionGroup, collectCollisionGroup, barCollisionGroup, swordCollisionGroup;
var isJumping, beInGround, yBeforeJump;
var verticalBar1, verticalBar2, verticalBar3, verticalBar4;
var timeCheck;
var monster_speed = 5;
var STATE_PLAY = 0;
var STATE_PAUSED = 1;
var STATE_GAMEOVER = 2;

State.Game.prototype = {
    preload: function () {
        "use strict";
        itemsTaken = 0;
        flagId = false;
        idPlayer = 0;
        beInGround = true;
        isJumping = false;
        yBeforeJump = 3504;
        rotate = 0.05;
        previousX = 0;
        previousY = 0;
        isGameRotate = false;
        contFrameGif = 0;
        timerMonst = 0;
        timerBV = 0;
    },
    create: function () {
        "use strict";
        
        this.gameState = STATE_PLAY;
        
        this.healthBar = [];
        this.timeImune = 0;
        this.timeToAttack = 0;
        this.attacking = false;
        this.canJump = true;
        this.swordCollider = null;
        
		
		
        //set p2
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.restitution = 0;
        this.game.physics.p2.gravity.y = 800;
        this.game.stage.backgroundColor = '#2d2d2d';
        this.game.physics.p2.updateBoundsCollisionGroup();

        //collision groups
        //start collision groups
        playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        obstacleCollisionGroup = this.game.physics.p2.createCollisionGroup();
        monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
        tileCollisionGroup = this.game.physics.p2.createCollisionGroup();
        collectCollisionGroup = this.game.physics.p2.createCollisionGroup();
        barCollisionGroup = this.game.physics.p2.createCollisionGroup();
        swordCollisionGroup = this.game.physics.p2.createCollisionGroup();

        //bg
        bg1 = this.game.add.tileSprite(0, 700, 3000, 720, 'bg1');
        bg1.tileScale.setTo(1, 1.8);
        bg2 = this.game.add.tileSprite(0, 970, 3000, 540, 'bg2');
        bg3 = this.game.add.tileSprite(0, 970, 3000, 540, 'bg3');
        bg6 = this.game.add.tileSprite(2700, 0, 2464, 1000, 'bg6');
        bg6.tileScale.setTo(2, 2);
        bg4 = this.game.add.tileSprite(2560, 970, 3000, 540, 'bg4');
        
        this.putVerticalBar();
        this.putBar();

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

        //Tile collision
        for (var tile in tileObjects) {
            tileObjects[tile].setCollisionGroup(tileCollisionGroup);
            tileObjects[tile].collides(playerCollisionGroup, this.hitTiles,
					this);
        }

        // player collider
        this.playerCollider = this.game.add.sprite(Config.game.player.x, Config.game.player.y, Config.game.player.collider.emma.key);
        this.playerCollider.anchor.setTo(Config.game.player.anchor.x, Config.game.player.anchor.y);
        this.playerCollider.name = "player";
        
        this.offsetX = Config.game.player.collider.emma.offset.right.x;
        this.offsetY = Config.game.player.collider.emma.offset.right.y;
        
        var playerX =Config.game.player.x  + this.offsetX;
        var playerY = Config.game.player.y + this.offsetY;
        
        // player
        player = this.game.add.sprite(playerX, playerY, Config.game.player.sword.key, 5);
        player.anchor.setTo(Config.game.player.anchor.x, Config.game.player.anchor.y);
        player.animations.add(Config.game.player.anim.stop.key, Config.game.player.anim.stop.frames, Config.game.player.anim.stop.speed, Config.game.player.anim.stop.loop);
        player.animations.add(Config.game.player.anim.walk.key, Config.game.player.anim.walk.frames, Config.game.player.anim.walk.speed, Config.game.player.anim.walk.loop);
        player.animations.add(Config.game.player.anim.jump.key, Config.game.player.anim.jump.frames, Config.game.player.anim.jump.speed, Config.game.player.anim.jump.loop);
        player.animations.add(Config.game.player.anim.attack.key, Config.game.player.anim.attack.frames, Config.game.player.anim.attack.speed, Config.game.player.anim.attack.loop);
        
//        this.playerCollider.reset(3040, 342);

        this.game.physics.p2.enable(this.playerCollider, false);
        this.playerCollider.body.collideWorldBounds = true;
        this.playerCollider.body.fixedRotation = true;
        this.game.camera.follow(this.playerCollider);
        
        this.playerCollider.body.setCollisionGroup(playerCollisionGroup);
        
        this.game.physics.p2.enable(player, false);
        player.body.kinematic = true;
        
        // sword collider
        this.swordOffsetX = Config.game.player.collider.sword.offset.right.x;
        this.swordOffsetY = Config.game.player.collider.sword.offset.right.y;
        
        
        //collide
        this.playerCollider.body.collides(monsterCollisionGroup, this.hitMonsters, this);
        this.playerCollider.body.collides(obstacleCollisionGroup, this.hitObstacles, this);
        //player.body.collides(tileCollisionGroup, this.hitTiles, this);
        this.playerCollider.body.collides(tileCollisionGroup);
        this.playerCollider.body.collides(collectCollisionGroup, this.collectItems, this);
        this.playerCollider.body.collides(barCollisionGroup, this.hitBar, this);
        
        //add 'things' to the world
        this.putObstacles();
        this.putMonsters();
        this.putMonstersBar();
        this.putCollect();
        this.putTransparentWall();
        
        beInGround = false;
        isJumping = false;
        yBeforeJump = 3504;
        
        this.playerLifes = Config.game.player.lifes;
        this.updateHealth();
        
        //DEBUG LAYER - deletar
//        layer.debug = true;

        layer.resizeWorld();
        layer.alpha = 2;

        cursors = this.game.input.keyboard.createCursorKeys();
        attackButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        pauseButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pauseButton.onDown.add(this.pauseGame, this);
        
        game.time.events.add(Phaser.Timer.SECOND * 1, this.beginMoving , this, verticalBar3);
        game.time.events.add(Phaser.Timer.SECOND * 5, this.beginMoving , this, verticalBar2);
        game.time.events.add(Phaser.Timer.SECOND * 7, this.beginMoving , this, verticalBar4);

        
    },

    beginMoving: function (obj) {
    	obj.flag = true;
	},
	
	
    pauseGame: function () {
        this.game.paused = !this.game.paused;
        
        //this.gameState = STATE_PAUSED;
    },

    update: function () {
        "use strict";
        
        //console.log("--"+ this.playerCollider.body.x +","+ this.playerCollider.body.y);
        this.moveMonster(monsters, 380);
        this.moveBarVertical(verticalBar1, 750);
        this.moveBarVertical(verticalBar2, 750);
        this.moveBarVertical(verticalBar3, 750);
        this.moveBarVertical(verticalBar4, 750);

        if(this.gameState == STATE_PLAY) {
        	
	        this.playerCollider.body.force.y = Config.game.player.forceY;
	        
//	        Config.global.screen.resize(this.game);
	        
	        var intVelY = Math.floor( this.playerCollider.body.velocity.y );
	        
	        if (cursors.left.isDown) {
	        	this.playerCollider.body.moveLeft(500);
	            player.scale.x = -1;
	            //player.animations.play('left');
	            if(!this.attacking && this.canJump && intVelY == 0) {
	            	player.animations.play(Config.game.player.anim.walk.key);
	            }
	            
	            this.offsetX = Config.game.player.collider.emma.offset.left.x;
	            this.offsetY = Config.game.player.collider.emma.offset.left.y;
	            
	            // set sword offset
	            this.swordOffsetX = Config.game.player.collider.sword.offset.left.x;
	            this.swordOffsetY = Config.game.player.collider.sword.offset.left.y;
	            
	        } else if (cursors.right.isDown) {
	        	this.playerCollider.body.moveRight(500);
	            player.scale.x = 1;
	            //player.animations.play('right');
	            if(!this.attacking && this.canJump && intVelY == 0) {
	            	player.animations.play(Config.game.player.anim.walk.key);
	            }
	            
	            this.offsetX = Config.game.player.collider.emma.offset.right.x;
	            this.offsetY = Config.game.player.collider.emma.offset.right.y;
	            
	            // set sword offset
	            this.swordOffsetX = Config.game.player.collider.sword.offset.right.x;
	            this.swordOffsetY = Config.game.player.collider.sword.offset.right.y;
	            
    	        } else {
	        	this.playerCollider.body.velocity.x = 0;
	            //player.animations.play('turn');
	            
	            if(!this.attacking) {
		            player.animations.play(Config.game.player.anim.stop.key);
		            player.animations.stop();
	        	}
	            
	        }
	        
	        this.doJump();
	        this.doAttack();
	        
	        player.body.x = this.playerCollider.body.x + this.offsetX;
	        player.body.y = this.playerCollider.body.y + this.offsetY;
	        
	        if (parseInt(player.x) > (Config.global.screen.width / 2) && previousX != parseInt(player.x)) {
	            if (previousX > player.x) {
	                bg2.tilePosition.x += 0.2;
	                bg3.tilePosition.x += 0.3;
	            } else {
	                bg2.tilePosition.x -= 0.2;
	                bg3.tilePosition.x -= 0.3;
	            }
	        }
	
	        previousX = parseInt(player.x);
	        
	        
	        if (player.x < 3044 && player.y <= 349 && !isGameRotate) {
	            this.fallPlayer();
	        }
	        
	        // to player attack do not fall down
	        if(this.swordCollider != null) {
	        	this.swordCollider.body.velocity.x = 0;
	        	this.swordCollider.body.velocity.y = 0;
	        }

            if (game.time.now - timeCheck > 4000 && monster != null && monster.frame === 0 && isGameRotate && monster.exists===true)
            {
                this.bossShoot();
                this.timeCheck();
            }
        
        } // end if gamestate == play
        
    },

    onClick: function () {
        "use strict";
    },
    
    putMonstersBar: function () {
        "use strict";
		
    },
	
	moveMonster: function (obj, velocity) {
		"use strict";
			timerMonst++;
			if(timerMonst >= 26 ){
				obj.forEach(function(objIntern){
					objIntern.body.velocity.x = velocity;
					objIntern.scale.x = -1;
				});
				if(timerMonst >= 50){timerMonst = 0;}
			}else {
				obj.forEach(function(objIntern){
					objIntern.body.velocity.x = -velocity;
					objIntern.scale.x = 1;
				});
			}
	},
	moveBarVertical: function (obj, velocity) {
		"use strict";
		if(obj.flag){
			obj.timerBV++;
			if(obj.timerBV >= 21 ){
				obj.body.velocity.y = -velocity;
				if(obj.timerBV >= 40){obj.timerBV = 0;}
			}else {
				obj.body.velocity.y = velocity;
			}
		}
	},
    
    gameRotate: function () {
        "use strict";
		 isGameRotate = true;
//        this.game.state.start('GifFall');
		 
		 bar.kill();
		 bar2.kill();
		 monsters.removeAll();
		 collects.removeAll();
		 obstacles.removeAll();

		 this.putBarRotate();
		 
		 bg1.y = Config.game.gameRotate.bg1y;
		 bg2.tilePosition.x -= Config.game.gameRotate.bg2x;
		 bg2.y = Config.game.gameRotate.bg2y;
		 bg3.tilePosition.x -= Config.game.gameRotate.bg3x;
		 bg3.y = Config.game.gameRotate.bg3y;
		 bg4.x = Config.game.gameRotate.bg4x;
		 bg4.y = Config.game.gameRotate.bg4y;
		 
		 layer.destroy();
		 this.playerCollider.body.clearCollision();
		 
		 tileCollisionGroup = this.game.physics.p2.createCollisionGroup();
		 
		 map = this.game.add.tilemap('stageRotate');
		 map.addTilesetImage('tileset_arcane_forest', 'tileset');
		 layer = map.createLayer('Camada de Tiles 1');
		 map.setCollisionBetween(1, 5);
		 map.setCollisionBetween(8, 22);
		 map.setCollisionBetween(25, 32);
		 map.setCollisionBetween(34, 37);
		 this.game.physics.p2.enable(layer);

        var tileObjects = this.game.physics.p2.convertTilemap(map, layer);

        //Tile collision
        for (var tile in tileObjects) {
        	tileObjects[tile].setCollisionGroup(tileCollisionGroup);
        	tileObjects[tile].collides(playerCollisionGroup, this.hitTiles,
        			this);
        }

        this.playerCollider = this.game.add.sprite(Config.game.player.xRotate, Config.game.player.yRotate, Config.game.player.collider.emma.key);
        this.game.physics.p2.enable(this.playerCollider, false);
        this.playerCollider.body.collideWorldBounds = true;
        this.playerCollider.body.fixedRotation = true;
        this.game.camera.follow(this.playerCollider);
        
        this.playerCollider.body.setCollisionGroup(playerCollisionGroup);
        this.playerCollider.body.collides(tileCollisionGroup);
        this.playerCollider.body.collides(barCollisionGroup);
        this.playerCollider.body.collides(collectCollisionGroup, this.collectItems, this);
        this.playerCollider.body.collides(monsterCollisionGroup, this.hitMonsters, this);
        
		 layer.resizeWorld();
		 layer.alpha = 2;
		 
		 this.updateHealth();
		 this.updateItems();
		 this.putBigBoss();
         this.timeCheck();
         
    },
    
    putBarRotate: function(){
    	bar = this.game.add.sprite(Config.game.barRotate.x, Config.game.barRotate.y, 'bar');
    	this.createKinematicObj(bar, barCollisionGroup, [barCollisionGroup, playerCollisionGroup]);
    	this.game.add.tween(bar.body.velocity).to({x: '-100'}, 15000).to({x: '+100'}, 15000).yoyo().loop().start();
    },
    
    fallPlayer: function(){
    	if (contFrameGif < 30){
    		if(this.imgPlayerFall!=null){
    			this.imgPlayerFall.kill();
    		}
    		
    		this.imgPlayerFall = this.game.add.sprite(0, 0, Config.animationFall.fallGif[contFrameGif]);
    		contFrameGif ++;
    		this.game.camera.follow(this.imgPlayerFall);
    	}else{
    		this.imgPlayerFall.kill();
    		this.gameRotate();
    	}
    },

    render: function () {
        "use strict";
        //DEBUG
//		this.game.debug.text(timerBV, 32, 32);
		this.game.debug.spriteInfo(this.playerCollider, 32, 32);
    },

    //collect item (diamond and key)
    collectItems: function (varPlayer, collect) {
        "use strict";
        //hit once
        if ((collect.data.id != idPlayer) && !flagId) {
            idPlayer = collect.data.id;

        	Config.game.player.items[Config.game.player.items.length] = collect.sprite.name;
            
            console.log(varPlayer.data.id, collect.data.id);
            collect.sprite.kill();
            itemsTaken++;
            if (itemsTaken > 0) {
                var fixedItem = collect.sprite.reset(0, 0, 1);
                fixedItem.fixedToCamera = true;
                if(varPlayer.sprite.name == 'key' || collect.sprite.name == 'key'){
                	fixedItem.cameraOffset.setTo(856, 20);
                	itemsTaken--;
                }else {
                	fixedItem.cameraOffset.setTo(856 + (24 * itemsTaken), 20);
                }
                flagId = true;
            }
        }
        if ((collect.data.id == idPlayer) && flagId) {
            flagId = false;
        }
    },
    
    updateItems: function () {
    	
    	if (Config.game.player.items.length > 0) {
    		collects = this.game.add.group();
    		
            for(var i = 0; i < Config.game.player.items.length; i++){
            	
            	var nameSprite = Config.game.player.items[i];
            	var fixedItem;

            	if(nameSprite == 'key'){
            		fixedItem = collects.create(0, 0, 'key');
            	} else if (nameSprite == 'pink'){
            		fixedItem = collects.create(0, 0, 'pink');
            	}else if (nameSprite == 'red'){
            		fixedItem = collects.create(0, 0, 'red');
            	}else if (nameSprite == 'blue'){
            		fixedItem = collects.create(0, 0, 'blue');
            	}
            	
            	if(fixedItem!=null){
            		fixedItem.name = nameSprite;
            		fixedItem.fixedToCamera = true;
            		if(fixedItem.name == 'key'){
            			fixedItem.cameraOffset.setTo(856, 20);
            		}else if(i==0){
            			fixedItem.cameraOffset.setTo(880, 20);
            		}else{
            			fixedItem.cameraOffset.setTo(856 + (24 * i), 20);
            		}
            	}
            }
            
        }
    },

    //health
    updateHealth: function () {
        "use strict";
        
        var count;
        for (var countHealth = 1; countHealth <= Config.game.player.lifes; countHealth++) {
        	
        	count = countHealth - 1;
        	
        	if(this.healthBar[count] != null && this.healthBar[count] != 'undefined') {
        		this.healthBar[count].kill();
        	}
            
        	if (this.playerLifes >= countHealth) {
        		this.healthBar[count] = this.game.add.sprite(Config.game.life.x * countHealth, Config.game.life.y, Config.game.life.full.key);
            }
            else {
            	this.healthBar[count] = this.game.add.sprite(Config.game.life.x * countHealth, Config.game.life.y, Config.game.life.empty.key);
            }
            
        	this.healthBar[count].fixedToCamera = true;
        }
    },


    
    doJump: function () {
    	
    	var intVelY = Math.floor( this.playerCollider.body.velocity.y );
    	
        if (cursors.up.isDown && intVelY == 0 && this.canJump) {
        	
        	this.canJump = false;
        	
        	player.animations.play(Config.game.player.anim.jump.key);
        	
        	this.playerCollider.body.moveUp(Config.game.player.jumpForce);
        }
        
        if(!this.canJump) {
        	
        	if(this.playerCollider.body.velocity.y <= 0) {
        		this.canJump = true;
        	}
        	
        }

    },

    doAttack: function () {
    	
    	var timeNow = new Date().getTime();
    	
        if (attackButton.isDown) {
        	
        	if(timeNow >= this.timeToAttack) {
        		
        		if(this.swordCollider != null) {
        			this.swordCollider.kill();
                	
                	this.swordCollider = null;
        		}
        		
        		this.attacking = true;
        		
        		// create sword collision
        		var swordX = this.playerCollider.body.x + this.swordOffsetX;
                var swordY = this.playerCollider.body.y + this.swordOffsetY;
                
                this.swordCollider = this.game.add.sprite(swordX, swordY, Config.game.player.collider.sword.key);
                this.swordCollider.anchor.setTo(Config.game.player.anchor.x, Config.game.player.anchor.y);
                
                this.swordCollider.name = "sword";
                
                this.game.physics.p2.enable(this.swordCollider, false);
                this.swordCollider.body.fixedRotation = true;
                //this.swordCollider.body.kinematic = true;
                
                //this.swordCollider.body.data.shapes[0].sensor = true;
                this.swordCollider.body.setCollisionGroup(swordCollisionGroup);
                
                this.swordCollider.body.collides(monsterCollisionGroup, this.killMonster, this);
                
        		player.animations.play(Config.game.player.anim.attack.key);
        		
        		this.timeToAttack = timeNow + Config.game.player.attackCooldown;
        		
        	}
        	
        }
        
        if(this.attacking && timeNow >= this.timeToAttack) {
        	this.attacking = false;
        	
        	this.swordCollider.kill();
        	
        	this.swordCollider = null;
        }
        
    },
    
    killMonster: function(body1, body2) {
    	
    	if(body1.sprite.name == 'monster') {
    		body1.sprite.kill();
    	}
    	else if(body2.sprite.name == 'monster') {
    		body2.sprite.kill();
    	}
    	
//    	console.log("name: "+body1.sprite.name);
//    	console.log("name: "+body2.sprite.name);
    	
    },

    hitTiles: function () {
        beInGround = this.checkIfCanJump();
        isJumping = false;
    },

    hitObstacles: function () {
        beInGround = this.checkIfCanJump();
        isJumping = false;

    },

    hitMonsters: function (body1, body2) {
    	
    	var monster;
    	if(body1.sprite.name == "monster") {
    		monster = body1.sprite;
    	}
    	else {
    		monster = body2.sprite;
    	}
    	
    	var timeNow = new Date().getTime();
    	
    	if(timeNow >= this.timeImune) { // check if player is time immune
	    	// lose life
	    	this.playerLifes--;
	    	
	    	this.updateHealth();
	    	
	    	this.timeImune = timeNow + Config.game.player.damageCooldown;
	    	
	    	// move player away
	    	if(this.playerCollider.body.x < monster.body.x) {
	    		this.playerCollider.body.force.x = -2000;
	    		//this.playerCollider.body.moveLeft(2000);
	    		//this.playerCollider.body.moveForward(2000);
	    	}
	    	else {
	    		this.playerCollider.body.force.x = 2000;
//	    		this.playerCollider.body.moveUp(200);
//	    		this.playerCollider.body.moveRight(2000);
	    		//this.playerCollider.body.moveBackward(2000);
	    	}
	    	
	    	if(this.playerLifes == 0) {
	    		
	    		this.gameState = STATE_GAMEOVER;
	    		
	        	player.kill();
	        	this.playerCollider.kill();
	        	
	        	// TODO: game over screen
	    	}
    	}
    	

    },

    hitBar: function () {
    },

    //internet magic...player is over something
    checkIfCanJump: function () {

        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;

        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === player.body.data)
                    d *= -1;
                if (d > 0.5)
                    result = true;
            }
        }

        return result;

    },

    //Create Bars
    putBar: function () {
        //bar 1
        bar = this.game.add.sprite(3850, 1415, 'bar');
        this.createKinematicObj(bar, barCollisionGroup, [barCollisionGroup, playerCollisionGroup]);
        this.game.add.tween(bar.body.velocity).to({
            x: '+200'
        }, 3000).to({
            x: '-200'
        }, 3000).yoyo().loop().start();

        //bar 2
        bar2 = this.game.add.sprite(4250, 1315, 'bar');
        this.createKinematicObj(bar2, barCollisionGroup, [barCollisionGroup, playerCollisionGroup]);
        this.game.add.tween(bar2.body.velocity).to({
            x: '+100'
        }, 3000).to({
            x: '-100'
        }, 3000).yoyo().loop().start();
        
    },
    //Create Obstacles
    putObstacles: function () {
        obstacles = this.game.add.group();

        for (var i = 1; i <= 4; i++) {
            var obstacle = obstacles.create(game.world.randomX,
					game.world.randomY, 'obstacle' + i);
			game.physics.p2.enable(obstacle, false);
            obstacle.body.fixedRotation = true; //no circle movement 
            obstacle.body.kinematic = true;
            obstacle.body.setCollisionGroup(obstacleCollisionGroup);
            obstacle.body.collides([obstacleCollisionGroup,
					playerCollisionGroup]);
        }
    },

    //create monsters
    putMonsters: function () {
			//group
			monsters = this.game.add.group();

			//monsters
			var monster = monsters.create(1090, 1359, 'monstercat');
			this.createMonster(monster);

			monster =  monsters.create(2050, 1395, 'monstercat');
			this.createMonster(monster);

            monster =  monsters.create(3950, 1152, 'greenmonster');
            this.createMonster(monster);
            monster.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            monster.play('walk');

            monster =  monsters.create(4250, 1152, 'greenmonster');
            this.createMonster(monster);
            monster.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            monster.play('walk');

            monster =  monsters.create(4550, 1252, 'greenmonster');
            this.createMonster(monster);
            monster.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            monster.play('walk');

			monster =  monsters.create(3178, 1343, 'bluemonster');
			this.createMonster(monster);

            monster =  monsters.create(4078, 442.5, 'bluemonster');
            this.createMonster(monster);

            monster =  monsters.create(4600, 514.5, 'bluemonster');
            this.createMonster(monster);
            
            monster =  monsters.create(3360, 370.5, 'bluemonster');
            this.createMonster(monster);
		},

		createMonster: function (monster) {
			monster.name = 'monster';
			monster.animations.add('walk', [0, 1, 2], 10, true);
			monster.play('walk');
			this.createKinematicObj(monster, monsterCollisionGroup, [monsterCollisionGroup, playerCollisionGroup, tileCollisionGroup, swordCollisionGroup]);
		},

		createKinematicObj: function (obj, setCollisionGroup, otherCollisionGroup) {
			this.game.physics.p2.enable(obj, false);
			obj.body.fixedRotation = true; //no circle movement 
			obj.body.kinematic = true;
			obj.body.setCollisionGroup(setCollisionGroup);
			obj.body.collides(otherCollisionGroup);
		},

    //Create Collects
    putCollect: function () {
        //Group Item
        collects = this.game.add.group();

        //Collect Items 1
        var collect = collects.create(1657, 1160, 'blue');
        collect.name = 'blue';
        this.createKinematicObj(collect, collectCollisionGroup, [collectCollisionGroup, playerCollisionGroup]);

        //Collect Items 2
        var collect = collects.create(3239, 245, 'pink');
        collect.name = 'pink';
        this.createKinematicObj(collect, collectCollisionGroup, [collectCollisionGroup, playerCollisionGroup]);

        //Collect Items 3
        var collect = collects.create(200, 1400, 'red');
        collect.name = 'red';
        this.createKinematicObj(collect, collectCollisionGroup, [collectCollisionGroup, playerCollisionGroup]);

        var collect = collects.create(300, 1400, 'key');
        collect.name = 'key';
        this.createKinematicObj(collect, collectCollisionGroup, [collectCollisionGroup, playerCollisionGroup]);
    },

    putVerticalBar: function () {
        //vertical bar 1
    	verticalBar1 = this.game.add.sprite(3500, 91, 'verticalbar');
    	verticalBar1.timerBV = 0;
    	verticalBar1.flag = true;
    	this.createKinematicObj(verticalBar1, barCollisionGroup, [barCollisionGroup, playerCollisionGroup]);
        
    	//vertical bar 2
    	verticalBar2 = this.game.add.sprite(3650, 91, 'verticalbar');
    	verticalBar2.timerBV = 0;
    	verticalBar2.flag = false;
    	this.createKinematicObj(verticalBar2, barCollisionGroup, [barCollisionGroup, playerCollisionGroup]);
        
        //vertical bar 3
    	verticalBar3 = this.game.add.sprite(3750, 91, 'verticalbar');
    	verticalBar3.timerBV = 0;
    	verticalBar3.flag = false;
    	this.createKinematicObj(verticalBar3, barCollisionGroup, [barCollisionGroup, playerCollisionGroup]);
    	
    	//vertical bar 3
    	verticalBar4 = this.game.add.sprite(3855, 91, 'verticalbar');
    	verticalBar4.timerBV = 0;
    	verticalBar4.flag = false;
    	this.createKinematicObj(verticalBar4, barCollisionGroup, [barCollisionGroup, playerCollisionGroup]);
    },
    
    putTransparentWall: function () {
    	transparentWall = this.game.add.sprite(48, 1200, 'transparentwall');
    	this.createKinematicObj(transparentWall, barCollisionGroup, [barCollisionGroup, playerCollisionGroup]);
	},

    //create monsters
        putBigBoss: function () {

            //big boss
            monster = monsters.create(720, 330, 'bigbossattack');
            monster.name = 'monsterBoss'; 
            monster.animations.add('walk', [0, 1, 2, 3, 4, 5], 10, true);
            monster.play('walk');
        	this.createKinematicObj(monster, monsterCollisionGroup, [monsterCollisionGroup, playerCollisionGroup, tileCollisionGroup, swordCollisionGroup]);
            
        },

        timeCheck: function (){

            timeCheck = this.game.time.now;
        },

        bossShoot: function () {
            var fire = monsters.create(720, 350, 'bigbossattackfire');
            fire.name = 'monsterBoss'; 
            fire.animations.add('walk', [0, 1, 2, 3], 10, true);
            fire.play('walk');
            this.game.physics.p2.enable(fire, false);
            fire.body.fixedRotation = true; //no circle movement 
            fire.body.kinematic = true;
            fire.body.collideWorldBounds = true;
            fire.body.setCollisionGroup(monsterCollisionGroup);
            fire.body.collides([monsterCollisionGroup, playerCollisionGroup, tileCollisionGroup, swordCollisionGroup], this.hitLight, this);
            fire.body.moveRight(300);
        },

        hitLight: function (body1, body2) {
        
            if(body1.sprite.name == 'monster') {
                body1.sprite.kill();
            }
            else if(body2.sprite.name == 'monster') {
                body2.sprite.kill();
            }
        }
};
