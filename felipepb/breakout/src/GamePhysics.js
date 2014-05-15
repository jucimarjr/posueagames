BreakoutGame.GamePhysics = function (canvas, bricks, bigBrick, player, ball) {
	this.canvas = canvas;
	this.bricks = bricks;
	this.bigBrick = bigBrick;
	this.player = player;
	this.ball = ball;
	
	this.onPlayerLooseLife;
	this.onBallHitBrick;
	this.leftWall = {
		x: 0.0, y: 0.0,
		width: 1.0, height: this.canvas.height,
		top: 0.0, right: 1.0,
		bottom: this.canvas.height, left: 0.0
	};
	this.rightWall = {
		x: this.canvas.width - 1.0, y: 0.0,
		width: 1.0, height: this.canvas.height,
		top: 0.0, right: this.canvas.width,
		bottom: this.canvas.height, left: this.canvas.width - 1.0
	};
	this.topWall = {
		x: 1.0, y: 0.0,
		width: this.canvas.width - 2.0, height: 1.0,
		top: 0.0, right: this.canvas.width - 1.0,
		bottom: 1.0, left: 1.0
	};
};

BreakoutGame.GamePhysics.prototype = new GameFramework.GameObject();

BreakoutGame.GamePhysics.prototype.update = function (time) {
	GameFramework.GameObject.prototype.update.apply(this, [time]);
	
	this.step(time);
};

BreakoutGame.GamePhysics.prototype.step = function (time) {
	// Handle ball physics.
	if (this.ball != null && this.player != null && this.bricks != null) {
		// Store ball bounding box before movement.
		var ballBoundingBox = this.ball.boundingBox();
		var ballCircle = this.ball.circleShape();
		// Move the ball.
		this.handleBallMovement(time, ballBoundingBox, ballCircle);
	}
};
	
