BreakoutGame.Ball = function () {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedTextures["images/player_ball.png"]);
	
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
};

BreakoutGame.Ball.prototype = new GameFramework.Sprite();

BreakoutGame.Ball.prototype.circleShape = function () {
	this._circleShape.radius = this.boundingBox().width / 2.0;
	this._circleShape.centerX = this.transform.x;
	this._circleShape.centerY = this.transform.y;
	
	return this._circleShape;
};

BreakoutGame.Ball.prototype.update = function (time) {
	GameFramework.Sprite.prototype.update.apply(this, [time]);
	
	this.velocity.angular = this.velocity.x / 50.0;
	this.transform.angle += this.velocity.angular * time.deltaTime;
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
