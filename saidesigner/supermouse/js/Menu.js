
SuperMouse.Menu = function(game) {
	this.stars;
	this.asteroids;
	this.cheeses;	
	this.rats;
	this.musicTheme;
};

SuperMouse.Menu.prototype.preload = function() {
	
};

SuperMouse.Menu.prototype.create = function() {

	this.add.sprite(0, 0, 'universe');

	this.stars = Utils.createStars(this, 200, false);
	this.asteroids = Utils.createMultiple(this, 'asteroid', 10);
	this.cheeses = Utils.createMultiple(this, 'cheese', 5);
	this.rats = Utils.createMultiple(this, 'rat', 5);

	this.add.sprite(30, 30, 'supermouse');
	this.add.sprite(380, 30, 'logo');

	this.add.button(600, 400, 'bt_play', this.buttonPlayOnClick, this);
	this.add.button(600, 465, 'bt_credits', this.buttonCreditsOnClick, this);

	Utils.resurrectAsteroid(this, this.asteroids, -30, 0);
	Utils.resurrectCheese(this, this.cheeses, -20, 0);
	Utils.resurrectRat(this, this.rats, -20, 0);

	this.musicTheme = this.add.audio('music_theme', 1, true);
	this.musicTheme.play();	
};

SuperMouse.Menu.prototype.update = function() {

	Utils.resurrectAsteroid(this, this.asteroids, -30, 3000);
	Utils.resurrectCheese(this, this.cheeses, -20, 3000);
	Utils.resurrectRat(this, this.rats, -20, 3000);

};

SuperMouse.Menu.prototype.buttonPlayOnClick = function () {
	this.musicTheme.stop();
	this.state.start('Game');
};

SuperMouse.Menu.prototype.buttonCreditsOnClick = function () {
	this.musicTheme.stop();
	this.state.start('Credits');
};
