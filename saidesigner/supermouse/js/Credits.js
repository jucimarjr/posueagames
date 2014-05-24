
SuperMouse.Credits = function(game) {
	this.stars;
	this.asteroids;
	this.cheeses;	
	this.rats;
};

SuperMouse.Credits.prototype.preload = function() {
	
};

SuperMouse.Credits.prototype.create = function() {
	this.add.sprite(0, 0, 'universe');

	this.stars = Utils.createStars(this, 200, false);
	this.asteroids = Utils.createMultiple(this, 'asteroid', 10);
	this.cheeses = Utils.createMultiple(this, 'cheese', 5);
	this.rats = Utils.createMultiple(this, 'rat', 5);

	this.add.sprite(60, 30, 'supermouse2');
	this.add.sprite(350, 35, 'logo');

	var text = Utils.createText(this, 300, 300, 30, '#ffffff', '#aaaaaa');

	text.text = 'ARTE GRÁFICA\nSaid Mendonça\nDESENVOLVIMENTO\nSirineo Filho\nCleocimar Silva';
	text.align = 'center';

	var btBack = this.add.button(600, 510, 'bt_back', this.buttonBackOnClick, this);
	btBack.inputEnabled = true;
	btBack.input.useHandCursor = true;	

	Utils.reviveAsteroid(this, this.asteroids, -30, 0);
	Utils.reviveCheese(this, this.cheeses, -20, 0);
	Utils.reviveRat(this, this.rats, -20, 0);	
};

SuperMouse.Credits.prototype.update = function() {
	Utils.reviveAsteroid(this, this.asteroids, -30, 3000);
	Utils.reviveCheese(this, this.cheeses, -20, 3000);
	Utils.reviveRat(this, this.rats, -20, 3000);
};


SuperMouse.Credits.prototype.buttonBackOnClick = function () {	
	this.state.start('Menu');
};