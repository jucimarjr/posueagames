/**
 * 
 * BreakoutGame Object
 * 
 */

function BreakoutGame(canvasElementId, fps) {

	var canvasElement = document.getElementById(canvasElementId);

	Board.call(this, canvasElement.getContext("2d"), 0, 0, canvasElement.width,
			canvasElement.height);

	this.balls;
	this.player;
	this.keyLeftPressed = false;
	this.keyRightPressed = false;
	this.fps = fps;
	this.lastUpdate;
}

BreakoutGame.prototype = new Board();
BreakoutGame.prototype.constructor = BreakoutGame;

Key = {
	LEFT: 37,
	RIGHT: 39
};

BreakoutGame.prototype.initBars = function() {

	var BAR_Y_OFFSET = 100;
	var BAR_NCOL = 15;
	var BAR_NLIN = 6;
	var BAR_SPACE = 0;
	var BAR_WIDTH = (this.width - ((BAR_NCOL + 1) * BAR_SPACE || 1)) / BAR_NCOL;
	var BAR_HEIGHT = 25;
	var VELOCITY_INC = 50;
	var COLORS = [ "rgb(208, 58, 209)", "rgb(247, 83, 82)",
			"rgb(253, 128, 20)", "rgb(255, 144, 36)", "rgb(5, 179, 32)",
			"rgb(109, 101, 246)" ];

	var posX = this.x + BAR_SPACE;
	var posY = this.y + BAR_Y_OFFSET;
	var colorIndex = 0;	
	var velocityPlus = BAR_NLIN * VELOCITY_INC;

	for (var i = 0; i < BAR_NCOL * BAR_NLIN; i++) {

		if (posX + BAR_WIDTH >= this.width) {
			
			posX = this.x + BAR_SPACE;
			posY += BAR_HEIGHT + BAR_SPACE;
			
			velocityPlus -= VELOCITY_INC;
			
			colorIndex++;
			if (colorIndex == COLORS.length) {
				colorIndex = 0;
			}
			
		}

		var bar = new Bar(posX, posY, BAR_WIDTH + 1, BAR_HEIGHT);
		bar.color = COLORS[colorIndex];
		bar.velocityPlus = velocityPlus;
		
		
		this.add(bar);

		posX += BAR_WIDTH + BAR_SPACE;
	}
};

BreakoutGame.prototype.initBalls = function() {

	var BALL_NBALLS = 1;
	var BALL_RADIUS = 8;
	var BALL_X = (this.x + this.width) / 2;
	var BALL_Y = (this.y + this.height) / 2;
	var COLORS = [ "rgb(208, 58, 209)", "rgb(247, 83, 82)",
			"rgb(253, 128, 20)", "rgb(255, 144, 36)", "rgb(5, 179, 32)",
			"rgb(109, 101, 246)" ];

	var colorIndex = 0;
	this.balls = new Array();

	for (var i = 0; i < BALL_NBALLS; i++) {

		var speed = Math.floor((Math.random() * 200) + 200);
		var degree = Math.floor((Math.random() * 180) + 180);

		var ball = new Ball(BALL_X, BALL_Y, BALL_RADIUS);
		ball.color = COLORS[colorIndex];
		ball.setSpeed(speed, degree);		

		colorIndex++;
		if (colorIndex == COLORS.length) {
			colorIndex = 0;
		}

		this.balls.push(ball);
		this.add(ball);
	}
};