BreakoutGame.GamePhysics.prototype.handleBallMovement = function (time, ballBoundingBox, ballCircle) {
	// Check if the ball hit the canvas bounds.
	//
	// Calculate screen limits.
	var screenLeft = ballBoundingBox.width / 2.0;
	var screenRight = this.canvas.width - ballBoundingBox.width / 2.0;
	var screenTop = ballBoundingBox.height / 2.0;
	var screenBottom = this.canvas.height - ballBoundingBox.height / 2.0;

	// Check if it hit the sides or top of the screen.
	if (this.checkCollisionCircleAgainstRect(ballCircle, this.leftWall)) {
		this.calculateNewBallVelocity(this.leftWall);
	} else if (this.checkCollisionCircleAgainstRect(ballCircle, this.rightWall)) {
		this.calculateNewBallVelocity(this.rightWall);
	} else if (this.checkCollisionCircleAgainstRect(ballCircle, this.topWall)) {
		this.calculateNewBallVelocity(this.topWall);
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
	if (this.checkCollisionCircleAgainstRect(ballCircle, playerBoundingBox) && this.ball.velocity.y > 0) {
		this.calculateNewBallVelocity(playerBoundingBox);
		this.ball.velocity.x = (this.ball.transform.x - this.player.transform.x) / 100.0;
	}
	
	// Handle collision between ball and bricks
	var bricksNum = this.bricks.length;
	for (var i = 0; i < bricksNum; i++) {
		// console.log("Checking collision against " + this.bricks[i].innerWord);
		var brickBoundingBox = this.bricks[i].boundingBox();
		if (this.checkCollisionCircleAgainstRect(ballCircle, brickBoundingBox)) {
			this.calculateNewBallVelocity(brickBoundingBox);
			
			if (this.onBallHitBrick) {
				this.onBallHitBrick(this.bricks[i]);
			}
			
			break;
		}
	}
	
	// Handle collision between ball and the big brick
	if (this.checkCollisionCircleAgainstRect(ballCircle, this.bigBrick.boundingBox())) {
		this.calculateNewBallVelocity(this.bigBrick.boundingBox());

		if (!this.bigBrick.active() && this.bricks.length == 0) {
			this.bigBrick.active(true);
		} else if (this.bigBrick.active()) {
			this.bigBrick.onHit();
			this.checkCollisionCircleAgainstRect(ballCircle, this.bigBrick.boundingBox());
		}
	}

	// Update position based on velocity.
	this.ball.lastPos = {
		x: this.ball.transform.x,
		y: this.ball.transform.y
	};
	this.ball.transform.x += this.ball.velocity.x * time.deltaTime;
	this.ball.transform.y += this.ball.velocity.y * time.deltaTime;
};

BreakoutGame.GamePhysics.prototype.intersects = function (rect1, rect2) {
	return (rect1.x <= rect2.x + rect2.width &&
            rect2.x <= rect1.x + rect1.width &&
            rect1.y <= rect2.y + rect2.height &&
            rect2.y <= rect1.y + rect1.height);
};

BreakoutGame.GamePhysics.prototype.checkCollisionCircleAgainstRect = function (circle, rect) {
	var halfWidth = rect.width / 2.0;
	var halfHeight = rect.height / 2.0;
	var rectCenter = {
		x: rect.x + halfWidth,
		y: rect.y + halfHeight
	};
	
	var dx = Math.abs(circle.centerX - rectCenter.x);
	var dy = Math.abs(circle.centerY - rectCenter.y);
	
	if (dx > (circle.radius + halfWidth) || dy > (circle.radius + halfHeight))
		return false;
		
	var circleDistance = {
		x: Math.abs(circle.centerX - rect.x - halfWidth),
		y: Math.abs(circle.centerY - rect.y - halfHeight)
	};
	
	if (circleDistance.x <= halfWidth)
		return true;
		
	if (circleDistance.y <= halfHeight)
		return true;
		
	var cornerDistanceSqrd = Math.pow(circleDistance.x - halfWidth, 2) 
							 + Math.pow(circleDistance.y - halfHeight, 2);
							 
	return (cornerDistanceSqrd <= (Math.pow(circle.radius, 2)));
};

BreakoutGame.GamePhysics.prototype.calculateNewBallVelocity = function (boundingBox) {
	var ballVelocity = this.ball.velocity;
	var ballBoundingBox = this.ball.boundingBox();
	var offsetBallBoundingBox = {
		x: ballBoundingBox.x, y: ballBoundingBox.y,
		width: ballBoundingBox.width, height: ballBoundingBox.height,
		top: ballBoundingBox.top, right: ballBoundingBox.right,
		bottom: ballBoundingBox.bottom, left: ballBoundingBox.left
	}; 
	
	offsetBallBoundingBox.x += Math.ceil(this.ball.lastPos.x - this.ball.transform.x);
	offsetBallBoundingBox.y += Math.ceil(this.ball.lastPos.y - this.ball.transform.y);
	
	var offsetY = offsetBallBoundingBox.y < ballBoundingBox.y 
				  ? boundingBox.top - ballBoundingBox.bottom 
				  : boundingBox.bottom - ballBoundingBox.top;
    var offsetX = offsetBallBoundingBox.x < ballBoundingBox.x
			      ? boundingBox.left - ballBoundingBox.right
				  : boundingBox.right - ballBoundingBox.left;
				  
    var horizontal;
	
	if (ballVelocity.x == 0 || ballVelocity.y == 0) {
		horizontal = Math.abs(offsetX) < Math.abs(offsetY);
	} else {
		var tx = Math.abs((ballBoundingBox.x + offsetX - offsetBallBoundingBox.x) / ballVelocity.x);
		var ty = Math.abs((ballBoundingBox.y + offsetY - offsetBallBoundingBox.y) / ballVelocity.y);
		
		horizontal = tx < ty;
	}
	
	if (horizontal) {
		this.ball.transform.x += offsetX;
		ballVelocity.x = -ballVelocity.x;
	} else {
		this.ball.transform.y += offsetY;
		ballVelocity.y = -ballVelocity.y;
	}
};
