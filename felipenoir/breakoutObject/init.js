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
// Gera posicão aleatória para bola
var posicaoXBola = geraPosicaoRandom(canvas.width);
var bola = new Bola(ctx, posicaoXBola, canvas.width, canvas.height);
var jogador = new Jogador(ctx, canvas.width, canvas.height);
var inimigos = new Inimigos(ctx, canvas.width, canvas.height);
var alvos = inimigos.inimigos;

var isDireita = false;
var isEsquerda = false;

// Usuário movendo
document.addEventListener('keydown', function(evt) {
	if (evt.keyCode == 39)
		isDireita = true;
	else if (evt.keyCode == 37)
		isEsquerda = true;
}, false);

// Usuário parado
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
	if (bola.posY + bola.raio > canvas.height - jogador.height) {
		if (bola.posX > jogador.posX
				&& bola.posX < jogador.posX + jogador.width) {
			bola.velocidadeY = -bola.velocidadeY;
		} else {
			gameOver();
		}
	}
}

function colisaoBolaInimigos() {
	for (var i = 0; i < alvos.length; i++) {
		for (var j = 0; j < alvos[i].length; j++) {
			if (alvos[i][j] == 1) {
				var alvoX = j * inimigos.width;
				if (bola.posX + bola.raio > alvoX
						&& bola.posX - bola.raio < alvoX + inimigos.width) {
					var alvoY = i * inimigos.height;
					if (colisaoAlvo(alvoY, alvoY + inimigos.height)) {
						alvos[i][j] = 0;
						bola.velocidadeY = -bola.velocidadeY;
					}
				}
			}
		}
	}
}

function colisaoAlvo(top, bottom) {
	return /* colisaoAlvoCima(top) || */colisaoAlvoBaixo(bottom);
}

function colisaoAlvoBaixo(bottom) {
	return (bola.posY - bola.raio < bottom) && bola.velocidadeY < 0;
}

function colisaoAlvoCima(top) {
	return (bola.posY + bola.raio > top) && bola.velocidadeY > 0;
}

function gameOver() {
	clearInterval(0);
}

// The Treta has been planted
init();
