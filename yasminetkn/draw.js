
function drawPlayer(){
	// Jogador e Oponente
    context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeight);//desenha jogador
}

function drawBola(){
	// Bola
    context.beginPath();// inicia o modo de desenho
    context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o círculo desejado com as coordenadas no centro.
    context.closePath();// finaliza o caminho (opcional)
    context.fill();
}

function drawPlacar(){
		// PLACAR
		
	var pontosA = pontosJogador;// variável temporária para não alterar pontosJogador

	if (pontosA < 10) {// se o número de pontos for menor que 10, colocamos o zero á esquerda
		pontosA = "0" + pontosA;
	}
	
	context.font = "42pt Helvetica";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#000000";// cor preta (opcional)
	context.fillText(pontosA, (canvas.width / 2) - 70, 50); // escreve texto na tela na posição desejada
}