

SuperMouse.Game = function(game) {	
	this.stars;
	this.asteroids;
	this.cheeses;	
	this.rats;
	this.player;
	this.flySnd;
	this.alertSnd;
	this.breakBoneSnd;
	this.gameoverSnd;
	this.ratSnd;
	this.eatSnd;
	this.ambience;
	this.health;	
	this.keyPressed = false;	
	this.scoreText;
}; 

SuperMouse.Game.prototype.preload = function() {	
};

SuperMouse.Game.prototype.create = function() {

	this.add.sprite(0, 0, 'universe');

	this.stars = Utils.createStars(this, 100, true);
	this.asteroids = Utils.createMultiple(this, 'asteroid', 20);
	this.cheeses = Utils.createMultiple(this, 'cheese', 5);
	this.rats = Utils.createMultiple(this, 'rat', 5);

	// create player

	this.player = this.add.sprite(250, 200, 'player');
	this.physics.enable(this.player, Phaser.Physics.ARCADE);
	this.player.anchor.setTo(.5,.5);
	this.player.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 30, true);
	this.player.animations.add('fly2', [10, 11, 12], 30, true);
	this.player.animations.add('fly3', [13, 14, 15], 30, true);
	this.player.animations.add('fly4', [16, 17, 18], 30, true);
	this.player.animations.add('fly5', [19], 30, true);
	this.player.animations.play('fly');
	this.player.checkWorldBounds = true;
	this.player.outOfBoundsKill = true;	
	this.player.body.allowRotation = true;	
	this.player.body.angularVelocity = 100;	
	this.player.body.gravity.y = 100;
	this.player.body.acceleration.y = 200;	
	this.player.health = 110;
	this.player.events.onKilled.add(this.gameOver, this);

	// sounds

	this.ambience = this.add.audio('ambience', 0.3, true);
	this.ambience.play();

	this.flySnd = this.add.audio('fly_sound', 1, false);
	this.flySnd.addMarker("fly", 0.1, 3.9, 1, false);
	this.alertSnd = this.add.audio('alert', 0.2, true);
	this.breakBoneSnd = this.add.audio('break_bone', 1, false);
	gameoverSnd = this.add.audio('game_over', 1, false);
	this.ratSnd = this.add.audio('rat', 1, false);
	this.eatSnd = this.add.audio('eat', 1, false);
	this.eatSnd.addMarker("eating", 1, 3, 1, false);

	// Score
	
	score = 0;
	this.scoreText = Utils.createText(this, 800, 10, 50, '#ffffff', '#aaaaaa');

	// health

	this.health = this.add.sprite(252, 5, 'health');
	this.health.frame = 10;
};

SuperMouse.Game.prototype.update = function() {

	if (this.player.health > 10) {
		this.physics.arcade.overlap(this.player, this.asteroids, this.collisionHandler, this.collisionCheck, this);
		this.physics.arcade.overlap(this.player, this.cheeses, this.collisionHandler, this.collisionCheck, this);
		this.physics.arcade.overlap(this.player, this.rats, this.collisionHandler, this.collisionCheck, this);		
		this.movPlayer();
	}

	Utils.reviveStar(this, this.stars);
	Utils.reviveAsteroid(this, this.asteroids, -350, 0);
	Utils.reviveCheese(this, this.cheeses, -150, 0);
	Utils.reviveRat(this, this.rats, -150, 0);		
	this.scoreText.text = score;
};

SuperMouse.Game.prototype.movPlayer = function() {

	if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || 
		this.input.keyboard.isDown(Phaser.Keyboard.UP) || 
		this.input.activePointer.isDown) {

		this.player.body.velocity.y = -220 + (10 - this.player.health / 10) * 20;

		if (!this.keyPressed) {
			this.keyPressed = true;
			this.player.rotation = 0;
			this.player.body.angularVelocity = -100;
			this.player.body.allowRotation = true;
			this.flySnd.play('fly');
		}

	} else if (this.keyPressed) {
		this.keyPressed = false;
		this.player.body.angularVelocity = 50;		
		this.player.body.allowRotation = true;
	}

	if (this.player.body.allowRotation) {
		if (this.player.body.angularVelocity > 0) {			
			if (this.player.rotation > 0.5) {
				this.player.body.allowRotation = false;
			}
		} else {
			if (this.player.rotation < -0.5) {
				this.player.body.allowRotation = false;		
			}
		}
	}
}; 

SuperMouse.Game.prototype.collisionHandler = function(source, target) {
	if (this.asteroids.getIndex(target) >= 0) {
		if (!this.breakBoneSnd.isPlaying) {
			this.breakBoneSnd.play();
		}
		this.player.damage(1);		
		this.player.animations.play('fly2');		
	} else if (this.cheeses.getIndex(target) >= 0) {
		this.eatSnd.play('eating');
		if (this.player.health < 110) {
			this.player.damage(-10);
		}
		this.physics.arcade.moveToXY(target, 450, 10, 200, 200, 2000);
	} else {		
		if (!this.ratSnd.isPlaying) {
			this.ratSnd.play();
		}
		this.physics.arcade.moveToXY(target, 800, 10, 200, 200, 2000);		 
		score++;
	}

	if (this.player.health <= 10) {
		this.player.animations.play('fly5');
	} else if (this.player.health <= 30) {
		if (!this.alertSnd.isPlaying) {
			this.alertSnd.play();
		}
		this.player.animations.play('fly4');
	} else if (this.player.health <= 60) {
		if (this.alertSnd.isPlaying) {
			this.alertSnd.stop();
		}
		this.player.animations.play('fly3');
	} else {
		this.player.animations.play('fly');
	}

	this.health.frame = this.player.health / 10 - 1;
};

SuperMouse.Game.prototype.collisionCheck = function(source, target) {	

	return this.physics.arcade.distanceBetween(target, source) < 100;
};

SuperMouse.Game.prototype.gameOver = function(source) {	

	this.ambience.stop();
	this.alertSnd.stop();
	this.breakBoneSnd.stop();	
	this.ratSnd.stop();
	this.eatSnd.stop();
	this.eatSnd.stop();

	gameoverSnd.play();

	this.state.start('GameOver');
};