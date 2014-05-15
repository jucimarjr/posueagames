BreakoutGame.GamePhysics = function (canvas, bricks, bigBrick, player, ball) {
	this.canvas = canvas;
	this.bricks = bricks;
	this.bigBrick = bigBrick;
	this.player = player;
	this.ball = ball;
	
	this.onPlayerLooseLife;
	this.onBallHitBrick;
}

BreakoutGame.GamePhysics.prototype = new GameFramework.GameObject() 

BreakoutGame.GamePhysics.prototype.update = function (time) {
	GameFramework.GameObject.prototype.update.apply(this, [time]);
	
	this.step(time);
}

BreakoutGame.GamePhysics.prototype.step = function (time) {
	// Handle ball physics.
	if (this.ball != null && this.player != null && this.bricks != null) {
		// Store ball bounding box before movement.
		var ballBoundingBox = this.ball.boundingBox();
		// Move the ball.
		this.handleBallMovement(time, ballBoundingBox);
	}
}
	
BreakoutGame.GamePhysics.prototype.handleBallMovement = function (time, ballBoundingBox) {
	// Check if the ball hit the canvas bounds.
	//
	// Calculate screen limits.
	var screenLeft = ballBoundingBox.width / 2;
	var screenRight = this.canvas.width - ballBoundingBox.width / 2;
	var screenTop = ballBoundingBox.height / 2;
	var screenBottom = this.canvas.height - ballBoundingBox.height / 2;

	// Check if it hit the sides of the screen.
	if (this.ball.transform.x < screenLeft || this.ball.transform.x > screenRight) {
		this.ball.velocity.x = -this.ball.velocity.x;
	}

	// Check if it hit the top of the screen.
	if (this.ball.transform.y < screenTop) {
		this.ball.velocity.y = -this.ball.velocity.y;
	}
	
	// Check if the ball hit the bottom of the screen and callback to the GameScene.
	if (this.ball.transform.y > screenBottom) {
		if (this.onPlayerLooseLife) {
			this.onPlayerLooseLife();
			this.ball = null;
			return;
		}
	}
	
	// Handle collision between ball and player
	var playerBoundingBox = this.player.boundingBox();
	if (this.intersects(ballBoundingBox, playerBoundingBox) && this.ball.velocity.y > 0) {
		this.ball.velocity.y = -this.ball.velocity.y;
	}
	
	// Handle collision bewteen ball and bricks
	var bricksNum = this.bricks.length;
	for (var i = 0; i < bricksNum; i++) {
		var brickBoundingBox = this.bricks[i].boundingBox();
		if (this.intersects(ballBoundingBox, brickBoundingBox)) {
			this.ball.velocity.y = -this.ball.velocity.y;
			
			if (this.onBallHitBrick) {
				this.onBallHitBrick(this.bricks[i]);
				GameFramework.removeObjectFromArray(this.bricks, this.bricks[i]);
			}
			
			break;
		}
	}

	// Update position based on velocity.
	this.ball.transform.x += this.ball.velocity.x * time.deltaTime;
	this.ball.transform.y += this.ball.velocity.y * time.deltaTime;
}

BreakoutGame.GamePhysics.prototype.intersects = function (rect1, rect2) {
	return (rect1.x <= rect2.x + rect2.width &&
            rect2.x <= rect1.x + rect1.width &&
            rect1.y <= rect2.y + rect2.height &&
            rect2.y <= rect1.y + rect1.height);
}
