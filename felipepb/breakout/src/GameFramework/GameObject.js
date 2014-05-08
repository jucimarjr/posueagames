BreakoutGame.GameObject = function () {

	this.transform = {
		x: 0.0, y: 0.0,
		scaleX: 1.0, scaleY: 1.0,
		angle: 0.0
	};
	this.enabled = true;

	this._isInitialized = false;
	
	return this;
};

BreakoutGame.GameObject.prototype = {
	
	init: function () {
		this._isInitialized = true;
	},
	
	update: function (deltaTime) { },
	
	render: function (deltaTime, context2D) { },
	
	dispose: function () {
		this.transform = null;
		this.enabled = null;
	}
};