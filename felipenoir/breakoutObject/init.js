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
var bola = new Bola(ctx, posicaoXBola, canvas.width, canvas.height);
var jogador = new Jogador(ctx, canvas.width, canvas.height);
var inimigos = new Inimigos(ctx, canvas.width, canvas.height);
var alvos = inimigos.inimigos;

var isDireita = false;
var isEsquerda = false;

//Usuário movendo
document.addEventListener('keydown', function(evt) {
	if (evt.keyCode == 39)
		isDireita = true;
	else if (evt.keyCode == 37)
		isEsquerda = true;
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
		setInterval(gameLoop, 10)
	} catch (e) {
		console.log("TRETA:" + e.message)
	}
}

function gameLoop() {
	// movimenta
	bola.movimentaBola(janela.width);
	jogador.movimentaJogador(isDireita, isEsquerda, canvas.width);

	// verifica colisão
	colisaoBolaJogador();
	colisaoBolaInimigos();

	// desenha
	janela.desenhaJanela();
	bola.desenhaBola();
	jogador.desenhaJogador()
	inimigos.desenhaInimigos();
}

function colisaoBolaJogador() {
	if (bola.posY + bola.raio > canvas.height) {
		if (bola.posX + bola.raio > jogador.posX
				&& bola.posX - bola.raio < jogador.posX + jogador.width) {
			bola.velocidadeY = -bola.velocidadeY;
		} else {
			gameOver();
		}
	}
}

function colisaoBolaInimigos() {
	for (var i = 0; i < alvos.length; i++) { // percorre as linhas da matriz
		for (var j = 0; j < alvos[i].length; j++) { // percorre as colunas da matriz
			if (alvos[i][j] == 1) { // verifica se o alvo ainda está vivo

				var alvoX = (j * (inimigos.width + inimigos.DISTANCIA)) + inimigos.DISTANCIA;
				var alvoY = (i * (inimigos.height + inimigos.DISTANCIA)) + inimigos.DISTANCIA;

				if (bola.posX > alvoX && bola.posX < alvoX + inimigos.width) {
					// verifica se a bola está entre a esquerda e a direita do alvo

					if (/*colisaoAlvoCima(alvoY) || */colisaoAlvoBaixo(alvoY + inimigos.height)) {
						// verifica se houve colisão no topo ou no fundo

						alvos[i][j] = 0;
						bola.velocidadeY = -bola.velocidadeY;

					}

				}/* else if (bola.posY > alvoY && bola.posY < alvoY + inimigos.height) {
					// verifica se a bola está entre o topo e o fundo do alvo

					if (colisaoAlvoEsquerda(alvoX) || colisaoAlvoDireita(alvoX + inimigos.width)) {
						// verifica se houve colisão nas laterais

						alvos[i][j] = 0;
						bola.velocidadeX = -bola.velocidadeX;

					}
				}*/

			}
		}
	}
}

function colisaoAlvoEsquerda(left) {
	return bola.posX + bola.raio > left && bola.velocidadeX > 0;
}

function colisaoAlvoDireita(rigth) {
	return bola.posX - bola.raio < rigth && bola.velocidadeX < 0;
}

function colisaoAlvoBaixo(bottom) {
	return (bola.posY - bola.raio < bottom) && bola.velocidadeY < 0;
}

function colisaoAlvoCima(top) {
	return (bola.posY + bola.raio > top) && bola.velocidadeY > 0;
}

function gameOver() {
	
	clearInterval(0);
	reloadPage();
}

//The Treta has been planted
init();
