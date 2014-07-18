
State.Fase3= function (game) {
	"use strict";
	this.game = game;
	this.map;
};

State.Fase3.prototype = {

	preload: function () {
		game.load.tilemap('mapa3',Config.game.fase3.json,null,Phaser.Tilemap.TILED_JSON);
		game.load.image('bg3',Config.game.fase3.background);
		game.load.image('tilesetNuvens',Config.game.fase3.nuvens.dir);
		game.load.spritesheet('tracajet2', Config.game.tracajet2.dir, Config.game.tracajet2.width,Config.game.tracajet2.height);

	    // Define motion constants
	    this.ROTATION_SPEED = 140; // degrees/second
	    this.ACCELERATION = 250; // pixels/second/second
	    this.MAX_SPEED = 150; // pixels/second
	    this.DRAG = 0; // pixels/second
	    this.GRAVITY = 100; // pixels/second/second
	},

	create: function () {
	    game.stage.backgroundColor = '#2d2d2d';
	    var bg3 = game.add.tileSprite(0, 0, game.cache.getImage('bg3').width,game.cache.getImage('bg3').height, 'bg3');
	    game.physics.startSystem(Phaser.Game.ARCADE);
	    this.map = game.add.tilemap('mapa3'); 
		this.map.addTilesetImage('nuvens_120-40-4','tilesetNuvens' );
		this.layer = this.map.createLayer('Camade de Tiles 1');
		this.layer.resizeWorld(); 
//		this.map.setCollisionBetween(1,12, true,'Camada de Tiles 1'); // 0 espaco vazio 1 em diante os tiles do tileset

		// Grupo de nuvens
		this.clouds = this.game.add.group();
		this.clouds.enableBody  = false;
		this.map.createFromObjects('Camada de Nuvens',2,'tilesetNuvens',0,true,false,this.clouds);
		
		this.tracajet = game.add.sprite(100,500, 'tracajet2');
		this.tracajet.animations.add('flyDown',[13,11],2,false);
		this.tracajet.animations.add('flyUp',[12,14],1,false);
		game.physics.enable(this.tracajet, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
//		this.tracajet.body.acceleration.y = 20;
		this.tracajet.body.collideWorldBounds = true;
		this.tracajet.anchor.setTo(.5,.5);
		this.tracajet.angle = 0;//-90; // Point the ship up

		// Set maximum velocity
	    this.tracajet.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
	    
	    // Add drag to the ship that slows it down when it is not accelerating
	    this.tracajet.body.drag.setTo(this.DRAG, this.DRAG); // x, y
	    this.tracajet.body.acceleration.setTo(0, 0);
	    this.tracajet.body.velocity.setTo(0, 0);    
	    // Turn on gravity
	    game.physics.arcade.gravity.y = this.GRAVITY;

	    this.tracajet.body.bounce.setTo(0.25, 0.25);
	    
	    
	    game.camera.follow(this.tracajet);
	    

		
	    // Capture certain keys to prevent their default actions in the browser.
	    // This is only necessary because this is an HTML5 game. Games on other
	    // platforms may not need code like this.
	    this.game.input.keyboard.addKeyCapture([
	        Phaser.Keyboard.LEFT,
	        Phaser.Keyboard.RIGHT,
	        Phaser.Keyboard.UP,
	        Phaser.Keyboard.DOWN
	    ]);

	},


	update: function () {

//        game.physics.arcade.collide(this.tracajet, this.layer);
        
		/*
	    // Refresh asteroid position
	    for (var i = 0; i < this.clouds.length ; i++)
		{
			var sprite = this.clouds.getAt(i);
//			sprite.body.setZeroVelocity();
//			sprite.body.moveLeft(1);
			sprite.x  = sprite.x - sprite.velocity; 
//			if (sprite.body.x <= -sprite.width)
//			{
////				sprite.velocity = game.rnd.integerInRange(100,200);
//				sprite.body.x = game.cache.getImage('bg3').width;
////				sprite.body.y = game.rnd.integerInRange(-100, 620);
//		    }
		}

*/
        
        if (this.leftInputIsActive()) {
            // If the LEFT key is down, rotate left
            this.tracajet.body.angularVelocity = -this.ROTATION_SPEED;
        } else if (this.rightInputIsActive()) {
            // If the RIGHT key is down, rotate right
            this.tracajet.body.angularVelocity = this.ROTATION_SPEED;
        } else {
            // Stop rotating
            this.tracajet.body.angularVelocity = 0;
        }

        if (this.tracajet.body.touching.down){
            // Stop rotating and moving
            this.tracajet.body.angularVelocity = 0;
            this.tracajet.body.velocity.setTo(0, 0);
            this.tracajet.angle = 0;
        }
        
        if (this.upInputIsActive()) {
            // If the UP key is down, thrust
            // Calculate acceleration vector based on this.angle and this.ACCELERATION;
//        	console.log('cos' + Math.cos(this.tracajet.rotation));
//        	console.log('sin' + Math.sin(this.tracajet.rotation));
//        	console.log('rot' + this.tracajet.rotation);
            this.tracajet.body.acceleration.x = Math.cos(this.tracajet.rotation-1.5707963267948966) * this.ACCELERATION;
            this.tracajet.body.acceleration.y = Math.sin(this.tracajet.rotation-1.5707963267948966) * this.ACCELERATION;

            // Show the frame from the spritesheet with the engine on
//            this.tracajet.frame = 0;
            this.tracajet.animations.play('flyUp');
        } else {
            // Otherwise, stop thrusting
            this.tracajet.body.acceleration.setTo(0, 0);

            // Show the frame from the spritesheet with the engine off
//            this.tracajet.frame = 0;
            this.tracajet.animations.play('flyDown');
        }
	},
//        game.physics.arcade.overlap(this.tracajet, this.star, this.tracajetEatStar,null,this);
/*
        if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
            this.tracajet.body.velocity.x = -100;
            this.tracajet.animations.play('walk');
            this.tracajet.scale.x = -1;
        }
        else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
            this.tracajet.body.velocity.x = 100;
            this.tracajet.scale.x = +1;  // espelha se antes 1
            this.tracajet.animations.play('walk');
        }
        else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima
            this.tracajet.body.velocity.y = -100;
            //		tracajet.animations.play('jump');
        }
        else if ( game.input.keyboard.isDown (Phaser.Keyboard.DOWN) ) { // vai para cima
            this.tracajet.body.velocity.y = 100;
            //		tracajet.animations.play('jump');
        }
        else{
            this.tracajet.animations.stop();
            this.tracajet.frame = 0;
        }
        */

	

	//This function should return true when the player activates the "go left" control
	//In this case, either holding the right arrow or tapping or clicking on the left
	//side of the screen.
	leftInputIsActive: function() {
	 var isActive = false;

	 isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
	 isActive |= (this.game.input.activePointer.isDown &&
	     this.game.input.activePointer.x < this.game.width/4);

	 return isActive;
	},

	//This function should return true when the player activates the "go right" control
	//In this case, either holding the right arrow or tapping or clicking on the right
	//side of the screen.
	rightInputIsActive: function() {
	 var isActive = false;

	 isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
	 isActive |= (this.game.input.activePointer.isDown &&
	     this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

	 return isActive;
	},

	//This function should return true when the player activates the "jump" control
	//In this case, either holding the up arrow or tapping or clicking on the center
	//part of the screen.
	upInputIsActive: function() {
	 var isActive = false;

	 isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
	 isActive |= (this.game.input.activePointer.isDown &&
	     this.game.input.activePointer.x > this.game.width/4 &&
	     this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

	 return isActive;
	}

	
};




