
SuperMouse.Credits = function(game) {

};

SuperMouse.Credits.prototype.preload = function() {
	
};

SuperMouse.Credits.prototype.create = function() {
	this.add.sprite(0, 0, 'universe');
	this.add.sprite(60, 30, 'supermouse2');
	this.add.sprite(350, 35, 'logo');

	var text = Utils.createText(this, 300, 300, 30, '#ffffff', '#aaaaaa');

	text.text = 'ARTE GRÁFICA\nSaid Mendonça\nDESENVOLVIMENTO\nSirineo Filho\nCleocimar Silva';
	text.align = 'center';

	this.add.button(600, 510, 'bt_back', this.buttonBackOnClick, this);
};

SuperMouse.Credits.prototype.update = function() {

};


SuperMouse.Credits.prototype.buttonBackOnClick = function () {	
	this.state.start('Menu');
};