var canvas, context;
var width, height;

var player, ball, blocks, background;

var keyLeft, keyRight;

var bolaParaBaixo = false;

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	width = canvas.width;
	height = canvas.height;

	background = new background();
	player = new player(width / 2, height, 100, 10, 10);
	ball = new ball(width / 2, height / 2, 5, 10);

	blocks = new Array();
	for (var j = 100; j < 180; j += 20) {
		for (var i = 0; i < width; i += 100) {
			blocks.push(new block(i + 10, j, 80, 10));
		}
	}

	keyRight = false;
	keyLeft = false;
	
	document.addEventListener('keyup', keyUp, false);
	document.addEventListener('keydown', keyDown, false);
	setInterval(gameLoop, 30);
}

function keyDown(e) {
	if (e.keyCode == 37) {
		keyLeft = true;
	} else if (e.keyCode == 39) {
		keyRight = true;
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
	context.clearRect(0, 0, width, height);

	// Titulo / Linha divisoria
	background.draw(context);

	// Jogador
	player.update();
	player.draw(context);

	// Blocos
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].draw(context);
	}

	// Bola
	ball.update(player);
	ball.draw(context);
}

function background() {
	this.draw = function(context) {
		// Titulo
		context.font = "21pt Helvetica";
		context.fillStyle = "red";
		context.fillText("BREAKOUT", (width / 2) - 80, 25);

		// Linha divisoria
		context.beginPath();
		context.moveTo(0, 30);
		context.lineTo(width, 30);
		context.strokeStyle = "black";
		context.stroke();
		context.closePath();
	};
}

function ball(x, y, radius, speed) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.speed = speed;
	this.angle = Math.floor(Math.random() * 21) - 10;

	this.draw = function(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
		context.fillStyle = "red";
		context.fill();
	};

	this.update = function(player) {
		// se a bola enconstar na jogador(eixo Y)...
		if ((this.y + this.radius) > player.y) {
			// se a bola enconstar na jogador(eixo X)...
			if ((this.x + this.radius > player.x) && (this.x - this.radius < player.x + player.w)) {
				bolaParaBaixo = true;
				if (keyLeft) {// se o jogador estiver indo para esquerda quando tocar na bola...
					angle = Math.floor(Math.random() * 10) - 9;// mandamos a bola na diagonal pra esquerda
				} else {// se o jogador estiver indo para direita quando tocar na bola...
					angle = Math.floor((Math.random() * 10));// mandamos a bola na diagonal pra direita
				}
			}
		} else if ((this.y + this.radius) < 0) {
			bolaParaBaixo = false;
		}
        
        if ((this.x - this.radius <= 0) || (this.x + radius > width)) {// se a bola bater na lateral da tela...
        	this.angle = this.angle * -1;// multiplicamos por -1 para inverter o sinal e a direção da bola no eixo X
        }
        this.x += this.angle;// movemos a bola para cima ou para baixo, de acordo com o cáculo acima

		if (!bolaParaBaixo) {
			this.y += this.speed;
		} else {
			this.y -= this.speed;
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

	this.colisao = function() {

	};
}

function block(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.collided = false;

	this.draw = function() {
		if (this.collided == false) {
			context.fillStyle = "gold";
			context.fillRect(this.x, this.y, this.w, this.h);
		}
	};

	this.collision = function() {

	};
}