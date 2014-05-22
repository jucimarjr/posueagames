
var SuperMouse  = {};

SuperMouse.Game = function(game) {
	
	this.asteroids;
	this.player;
	this.sameColumn = false;	
}; 


SuperMouse.Game.prototype.preload = function() {
	
	this.load.image('universe', 'assets/universe_900-600.png');
    this.load.image('asteroid', 'assets/asteroid_80-80.png');
    this.load.image('player', 'assets/player_120-40.png');

};

SuperMouse.Game.prototype.create = function() {

	this.add.sprite(0, 0, 'universe');

	this.player = this.add.sprite(300, 300, 'player');
	
	this.asteroids = this.add.group();
	this.asteroids.enableBody = true;

	var lastPosX = 600;
	var lastPosY = 0;	
	var i = 0;

	do {
		if (this.sameColumn) {			
			lastPosY = lastPosY + 300 < 600 ? lastPosY + 300 : lastPosY - 300;
			this.sameColumn = false;
	    } else {
	    	lastPosX += 400;
	    	lastPosY = Math.floor((Math.random() * 500) + 1);
	    	this.sameColumn = (Math.floor((Math.random() * 100) + 1) % 2) == 0;
	    }

	    asteroid = this.asteroids.create(lastPosX, lastPosY, 'asteroid');
	    asteroid.body.immovable  = true;    
	    asteroid.body.allowRotation = true;
	    asteroid.body.velocity.x = -150;
	    asteroid.body.angularVelocity = Math.floor((Math.random() * 10) + 5) * -1;

	} while (++i < 6);

	this.asteroids.sort('x', Phaser.Group.SORT_ASCENDING);
};

SuperMouse.Game.prototype.update = function() {

	var lastAsteroid = this.asteroids.getAt(5);

	var lastPosX = lastAsteroid.body.x;
	var lastPosY = lastAsteroid.body.y;
	
	for (var i = 0; i < 6; i++) {

		var asteroid = this.asteroids.getAt(i);

		if (asteroid.body.x < 0) {
			if (this.sameColumn) {			
				lastPosY = lastPosY + 300 < 600 ? lastPosY + 300 : lastPosY - 300;
				this.sameColumn = false;
		    } else {
		    	lastPosX += 400;
		    	lastPosY = Math.floor((Math.random() * 500) + 1);
		    	this.sameColumn = (Math.floor((Math.random() * 100) + 1) % 2) == 0;
		    }

		    asteroid.body.x = lastPosX;
		    asteroid.body.y = lastPosY;
		}
	}

	this.asteroids.sort('x', Phaser.Group.SORT_ASCENDING);
};