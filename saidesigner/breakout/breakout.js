/**
 * 
 * BreakoutGame Object
 * 
 */

function BreakoutGame(canvasElementId) {

	var canvasElement = document.getElementById(canvasElementId);

	Board.call(this, canvasElement.getContext("2d"), 0, 0, canvasElement.width,
			canvasElement.height);

	this.keyLeftPressed = false;
	this.keyRightPressed = false;
}

BreakoutGame.prototype = new Board();
BreakoutGame.prototype.constructor = BreakoutGame;
BreakoutGame.prototype.bars = null;
BreakoutGame.prototype.ball = null;
BreakoutGame.prototype.player = null;
BreakoutGame.prototype.keyLeftPressed = false;
BreakoutGame.prototype.keyRightPressed = false;

BreakoutGame.prototype.KEY_LEFT = 37;
BreakoutGame.prototype.KEY_RIGHT = 39;

BreakoutGame.prototype.initBars = function() {

	var BAR_Y_OFFSET = 120;
	var BAR_NCOL = 30;
	var BAR_NLIN = 6;
	var BAR_SPACE = 0;
	var BAR_WIDTH = (this.width - ((BAR_NCOL + 1) * BAR_SPACE || 1)) / BAR_NCOL;
	var BAR_HEIGHT = 25;
	var COLORS = [ "rgb(208, 58, 209)", "rgb(247, 83, 82)",
			"rgb(253, 128, 20)", "rgb(255, 144, 36)", "rgb(5, 179, 32)",
			"rgb(109, 101, 246)" ];

	var posX = this.x + BAR_SPACE;
	var posY = this.y + BAR_Y_OFFSET;
	var colorIndex = 0;

	this.bars = new Array();

	for (var i = 0; i < BAR_NCOL * BAR_NLIN; i++) {

		if (posX + BAR_WIDTH >= this.width) {
			posX = this.x + BAR_SPACE;
			posY += BAR_HEIGHT + BAR_SPACE;
			colorIndex++;
			if (colorIndex == COLORS.length) {
				colorIndex = 0;
			}
		}

		var bar = new Bar(posX, posY, BAR_WIDTH + 1, BAR_HEIGHT);
		bar.color = COLORS[colorIndex];
		this.add(bar);

		posX += BAR_WIDTH + BAR_SPACE;
	}
};

BreakoutGame.prototype.initBall = function() {

	var BALL_RADIUS = 8;
	var BALL_X = (this.x + this.width) / 2;
	var BALL_Y = (this.y + this.height) / 2;

	this.ball = new Ball(BALL_X, BALL_Y, BALL_RADIUS);
	this.ball.color = "yellow";
	this.ball.velocity.x = Math.floor((Math.random() * 21) - 10);
	this.ball.velocity.y = Math.floor((Math.random() * 21) - 10);
	this.add(this.ball);
};

