/**
 * 
 * BreakoutGame Class
 * 
 */

function BreakoutGame(canvasElementId, fps) {

	var canvasElement = document.getElementById(canvasElementId);

	Board.call(this, canvasElement.getContext("2d"), 0, 0, canvasElement.width,
			canvasElement.height);

	this.fps = fps;
	this.balls = new Array(); ;
	this.ball;
	this.player;
	this.scoreText;
	this.score;
	this.lifesText;
	this.lifes;
	this.nitroText;
	this.nitro;
	this.lastUpdate;
	this.keyLeftPressed;
	this.keyRightPressed;
	this.playGameStart;
	this.delayNewBar;
	this.barColorIndex;
	this.barVelocityPlus;
	this.barScore;
	this.interval;
	this.color = "rgba(100, 100, 100, 0.0)";
}

BreakoutGame.prototype = new Board();
BreakoutGame.prototype.constructor = BreakoutGame;

// Game Settings

Key = {
	LEFT: 37,
	RIGHT: 39,
	SPACE: 32
};

BAR_DELAY = 15000;
BAR_Y_OFFSET = 100;
BAR_NCOL = 15;
BAR_NLIN = 6;
BAR_SPACE = 0;
BAR_HEIGHT = 25;
BAR_VELOCITY_INC = 50;

PLAYER_WIDTH = 140;
PLAYER_HEIGHT = 20; 
PLAYER_VELOCITY = 500;
PLAYER_ACCELERATION = 50; 

BALL_NBALLS = 15;
BALL_RADIUS = 10; 
BALL_DELAY = 1000;      

N_LIVES = 5;
N_NITROS = 3;  

//COLORS = [ "rgb(208, 58, 209)", "rgb(247, 83, 82)", "rgb(253, 128, 20)", 
//          "rgb(255, 144, 36)", "rgb(5, 179, 32)", "rgb(109, 101, 246)" ];

COLORS = [ "rgba(13, 131, 34, 1)", "rgba(210, 178, 33, 1)", "rgba(1, 104, 171, 1)", "rgba(255, 255, 255, 0.8)"];


BreakoutGame.prototype.createBars = function(newLine) {

	var BAR_WIDTH = (this.width - ((BAR_NCOL + 1) * BAR_SPACE || 1)) / BAR_NCOL;	

	var posX = this.x + BAR_SPACE;
	var posY = this.y + BAR_Y_OFFSET;	

	if (newLine) {

		for (var i in this.items) {
			if (this.items[i] instanceof Bar) {
				this.items[i].y += BAR_HEIGHT + BAR_SPACE;
			}
		}

		this.barVelocityPlus += BAR_VELOCITY_INC;
		if (this.barVelocityPlus > BAR_NLIN * BAR_VELOCITY_INC) {
			this.barVelocityPlus = BAR_VELOCITY_INC;
		}
		
		this.barColorIndex--;
		if (this.barColorIndex < 0) {
			this.barColorIndex = COLORS.length - 1;
		}

		this.barScore++;
		if (this.barScore > BAR_NLIN) {
			this.barScore = 1;	
		}				

		for (var i = 0; i < BAR_NCOL; i++) {
			var bar = new Bar(posX, posY, BAR_WIDTH + 1, BAR_HEIGHT);
			bar.color = COLORS[this.barColorIndex];
			bar.velocityPlus = this.barVelocityPlus;
			bar.score = this.barScore;

			this.add(bar);

			posX += BAR_WIDTH + BAR_SPACE;
		}

	} else {

		for (var i = 0; i < BAR_NCOL * BAR_NLIN; i++) {

			if (posX + BAR_WIDTH >= this.width) {
				
				posX = this.x + BAR_SPACE;
				posY += BAR_HEIGHT + BAR_SPACE;
				
				this.barVelocityPlus -= BAR_VELOCITY_INC;
				if (this.barVelocityPlus <= 0) {
					this.barVelocityPlus = BAR_NLIN * BAR_VELOCITY_INC;
				}
				
				this.barColorIndex++;
				if (this.barColorIndex >= COLORS.length) {
					this.barColorIndex = 0;
				}

				this.barScore--;
				if (this.barScore <= 0) {
					this.barScore = BAR_NLIN;	
				}
			}

			var bar = new Bar(posX, posY, BAR_WIDTH + 1, BAR_HEIGHT);
			bar.color = COLORS[this.barColorIndex];
			bar.velocityPlus = this.barVelocityPlus;
			bar.score = this.barScore;			
			
			this.add(bar);

			posX += BAR_WIDTH + BAR_SPACE;
		}

		this.barColorIndex = COLORS.length;	
		this.barVelocityPlus = 0;
		this.barScore = 0;
	}
};

