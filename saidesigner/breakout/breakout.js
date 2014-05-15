/**
 * 
 * BreakoutGame Object
 * 
 */

function BreakoutGame(canvasElementId, fps) {

	var canvasElement = document.getElementById(canvasElementId);

	Board.call(this, canvasElement.getContext("2d"), 0, 0, canvasElement.width,
			canvasElement.height);

	this.keyLeftPressed = false;
	this.keyRightPressed = false;
	this.fps = fps;
}

BreakoutGame.prototype = new Board();
BreakoutGame.prototype.constructor = BreakoutGame;
BreakoutGame.prototype.balls = null;
BreakoutGame.prototype.player = null;
BreakoutGame.prototype.keyLeftPressed = false;
BreakoutGame.prototype.keyRightPressed = false;
BreakoutGame.prototype.fps = 0;

BreakoutGame.prototype.KEY_LEFT = 37;
BreakoutGame.prototype.KEY_RIGHT = 39;

BreakoutGame.prototype.initBars = function() {

	var BAR_Y_OFFSET = 30;
	var BAR_NCOL = 15;
	var BAR_NLIN = 6;
	var BAR_SPACE = 1;
	var BAR_WIDTH = (this.width - ((BAR_NCOL + 1) * BAR_SPACE || 1)) / BAR_NCOL;
	var BAR_HEIGHT = 35;
	var COLORS = [ "rgb(208, 58, 209)", "rgb(247, 83, 82)",
			"rgb(253, 128, 20)", "rgb(255, 144, 36)", "rgb(5, 179, 32)",
			"rgb(109, 101, 246)" ];

	var posX = this.x + BAR_SPACE;
	var posY = this.y + BAR_Y_OFFSET;
	var colorIndex = 0;

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
		bar.velocityPlus = BAR_NLIN - colorIndex;
		this.add(bar);

		posX += BAR_WIDTH + BAR_SPACE;
	}
};

BreakoutGame.prototype.initBall = function() {

	var BALL_NBALLS = 1;
	var BALL_RADIUS = 10;
	var BALL_X = (this.x + this.width) / 2;
	var BALL_Y = (this.y + this.height) / 2;

	this.balls = new Array();

	for (var i = 0; i < BALL_NBALLS; i++) {

		var ball = new Ball(BALL_X, BALL_Y, BALL_RADIUS);
		ball.color = "yellow";
		ball.velocity.x = Math.floor((Math.random() * 21) - 10);
		ball.velocity.y = Math.floor((Math.random() * 21) - 10);

		this.balls.push(ball);
		this.add(ball);
	}
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
	}, 1000 / this.fps);
};

BreakoutGame.prototype.loop = function() {
	this.animate();
	this.checkCollison();
	this.paint();
};

