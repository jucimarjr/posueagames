// Vari�veis globais utilizadas no jogo
var canvas, context, barraWidth, barraHeight, jogadorPosX, jogadorPosY, teclaCimaPressionada, teclaBaixoPressionada, oponentePosX, oponentePosY, oponenteParaCima, bolaRaio, bolaPosX, bolaPosY, bolaParaDireita, bolaAngulo, bolaTempo, velocidadeJogador, velocidadeOponente, velocidadeBola, pontosJogador, pontosOponente;

// M�todo para iniciar o jogo, executado no onload da tag body
function init() {
	canvas = document.getElementById("canvas");// procura o canvas
	context = canvas.getContext("2d");// recupera o contexto 2d

	barraWidth = 30;
	barraHeight = 90;
	jogadorPosX = 0;
	jogadorPosY = (canvas.height - barraHeight) / 2;
	teclaCimaPressionada = false;
	teclaBaixoPressionada = false;
	oponentePosX = canvas.width - barraWidth;
	oponentePosY = 0;
	oponenteParaCima = false;
	bolaRaio = 10;
	bolaPosX = canvas.width / 2;
	bolaPosY = canvas.height / 2;
	bolaParaDireita = false;
	bolaAngulo = Math.floor(Math.random() * 21) - 10;
	bolaTempo = 0;
	velocidadeJogador = 15;
	velocidadeOponente = 20;
	velocidadeBola = 15;
	pontosJogador = 0;
	pontosOponente = 0;

	document.addEventListener('keyup', keyUp, false);// adiciona evento para
														// keyup
	document.addEventListener('keydown', keyDown, false);// adiciona evento
															// para keydown
	setInterval(gameLoop, 30);// chama a function gameLoop a cada 30 frames
}

function keyDown(e) {
	if (e.keyCode == 38) { // up
		teclaCimaPressionada = true;
	} else if (e.keyCode == 40) { // down
		teclaBaixoPressionada = true;
	}
}

function keyUp(e) {
	if (e.keyCode == 38) { // up
		teclaCimaPressionada = false; // jogador soltou tecla cima
	} else if (e.keyCode == 40) { // down
		teclaBaixoPressionada = false; // jogador soltou tecla baixo
	}
}