BreakoutGame.prototype.createBall = function() {
	
	var BALL_X = this.player.x + this.player.width / 2;
	var BALL_Y = this.player.y - BALL_RADIUS;
	
	var speed = Math.floor((Math.random() * 100) + 300);
	var degree = Math.floor((Math.random() * 80) + 220);

	this.ball = new Ball(BALL_X, BALL_Y, BALL_RADIUS);
	this.ball.color = "white";
	this.ball.setSpeed(speed, degree);
	this.ball.delay = BALL_DELAY;
	
	this.balls.push(this.ball);
	this.add(this.ball);
};

BreakoutGame.prototype.createPowerUp = function() {

	var BALL_X = (this.x + this.width) / 2;
	var BALL_Y = (this.y + this.height) / 2;

	var colorIndex = 0;	

	for (var i = 0; i < BALL_NBALLS; i++) {

		var speed = Math.floor((Math.random() * 200) + 300);
		var degree = Math.floor((Math.random() * 80) + 220);

		var ball = new Ball(BALL_X, BALL_Y, BALL_RADIUS - 2);
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

BreakoutGame.prototype.createPlayer = function() {

	var PLAYER_X = (this.x + this.width - PLAYER_WIDTH) / 2;
	var PLAYER_Y = this.y + this.height - PLAYER_HEIGHT - 15;

	this.player = new Player(PLAYER_X, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
	this.player.color = "white";
	this.player.velocity.x = PLAYER_VELOCITY;
	this.player.velocity.a = PLAYER_ACCELERATION;

	this.player.delay = BALL_DELAY;
	this.add(this.player);
};

BreakoutGame.prototype.createScoreboard = function() {

	this.add(new Text(10, 40, "15pt Score Font2", "SCORE:"));
	this.scoreText = new Text(130, 40, "20pt Score Font", pad(this.score, 4));
	this.add(this.scoreText);

	this.add(new Text(380, 40, "15pt Score Font2", "BALL:"));
	this.lifesText = new Text(480, 40, "20pt Score Font", pad(this.lifes, 2)); 
	this.add(this.lifesText);

	this.add(new Text(730, 40, "15pt Score Font2", "NITRO:"));
	this.nitroText = new Text(835, 40, "20pt Score Font", pad(this.nitro, 2));
	this.add(this.nitroText);	
};

BreakoutGame.prototype.init = function() {

	this.score = 0;
	this.lifes = N_LIVES;
	this.nitro = N_NITROS;
	this.keyLeftPressed = false;
	this.keyRightPressed = false;
	this.paused = false;
	this.playGameStart = true;
	this.delayNewBar = 0;
	this.barColorIndex = 0;	
	this.barVelocityPlus = BAR_NLIN * BAR_VELOCITY_INC;
	this.barScore = BAR_NLIN;

	this.showGameName();
	this.createBars(false);
	this.createPlayer();
	this.createBall();
	this.createScoreboard();

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

	this.lastUpdate = new Date().getTime();
	
	this.interval = setInterval(function() {

		self.gameLoop();		

	}, 1000 / this.fps);
};

BreakoutGame.prototype.stop = function() {
	clearInterval(this.interval);
};

BreakoutGame.prototype.showGameOver = function() {

	var gameOverMsg = new Text((this.x + this.width) / 2, (this.y + this.height) / 2, 
		"50pt Score Font2", "GAME OVER");
	gameOverMsg.align = "center";
	gameOverMsg.color = "yellow";

	var restartMsg = new Text((this.x + this.width) / 2, (this.y + this.height) / 2 + 50, 
		"italic 20pt Score Font2", "Press  F5  to  restart");
	restartMsg.align = "center";
	restartMsg.color = "yellow";
	
	this.add(gameOverMsg);					
	this.add(restartMsg);	
};


BreakoutGame.prototype.showGameName = function() {

	var gameName1 = new Text((this.x + this.width) / 2, (this.y + this.height) / 2 + 200, 
		"italic 40pt Score Font2", "breakout");
	gameName1.align = "center";
	gameName1.color = "rgba(255, 255, 255, 0.1)";

	var gameName2 = new Text((this.x + this.width) / 2, (this.y + this.height) / 2 + 225, 
		"italic 20pt Score Font2", "evolution  soccer");
	gameName2.align = "center";
	gameName2.color = "rgba(255, 255, 255, 0.1)";
	
	this.add(gameName1);					
	this.add(gameName2);	
};


BreakoutGame.prototype.gameLoop = function() {

	var t = new Date().getTime();
	var delta = t - this.lastUpdate;

	this.animate(delta);
	this.checkCollision();
	this.paint();

	this.delayNewBar += delta;

	if (this.delayNewBar > BAR_DELAY) {
		this.delayNewBar = 0;
		this.createBars(true);		
	}

	if (this.playGameStart) {
		playSound("game_start.mp3");
		this.playGameStart = false;
	}

	this.lastUpdate = new Date().getTime();
};

BreakoutGame.prototype.treatCollision = function(collision) {

	playSound("ball_kick.wav");

	if (collision.what instanceof BreakoutGame) {

		if (collision.is(CollisionType.BOTTOM)) {

			if (collision.who == this.ball) {
				this.player.delay = BALL_DELAY;
				this.ball.delay = BALL_DELAY;

				var PLAYER_X = (this.x + this.width - this.player.width) / 2;
				var PLAYER_Y = this.y + this.height - this.player.height - 15;
				var BALL_X = PLAYER_X + this.player.width / 2;
				var BALL_Y = PLAYER_Y - this.ball.radius - 5;				

				this.player.x = PLAYER_X;
				this.player.y = PLAYER_Y;
				this.ball.x = BALL_X;
				this.ball.y = BALL_Y;
				
				if (this.lifes == 0) {					
					
					this.showGameOver();
					this.stop();

				} else {
					this.lifes--;	
					this.lifesText.text = pad(this.lifes, 2);
				}

				playSound("ball_loss.wav");
				
			} else {
				this.balls.splice(this.balls.indexOf(collision.who), 1);
				this.del(collision.who);
			}
		}

	} else if (collision.what instanceof Bar) {

		collision.who.velocityPlus = collision.what.velocityPlus;
		this.score += collision.what.score;
		this.scoreText.text = pad(this.score, 4);

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

		if (this.balls[j].checkCollision(this, 
			BreakoutGame.prototype.treatCollision.bind(this))) {
			continue;
		}

		for ( var i in this.items) {
			if (this.balls[j].checkCollision(this.items[i], 
				BreakoutGame.prototype.treatCollision.bind(this))) {
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
	} else if (event.keyCode == Key.SPACE && this.nitro > 0) {
		this.nitro--;
		this.nitroText.text = pad(this.nitro, 2)
		this.createPowerUp();		
	}
};

/**
 *
 * Collision Info Class
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
 * Bar Class
 * 
 */

function Bar(x, y, width, height) {

	Rectangle.call(this, x, y, width, height);

	this.velocityPlus = 0;
	this.score = 0;
}

Bar.prototype = new Rectangle();
Bar.prototype.constructor = Bar;

/**
 * Ball Class
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

	this.elapsedTime += delta;
	if (this.elapsedTime < this.delay) {
		return;
	} 

	this.elapsedTime = 0;
	this.delay = 0;

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

	if (!(obj instanceof Drawable) || this.delay > 0 || obj == this || !obj.canCollide) {
		return false;
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
 * Player Class
 * 
 */

function Player(x, y, width, height) {

	Rectangle.call(this, x, y, width, height);

	this.velocityBkp = 0;
}

Player.prototype = new Rectangle();
Player.prototype.constructor = Player;

Player.prototype.animate = function(delta) {

	this.elapsedTime += delta;
	if (this.elapsedTime < this.delay) {
		return;
	} 

	this.elapsedTime = 0;
	this.delay = 0;

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