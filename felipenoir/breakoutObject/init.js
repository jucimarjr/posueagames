//Captura o canvas e inicializa o jogo

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var janela = new Janela(ctx, canvas.width, canvas.height);

geraPosicaoRandom = function(width) {
	var valor = 1;
	while (true) {
		valor = Math.floor((Math.random() * width) + 1);
		if (valor >= 0 && valor <= width)
			break;
	}
	return valor;
}
//Gera posicão aleatória para bola
var posicaoXBola = geraPosicaoRandom(canvas.width);
var jogador = new Jogador(ctx, canvas.width, canvas.height);
var bola = new Bola(ctx, 0, 0);
reiniciaBola();
var inimigos = new Inimigos(ctx, canvas.width, canvas.height);
var alvos = inimigos.inimigos;
var pontuacao = new Pontuacao(ctx, 10, 38);
var vidas = new Vidas(ctx);

const STARTED = 0;
const GAMEOVER = 1;
const WIN = 2;
var gameState = STARTED; 

var isDireita = false;
var isEsquerda = false;

// Usuário movendo
document.addEventListener('keydown', function(evt) {
	if (evt.keyCode == 39)
		isDireita = true;
	else if (evt.keyCode == 37)
		isEsquerda = true;
	else if (evt.keyCode == 32)
		if (bola.state == bola.PARADO)
			bola.lancarBola();
}, false);

//Usuário parado
document.addEventListener('keyup', function(evt) {
	if (evt.keyCode == 39)
		isDireita = false;
	else if (evt.keyCode == 37)
		isEsquerda = false;
}, false);

function init() {
	try {
		setInterval(gameLoop, 20)
	} catch (e) {
		console.log("TRETA:" + e.message)
	}
}

function gameLoop() {
	if(gameState == STARTED){
		// movimenta
		if (bola.state == bola.MOVIMENTANDO)
			bola.movimentaBola(janela.width);
		else
			bola.movimentaParado(janela.width, isDireita, isEsquerda);
		jogador.movimentaJogador(isDireita, isEsquerda, canvas.width);

		// verifica colisão
		colisaoBolaJogador();
		colisaoBolaInimigos();

		// desenha
		janela.desenhaJanela();
		if(bola.state == bola.PARADO)
			startGame();
		bola.desenhaBola();
		jogador.desenhaJogador()
		inimigos.desenhaInimigos();
		pontuacao.desenha();
		vidas.desenha();
	} else if(gameState == GAMEOVER) {
		gameOver();
	} else if(gameState == WIN) {
		win();
	}
}

function colisaoBolaJogador() {
	if (bola.posY + bola.raio > canvas.height) {
		if (bola.posX + bola.raio > jogador.posX
				&& bola.posX - bola.raio < jogador.posX + jogador.width) {
			bola.posY = jogador.posY - bola.raio;
			bola.velocidadeY = -bola.velocidadeY;
			bola.velocidadeX = (bola.posX - (jogador.posX + (jogador.width / 2))) / 5; 
		} else {
			vidas.removeVida();
			if (vidas.qtd < 0) {
				gameState = GAMEOVER;
			} else {
				reiniciaBola();
			}
		}
	}
}

function reiniciaBola() {
	bola.state = bola.PARADO;
	bola.posX = jogador.posX + (jogador.width / 2);
	bola.posY = canvas.height - (jogador.height + bola.raio);
}

function houveColisao(alvoX, alvoY) {
	return (alvoX < bola.posX + bola.raio
			&& alvoX + inimigos.width > bola.posX - bola.raio
			&& alvoY < bola.posY + bola.raio
			&& alvoY + inimigos.height > bola.posY - bola.raio);
}

function colisaoBolaInimigos() {
	for (var i = 0; i < alvos.length; i++) { // percorre as linhas da matriz
		for (var j = 0; j < alvos[i].length; j++) { // percorre as colunas da matriz
			if (alvos[i][j] > 0) { // verifica se o alvo ainda está vivo

				var alvoX = (j * (inimigos.width + inimigos.DISTANCIA)) + inimigos.DISTANCIA;
				var alvoY = (i * (inimigos.height + inimigos.DISTANCIA)) + inimigos.DISTANCIA;

				if (houveColisao(alvoX, alvoY)) {

					var x1 = Math.abs(alvoX - (bola.posX + bola.raio)); // distancia entre a bola e a esquerda do alvo
					var x2 = Math.abs((alvoX + inimigos.width) - (bola.posX - bola.raio)); // distancia entre a bola e a direita do alvo
					if(x1 > x2) // se condição for verdadeira então a bola veio da direita, senão, da esquerda
						x1 = x2;

					var y1 = Math.abs(alvoY - (bola.posY + bola.raio)); // distancia entre a bola e o topo do alvo
					var y2 = Math.abs((alvoY + inimigos.height) - (bola.posY - bola.raio)); // distancia entre a bola e o fundo do alvo
					if (y1 > y2) // se condição for verdadeira então a bola veio de baixo, senão, de cima
						y1 = y2;

					if (x1 < y1) { // tocou no lado esquerdo/direito
						bola.velocidadeX = -bola.velocidadeX;
						if (bola.velocidadeX < 0) {
							bola.posX = alvoX - bola.raio;
						} else {
							bola.posX = (alvoX + inimigos.width) + bola.raio;
						}
					} else { // tocou no topo/fundo
						bola.velocidadeY = -bola.velocidadeY;
						if (bola.velocidadeY < 0) {
							bola.posY = alvoY - bola.raio;
						} else {
							bola.posY = (alvoY + inimigos.height) + bola.raio;
						}
					}

					pontuacao.incrementa(10);
					alvos[i][j] = 0;
					inimigos.qtd -= 1;

				}

			}
		}
	}
	
	if(inimigos.qtd <= 0) {
		gameState = WIN;
	}
}

function startGame() {
	this.ctx.font = "40pt Helvetica";
	this.ctx.fillStyle = "#000000";
	this.ctx.fillText("Pressione \"Barra de Espaco!\"", 60, (canvas.height / 2) + 20);
}

function gameOver() {
	this.ctx.font = "40pt Helvetica";
	this.ctx.fillStyle = "#000000";
	this.ctx.fillText("Game Over", canvas.width / 3, (canvas.height / 2) + 20);
}

function win() {
	this.ctx.font = "40pt Helvetica";
	this.ctx.fillStyle = "#000000";
	this.ctx.fillText("You win!", canvas.width / 5, (canvas.height / 2) + 20);
}

//The Treta has been planted
init();
