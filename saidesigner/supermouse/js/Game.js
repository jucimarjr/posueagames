

SuperMouse.Game = function(game) {	
	this.stars;
	this.asteroids;
	this.cheeses;	
	this.rats;
	this.player;
	this.sounds;	
	this.keyPressed = false;	

	this.lifeLevel = 10;
	this.lifeLevelText;
	this.score = 0;
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
	this.player.animations.add('fly', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 30, true);
	this.player.animations.play('fly');
	this.player.body.allowRotation = true;	
	this.player.body.angularVelocity = 100;	
	this.player.body.gravity.y = 100;
	this.player.body.acceleration.y = 200;	

	// sound

	var ambience =  this.add.audio('ambience', 0.3, true);
	ambience.play();

	this.sounds = this.add.audio('sounds', 1, false);
	this.sounds.addMarker("fly", 0.1, 3.9, 1, false);

	// Text

	this.lifeLevelText = Utils.createText(this, 10, 10, 60, '#ffffff', '#000000');
	this.scoreText = Utils.createText(this, 800, 10, 60, '#ffffff', '#000000');
};

SuperMouse.Game.prototype.update = function() {

	this.physics.arcade.overlap(this.player, this.asteroids, this.collisionHandler, this.collisionCheck, this);
	this.physics.arcade.overlap(this.player, this.cheeses, this.collisionHandler, this.collisionCheck, this);
	this.physics.arcade.overlap(this.player, this.rats, this.collisionHandler, this.collisionCheck, this);

	this.movPlayer();

	Utils.resurrectStar(this, this.stars);
	Utils.resurrectAsteroid(this, this.asteroids, -350, 0);
	Utils.resurrectCheese(this, this.cheeses, -150, 0);
	Utils.resurrectRat(this, this.rats, -150, 0);

	this.lifeLevelText.text = this.lifeLevel;
	this.scoreText.text = this.score;
};

SuperMouse.Game.prototype.movPlayer = function() {

	if (this.input.keyboard.isDown(Phaser.Keyboard.UP) || this.input.activePointer.isDown) {

		this.player.body.velocity.y = -220 + (10 - this.lifeLevel) * 20;

		if (!this.keyPressed) {
			this.keyPressed = true;
			this.player.rotation = 0;
			this.player.body.angularVelocity = -100;
			this.player.body.allowRotation = true;
			this.sounds.play('fly');
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
		this.lifeLevel--;
//		this.state.start('GameOver');
		target.kill();
	} else if (this.cheeses.getIndex(target) >= 0){
		this.lifeLevel++
		target.kill();
	} else {		
		this.physics.arcade.moveToXY(target, 800, 10, 200, 200, 2000);		 
		this.score++;
	}
};

SuperMouse.Game.prototype.collisionCheck = function(source, target) {

	console.log(this.physics.arcade.distanceBetween(target, source));

	return this.physics.arcade.distanceBetween(target, source) < 100;
};