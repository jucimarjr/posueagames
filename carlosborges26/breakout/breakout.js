var canvas, context, width, height;
var barraWidth, barraHeight;
var jogadorPosX, jogadorPosY;
var teclaEsquerdaPressionada, teclaDireitaPressionada;
var bolaRaio, bolaPosX, bolaPosY, bolaParaBaixo, bolaAngulo, bolaTempo;
var velocidadeJogador, velocidadeBola;
var pontosJogador, playerLife;

var enemyWidth, enemyHeight;
var enemies = [];

var enemyCols = 12;
var enemyRows = 4;

var NONE = -1;
var LEFT = 1;
var UP = 2;
var RIGHT = 3;
var DOWN = 4;

function init() {
	
	canvas = document.getElementById("canvas");// procura o canvas
	context = canvas.getContext("2d");// recupera o contexto 2d
	
	width = canvas.width;
	height = canvas.height;
	
	barraWidth = 90;
	barraHeight = 10;
	
	jogadorPosX = (width - barraWidth) / 2;
	jogadorPosY = height - barraHeight;

	bolaRaio = 5;
	bolaPosX = canvas.width / 2;
	bolaPosY = canvas.height / 2;
	bolaParaBaixo = false;
	bolaAngulo = Math.floor(Math.random() * 21) - 10;
	bolaTempo = 0;
	velocidadeBola = 10;

	pontosJogador = 0;

	velocidadeJogador = 10;

	createEnemys();
	
	document.addEventListener('keyup', keyUp, false);// adiciona evento para keyup
	document.addEventListener('keydown', keyDown, false);// adiciona evento para keydown
	setInterval(gameLoop, 30);// chama a function gameLoop a cada 30 frames
}

function createEnemys() {
	
	enemyWidth = 40;
	enemyHeight = 20;
	
	x = 0;
	y = 80;
	
	for(var row = 0; row < enemyRows; row++) {
		
		arRow = [];
		x = 0;
		
		for(var col = 0; col < enemyCols; col++) {
			
			arRow[col] = new Enemy(x, y, enemyWidth, enemyHeight, "white");
			
			x += enemyWidth;
		}
		
		enemies[row] = arRow;
		
		y += enemyHeight;
	}
	
}

function keyDown(e) {
	if (e.keyCode == 37) { // up
		teclaEsquerdaPressionada = true;
	} else if (e.keyCode == 39) { // down
		teclaDireitaPressionada = true;
	}
}

function keyUp(e) {
	if (e.keyCode == 37) { // up
		teclaEsquerdaPressionada = false; // jogador soltou tecla cima
	} else if (e.keyCode == 39) { // down
		teclaDireitaPressionada = false; // jogador soltou tecla baixo
	}
}

function gameLoop() {
	
	// Jogador
	if (teclaEsquerdaPressionada != teclaDireitaPressionada) { // se o jogador estiver pressionando a tecla baixo ou cima
		if (teclaEsquerdaPressionada) { // se for para cima...
			if (jogadorPosX > 0) { // se não sair da tela...
				jogadorPosX -= velocidadeJogador;// muda a posição
			}
		} else { // se for para baixo...
			if (jogadorPosX < (canvas.width - barraWidth)) {// se não sair da tela...
				jogadorPosX += velocidadeJogador;// muda a posição
			}
		}
	}
	
	// Bola
	if (bolaTempo <= 0) { // se a bola estiver em jogo, o tempo é zero (após perder vida, a bola fica invisível por um tempo)
		
		// player collision
		if ((bolaPosY + bolaRaio) >= jogadorPosY) { // se o jogador enconstar na bola (eixo Y)...
			
			if ((bolaPosX + bolaRaio > jogadorPosX) && (bolaPosX - bolaRaio < jogadorPosX + barraWidth)) { // se o jogador enconstar na bola (eixo X)...
				
				bolaAngulo = bolaAngulo * -1;
				//bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos a bola na diagonal pra cima
				bolaParaBaixo = false;// a bola muda de lado e é rebatida para o oponente
				if (teclaEsquerdaPressionada) {// se o jogador estiver indo para left quando tocar na bola...
					bolaAngulo = Math.floor(Math.random() * 10) - 9; // mandamos a bola na diagonal pra esquerda
					//bolaParaDireita = false;
				}
				else {// se o jogador estiver indo para direita quando tocar na bola...
					bolaAngulo = Math.floor((Math.random() * 10)); // mandamos a bola na diagonal pra direita
//					bolaParaDireita = true;
				}
			}
		}
		
		// screen collision
		if (bolaPosY - bolaRaio <= 0) { // se a bola bater em cima da tela...
			bolaParaBaixo ^= true; // multiplicamos por -1 para inverter o sinal e a direção da bola no eixo Y
		}
		else if ((bolaPosX - bolaRaio <= 0) || (bolaPosX + bolaRaio > width)) { // se a bola bater em left ou right da tela...
			bolaAngulo = bolaAngulo * -1; // multiplicamos por -1 para inverter o sinal e a direção da bola no eixo Y
		}
		else if ((bolaPosY + bolaRaio) >= height) { // if ball touch bottom canvas, lose one ball
//			ball--;
			// TODO: lose ball and restart ball
		}
		
		// detect foes collision
		for(var row = 0; row < enemyRows; row++) {
			
			if( enemies[row][0].isRowCanCollide(bolaPosY, bolaRaio) ) { // fist test if the ball is in this row
				
				for(var col = 0; col < enemyCols; col++) {
					
					if( (collide = enemies[row][col].isCollide(bolaPosX, bolaPosY, bolaRaio)) != NONE ) {
						
						enemies[row][col].enabled = false;
						
						if(collide == LEFT) {
							
							if(bolaAngulo > 0) { // just go to the left direction
								bolaAngulo = bolaAngulo * -1;
							}
						}
						else if(collide == UP) {
							bolaParaBaixo = false;
						}
						else if(collide == RIGHT) {
							
							if(bolaAngulo < 0) { // just go to the right direction
								bolaAngulo = bolaAngulo * -1;
							}
						}
						else if(collide == DOWN) {
							bolaParaBaixo = true;
						}
						
					}
					
				}
				
			}
			
		}
		
		bolaPosX += bolaAngulo;// movemos a bola para cima ou para baixo, de acordo com o cáculo acima

		if (bolaParaBaixo) {// se a bola estiver indo para a direita...
			bolaPosY += velocidadeBola;// movemos a bola para a direita
		} else {// se estiver indo para a esquerda...
			bolaPosY -= velocidadeBola;// movemos a bola para a esquerda
		}
	}

	// Desenha tudo na tela
	context.clearRect(0, 0, width, height);// limpa a tela antes de desenhar

	// Jogador e Oponente
	context.fillStyle = "red";
	context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeight);//desenha jogador
