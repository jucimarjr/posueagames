BreakoutGame.Player = function (canvas) {
    GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedTextures["images/player_racket_block.png"]);

    this.glow = GameFramework.SpriteFactory.spriteFromTexture("images/player_racket_glow.png");
	this.horizontalInput = 0;
	this.pressedKeys = { };
	this.velocity = 0.5;
	this.canvas = canvas;
};

BreakoutGame.Player.prototype = new GameFramework.Sprite();

BreakoutGame.Player.prototype.init = function () {
    GameFramework.Sprite.prototype.init.apply(this);
    this.glow.init();
	
	var self = this;
	document.addEventListener('keyup', function (e) {
		self.keyUp(e);
	}, false);
	
	document.addEventListener('keydown', function (e) {
		self.keyDown(e);
	}, false);
	
	this.resetInput();
};

BreakoutGame.Player.prototype.keyDown = function (e) {
	if (e.keyCode == GameFramework.KeyCode.LeftArrow) {
		this.pressedKeys[GameFramework.KeyCode.LeftArrow] = 1;
	}
	
	if (e.keyCode == GameFramework.KeyCode.RightArrow) {
		this.pressedKeys[GameFramework.KeyCode.RightArrow] = 1;
	}
}

BreakoutGame.Player.prototype.keyUp = function keyUp(e) {
	if (e.keyCode == GameFramework.KeyCode.LeftArrow) {
		this.pressedKeys[GameFramework.KeyCode.LeftArrow] = 0;
	}
	
	if (e.keyCode == GameFramework.KeyCode.RightArrow) {
		this.pressedKeys[GameFramework.KeyCode.RightArrow] = 0;
	}
}

BreakoutGame.Player.prototype.resetInput = function () {
	this.pressedKeys[GameFramework.KeyCode.LeftArrow] = 0;
	this.pressedKeys[GameFramework.KeyCode.RightArrow] = 0;
}

BreakoutGame.Player.prototype.update = function (time) {
    GameFramework.Sprite.prototype.update.apply(this, [time]);
	
    this.glow.transform = this.transform;
    this.glow.update(time);
	
	this.horizontalInput = this.pressedKeys[GameFramework.KeyCode.RightArrow] - this.pressedKeys[GameFramework.KeyCode.LeftArrow];
	
	this.transform.x += this.horizontalInput * this.velocity * time.deltaTime;
	
	var margin = 15;
	var minX = this.boundingBox().width / 2 + margin;
	var maxX = this.canvas.width - this.boundingBox().width / 2 - margin;
	
	this.transform.x = this.clamp(this.transform.x, minX, maxX);
};

BreakoutGame.Player.prototype.render = function (time, context2D, debugDraw) {
    this.glow.render(time, context2D, false);
    GameFramework.Sprite.prototype.render.apply(this, [time, context2D, debugDraw]);
};

BreakoutGame.Player.prototype.dispose = function () {
    GameFramework.Sprite.prototype.dispose();
    this.glow.dispose();
};

BreakoutGame.Player.prototype.clamp = function (x, min, max) {
	return x < min ? min : (x > max ? max : x);
}
