BreakoutGame.Player = function (canvas) {
    GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedTextures["images/player_racket_block.png"]);

    this.glow = GameFramework.SpriteFactory.spriteFromTexture("images/player_racket_glow.png");
	this.horizontalInput = 0;
	this.pressedKeys = { };
	this.velocity = 0.5;
	this.canvas = canvas;
	this.dead = false;
	
	this._glowAnimation = new GameFramework.SequentialAnimation();
	this._glowAnimation.add(new GameFramework.PropertyAnimation(this.glow,
                            									'opacity',
                                                                0.0,
                                                                1.0,
                                                                250,
                                                                GameFramework.Easing.Type.OutQuart));
	this._glowAnimation.add(new GameFramework.PropertyAnimation(this.glow,
                            									'opacity',
                                                                0.0,
                                                                1.0,
                                                                250,
                                                                GameFramework.Easing.Type.OutQuart));
	this._glowAnimation.add(new GameFramework.PropertyAnimation(this.glow,
                            									'opacity',
                                                                1.0,
                                                                0.0,
                                                                500,
                                                                GameFramework.Easing.Type.OutQuart));
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
	if (this.dead)
		return;
	
	if (e.keyCode == GameFramework.KeyCode.LeftArrow) {
		this.pressedKeys[GameFramework.KeyCode.LeftArrow] = 1;
	}
	
	if (e.keyCode == GameFramework.KeyCode.RightArrow) {
		this.pressedKeys[GameFramework.KeyCode.RightArrow] = 1;
	}
};

BreakoutGame.Player.prototype.keyUp = function keyUp(e) {
	if (this.dead)
		return;
	
	if (e.keyCode == GameFramework.KeyCode.LeftArrow) {
		this.pressedKeys[GameFramework.KeyCode.LeftArrow] = 0;
	}
	
	if (e.keyCode == GameFramework.KeyCode.RightArrow) {
		this.pressedKeys[GameFramework.KeyCode.RightArrow] = 0;
	}
};

BreakoutGame.Player.prototype.resetInput = function () {
	this.pressedKeys[GameFramework.KeyCode.LeftArrow] = 0;
	this.pressedKeys[GameFramework.KeyCode.RightArrow] = 0;
};

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
	
	if (!this.dead) {
		this._glowAnimation.update(time);
	}
};

BreakoutGame.Player.prototype.render = function (time, context2D, debugDraw) {
    this.glow.render(time, context2D, false);
    GameFramework.Sprite.prototype.render.apply(this, [time, context2D, debugDraw]);
};

BreakoutGame.Player.prototype.dispose = function () {
    GameFramework.Sprite.prototype.dispose.apply(this);
    this.glow.dispose();
};

BreakoutGame.Player.prototype.onGameWin = function () {
	this.dead = true;
	this.resetInput();
	GameFramework.Animation.play(new GameFramework.PropertyAnimation(this, "x", this.transform.x, this.canvas.width / 2, 1000, GameFramework.Easing.Type.OutQuart));
	GameFramework.Animation.play(new GameFramework.PropertyAnimation(this.glow, "opacity", 1.0, 0.0, 1000, GameFramework.Easing.Type.Linear));
	GameFramework.Animation.play(new GameFramework.PropertyAnimation(this, "opacity", 1.0, 0.0, 4000, GameFramework.Easing.Type.Linear));
};

BreakoutGame.Player.prototype.onGameOver = function () {
	this.dead = true;
	this.resetInput();
	GameFramework.Animation.play(new GameFramework.PropertyAnimation(this, "x", this.transform.x, this.canvas.width / 2, 1000, GameFramework.Easing.Type.OutQuart));
};

BreakoutGame.Player.prototype.clamp = function (x, min, max) {
	return x < min ? min : (x > max ? max : x);
};

BreakoutGame.Player.prototype.slowDownGlowAnimation = function () {
	this._glowAnimation.animationAt(0).duration = 250;
	this._glowAnimation.animationAt(1).duration = 250;
	this._glowAnimation.animationAt(2).duration = 1500;
};

BreakoutGame.Player.prototype.playGlowAnimation = function () {
    this._glowAnimation.begin();
};

