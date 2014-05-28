
SuperMouse.Menu = function(game) {
	this.stars;
	this.asteroids;
	this.cheeses;	
	this.rats;
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

	var btPlay = this.add.button(600, 400, 'bt_play', this.buttonPlayOnClick, this);
	btPlay.inputEnabled = true;
    btPlay.input.useHandCursor = true;

	var btCredits = this.add.button(600, 465, 'bt_credits', this.buttonCreditsOnClick, this);
	btCredits.inputEnabled = true;
	btCredits.input.useHandCursor = true;

	var title = Utils.createText(this, 500, 300, 20, '#ffffff', '#000000');
	title.text = "Missão de Resgate";	

	Utils.reviveAsteroid(this, this.asteroids, -30, 0);
	Utils.reviveCheese(this, this.cheeses, -20, 0);
	Utils.reviveRat(this, this.rats, -20, 0);

	if (!musicTheme || !musicTheme.isPlaying) {
		musicTheme = this.add.audio('music_theme', 1, true);
		musicTheme.play();	
	}
};

SuperMouse.Menu.prototype.update = function() {

	Utils.reviveAsteroid(this, this.asteroids, -30, 3000);
	Utils.reviveCheese(this, this.cheeses, -20, 3000);
	Utils.reviveRat(this, this.rats, -20, 3000);

};

SuperMouse.Menu.prototype.buttonPlayOnClick = function () {
	musicTheme.stop();
	this.state.start('Game');
};

SuperMouse.Menu.prototype.buttonCreditsOnClick = function () {	
	this.state.start('Credits');
};
