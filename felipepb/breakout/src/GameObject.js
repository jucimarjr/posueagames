BreakoutGame.GameObject = function () {

	this.transform = {
		posX: 0.0, posY: 0.0,
		scaleX: 1.0, scaleY: 1.0,
		angle: 0.0
	};
	this.enabled = true;
	
	return this;
};

BreakoutGame.GameObject.prototype = {
	
	init: function () { },
	
	update: function (deltaTime) { },
	
	render: function (deltaTime, context2D) { },
	
	dispose: function () {
		this.transform = null;
		this.enabled = null;
	}
};