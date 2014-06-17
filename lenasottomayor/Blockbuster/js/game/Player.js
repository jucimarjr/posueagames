

Player = function(game, coins, layer1, powerlifes, powerstars, thorns) {

	this.game = game;
	this.coins = coins;
	this.layer1 = layer1;
	this.powerlifes = powerlifes;
	this.powerstars = powerstars;
	this.thorns = thorns;
	this.gold = false;
	this.lose = false;
	this.life = 3;
	this.spritePlayer = null;
	this.cursors = null;
};

Player.prototype = {
	create: function () {
		this.spritePlayer = game.add.sprite(Config.player.position.x, Config.player.position.y, 'oscar');
		
	    //  Animations. When not moving, spritePlayer = 0.
	    this.spritePlayer.animations.add('walk', [1,2,3,4,5,6,7], 10, true);
	    this.spritePlayer.animations.add('walk-gold', [11,12,13,14,15,16,17], 10, true);
	    this.spritePlayer.animations.add('jump', [4], 1, true);
	    this.spritePlayer.animations.add('jump-gold', [14], 1, true);
	    this.spritePlayer.animations.add('fall', [3], 1, true);
	    this.spritePlayer.animations.add('fall-gold', [13], 1, true);
	    this.spritePlayer.animations.add('loss-life',[8],1,false);
	    this.spritePlayer.animations.add('dead',[9],1,false);
		
	    this.game.physics.enable(this.spritePlayer);
	    this.spritePlayer.body.collideWorldBounds = true;
		this.spritePlayer.anchor.setTo(Config.player.anchor.x, Config.player.anchor.y);
		this.spritePlayer.dead = false;
		this.spritePlayer.smoothed = false;
	    
		this.game.camera.follow(this.spritePlayer, Phaser.Camera.FOLLOW_PLATFORMER);

	    this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function() {
		"use strict";

		this.spritePlayer.body.velocity.x = 0;

	    if(this.cursors.left.isDown && !this.lose)
	    {
	    	this.spritePlayer.body.velocity.x = -Config.player.speed;
	    	this.spritePlayer.scale.x = -1;
	    	if(this.gold){
		    	this.spritePlayer.animations.play('walk-gold');
	    	} else {
		    	this.spritePlayer.animations.play('walk');
	    	}
	    }
	    else if(this.cursors.right.isDown && !this.lose)
	    {
	    	this.spritePlayer.body.velocity.x = Config.player.speed;
	    	this.spritePlayer.scale.x = 1;
	    	if(this.gold){
		    	this.spritePlayer.animations.play('walk-gold');
	    	} else {
		    	this.spritePlayer.animations.play('walk');
	    	}
	    }
	    else if(!this.lose) 
	    {
	    	this.spritePlayer.animations.stop();
	    	if(this.gold){
	    		this.spritePlayer.frame = 10;
	    	} else {
	    		this.spritePlayer.frame = 0;
	    	}
	    }


    	if(this.gold && (this.spritePlayer.body.velocity.y < 0)){
	    	this.spritePlayer.animations.play('jump-gold');
    	} else if (this.spritePlayer.body.velocity.y < 0){
	    	this.spritePlayer.animations.play('jump');
    	} else if(this.gold && (this.spritePlayer.body.velocity.y > 0)){
	    	this.spritePlayer.animations.play('fall-gold');
    	} else if (this.spritePlayer.body.velocity.y > 0){
	    	this.spritePlayer.animations.play('fall');
    	}
	    //  Allow the player to jump if they are touching the ground.
	    if (this.jump.isDown && this.spritePlayer.body.onFloor() && !this.lose)
	    {
	        this.spritePlayer.body.velocity.y = -Config.player.jump;
	    }
	},
	
	die: function (enemy){
		if(this.life >= 1 && enemy.alive){
			this.lose = true;
			this.spritePlayer.animations.play('loss-life');
			this.spritePlayer.alpha= 0;
			
			var safetyTween = game.add.tween(this.spritePlayer).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 20, true);
			safetyTween.onComplete.add(function(){this.lose = false;},this);
			
			this.life--;
		}
		
		if(this.life == 0 && this.spritePlayer.alive) {
			this.spritePlayer.alive = false;
			this.spritePlayer.animations.play('dead');
			this.spritePlayer.alpha= 0;
			
			var safetyTween = game.add.tween(this.spritePlayer).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 20, true);
			safetyTween.onComplete.add(function(){this.game.state.start('GameOver');},this);
		}
	}
};