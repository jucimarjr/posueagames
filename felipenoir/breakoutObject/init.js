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
			bola.posY = jogador.posY - bola.raio;
			bola.velocidadeY = -bola.velocidadeY;
		} else {
			gameOver();
		}
	}
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
			if (alvos[i][j] == 1) { // verifica se o alvo ainda está vivo

				var alvoX = (j * (inimigos.width + inimigos.DISTANCIA)) + inimigos.DISTANCIA;
				var alvoY = (i * (inimigos.height + inimigos.DISTANCIA)) + inimigos.DISTANCIA;

				if (houveColisao(alvoX, alvoY)) {

					var x1 = Math.abs(alvoX - (bola.posX + bola.raio));
					var x2 = Math.abs((alvoX + inimigos.width) - (bola.posX - bola.raio));
					if(x1 > x2)
						x1 = x2;

					var y1 = Math.abs(alvoY - (bola.posY + bola.raio));
					var y2 = Math.abs((alvoY + inimigos.height) - (bola.posY - bola.raio));
					if (y1 > y2)
						y1 = y2;

					if (x1 == y1) {
						bola.velocidadeX = -bola.velocidadeX;
						bola.velocidadeY = -bola.velocidadeY;
					} else if (x1 < y1)
						bola.velocidadeX = -bola.velocidadeX;
					else
						bola.velocidadeY = -bola.velocidadeY;

					alvos[i][j] = 0;
					break;

				}

			}
		}
	}
}

function gameOver() {

	clearInterval(0);
	reloadPage();
}

//The Treta has been planted
init();
