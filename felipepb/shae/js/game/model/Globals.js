var PhysicsConsts = {
	debugDraw: false,
	pixelsToUnit: 80,
	gravity: 9.8 * 80,
	tileBias: 32
};

var PlayerConsts = {
	walkVelocity: 1.1 * PhysicsConsts.pixelsToUnit,
	walkAccel: 2.5,
	walkDamping: 5.0,
	jumpVelocity: 3.5 * PhysicsConsts.pixelsToUnit,
	runModifier: 1.5,
	runModifierDamping: 0.05,
	startingLifeTotal: 3,
	lightFocusRadius: 100
};

var HeartConsts = {
	delayToNextWaypoint: 1000.0, // milliseconds
	flightSpeed: 2.5 * PhysicsConsts.pixelsToUnit,
	attackDistance: 1.6 * PhysicsConsts.pixelsToUnit,
	pursuitVelocity: PhysicsConsts.pixelsToUnit * 0.02,
	playerDeathDistance: PhysicsConsts.pixelsToUnit * 0.2,
	minimumBeatDistance: PhysicsConsts.pixelsToUnit * 3.0,
	heartbeatAttenuation: 600.0
};

var JoystickConsts = {
    leftOffset: 28672,
    rightOffset: 36864
};

var TweensConsts = {
	fadeFillStyle: 'black',
	fadeInDuration: 200,
	fadeOutDuration: 200
};

var ScreensConsts = {
	fontSize: 60
};

var Utils = {
	bitmapFadeLayer: null,
	
	hideSprite: function (sprite) {
	    sprite.scale.x = 0.0;
	    sprite.scale.y = 0.0;
	},

	random: function (from, to) {
    	return Math.floor(Math.random() * (to - from + 1) + from);
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
	},
	
	getBitmapFadeLayer: function (game) {
		return game.add.bitmapData(game.width, game.height);
	},
	
	fadeInScreen: function (game, fillStyle, duration, callback) {
		if (!Utils.bitmapFadeLayer)
            Utils.bitmapFadeLayer = Utils.getBitmapFadeLayer(game);
		Utils.bitmapFadeLayer.context.fillStyle = fillStyle;
        Utils.bitmapFadeLayer.context.fillRect(0, 0, Utils.bitmapFadeLayer.width, Utils.bitmapFadeLayer.height);

        var image = game.add.image(0, 0, Utils.bitmapFadeLayer);
		image.alpha = 0.0;
		image.fixedToCamera = true;

		var fadeInTween = game.add.tween(image);
        fadeInTween.to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, 0);
        fadeInTween.onComplete.add(callback);
	},
	
	fadeOutScreen: function (game, fillStyle, duration, callback) {
        if (!Utils.bitmapFadeLayer)
            Utils.bitmapFadeLayer = Utils.getBitmapFadeLayer(game);
        Utils.bitmapFadeLayer.context.fillStyle = fillStyle;
        Utils.bitmapFadeLayer.context.fillRect(0, 0, Utils.bitmapFadeLayer.width, Utils.bitmapFadeLayer.height);

        var image = game.add.image(0, 0, Utils.bitmapFadeLayer);
		image.fixedToCamera = true;

        var fadeOutTween = game.add.tween(image);
        fadeOutTween.to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, 0);
        fadeOutTween.onComplete.add(function () {
			image.destroy();
			if (typeof(callback) === 'function')
                callback();
		});
    },
	
	clearArray: function(array){
		array.splice(0, array.length + 1);
	},
	
	advanceSpriteToPosition: function (sprite, position, velocity) {
        if (sprite.x > position.x) {
            sprite.x = Utils.clamp(sprite.x - velocity, position.x, sprite.x);
        } else {
            sprite.x = Utils.clamp(sprite.x + velocity, sprite.x, position.x);
        }
        if (sprite.y > position.y) {
            sprite.y = Utils.clamp(sprite.y - velocity, position.y, sprite.y);
        } else {
            sprite.y = Utils.clamp(sprite.y + velocity, sprite.y, position.y);
        }
    },
};