function gameLoop() {
	// Jogador
	if (teclaCimaPressionada != teclaBaixoPressionada) { // se o jogador
															// estiver
															// pressionando a
															// tecla baixo ou
															// cima
		if (teclaCimaPressionada) { // se for para cima...
			if (jogadorPosY > 0) { // se n�o sair da tela...
				jogadorPosY -= velocidadeJogador;// muda a posi��o
			}
		} else { // se for para baixo...
			if (jogadorPosY < (canvas.height - barraHeight)) {// se n�o sair
																// da tela...
				jogadorPosY += velocidadeJogador;// muda a posi��o
			}
		}
	}

	// Oponente
	if (oponenteParaCima) {// se o oponente estiver se movendo para cima...
		oponentePosY -= velocidadeOponente;// muda a posi��o
		if (oponentePosY <= 0) {// se estiver saindo da tela...
			oponenteParaCima = false;// muda a dire��o
		}
	} else {// se o oponente estiver se movendo para baixo...
		oponentePosY += velocidadeOponente;// muda a posi��o
		if (oponentePosY >= canvas.height - barraHeight) {// se estiver saindo
															// da tela...
			oponenteParaCima = true;// muda a dire��o
		}
	}

	// Bola
	if (bolaTempo <= 0) {// se a bola estiver em jogo, o tempo � zero (ap�s
							// marcar ponto, a bola fica invis�vel por um tempo)
		if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) {// se o
																	// jogador
																	// enconstar
																	// na bola
																	// (eixo
																	// X)...
			if ((bolaPosY + bolaRaio > jogadorPosY)
					&& (bolaPosY - bolaRaio < jogadorPosY + barraHeight)) {// se o
																			// jogador
																			// enconstar
																			// na
																			// bola
																			// (eixo
																			// Y)...
				bolaParaDireita = true;// a bola muda de lado e � rebatida para
										// o oponente
				if (teclaCimaPressionada) {// se o jogador estiver indo para
											// cima quando tocar na bola...
					bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos
																	// a bola na
																	// diagonal
																	// pra cima
				} else {// se o jogador estiver indo para baixo quando tocar na
						// bola...
					bolaAngulo = Math.floor((Math.random() * 10));// mandamos
																	// a bola na
																	// diagonal
																	// pra baixo
				}
			}
		} else if ((bolaPosX + bolaRaio) >= oponentePosX) {// se o oponente
															// enconstar na bola
															// (eixo X)...
			if ((bolaPosY + bolaRaio > oponentePosY)
					&& (bolaPosY - bolaRaio < oponentePosY + barraHeight)) {// se o
																			// oponente
																			// enconstar
																			// na
																			// bola
																			// (eixo
																			// Y)...
				bolaParaDireita = false;// a bola muda de lado e � rebatida para
										// o jogador
				if (oponenteParaCima) {// se o oponente estiver indo para cima
										// quando tocar na bola...
					bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos
																	// a bola na
																	// diagonal
																	// pra cima
				} else {// se o oponente estiver indo para baixo quando tocar na
						// bola...
					bolaAngulo = Math.floor((Math.random() * 10));// mandamos
																	// a bola na
																	// diagonal
																	// pra baixo
				}
			}
		}

		if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) {// se a
																					// bola
																					// bater
																					// em
																					// cima
																					// ou
																					// em
																					// baixo
																					// da
																					// tela...
			bolaAngulo = bolaAngulo * -1;// multiplicamos por -1 para
											// inverter o sinal e a dire��o da
											// bola no eixo Y
		}
		bolaPosY += bolaAngulo;// movemos a bola para cima ou para baixo, de
								// acordo com o c�culo acima

		if (bolaParaDireita) {// se a bola estiver indo para a direita...
			bolaPosX += velocidadeBola;// movemos a bola para a direita
		} else {// se estiver indo para a esquerda...
			bolaPosX -= velocidadeBola;// movemos a bola para a esquerda
		}
	}

	if ((bolaPosX <= -bolaRaio) || (bolaPosX > canvas.width)) {// se a bola
																// saiu da
																// tela...
		if (bolaTempo >= 50) {// se so tempo de deixar a bola invis�vel
								// passou...
			if (bolaPosX <= -bolaRaio) {// se a bola saiu na esquerda...
				pontosOponente++;// ponto do oponente!
			} else {// se a bola saiu na direita...
				pontosJogador++;// ponto do jogador!
			}

			bolaPosX = canvas.width / 2;// posiciona a bola no meio da tela
			bolaPosY = canvas.height / 2;// posiciona a bola no meio da tela
			bolaParaDireita = false;// faz ela ir em dire��o ao jogador
			bolaAngulo = Math.floor(Math.random() * 21) - 10;// faz a bola ir
																// para uma
																// dire��o
																// aleat�ria
			bolaTempo = 0;// zera o tempo de deixar a bola invis�vel e a
							// coloca em jogo novamente
		} else {// se o tempo de deixar a bola invis�vel ainda n�o passou...
			bolaTempo++;// continuamos contando at� 50
		}
	}

	// Desenha tudo na tela
	context.clearRect(0, 0, canvas.width, canvas.height);// limpa a tela
															// antes de desenhar

	// Jogador e Oponente
	context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeight);// desenha
																		// jogador
	context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeight);// desenha
																			// oponente

	// Bola
	context.beginPath();// inicia o modo de desenho
	context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha
																		// o
																		// c�rculo
																		// desejado
																		// com
																		// as
																		// coordenadas
																		// no
																		// centro.
	context.closePath();// finaliza o caminho (opcional)
	context.fill();

	// Placar
	var pontosA = pontosJogador;// vari�vel tempor�ria para n�o alterar
								// pontosJogador
	var pontosB = pontosOponente;// vari�vel tempor�ria para n�o alterar
									// pontosOponente

	if (pontosA < 10) {// se o n�mero de pontos for menor que 10, colocamos o
						// zero � esquerda
		pontosA = "0" + pontosA;
	}
	if (pontosB < 10) {// se o n�mero de pontos for menor que 10, colocamos o
						// zero � esquerda
		pontosB = "0" + pontosB;
	}

	context.font = "42pt Helvetica";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#000000";// cor preta (opcional)
	context.fillText(pontosA + " " + pontosB, (canvas.width / 2) - 70, 50); // escreve
																			// texto
																			// na
																			// tela
																			// na
																			// posi��o
																			// desejada

	// Linha divis�ria
	context.beginPath();// inicia o modo de desenho
	context.moveTo(canvas.width / 2, 0);// posiciona o "lapiz" para desenhar
	context.lineTo(canvas.width / 2, canvas.height);// faz o "risco" na tela
	context.strokeStyle = "#000000";// cor preta (opcional)
	context.stroke();// aplica o risco na tela
	context.closePath();// finaliza o caminho (opcional)
}