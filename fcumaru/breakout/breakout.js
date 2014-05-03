var canvas, context, barraWidthJogador, barraHeightJogador, jogadorPosX, jogadorPosY;
var teclaDireita, teclaEsquerda, velocidadeBola;

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	width = canvas.width;
	height = canvas.height;

	barraWidthJogador = 100;
	barraHeightJogador = 10;

	bolaTempo = 0;
	bolaAngulo = Math.floor(Math.random() * 21) - 10;
	velocidadeBola = 15;
	bolaPosX = width / 2;
	bolaPosY = height / 2;

	blocosWidth = 80;
	blocosHeight = 10;

	jogadorPosX = (width - barraWidthJogador) / 2;
	jogadorPosY = height - barraHeightJogador;

	bolaRaio = 5;
	velocidadeJogador = 10;

	teclaDireita = false;
	teclaEsquerda = false;

	document.addEventListener('keyup', keyUp, false);
	document.addEventListener('keydown', keyDown, false);
	setInterval(gameLoop, 30);
}

function keyDown(e) {
	if (e.keyCode == 37) {
		teclaEsquerda = true;
	} else if (e.keyCode == 39) {
		teclaDireita = true;
	}
}

function keyUp(e) {
	if (e.keyCode == 37) {
		teclaEsquerda = false;
	} else if (e.keyCode == 39) {
		teclaDireita = false;
	}
}

function geraBarras(x, y) {

	context.fillStyle = "gold";
	context.fillRect(x, y, blocosWidth, blocosHeight);
}

function gameLoop() {
	context.clearRect(0, 0, width, height);

	for (var j = 100; j < 120; j += 20) {
		for (var i = 0; i < width; i += 100) {
			geraBarras(i + 10, j);
		}
	}
	if ((teclaDireita) && ((jogadorPosX + barraWidthJogador) <= width)) {
		jogadorPosX += 10;
	}

	if ((teclaEsquerda) && (jogadorPosX >= 0)) {
		jogadorPosX -= 10;
	}

	// Bola
	if (bolaTempo <= 0) {
		if ((bolaPosY - bolaRaio) <= (jogadorPosY + barraHeightJogador)) {
			if ((bolaPosX + bolaRaio > jogadorPosX)
					&& (bolaPosX - bolaRaio < jogadorPosX + barraWidthJogador)) {
				bolaParaBaixo = true;
				if (teclaEsquerda) {
					bolaAngulo = Math.floor(Math.random() * 10) - 9;
				} else {
					bolaAngulo = Math.floor((Math.random() * 10));
				}
			}
		}
	}

	if (bolaParaBaixo) {
		bolaPosY += velocidadeBola;
	} else {
		bolaPosY -= velocidadeBola;
	}

	// Jogador
	context.fillStyle = "black";
	context.fillRect(jogadorPosX, jogadorPosY, barraWidthJogador,
			barraHeightJogador);

	// Título
	context.font = "21pt Helvetica";
	context.fillStyle = "red";
	context.fillText("BREAKOUT", (width / 2) - 80, 25);

	// Linha divisória
	context.beginPath();
	context.moveTo(0, 30);
	context.lineTo(canvas.width, 30);
	context.strokeStyle = "black";
	context.stroke();
	context.closePath();

	// Bola
	context.beginPath();
	context.arc(bolaPosX, bolaPosY, bolaRaio, 0, 2 * Math.PI, true);
	context.fillStyle = "red";
	context.fill();

}