BreakoutGame.prototype.initPlayer = function() {

	var PLAYER_WIDTH = 140;
	var PLAYER_HEIGHT = 20;
	var PLAYER_X = (this.x + this.width - PLAYER_WIDTH) / 2;
	var PLAYER_Y = this.y + this.height - PLAYER_HEIGHT - 15;

	this.player = new Player(PLAYER_X, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
	this.player.color = "white";
	this.player.velocity.x = 500;
	this.player.velocity.a = 50;
	this.add(this.player);
};

BreakoutGame.prototype.init = function() {

	this.initBars();
	this.initBalls();
	this.initPlayer();

	var self = this;

	document.addEventListener("keyup", function(event) {
		self.keyUp(event);
	}, false);

	document.addEventListener("keydown", function(event) {
		self.keyDown(event);
	}, false);	
};

BreakoutGame.prototype.playSound = function(soundFile) {
	var audio = new Audio("assets/" + soundFile);	
	audio.play();	
}

BreakoutGame.prototype.start = function() {
	var self = this;

	this.lastUpdate = new Date().getTime();
	
	setInterval(function() {
		self.loop();
	}, 1000 / this.fps);
};

BreakoutGame.prototype.loop = function() {

	var t = new Date().getTime();
	var delta = t - this.lastUpdate;

	this.animate(delta);
	this.checkCollision();
	this.paint();

	this.lastUpdate = new Date().getTime();
};

BreakoutGame.prototype.treatCollision = function(collision) {

	this.playSound("ball_kick.wav");

	if (collision.what instanceof BreakoutGame) {

		if (collision.is(CollisionType.BOTTOM)) {
			//alert('Perdeu!!!');
		}

	} else if (collision.what instanceof Bar) {

		collision.who.velocityPlus = collision.what.velocityPlus;
		this.del(collision.what);		

	} else if (collision.what instanceof Player) {

		if (collision.is(CollisionType.TOP) || collision.is(CollisionType.LEFT) || collision.is(CollisionType.RIGHT)) {

			var value = collision.location.left >= 0 ? collision.location.left : collision.location.right;
			var speed = collision.who.velocity.speed;

			if (collision.location.left >= 0 && collision.location.left <= 60) {
				collision.who.setSpeed(speed, 190 + value);
			} else if (collision.location.right >= 0 && collision.location.right <= 60) {				
				collision.who.setSpeed(speed, 350 - value);
			}
		}
	}
};

BreakoutGame.prototype.checkCollision = function() {

	for ( var j in this.balls) {

		if (this.balls[j].checkCollision(this, BreakoutGame.prototype.treatCollision.bind(this))) {
			continue;
		}

		for ( var i in this.items) {
			if (this.balls[j].checkCollision(this.items[i], BreakoutGame.prototype.treatCollision.bind(this))) {
				break;
			}
		} 	
	}
};

BreakoutGame.prototype.keyDown = function(event) {

	if (event.keyCode == Key.LEFT) {

		if (this.keyRightPressed) {
			this.player.resetVelocity();
		}

		this.keyLeftPressed = true;
		this.player.turnLeft();

	} else if (event.keyCode == Key.RIGHT) {

		if (this.keyLeftPressed) {
			this.player.resetVelocity();
		}

		this.keyRightPressed = true;
		this.player.turnRight();
	}
};

BreakoutGame.prototype.keyUp = function(event) {

	if (event.keyCode == Key.LEFT) {

		this.keyLeftPressed = false;

		this.player.resetVelocity();

		if (this.keyRightPressed) {
			this.player.turnRight();
		}

	} else if (event.keyCode == Key.RIGHT) {

		this.keyRightPressed = false;

		this.player.resetVelocity();

		if (this.keyLeftPressed) {
			this.player.turnLeft();
		}
	}
};


/**
 *
 * Collision Info Object
 *
 */

CollisionType = {
	UNKNOWN: 0,
	TOP: 2,
	LEFT: 4,
	RIGHT: 8,
	BOTTOM: 16
};

function Collision(who, what) {

 	this.who = who;
 	this.what = what;

 	this.type = CollisionType.UNKNOWN;

 	this.location = {
 		left: -1,
 		top: -1,
 		right: -1,
 		bottom: -1
 	};
}

Collision.prototype.is = function(collisionType) {
	return (this.type & collisionType) == collisionType;
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

/**
 * Ball Object
 * 
 */

function Ball(x, y, radius) {

	Circle.call(this, x, y, radius);

	this.velocityPlus = 0;
	this.top = 0;
	this.bottom = 0;
	this.left = 0;
	this.right = 0;
}

Ball.prototype = new Circle();
Ball.prototype.constructor = Ball;

Ball.prototype.animate = function(delta) {

	this.x += this.calcSpeed(delta, this.velocity.x
			+ (this.velocity.x > 0 ? this.velocityPlus : -this.velocityPlus));
	
	this.y += this.calcSpeed(delta, this.velocity.y
			+ (this.velocity.y > 0 ? this.velocityPlus : -this.velocityPlus));

	this.top = this.y - this.radius;
	this.bottom = this.y + this.radius;
	this.left = this.x - this.radius;
	this.right = this.x + this.radius;
};

Ball.prototype.almostEqual = function(dist1, dist2) {

	return (dist1 == dist2);

};

Ball.prototype.checkCollision = function(obj, callback) {

	if (!(obj instanceof Drawable) || obj == this) {
		return;
	}

	var collision = new Collision(this, obj);

	if (obj == this.parent) {
		if (this.velocity.x > 0) {
			if (this.right >= this.parent.x + this.parent.width) {			
				collision.type = CollisionType.RIGHT;
			}
		} else if (this.left <= this.parent.x) {		
			collision.type = CollisionType.LEFT;
		}

		if (this.velocity.y > 0) {
			if (this.bottom >= this.parent.y + this.parent.height) {			
				collision.type = CollisionType.BOTTOM;
			}
		} else if (this.top <= this.parent.y) {		
			collision.type = CollisionType.TOP;
		}
	} else {

		var topIsWithin = obj.coordIsWithin(this.x, this.top);
		var bottomIsWithin = obj.coordIsWithin(this.x, this.bottom);
		var leftIsWithin = obj.coordIsWithin(this.left, this.y);
		var rightIsWithin = obj.coordIsWithin(this.right, this.y);

		if (this.velocity.x > 0) {
			if (this.velocity.y > 0) {
				if (bottomIsWithin || rightIsWithin) {

					collision.location.left = this.right - obj.x;
					collision.location.top = this.bottom - obj.y;

					if (this.almostEqual(collision.location.top, collision.location.left)) {
						collision.type = CollisionType.LEFT | CollisionType.TOP;						
					} else if (collision.location.top < collision.location.left) {
						collision.type = CollisionType.TOP;						
					} else {
						collision.type = CollisionType.LEFT;
					}
				}
			} else {
				if (topIsWithin || rightIsWithin) {

					collision.location.left = this.right - obj.x;
					collision.location.bottom = obj.y + obj.height - this.top;

					if (this.almostEqual(collision.location.bottom, collision.location.left)) {
						collision.type = CollisionType.LEFT | CollisionType.BOTTOM;
					} else if (collision.location.bottom < collision.location.left) {
						collision.type = CollisionType.BOTTOM;
					} else {
						collision.type = CollisionType.LEFT;
					}
				}
			}
		} else {
			if (this.velocity.y > 0) {

				if (bottomIsWithin || leftIsWithin) {

					collision.location.right = obj.x + obj.width - this.left;
					collision.location.top = this.bottom - obj.y;

					if (this.almostEqual(collision.location.top, collision.location.right)) {
						collision.type = CollisionType.RIGHT | CollisionType.TOP;		
					} else if (collision.location.top < collision.location.right) {
						collision.type = CollisionType.TOP;
					} else {
						collision.type = CollisionType.RIGHT;
					}
				}

			} else {

				if (topIsWithin || leftIsWithin) {

					collision.location.right = obj.x + obj.width - this.left;
					collision.location.bottom = obj.y + obj.height - this.top;

					if (this.almostEqual(collision.location.right, collision.location.bottom)) {
						collision.type = CollisionType.RIGHT | CollisionType.BOTTOM;
					} else if (collision.location.bottom < collision.location.right) {
						collision.type = CollisionType.BOTTOM;
					} else {
						collision.type = CollisionType.RIGHT;
					}
				}
			}
		}
	}

	if (collision.type != CollisionType.UNKNOWN) {

		if (collision.is(CollisionType.LEFT) || collision.is(CollisionType.RIGHT)) {
			this.velocity.x *= -1;
		}

		if (collision.is(CollisionType.TOP) || collision.is(CollisionType.BOTTOM)) {
			this.velocity.y *= -1;
		}

		callback(collision);

		return true;
	}

	return false;
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

Player.prototype.animate = function(delta) {

	if (!this.parent.keyLeftPressed && !this.parent.keyRightPressed)
		return;

	var posX = this.x + this.calcSpeed(delta, this.velocity.x);
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