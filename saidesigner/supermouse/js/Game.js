
var SuperMouse  = {};

SuperMouse.Game = function(game) {	
	this.asteroids;
	this.cheeses;
	this.stars;
	this.player;
	this.sounds;	
	this.keyPressed = false;	
	this.nextAsteroid = 0;
	this.nextCheese = 0;
	this.nextRat = 0;
	this.lifeLevel = 10;
	this.lifeLevelText;
	this.score = 0;
	this.scoreText;
}; 

SuperMouse.Game.prototype.preload = function() {
	
	this.load.image('universe', 'assets/universe_900-600.png');
    this.load.image('asteroid', 'assets/asteroid_80-80.png');
    this.load.image('cheese', 'assets/cheese_80-80.png');
    this.load.image('rat', 'assets/rat_40-40.png');
    this.load.spritesheet('player', 'assets/player_120-50.png', 120, 50);
    this.load.spritesheet('star', 'assets/star_4-4.png', 4, 4);
    this.load.audio('sounds', 'assets/sounds.mp3');
    this.load.audio('ambience', 'assets/ambience.wav');
    
};

SuperMouse.Game.prototype.create = function() {

	this.add.sprite(0, 0, 'universe');

	// create stars

	this.stars = this.add.group();
	this.stars.enableBody = true;
	this.stars.createMultiple(50, 'star');
	this.stars.setAll('checkWorldBounds', true);
    this.stars.setAll('outOfBoundsKill', true);

	while (this.stars.countDead() > 0) {
		var star = this.stars.getFirstDead();

		star.reset(Math.floor((Math.random() * 900) + 1), Math.floor((Math.random() * 600) + 1));		
		this.physics.enable(star, Phaser.Physics.ARCADE);
		star.animations.add('blink', [1, 2, 3, 4, 5, 4, 3, 2, 1],  Math.floor((Math.random() * 6) + 1), true);
		star.animations.play('blink');
		star.body.velocity.x = Math.floor((Math.random() * 50) + 50) * -1;    
	}

	// create asteroids

	this.asteroids = this.add.group();
	this.asteroids.enableBody = true;
	this.physics.enable(this.asteroids, Phaser.Physics.ARCADE);
    this.asteroids.createMultiple(10, 'asteroid');
    this.asteroids.setAll('checkWorldBounds', true);
    this.asteroids.setAll('outOfBoundsKill', true);

	// create cheeses

	this.cheeses = this.add.group();
	this.cheeses.enableBody = true;
	this.physics.enable(this.cheeses, Phaser.Physics.ARCADE);
    this.cheeses.createMultiple(3, 'cheese');
    this.cheeses.setAll('checkWorldBounds', true);
    this.cheeses.setAll('outOfBoundsKill', true);

	// create rats

	this.rats = this.add.group();
	this.rats.enableBody = true;
	this.physics.enable(this.rats, Phaser.Physics.ARCADE);
    this.rats.createMultiple(2, 'rat');
    this.rats.setAll('checkWorldBounds', true);
    this.rats.setAll('outOfBoundsKill', true);

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

	this.lifeLevelText = this.createText(10, 10);
	this.scoreText = this.createText(800, 10);
};

SuperMouse.Game.prototype.update = function() {

	this.physics.arcade.overlap(this.player, this.asteroids, this.collisionHandler, null, this);
	this.physics.arcade.overlap(this.player, this.cheeses, this.collisionHandler, null, this);
	this.physics.arcade.overlap(this.player, this.rats, this.collisionHandler, null, this);

	this.movPlayer();
	this.fireAsteroid();
	this.fireCheese();
	this.fireRat();
	this.fireStar();

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

SuperMouse.Game.prototype.fireAsteroid = function() {

	if (this.time.now > this.nextAsteroid && this.asteroids.countDead() > 0) {		

		var asteroid = this.asteroids.getFirstDead();

        asteroid.reset(980, Math.floor((Math.random() * 500) + 1));
        asteroid.body.velocity.x = -250;
        this.nextAsteroid = this.time.now + Math.floor((Math.random() * 1000) + 500);
    }    
};

SuperMouse.Game.prototype.fireCheese = function() {

	if (this.time.now > this.nextCheese && this.cheeses.countDead() > 0) {		

		var cheese = this.cheeses.getFirstDead();

        cheese.reset(980, Math.floor((Math.random() * 500) + 1));
        cheese.body.velocity.x = -150;
        this.nextCheese = this.time.now + Math.floor((Math.random() * 5000) + 1000);
    }    
};

SuperMouse.Game.prototype.fireRat = function() {

	if (this.time.now > this.nextRat && this.rats.countDead() > 0) {		

		var rat = this.rats.getFirstDead();

        rat.reset(980, Math.floor((Math.random() * 500) + 1));
        rat.body.velocity.x = -150;
        this.nextRat = this.time.now + Math.floor((Math.random() * 500) + 500);
    }    
};

SuperMouse.Game.prototype.fireStar = function() {

	if (this.stars.countDead() > 0) {		

		var star = this.stars.getFirstDead();

		star.reset(900, Math.floor((Math.random() * 600) + 1));		
		this.physics.enable(star, Phaser.Physics.ARCADE);
		star.animations.add('blink', [1, 2, 3, 4, 5, 4, 3, 2, 1],  Math.floor((Math.random() * 6) + 1), true);
		star.animations.play('blink');
		star.body.velocity.x = Math.floor((Math.random() * 50) + 50) * -1;
	}	
};


SuperMouse.Game.prototype.collisionHandler = function(superMouse, object) {

	if (this.asteroids.getIndex(object) >= 0) {
		this.lifeLevel--;
	} else if (this.cheeses.getIndex(object) >= 0){
		this.lifeLevel++
	} else {
		this.score++;
	}

	object.kill();
};
SuperMouse.Game.prototype.createText = function(posX, posY) {


    text = this.add.text(posX, posY);
    text.font = 'Arial';
    text.fontSize = 60;
    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    text.fill = grd;
    text.align = 'left';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    return text;
};

SuperMouse.GameOver = function(game) {

};

SuperMouse.GameOver.prototype.preload = function() {
	this.load.image('asteroid', 'assets/asteroid_80-80.png');
};

SuperMouse.GameOver.prototype.create = function() {
	
};


SuperMouse.GameOver.prototype.update = function() {

};


