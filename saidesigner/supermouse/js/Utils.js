
var Utils = {};
var nextAsteroid = 0;
var nextCheese = 0;
var nextRat = 0;



Utils.createMultiple = function(game, key, numberOfItems) {
	
	var group = game.add.group();
	 
	group.enableBody = true;
	group.createMultiple(numberOfItems, key);
	group.setAll('checkWorldBounds', true);
    group.setAll('outOfBoundsKill', true);

    game.physics.enable(group, Phaser.Physics.ARCADE);

    return group
};

Utils.createStars = function(game, numberOfItems, animated) {

	var stars = Utils.createMultiple(game,'star', numberOfItems);

	while (stars.countDead() > 0) {
		
		var star = stars.getFirstDead();

		star.reset(Math.floor((Math.random() * 900) + 1), Math.floor((Math.random() * 600) + 1));				
		star.animations.add('blink', [1, 2, 3, 4, 5, 4, 3, 2, 1],  Math.floor((Math.random() * 6) + 1), true);
		star.animations.play('blink');
		if (animated) {
			star.body.velocity.x = Math.floor((Math.random() * 50) + 50) * -1;    
		}
	}

	return stars;
};

Utils.reviveAsteroid = function(game, asteroids, velocity, timePlus) {

	if (game.time.now > nextAsteroid && asteroids.countDead() > 0) {		

		var asteroid = asteroids.getFirstDead();

        asteroid.reset(980, Math.floor((Math.random() * 500) + 60));
        asteroid.body.velocity.x = velocity;
        asteroid.anchor.setTo(.5, .5);
        asteroid.body.angularVelocity = Math.floor((Math.random() * 100) - 100);        

        nextAsteroid = game.time.now + Math.floor((Math.random() * 200) + 400) + timePlus;
    } 
};

Utils.reviveCheese = function(game, cheeses, velocity, timePlus) {

	if (game.time.now > nextCheese && cheeses.countDead() > 0) {		

		var cheese = cheeses.getFirstDead();

        cheese.reset(980, Math.floor((Math.random() * 500) + 60));
        cheese.body.velocity.x = velocity;
        cheese.body.angularVelocity = Math.floor((Math.random() * 100) - 100);
        cheese.anchor.setTo(.5, .5);
        
        nextCheese = game.time.now + Math.floor((Math.random() * 5000) + 1000) + timePlus;
    }
};

Utils.reviveRat = function(game, rats, velocity, timePlus) {

	if (game.time.now > nextRat && rats.countDead() > 0) {		

		var rat = rats.getFirstDead();

        rat.reset(980, Math.floor((Math.random() * 500) + 60));
        rat.body.velocity.x = velocity;
        rat.body.angularVelocity = Math.floor((Math.random() * 100) - 100);
        rat.anchor.setTo(.5, .5);
        
        nextRat = game.time.now + Math.floor((Math.random() * 500) + 500) + timePlus;
    } 
};

Utils.reviveStar = function(game, stars) {

	if (stars.countDead() > 0) {		

		var star = stars.getFirstDead();

		star.reset(900, Math.floor((Math.random() * 600) + 1));				
		star.animations.add('blink', [1, 2, 3, 4, 5, 4, 3, 2, 1],  Math.floor((Math.random() * 6) + 1), true);
		star.animations.play('blink');
		star.body.velocity.x = Math.floor((Math.random() * 150) + 200) * -1;
	}	
};

Utils.createText = function(game, posX, posY, size, color, shadow) {
	
    var text = game.add.text(posX, posY);

    text.font = 'Press Start';
    text.fontSize = size;
    //text.fontWeight = 'bold';
    var grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);

    grd.addColorStop(0, color);       
    text.fill = grd;    
    text.align = 'left';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, shadow, 5);    

    return text;
};



Utils.pad = function(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}