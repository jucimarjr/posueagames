

Player = function(game, coins, layer1, powerlifes, powerstars, thorns, HUD, jumpSound) {

	this.game = game;
	this.coins = coins;
	this.layer1 = layer1;
	this.powerlifes = powerlifes;
	this.powerstars = powerstars;
	this.thorns = thorns;
	this.HUD = HUD;
	this.jumpSound = jumpSound;
	this.gold = false;
	this.lose = false;
	this.loseInThorn = false;
	this.life = 3;
	this.spritePlayer = null;
	this.cursors = null;
	this.buttonJump = null;
	this.isJump = null;
	this.buttonRun = null;
	this.isRun = null;
	this.buttonleft = null;
	this.left = null;
	this.buttonright = null;
	this.right = null;
};

Player.prototype = {
	create: function () {
		this.spritePlayer = game.add.sprite(Config.player.position.x, Config.player.position.y, 'oscar');
		
	    //  Animations. When not moving, spritePlayer = 0.
	    this.spritePlayer.animations.add('walk', [1,2,3,4,5,6,7], 8, true);
	    this.spritePlayer.animations.add('walk-gold', [11,12,13,14,15,16,17], 8, true);
	    this.spritePlayer.animations.add('run', [1,2,3,4,5,6,7], 15, true);
	    this.spritePlayer.animations.add('run-gold', [11,12,13,14,15,16,17], 15, true);
	    this.spritePlayer.animations.add('jump', [4], 1, true);
	    this.spritePlayer.animations.add('jump-gold', [14], 1, true);
	    this.spritePlayer.animations.add('fall', [3], 1, true);
	    this.spritePlayer.animations.add('fall-gold', [13], 1, true);
	    this.spritePlayer.animations.add('loss-life',[8],1,false);
	    this.spritePlayer.animations.add('dead',[9],1,false);
		
	    this.game.physics.enable(this.spritePlayer, Phaser.Physics.ARCADE);
	    this.spritePlayer.body.collideWorldBounds = true;
		this.spritePlayer.anchor.setTo(Config.player.anchor.x, Config.player.anchor.y);
		this.spritePlayer.dead = false;
	    
		this.game.camera.follow(this.spritePlayer, Phaser.Camera.FOLLOW_PLATFORMER);

	    this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.run = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
		
		this.buttonJump = game.add.button(Config.button.jump.x, Config.button.jump.y, 'button-jump', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
		this.buttonJump.fixedToCamera = true;  //our buttons should stay on the same place
		this.buttonJump.events.onInputOver.add(function(){this.isJump=true;}, this);
		this.buttonJump.events.onInputOut.add(function(){this.isJump=false;}, this);
		this.buttonJump.events.onInputDown.add(function(){this.isJump=true;}, this);
		this.buttonJump.events.onInputUp.add(function(){this.isJump=false;}, this);
		
		this.buttonRun = game.add.button(Config.button.run.x, Config.button.run.y, 'button-run', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
		this.buttonRun.fixedToCamera = true;  //our buttons should stay on the same place
		this.buttonRun.events.onInputOver.add(function(){this.isRun=true;}, this);
		this.buttonRun.events.onInputOut.add(function(){this.isRun=false;}, this);
		this.buttonRun.events.onInputDown.add(function(){this.isRun=true;}, this);
		this.buttonRun.events.onInputUp.add(function(){this.isRun=false;}, this);        

		this.buttonleft = game.add.button(Config.button.horizontal.left.x, Config.button.horizontal.left.y, 'button-horizontal', null, this, 0, 1, 0, 1);
		this.buttonleft.fixedToCamera = true;
		this.buttonleft.events.onInputOver.add(function(){this.left=true;}, this);
		this.buttonleft.events.onInputOut.add(function(){this.left=false;}, this);
		this.buttonleft.events.onInputDown.add(function(){this.left=true;}, this);
		this.buttonleft.events.onInputUp.add(function(){this.left=false;}, this);

		this.buttonright = game.add.button(Config.button.horizontal.right.x, Config.button.horizontal.right.y, 'button-horizontal', null, this, 0, 1, 0, 1);
		this.buttonright.fixedToCamera = true;
		this.buttonright.events.onInputOver.add(function(){this.right=true;}, this);
		this.buttonright.events.onInputOut.add(function(){this.right=false;}, this);
		this.buttonright.events.onInputDown.add(function(){this.right=true;}, this);
		this.buttonright.events.onInputUp.add(function(){this.right=false;}, this);
	},

	update: function() {
		"use strict";

		this.spritePlayer.body.velocity.x = 0;

		if(!this.lose) 
	    {
			//Keyboard =================================================
			
			if(this.cursors.left.isDown && !this.run.isDown)
			{
				this.spritePlayer.body.velocity.x = -Config.player.speed;
				this.spritePlayer.scale.x = -1;
				if(this.gold){
					this.spritePlayer.animations.play('walk-gold');
				} else {
					this.spritePlayer.animations.play('walk');
				}
			}
			else if(this.cursors.right.isDown && !this.run.isDown)
			{
				this.spritePlayer.body.velocity.x = Config.player.speed;
				this.spritePlayer.scale.x = 1;
				if(this.gold){
					this.spritePlayer.animations.play('walk-gold');
				} else {
					this.spritePlayer.animations.play('walk');
				}
			}
			else if(this.cursors.left.isDown && this.run.isDown)
			{
				this.spritePlayer.body.velocity.x = -Config.player.run;
				this.spritePlayer.scale.x = -1;
				if(this.gold){
					this.spritePlayer.animations.play('run-gold');
				} else {
					this.spritePlayer.animations.play('run');
				}
			}
			else if(this.cursors.right.isDown && this.run.isDown)
			{
				this.spritePlayer.body.velocity.x = Config.player.run;
				this.spritePlayer.scale.x = 1;
				if(this.gold){
					this.spritePlayer.animations.play('run-gold');
				} else {
					this.spritePlayer.animations.play('run');
				}
			} //Joystick Virtual =================================================
			else if(this.left && !this.isRun)
			{
				this.spritePlayer.body.velocity.x = -Config.player.speed;
				this.spritePlayer.scale.x = -1;
				if(this.gold){
					this.spritePlayer.animations.play('walk-gold');
				} else {
					this.spritePlayer.animations.play('walk');
				}
			}
			else if(this.right && !this.isRun)
			{
				this.spritePlayer.body.velocity.x = Config.player.speed;
				this.spritePlayer.scale.x = 1;
				if(this.gold){
					this.spritePlayer.animations.play('walk-gold');
				} else {
					this.spritePlayer.animations.play('walk');
				}
			}
			else if(this.left && this.isRun)
			{
				this.spritePlayer.body.velocity.x = -Config.player.run;
				this.spritePlayer.scale.x = -1;
				if(this.gold){
					this.spritePlayer.animations.play('run-gold');
				} else {
					this.spritePlayer.animations.play('run');
				}
			}
			else if(this.right && this.isRun)
			{
				this.spritePlayer.body.velocity.x = Config.player.run;
				this.spritePlayer.scale.x = 1;
				if(this.gold){
					this.spritePlayer.animations.play('run-gold');
				} else {
					this.spritePlayer.animations.play('run');
				}
			}
			else
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
			if (this.jump.isDown && this.spritePlayer.body.onFloor())
			{
				this.jumpSound.play();
				if (this.run.isDown) {
					this.spritePlayer.body.velocity.y = -Config.player.jumpRun;
				} else {
					this.spritePlayer.body.velocity.y = -Config.player.jump;
				}
			}

			if (this.isJump && this.spritePlayer.body.onFloor())
			{
				this.jumpSound.play();
				if (this.run.isDown) {
					this.spritePlayer.body.velocity.y = -Config.player.jumpRun;
				} else {
					this.spritePlayer.body.velocity.y = -Config.player.jump;
				}
			}
		}
	},
	
	goldVersion: function (){
		this.gold = true;
		this.spritePlayer.alpha= 0;
		
		var safetyTween = game.add.tween(this.spritePlayer).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 300, true);
		safetyTween.onComplete.add(function(){this.gold = false;},this);
	},
	
	die: function (enemy){
		if(this.HUD.lifes >= 1 && enemy.alive){
			this.lose = true;
			this.spritePlayer.animations.play('loss-life');
			this.spritePlayer.alpha= 0;
			
			var safetyTween = game.add.tween(this.spritePlayer).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 20, true);
			safetyTween.onComplete.add(function(){this.lose = false;},this);
			
			this.HUD.updateLife(-1);
		}
		
		if(this.HUD.lifes == 0 && this.spritePlayer.alive) {
			this.spritePlayer.alive = false;
			this.spritePlayer.animations.play('dead');
			this.spritePlayer.alpha= 0;
			
			var safetyTween = game.add.tween(this.spritePlayer).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 20, true);
			safetyTween.onComplete.add(function(){this.game.state.start('GameOver');},this);
		}
	},
	
	dieInThorn: function (){
		if(this.HUD.lifes >= 1){
			this.loseInThorn = true;
			this.spritePlayer.animations.play('loss-life');
			this.spritePlayer.alpha= 0;
			
			var safetyTween = game.add.tween(this.spritePlayer).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 20, true);
			safetyTween.onComplete.add(function(){this.loseInThorn = false;},this);
			
			this.HUD.updateLife(-1);
		}
		
		if(this.HUD.lifes == 0 && this.spritePlayer.alive) {
			this.lose = true;
			this.spritePlayer.alive = false;
			this.spritePlayer.animations.play('dead');
			this.spritePlayer.alpha = 0;
			
			var safetyTween = game.add.tween(this.spritePlayer).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 20, true);
			safetyTween.onComplete.add(function(){this.game.state.start('GameOver');},this);
		}
	}
};