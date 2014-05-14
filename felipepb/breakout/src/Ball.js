BreakoutGame.Ball = function (canvas) {
	GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedTextures["images/player_ball.png"]);
	
	this.canvas = canvas;
	this.velocity = {
		x: 0.0,
		y: 0.0
	}
}

BreakoutGame.Ball.prototype = new GameFramework.Sprite();

BreakoutGame.Ball.prototype.update = function (time) {
	// Check if the ball hit the canvas bounds.
	//
	// Calculate screen limits.
	var screenLeft = this.boundingBox().width / 2;
	var screenRight = this.canvas.width - this.boundingBox().width / 2;
	var screenTop = this.boundingBox().height / 2;
	var screenBottom = this.canvas.height - this.boundingBox().height / 2;
	
	// Check if it hit the sides of the screen.
	if (this.transform.x < screenLeft || this.transform.x > screenRight) {
		this.velocity.x = -this.velocity.x;
	}
	
	// Check if it hit the top or the bottom of the screen.
	if (this.transform.y < screenTop || this.transform.y > screenBottom) {
		this.velocity.y = -this.velocity.y;
	}
	
	// Update position based on velocity.
	this.transform.x += this.velocity.x * time.deltaTime;
	this.transform.y += this.velocity.y * time.deltaTime;
	
	// Draw the sprite.
	GameFramework.Sprite.prototype.update.apply(this, [time]);
}
