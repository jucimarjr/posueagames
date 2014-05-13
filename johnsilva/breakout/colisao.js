function verificarColisao(){
	colisaoLateral();
	colisaoSuperior();
	colisaoComBarra();
}

function colisaoLateral(){
	
	if ((bolaPosX - bolaRaio <= bordaW) || (bolaPosX + bolaRaio > canvas.width-bordaW)) {// se a bola bater nas laterais da tela...
		bolaAngulo = bolaAngulo * -1;// multiplicamos por -1 para inverter o sinal e a direção da bola no eixo Y
	}
	bolaPosX += bolaAngulo;// movemos a bola para esquerda ou para direita	
}

function colisaoSuperior(){
	if(bolaPosY-bolaRaio <= dy+bordaW){
		bolaParaCima = false;
	}
}

function colisaoComBarra(){
	if(bolaPosY+bolaRaio >= jogadorPosY){ // se o jogador enconstar na bola (eixo y)...
		if( (bolaPosX+bolaRaio>=jogadorPosX) && (bolaPosX-bolaRaio<=jogadorPosX+barraWidth) ){ //verifica se esta na mesma posicao da barra
			bolaParaCima = true;
			if (teclaDireitaPressionada) {// se o jogador estiver indo para direita quando tocar na bola...
				bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos a bola na diagonal pra esquerda
			} else {// se o jogador estiver indo para esquerda quando tocar na bola...
				bolaAngulo = Math.floor((Math.random() * 10));// mandamos a bola na diagonal pra direita
			}
		}
	}
	
	
	/*if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) {// se o jogador enconstar na bola (eixo X)...
		if ((bolaPosY + bolaRaio > jogadorPosY)	&& 
				(bolaPosY - bolaRaio < jogadorPosY + barraWidth)) {// se o jogador enconstar na bola (eixo Y)...
			bolaParaCima = true;// a bola muda de lado e é rebatida para o oponente
			if (teclaDireitaPressionada) {// se o jogador estiver indo para cima quando tocar na bola...
				bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos a bola na diagonal pra cima
			} else {// se o jogador estiver indo para baixo quando tocar na bola...
				bolaAngulo = Math.floor((Math.random() * 10));// mandamos a bola na diagonal pra baixo
			}
		}
	} else if ((bolaPosX - bolaRaio) <= (oponentePosX + barraWidth)) {// se o oponente enconstar na bola (eixo X)...
		if ((bolaPosY + bolaRaio > oponentePosY)
				&& (bolaPosY - bolaRaio < oponentePosY + barraWidth)) {// se o oponente enconstar na bola (eixo Y)...
			bolaParaCima = false;// a bola muda de lado e é rebatida para o jogador
			if (teclaDireitaPressionada) {// se o oponente estiver indo para cima quando tocar na bola...
				bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos a bola na diagonal pra cima
			} else {// se o oponente estiver indo para baixo quando tocar na bola...
				bolaAngulo = Math.floor((Math.random() * 10) - 9);// mandamos a bola na diagonal pra baixo
			}
		}
	}*/
}