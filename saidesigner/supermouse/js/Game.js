
var SuperMouse  = {};


SuperMouse.Game = function(game) {
	
	this.game;

}; 


SuperMouse.Game.prototype.preload = function() {
	alert('preload');
};

SuperMouse.Game.prototype.create = function() {
	alert('create');
};

SuperMouse.Game.prototype.update = function() {
	alert('update');
};
