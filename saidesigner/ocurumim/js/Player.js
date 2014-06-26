var Curumim = {};
var player;

Curumim.Player = function(game) 
{
	this.game = game;
	this.score = score = new Curumim.Score(game);
	this.sprite;
	this.bullets;
	this.jumpButtonPressed = false;
	this.jumps = 0;	
	this.nextBullet = 0;
	this.powerUp = false;
	this.canDie = true;

	player = this;
};

Curumim.Player.prototype = 
{
	create: function() 
	{
		"use strict";

		// player

		this.sprite = this.game.add.sprite(Config.player.x, Config.player.y ,'curumim');
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.smoothed = true;
        this.sprite.anchor.setTo(.5, 1);		
		this.sprite.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 0], Config.player.velocity.walk_fps, true);
		this.sprite.animations.add('run', [1, 2, 3, 4, 5, 6, 7, 0], Config.player.velocity.run_fps, true);
		this.sprite.animations.add('jump', [8], 0, false);
		this.sprite.animations.add('fire_jump', [9], 0, false);
		this.sprite.animations.add('fire_walk', [10], 0, false);

		this.sprite.body.acceleration.y = 50;
		this.sprite.body.gravity.y = 100;
        this.sprite.body.collideWorldBounds = true;
		this.sprite.body.checkCollision.up = false;
		this.sprite.body.checkCollision.left = false;
		this.sprite.body.checkCollision.right = false;

    	this.game.camera.follow(this.sprite);

    	// bullets

    	this.bullets = this.game.add.group();	 
		this.bullets.enableBody = true;
		this.bullets.createMultiple(Config.bullet.number, 'bullet');
		this.bullets.setAll('checkWorldBounds', true);
    	this.bullets.setAll('outOfBoundsKill', true);
    	this.game.physics.enable(this.bullets, Phaser.Physics.ARCADE);

    	// Score

    	this.score.create();
	},

	update: function() 
	{
		"use strict";

		// Score

		this.score.update();

		// walk or run

		this.sprite.body.velocity.x = 0;

		var velocity = Config.player.velocity.walk;
		var animation = 'walk';
		var jumpForce = Config.player.jump.walking_force;

		if (this.powerUp) 
		{			
			velocity = Config.player.velocity.run;
			animation = 'run';
			jumpForce = Config.player.jump.running_force;
		}
		
		if (this.game.input.keyboard.isDown(Config.player.keys.left)) 
		{
           	this.sprite.scale.x = -1;
           	this.sprite.body.velocity.x = -velocity;
           	this.sprite.animations.play(animation);
		} 
		else if (this.game.input.keyboard.isDown(Config.player.keys.right)) 
		{ 
           	this.sprite.scale.x = 1;
           	this.sprite.body.velocity.x = velocity;                    
           	this.sprite.animations.play(animation);	            
		} 
		else if (this.sprite.body.blocked.down) 
		{
            this.sprite.animations.stop();
            this.sprite.frame = 0;
        }

        // jump

		if (this.game.input.keyboard.isDown(Config.player.keys.jump)) 
		{			
			if (!this.jumpButtonPressed) 
			{
				if (this.jumps < Config.player.jump.max) 
				{
					this.jumps++;
					this.sprite.body.velocity.y = jumpForce;
				}
				this.jumpButtonPressed = true;
			}
		} 
		else if (this.jumpButtonPressed) 
		{
            this.jumpButtonPressed = false;
		}

		// fire

		if (this.game.input.keyboard.isDown(Config.player.keys.fire)) 
		{
			this.fireBullets();
		}

        if (this.sprite.body.velocity.y !== 0) 
        {
        	if (this.game.input.keyboard.isDown(Config.player.keys.fire))
        	{
        		this.sprite.animations.play('fire_jump');
        	} 
        	else 
        	{
        		this.sprite.animations.play('jump');
        	}			
		}
		else
		{
			if (this.game.input.keyboard.isDown(Config.player.keys.fire)) 
			{
				this.sprite.animations.play('fire_walk');	
			}

			this.jumps = 0;	
		}
	},

	fireBullets: function() 
	{
		if (this.game.time.now > this.nextBullet && this.bullets.countDead() > 0 && this.score.numBullets > 0) {

			this.score.numBullets--;
			var bullet = this.bullets.getFirstDead();
	        bullet.reset(this.sprite.x + (28 * this.sprite.scale.x), this.sprite.y - 48);	        
	        bullet.body.acceleration.x = Config.bullet.acceleration;
	        bullet.body.velocity.x = this.sprite.body.velocity.x + Config.bullet.velocity.x * this.sprite.scale.x;
	        bullet.body.velocity.y = this.sprite.body.velocity.y + Config.bullet.velocity.y;
	        bullet.body.bounce.set(0.8);
	        bullet.anchor.setTo(.5, .5);

	        this.nextBullet = this.game.time.now + Config.bullet.interval;
	    } 
	},

	getCollider: function() {		
		return this.sprite;
	},

	getBullets: function() {
		return this.bullets;
	},

	startPowerUp : function() {
		this.powerUp = true;
		var self = this;
		setTimeout(function(){ self.powerUp = false; }, 15000);
	},

	loseOneLife : function() {

		if (!this.canDie) return;

		this.canDie = false;

		this.score.updateLife(-1);

		var self = this;
		var tween = this.game.add.tween(this.sprite);
		tween.to({ alpha: .4 }, 500, null, true, 0, Number.MAX_VALUE, true);		

		setTimeout(function() { 
			tween.stop();
			self.sprite.alpha = 1;
			self.canDie = true;
		 }, 3000);
	}
};