BreakoutGame.prototype.checkCollison = function() {

	for ( var j in this.balls) {

		if (this.balls[j].checkCollisionWithParent()) {
			// TODO: Perdeu vida
			//this.items.splice(this.items.indexOf(this.balls[j]), 1);
			//this.balls.splice(j, 1);
		}

		for ( var i in this.items) {

			if (this.items[i] instanceof Bar) {
				if (this.balls[j].checkCollision(this.items[i])) {
					this.balls[j].velocityPlus = this.items[i].velocityPlus;
					this.items.splice(i, 1);
					break;
				}
			} else {
				if (this.balls[j].checkCollision(this.items[i])) {
					break;
				}
			}
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
 * 
 * Bar Object
 * 
 */

function Bar(x, y, width, height) {

	Rectangle.call(this, x, y, width, height);

	this.velocityPlus = 0;
}

Bar.prototype = new Rectangle();
Bar.prototype.constructor = Bar;
Bar.prototype.velocityPlus = 0;

/**
 * Ball Object
 * 
 */

function Ball(x, y, radius) {
	Circle.call(this, x, y, radius);
	this.velocityPlus = 0;
}

Ball.prototype = new Circle();
Ball.prototype.constructor = Ball;
Ball.prototype.velocityPlus = 0;
Ball.prototype.top = 0;
Ball.prototype.bottom = 0;
Ball.prototype.left = 0;
Ball.prototype.right = 0;

Ball.prototype.animate = function() {

	this.x += this.velocity.x
			+ (this.velocity.x > 0 ? this.velocityPlus : -this.velocityPlus);
	this.y += this.velocity.y
			+ (this.velocity.y > 0 ? this.velocityPlus : -this.velocityPlus);

	this.top = this.y - this.radius;
	this.bottom = this.y + this.radius;
	this.left = this.x - this.radius;
	this.right = this.x + this.radius;
};

Ball.prototype.checkCollisionWithParent = function() {

	var result = false;

	if (this.velocity.x > 0) {
		if (this.right >= this.parent.x + this.parent.width) {
			this.velocity.x *= -1;
		}
	} else if (this.left <= this.parent.x) {
		this.velocity.x *= -1;
	}

	if (this.velocity.y > 0) {
		if (this.bottom >= this.parent.y + this.parent.height) {
			this.velocity.y *= -1;
			result = true;
		}
	} else if (this.top <= this.parent.y) {
		this.velocity.y *= -1;
	}

	return result;
};

Ball.prototype.almostEqual = function(dist1, dist2) {

	return (dist1 == dist2);

};

Ball.prototype.checkCollision = function(obj) {

	if (!(obj instanceof Drawable) || obj == this) {
		return false;
	}

	var topIsWithin = obj.coordIsWithin(this.x, this.top);
	var bottomIsWithin = obj.coordIsWithin(this.x, this.bottom);
	var leftIsWithin = obj.coordIsWithin(this.left, this.y);
	var rightIsWithin = obj.coordIsWithin(this.right, this.y);

	var auxVelocity = {
		x : this.velocity.x,
		y : this.velocity.y
	};

	if (this.velocity.x > 0) {
		if (this.velocity.y > 0) {
			if (bottomIsWithin || rightIsWithin) {

				var distLeft = this.right - obj.x;
				var distTop = this.bottom - obj.y;

				if (this.almostEqual(distTop, distLeft)) {
					this.velocity.x *= -1;
					this.velocity.y *= -1;
				} else if (distTop < distLeft) {
					this.velocity.y *= -1;
				} else {
					this.velocity.x *= -1;
				}
			}
		} else {
			if (topIsWithin || rightIsWithin) {

				var distLeft = this.right - obj.x;
				var distBottom = obj.y + obj.height - this.top;

				if (this.almostEqual(distBottom, distLeft)) {
					this.velocity.x *= -1;
					this.velocity.y *= -1;
				} else if (distBottom < distLeft) {
					this.velocity.y *= -1;
				} else {
					this.velocity.x *= -1;
				}
			}
		}
	} else {
		if (this.velocity.y > 0) {

			if (bottomIsWithin || leftIsWithin) {

				var distRight = obj.x + obj.width - this.left;
				var distTop = this.bottom - obj.y;

				if (this.almostEqual(distTop, distRight)) {
					this.velocity.x *= -1;
					this.velocity.y *= -1;
				} else if (distTop < distRight) {
					this.velocity.y *= -1;
				} else {
					this.velocity.x *= -1;
				}
			}

		} else {

			if (topIsWithin || leftIsWithin) {
				var distRight = obj.x + obj.width - this.left;
				var distBottom = obj.y + obj.height - this.top;

				if (this.almostEqual(distRight, distBottom)) {
					this.velocity.x *= -1;
					this.velocity.y *= -1;
				} else if (distBottom < distRight) {
					this.velocity.y *= -1;
				} else {
					this.velocity.x *= -1;
				}
			}
		}
	}

	return this.velocity.x != auxVelocity.x || this.velocity.y != auxVelocity.y;
};

/**
 * Player Object
 * 
 */

function Player(x, y, width, height) {

	Rectangle.call(this, x, y, width, height);

	this.velocityBkp = 0;
}

Player.prototype = new Rectangle();
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