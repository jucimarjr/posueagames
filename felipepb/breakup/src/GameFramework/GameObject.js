GameFramework.GameObject = function () {

	this.transform = {
		x: 0.0, y: 0.0,
		scaleX: 1.0, scaleY: 1.0,
		angle: 0.0
	};
	this.enabled = true;

	this._isInitialized = false;
	
	return this;
};

GameFramework.GameObject.prototype = {
	
	init: function () {
		this._isInitialized = true;
	},
	
	x: function (value) {
	    if (value === undefined)
	       return this.transform.x;
	    this.transform.x = value;
	},
	
	y: function (value) {
	    if (value === undefined)
	       return this.transform.y;
        this.transform.y = value;
	},
	
	scaleY: function (value) {
	    if (value === undefined)
	       return this.transform.scaleX;
        this.transform.scaleX = value;
	},
	
	scaleY: function (value) {
	    if (value === undefined)
	       return this.transform.scaleY;
        this.transform.scaleY = value;
	},
	
	angle: function (value) {
	    if (value === undefined)
	       return this.transform.angle;
	    this.transform.angle = value;
	},
	
	update: function (time) { },
	
	render: function (time, context2D) { },
	
	dispose: function () {
		this.transform = null;
		this.enabled = null;
	}
};