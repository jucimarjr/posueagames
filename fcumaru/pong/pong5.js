var canvas, context;
var quadrado;
var jogadorPosX, jogadorPosY, velocidadeJogador;
var oponentePosX, oponentePosY, velocidadeOponente;
var bolaRaio, bolaPosX, bolaPosY;
var pontosJogador, pontosOponente;
var teclaEsquerdaPressionada, teclaDireitaPressionada;
var teclaCimaPressionada, teclaBaixaPressionada;
var oponenteDirecao;

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	quadrado = 30;

	pontosJogador = 0;
	pontosOponente = 0;

	// Jogador e oponente
	jogadorPosX = 0;
	jogadorPosY = (canvas.height - quadrado) / 2;
	velocidadeJogador = 15;
	teclaCimaPressionada = false;
	teclaBaixaPressionada = false;

	oponentePosX = (canvas.width - quadrado) /2;
	oponentePosY = (canvas.height - quadrado) /2;
	velocidadeOponente = 20;
	oponenteDirecao = DOWN;

	// Bola
	bolaRaio = 10;
	bolaPosX = canvas.width / 2;
	bolaPosY = canvas.height / 2;

	// Eventos
	document.addEventListener("keyup", keyUp, false);
	document.addEventListener("keydown", keyDown, false);
	setInterval(gameLoop, 30);
}

function keyDown(e) {
	if (e.keyCode == LEFT) { // Left
		teclaEsquerdaPressionada = true;
	} else if (e.keyCode == UP) { // Up
		teclaCimaPressionada = true;		
	} else if (e.keyCode == RIGHT) { // Right
		teclaDireitaPressionada = true;
	} else if (e.keyCode == DOWN) { // Down
		teclaBaixaPressionada = true;
	}
}

function keyUp(e) {
	if (e.keyCode == LEFT) { // left
		teclaEsquerdaPressionada = false;
	} else if (e.keyCode == UP) { // Up
		teclaCimaPressionada = false;
	} else if (e.keyCode == RIGHT) { // Right
		teclaDireitaPressionada = false;
	} else if (e.keyCode == DOWN) { // Down
		teclaBaixaPressionada = false;
	}
}

function gameLoop() {
	if (teclaCimaPressionada != teclaBaixaPressionada) {
		if (teclaCimaPressionada) {
			if (jogadorPosY > 0) {
				jogadorPosY -= velocidadeJogador;
			}
		} else {
			if (jogadorPosY < (canvas.height - quadrado)) {
				jogadorPosY += velocidadeJogador;
			}
		}
	}
	
	if (teclaEsquerdaPressionada != teclaDireitaPressionada) {
		if (teclaEsquerdaPressionada) {
			if (jogadorPosX > 0) {
				jogadorPosX -= velocidadeJogador;
			}
		} else {
			if (jogadorPosX < (canvas.width - quadrado)) {
				jogadorPosX += velocidadeJogador;
			}
		}
	}

	if (oponenteDirecao == UP) {
		oponentePosY -= velocidadeOponente;
		if (oponentePosY <= 0) {
			oponentePosY = 0;
			oponenteDirecao = LEFT;
		}
	} else if (oponenteDirecao == DOWN) {
		oponentePosY += velocidadeOponente;
		if (oponentePosY >= (canvas.height - quadrado)) {
			oponentePosY = (canvas.height - quadrado);
			oponenteDirecao = RIGHT;
		}
	} else if (oponenteDirecao == LEFT) {
		oponentePosX -= velocidadeOponente;
		if (oponentePosX <= 0) {
			oponentePosX = 0;
			oponenteDirecao = DOWN;
		}
	} else {
		oponentePosX += velocidadeOponente;
		if (oponentePosX >= (canvas.width - quadrado)) {
			oponentePosX = (canvas.width - quadrado);
			oponenteDirecao = UP;
		}
	}

	// Limpa a tela antes de desenhar
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Linha divisoria
	context.beginPath();
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.strokeStyle = "silver";
	context.stroke();
	context.closePath();
	context.fill();

	// Jogador
	context.fillStyle = "blue";
	context.fillRect(jogadorPosX, jogadorPosY, quadrado, quadrado);

	// Oponente
	context.fillStyle = "red";
	context.fillRect(oponentePosX, oponentePosY, quadrado, quadrado);

	// Bola
	context.beginPath();
	context.arc(bolaPosX, bolaPosY, bolaRaio, 0, 2 * Math.PI, true);
	context.closePath();
	context.fillStyle = "gold";
	context.fill();

	// Placar
	var pontosA = pontosJogador;
	var pontosB = pontosOponente;

	if (pontosA < 10) {
		pontosA = "0" + pontosA;
	}

	if (pontosB < 10) {
		pontosB = "0" + pontosB;
	}

	context.font = "42pt Helvetica";
	context.fillStyle = "#000000";
	context.fillText(pontosA + " " + pontosB, (canvas.width / 2) - 70, 50);
}