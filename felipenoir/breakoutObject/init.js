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
	bola.movimentaBola(janela.width);
	jogador.movimentaJogador(isDireita, isEsquerda, canvas.width);

	// Colisão
	colisaoBolaJogador(bola, jogador);
	colisaoBolaInimigos(bola, inimigos);

	janela.desenhaJanela();
	bola.desenhaBola();
	jogador.desenhaJogador()
	inimigos.desenhaInimigos();

}

function colisaoBolaJogador(bola, jogador) {
	if (bola.posY + bola.raio > canvas.height - jogador.height) {
		if (bola.posX > jogador.posX
				&& bola.posX < jogador.posX + jogador.width) {
			bola.velocidadeY = -bola.velocidadeY;
		} else {
			gameOver();
		}
	}
}

function colisaoBolaInimigos(bola, inimigos) {
	var heightTotal = inimigos.height + inimigos.DISTANCIA;
	var widthTotal = inimigos.width + inimigos.DISTANCIA;
	var linha = Math.floor(bola.posY / heightTotal);
	var coluna = Math.floor(bola.posX / widthTotal);
	if (bola.posY < inimigos.QTDCOLUNAS * heightTotal && linha >= 0
			&& coluna >= 0 && inimigos.inimigos[linha][coluna] == 1) {
		// houve uma colisão
		bola.velocidadeY = -bola.velocidadeY;
		inimigos.inimigos[linha][coluna] = 0;
	}

}

function gameOver() {
	clearInterval(0);
}

// The Treta has been planted
init();
