BreakoutGame.Ball = function (player) {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedTextures["images/player_ball.png"]);
	
	this.player = player;
	
	this.velocity = {
		x: 0.0,
		y: 0.0,
		angular: 0.0
	};
	
	this._circleShape = {
		radius: 0.0,
		centerX: 0.0,
		centerY: 0.0
	};
	
	this.lastPos;
	this.opacity = 0.0;
	var self = this;
	this._startAnimation = new GameFramework.PropertyAnimation(this, "opacity", 0.0, 1.0, 250, GameFramework.Easing.Type.Linear);
	this._startAnimation.begin();
	
	document.addEventListener('keydown', function (e) {
		self.keyDown(e);
	}, false);
	
	this._started = false;
};

BreakoutGame.Ball.prototype = new GameFramework.Sprite();

BreakoutGame.Ball.prototype.keyDown = function (e) {
	if (this._started) {
		return;
	}
	
	if (e.keyCode == GameFramework.KeyCode.SpaceBar) {
		this._startGame();
		this._started = true;
	}
};

BreakoutGame.Ball.prototype.circleShape = function () {
	this._circleShape.radius = this.boundingBox().width / 2.0;
	this._circleShape.centerX = this.transform.x;
	this._circleShape.centerY = this.transform.y;
	
	return this._circleShape;
};

BreakoutGame.Ball.prototype.update = function (time) {
	GameFramework.Sprite.prototype.update.apply(this, [time]);
	
	if (!this._started) {
		this.transform.x = this.player.transform.x;
		this.transform.y = this.player.transform.y - 
						   this.player.boundingBox().height / 2.0 -
						   this.boundingBox().height / 2.0;
	} else {
		this.velocity.angular = this.velocity.x / 50.0;
		this.transform.angle += this.velocity.angular * time.deltaTime;
	}
	
	this._startAnimation.update(time);
};

BreakoutGame.Ball.prototype._startGame = function () {
	this.velocity.x = Math.random() * 0.15 - 0.075;
	this.velocity.y = -0.3;
};

BreakoutGame.Ball.prototype.render = function (time, context2D, debugDraw) {
	GameFramework.Sprite.prototype.render.apply(this, [time, context2D, false]);

	if (debugDraw) {
		context2D.fillStyle = this._debugDrawFillColor;
		context2D.strokeStyle = this._debugDrawStrokeColor;
		context2D.lineWidth = 3;
		
		context2D.beginPath();
		context2D.arc(this.transform.x, this.transform.y, this.circleShape().radius, 0, 2 * Math.PI);
		context2D.stroke();
	}
};

BreakoutGame.Ball.prototype.onGameOver = function () {
	GameFramework.Animation.play(new GameFramework.PropertyAnimation(this, "opacity", 1.0, 0.0, 1000, GameFramework.Easing.Type.Linear));
};

