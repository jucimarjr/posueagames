function verificarColisao(){
	colisaoLateral();
	colisaoSuperior();
	colisaoComBarra();
	colisaoComBlocos();
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
			audioBarra.play();
			if (teclaDireitaPressionada) {// se o jogador estiver indo para direita quando tocar na bola...
				bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos a bola na diagonal pra esquerda
			} else {// se o jogador estiver indo para esquerda quando tocar na bola...
				bolaAngulo = Math.floor((Math.random() * 10));// mandamos a bola na diagonal pra direita
			}
		}
	}
}

function colisaoComBlocos(){
	for(var i=0;i<qtdLinhas;i++){
		for(var j=0;j<qtdColunas;j++){
			if(blocos[i][j].vivo){
				if(colisaoComBloco(blocos[i][j])){
					bolaParaCima = !bolaParaCima;
					if( (i==2) && (velocidadeBolaInicial == velocidadeBola) ){//Verifica se chegou na linha laranja e se a velocidade é a mesma
						velocidadeBola *= 2; //dobra a velocidade
					}
					return;
				}
			}
		}
	}
}

function colisaoComBloco(bloco){
	if( (bolaPosY-bolaRaio <= bloco.y+bloco.h) && (bolaPosY+bolaRaio >= bloco.y) ){ //se acertou por cima ou por baixo
		if( (bolaPosX+bolaRaio>=bloco.x) && (bolaPosX-bolaRaio<=bloco.x+bloco.w) ){
			audioBloco.play();
			bloco.vivo=false;
			pontos++;
			pontosPorFase++;
			return true;
		}
	}
	return false;
}

function perdeuVida(){
	return ( (bolaPosY-bolaRaio > canvas.height) ? true: false );
}