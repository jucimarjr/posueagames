var PhysicsConsts = {
	debugDraw: false,
	pixelsToUnit: 80,
	gravity: 9.8 * 80,
	tileBias: 32
};

var PlayerConsts = {
	movementVelocity: 1.1,
	jumpVelocity: 3.0,
	runModifier: 1.5,
	runModifierDamping: 0.05
};

var JoystickConsts = {
    leftOffset: 28672,
    rightOffset: 36864
};

var Utils = {
	hideSprite: function (sprite) {
	    sprite.scale.x = 0.0;
	    sprite.scale.y = 0.0;
	},

	showSprite: function (sprite) {
	    sprite.scale.x = 1.0;
	    sprite.scale.y = 1.0;
	},

	stringContains: function (str, content) {
		if (str === undefined)
			return false;

	    return str.indexOf(content) > -1;
	},

	clamp: function (x, min, max) {
	    return x < min ? min : (x > max ? max : x);
	}
};