//	context.fillStyle = "blue";
//	context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeight);//desenha oponente

	// Placar
	var pontosA = pontosJogador;// variável temporária para não alterar pontosJogador

	if (pontosA < 10) {// se o número de pontos for menor que 10, colocamos o zero á esquerda
		pontosA = "0" + pontosA;
	}

	context.font = "20pt Helvetica";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#000000";// cor preta (opcional)
	context.fillText(pontosA, 10, (canvas.height / 2) - 10); // escreve texto na tela na posição desejada

	// foes
	for(var row = 0; row < enemyRows; row++) {
		
		for(var col = 0; col < enemyCols; col++) {
			
			enemies[row][col].draw(context);
			
		}
		
	}
	
	// Bola
	context.fillStyle = "black";
	context.beginPath();// inicia o modo de desenho
	context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o círculo desejado com as coordenadas no centro.
	context.closePath();// finaliza o caminho (opcional)
	context.fill();

}

function Enemy(x, y, width, height, color) {
	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.enabled = true;
	
	this.line1A = height / width;
	this.line1B = y - this.line1A * x; // y = ax + b :: b = y - ax
	this.line2A = -height / width;
	this.line2B = (y + height) - this.line2A * x;
	
	this.isAboveLine = function(a, b, ballPosX, ballPosY) {
		
		yLine = a * ballPosX + b;
		
		return ballPosY < yLine;
		
	};
	
	this.isCollide = function(ballPosX, ballPosY, radius) {
		
		ret = NONE;
		
		if(this.enabled) {
			
			if( ((ballPosX + radius) >= this.x && (ballPosX + radius) <= this.x + this.width) ||
					((ballPosX - radius) >= this.x && (ballPosX - radius) <= this.x + this.width) ) {
				
				aboveLine1 = this.isAboveLine(this.line1A, this.line1B, ballPosX, ballPosY);
				aboveLine2 = this.isAboveLine(this.line2A, this.line2B, ballPosX, ballPosY);
				
				if(aboveLine1) {
					if(aboveLine2) {
						ret = UP;
					}
					else { // below line 2
						ret = RIGHT;
					}
				}
				else { // below line 1
					if(aboveLine2) {
						ret = LEFT;
					}
					else { // below two lines
						ret = DOWN;
					}
				}
				
			}
			
		}
		
		return ret;
	};
	
	this.isRowCanCollide = function(ballPosY, radius) {
		
		ret = false;
		
		if( ((ballPosY + radius) >= this.y && (ballPosY + radius) <= this.y + this.height) ||
				((ballPosY - radius) >= this.y && (ballPosY - radius) <= this.y + this.height) ) {
			
			ret = true;
			
		}
		
		return ret;
	};
	
	this.draw = function(context) {
		
		if(this.enabled) {
			context.fillStyle = color;
			context.fillRect(this.x, this.y, this.width, this.height);
			context.strokeStyle = "black";
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
	};
}