BreakoutGame.prototype.initPlayer = function() {

	var PLAYER_WIDTH = 120;
	var PLAYER_HEIGHT = 15;
	var PLAYER_X = (this.x + this.width - PLAYER_WIDTH) / 2;
	var PLAYER_Y = this.y + this.height - PLAYER_HEIGHT - 5;

	this.player = new Player(PLAYER_X, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
	this.player.color = "white";
	this.player.velocity.x = 10;
	this.player.velocity.a = 5;
	this.add(this.player);
};

BreakoutGame.prototype.init = function() {

	this.initBars();
	this.initBall();
	this.initPlayer();

	var self = this;

	document.addEventListener("keyup", function(event) {
		self.keyUp(event);
	}, false);

	document.addEventListener("keydown", function(event) {
		self.keyDown(event);
	}, false);
};

BreakoutGame.prototype.start = function() {
	var self = this;

	setInterval(function() {
		self.loop();
	}, 30);
};

BreakoutGame.prototype.loop = function() {
	this.checkCollison();
	this.animate();
	this.paint();
};

BreakoutGame.prototype.checkCollison = function() {

	this.ball.checkCollisionWithParent();

	for ( var i in this.items) {
		if (this.ball.checkCollision(this.items[i])) {
			if (this.items[i] != this.player) {
				this.items.splice(i, 1);
			}
			break;
		}
	}
};

BreakoutGame.prototype.keyDown = function(event) {

	if (event.keyCode == BreakoutGame.prototype.KEY_LEFT) {

		if (this.keyRightPressed) {
			this.player.resetVelocity();
		}

		this.keyLeftPressed = true;
		this.player.turnLeft();

	} else if (event.keyCode == BreakoutGame.prototype.KEY_RIGHT) {

		if (this.keyLeftPressed) {
			this.player.resetVelocity();
		}

		this.keyRightPressed = true;
		this.player.turnRight();
	}
};

BreakoutGame.prototype.keyUp = function(event) {

	if (event.keyCode == BreakoutGame.prototype.KEY_LEFT) {

		this.keyLeftPressed = false;

		this.player.resetVelocity();

		if (this.keyRightPressed) {
			this.player.turnRight();
		}

	} else if (event.keyCode == BreakoutGame.prototype.KEY_RIGHT) {

		this.keyRightPressed = false;

		this.player.resetVelocity();

		if (this.keyLeftPressed) {
			this.player.turnLeft();
		}
	}
};

/**
 * Ball Object
 * 
 */

function Ball(x, y, radius) {
	Circle.call(this, x, y, radius);
}

Ball.prototype = new Circle();
Ball.prototype.constructor = Ball;

Ball.prototype.checkCollisionWithParent = function() {

	if (this.x - this.radius <= this.parent.x
			|| this.x + this.radius >= this.parent.x + this.parent.width) {
		this.velocity.x *= -1;
	}

	if (this.y - this.radius <= this.parent.y) {
		this.velocity.y *= -1;
	}

	if (this.y + this.radius >= this.parent.y + this.parent.height) {
		this.velocity.y *= -1;
	}
};

Ball.prototype.checkCollision = function(drawable) {

	if (!(drawable instanceof Drawable) || drawable == this) {
		return false;
	}

	var result = false;

	if (this.y >= drawable.y && this.y <= drawable.y + drawable.height) {
		if (this.velocity.x > 0) {
			if (this.x + this.radius >= drawable.x
					&& this.x + this.radius <= drawable.x + drawable.width) {
				this.velocity.x *= -1;
				result = true;
			}
		} else if (this.x - this.radius >= drawable.x
				&& this.x - this.radius <= drawable.x + drawable.width) {
			this.velocity.x *= -1;
			result = true;
		}
	}

	if (this.x >= drawable.x && this.x <= drawable.x + drawable.width) {
		if (this.velocity.y > 0) {
			if (this.y + this.radius >= drawable.y
					&& this.y + this.radius <= drawable.y + drawable.height) {
				this.velocity.y *= -1;
				result = true;
			}
		} else if (this.y - this.radius >= drawable.y
				&& this.y - this.radius <= drawable.y + drawable.height) {
			this.velocity.y *= -1;
			result = true;
		}
	}

	return result;
};
/*
 * Player Object
 * 
 */
function Player(x, y, width, height) {

	Bar.call(this, x, y, width, height);

	this.velocityBkp = 0;
}

Player.prototype = new Bar();
Player.prototype.constructor = Player;
Player.prototype.velocityBkp = 0;

Player.prototype.animate = function() {

	if (!this.parent.keyLeftPressed && !this.parent.keyRightPressed)
		return;

	var posX = this.x + this.velocity.x;
	if (posX >= this.parent.x && posX <= this.parent.width - this.width) {
		this.x = posX;
	} else if (this.velocity.x < 0) {
		this.x = this.parent.x;
	} else {
		this.x = this.parent.width - this.width;
	}
};

Player.prototype.turnLeft = function() {

	if (this.velocityBkp == 0) {
		this.velocityBkp = this.velocity.x;
	}

	this.velocity.x = (Math.abs(this.velocity.x) + this.velocity.a) * -1;
};

Player.prototype.turnRight = function() {

	if (this.velocityBkp == 0) {
		this.velocityBkp = this.velocity.x;
	}

	this.velocity.x = Math.abs(this.velocity.x) + this.velocity.a;
};

Player.prototype.resetVelocity = function() {
	this.velocity.x = this.velocityBkp;
	this.velocityBkp = 0;
};