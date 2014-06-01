
SuperMouse.GameOver = function(game) {
	this.stars;
	this.asteroids;
	this.cheeses;	
	this.rats;
};

SuperMouse.GameOver.prototype.preload = function() {
	
};

SuperMouse.GameOver.prototype.create = function() {
	this.add.sprite(0, 0, 'universe');

	this.stars = Utils.createStars(this, 200, false);
	this.asteroids = Utils.createMultiple(this, 'asteroid', 10);
	this.cheeses = Utils.createMultiple(this, 'cheese', 5);
	this.rats = Utils.createMultiple(this, 'rat', 5);

	this.add.sprite(79, 10, 'gameover');

	var scoreText = Utils.createText(this, 450, 475, 80, '#ffffff', '#aaaaaa');
	scoreText.text = score;
	scoreText.anchor.setTo(.5,.5);
	
	//var btShare = this.add.button(685, 25, 'bt_share', this.buttonShareOnClick, this);
	//btShare.inputEnabled = true;
    //btShare.input.useHandCursor = true;

	var btTryAgain = this.add.button(269, 520, 'bt_try_again', this.buttonTryAgainOnClick, this);
	btTryAgain.inputEnabled = true;
	btTryAgain.input.useHandCursor = true;

	Utils.reviveAsteroid(this, this.asteroids, -30, 0);
	Utils.reviveCheese(this, this.cheeses, -20, 0);
	Utils.reviveRat(this, this.rats, -20, 0);
	
	var gameoverSnd = this.add.audio('game_over', 1, false);
	gameoverSnd.play();

	this.time.events.add(Phaser.Timer.SECOND * 2, this.playMusicTheme, this);
};

SuperMouse.GameOver.prototype.update = function() {

	Utils.reviveAsteroid(this, this.asteroids, -30, 3000);
	Utils.reviveCheese(this, this.cheeses, -20, 3000);
	Utils.reviveRat(this, this.rats, -20, 3000);

};

SuperMouse.GameOver.prototype.buttonShareOnClick = function () {

};

SuperMouse.GameOver.prototype.buttonTryAgainOnClick = function () {
	musicTheme.stop();
	this.state.start('Game');
};

SuperMouse.GameOver.prototype.playMusicTheme = function () {
	musicTheme.play();
};