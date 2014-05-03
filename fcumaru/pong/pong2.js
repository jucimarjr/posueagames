var canvas, context, barraWidth, barraHeight, jogadorPosX, jogadorPosY, oponentePosX, oponentePosY, bolaRaio, bolaPosX, bolaPosY, pontosJogador, pontosOponente;

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	barraWidth = 90;
	barraHeight = 30;

	pontosJogador = 0;
	pontosOponente = 0;

	// Jogador e oponente
	jogadorPosX = (canvas.width - barraWidth) / 2;
	jogadorPosY = 0;

	oponentePosX = 0;
	oponentePosY = canvas.height - barraHeight;

	context.fillStyle = "blue";
	context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeight);
	context.fillStyle = "red";
	context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeight);

	// Linha divisoria
	context.beginPath();
	context.moveTo(0, canvas.height / 2);
	context.lineTo(canvas.width, canvas.height / 2);
	context.strokeStyle = "silver";
	context.stroke();
	context.closePath();
	context.fill();

	// Bola
	bolaRaio = 10;
	bolaPosX = canvas.width - bolaRaio;
	bolaPosY = canvas.height / 2;

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
	context.rotate(Math.PI*2);
	context.fillStyle = "#000000";
	context.fillText(pontosA, 50, (canvas.height / 2) - 30);
	context.fillText(pontosB, 50, (canvas.height / 2) + 70);
}