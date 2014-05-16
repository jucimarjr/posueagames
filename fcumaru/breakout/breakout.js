var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

var canvas, context;
var width, height;

var player, ball, blocks, background;

var points, lives;

var keyLeft, keyRight, restart;

var audio = new Audio('bu.mp3');

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	width = canvas.width;
	height = canvas.height;

	points = 0;
	lives = 3;

	background = new background();
	showPoints = new showPoints();
	showLives = new showLives();
	gameOver = new gameOver();
	youWin = new youWin();
	player = new player(width / 2, height, 100, 10, 10);
	ball = new ball(width / 2, height / 2, 5, 10);
	blocks = new blocks();
	blocks.init();

	keyRight = false;
	keyLeft = false;
	restart = false;
	win = false;

	document.addEventListener('keyup', keyUp, false);
	document.addEventListener('keydown', keyDown, false);

	setInterval(gameLoop, 30);
}

function keyDown(e) {
	if (e.keyCode == 37) {
		keyLeft = true;
	} else if (e.keyCode == 39) {
		keyRight = true;
	} else if (e.keyCode == 82) {
		restart = true;
	}
}

function keyUp(e) {
	if (e.keyCode == 37) {
		keyLeft = false;
	} else if (e.keyCode == 39) {
		keyRight = false;
	}
}

function gameLoop() {
	if ((lives >= 0) && (!win)) {
		context.clearRect(0, 0, width, height);

		// Titulo / Linha divisoria
		background.draw(context);

		// Pontos
		showPoints.draw(context);

		// Vidas
		showLives.draw(context);

		// Jogador
		player.update();
		player.draw(context);

		// Blocos
		blocks.draw(context);

		// Bola
		ball.update(player, blocks);
		ball.draw(context);

	} else if ((lives >= 0) && (win)) {
		context.clearRect(0, 0, width, height);
		youWin.draw(context);
		if (restart) {
			reset();
		}
	} else {
		context.clearRect(0, 0, width, height);
		gameOver.draw(context);
		if (restart) {
			reset();
		}
	}
}

function reset() {
	win = false;
	// blocks().init();
	points = 0;
	lives = 3;
	restart = false;
}

function background() {
	this.draw = function(context) {
		// Titulo
		context.font = "21pt Helvetica";
		context.fillStyle = "red";
		context.fillText("BREAKOUT", 20, 25);

		// Linha divisoria
		context.beginPath();
		context.moveTo(0, 30);
		context.lineTo(width, 30);
		context.strokeStyle = "black";
		context.stroke();
		context.closePath();
	};
}

function showPoints() {
	this.draw = function(context) {
		// Placar
		context.font = "21pt Helvetica";
		context.fillStyle = "red";
		context.fillText("Pontos: " + points, (width / 2) - 80, 25);
	};
}

function showLives() {
	this.draw = function(context) {
		// Placar
		context.font = "21pt Helvetica";
		context.fillStyle = "red";
		context.fillText("Vidas: " + lives, (width / 2) + 140, 25);
	};
}

function gameOver() {
	this.draw = function(context) {
		context.font = "21pt Helvetica";
		context.fillStyle = "red";
		context.fillText("GAME OVER", (width / 2) - 80, (height / 2));
	};
}

function youWin() {
	this.draw = function(context) {
		context.font = "21pt Helvetica";
		context.fillStyle = "red";
		context.fillText("YOU WIN !", (width / 2) - 80, (height / 2));
	};
}

function ball(x, y, radius, speed) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.speed = speed;
	this.angle = Math.floor(Math.random() * 21) - 10;
	this.direction = DOWN;

	this.draw = function(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
		context.fillStyle = "red";
		context.fill();
	};

	this.update = function(player, blocks) {
		// se a bola enconstar no jogador
		if (player.collision(this)) {
			this.direction = UP;

			// se o jogador estiver indo para esquerda quando tocar na bola...
			if (keyLeft) {
				// mandamos a bola na diagonal pra esquerda
				angle = Math.floor(Math.random() * 10) - 9;
			}
			// se o jogador estiver indo para direita quando tocar na bola...
			else {
				// mandamos a bola na diagonal pra direita
				angle = Math.floor((Math.random() * 10));
			}
		} else if (blocks.collisions(ball)) {
			if (blocks.items.length == 0) {
				win = true;
			}

			if (this.direction == DOWN) {
				this.direction = UP;
			} else {
				this.direction = DOWN;
			}
		} else if ((this.y + this.radius) < 51) {
			this.direction = DOWN;
		}

		// se a bola bater na lateral da tela...
		if ((this.x - this.radius <= 0) || (this.x + radius > width)) {
			// multiplicamos por -1 para inverter o sinal e a direção da bola
			// no
			// eixo X
			this.angle = this.angle * -1;
		}
		// movemos a bola para cima ou para baixo, de acordo com o cáculo acima
		this.x += this.angle;

		if (this.direction == DOWN) {
			this.y += this.speed;
		} else {
			this.y -= this.speed;
		}

		// morreu
		if ((this.y + this.radius) > height) {
			lives--;
			this.x = width / 2;
			this.y = height / 2;
		}
	};
}

function player(x, y, w, h, speed) {
	this.x = x - (w / 2);
	this.y = y - h;
	this.w = w;
	this.h = h;
	this.speed = speed;

	this.draw = function(context) {
		context.fillStyle = "black";
		context.fillRect(this.x, this.y, this.w, this.h);
	};

	this.update = function() {
		if ((keyRight) && ((this.x + this.w) <= width)) {
			this.x += 10;
		}

		if ((keyLeft) && (this.x >= 0)) {
			this.x -= 10;
		}
	};

	this.collision = function(ball) {
		// se a bola enconstar na jogador(eixo Y)...
		if ((ball.y + ball.radius) > this.y) {
			// se a bola enconstar na jogador(eixo X)...
			if ((ball.x + ball.radius > player.x)
					&& (ball.x - ball.radius < this.x + this.w)) {
				return true;
			}
		}

		return false;
	};
}

function block(x, y, w, h, color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;

	this.draw = function() {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.w, this.h);
	};

	this.collision = function(ball) {
		// se a bola enconstar no bloco
		if (ball.y + ball.radius >= this.y
				&& ball.y - ball.radius <= this.y + this.h) {
			if (ball.x + ball.radius >= this.x
					&& ball.x - ball.radius <= this.x + this.w) {
				// marcou ponto
				points++;
				audio.play();
				return true;
			}
		}

		return false;
	};
}

function blocks() {
	this.items = new Array();

	this.init = function() {
		for (var j = 100; j < 180; j += 20) {
			for (var i = 0; i < width; i += 102) {
				this.items.push(new block(i + 10, j, 80, 10, "gold"));
			}
		}
	};

	this.draw = function(context) {
		for (var i = 0; i < this.items.length; i++) {
			this.items[i].draw(context);
		}
	};

	this.collisions = function(ball) {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].collision(ball)) {
				this.items.splice(i, 1);
				return true;
			}
		}

		return false;
	};
}