




    var canvas, context,
    barraWidth, barraHeight,
    jogadorPosX, jogadorPosY,bolaRaio, bolaPosX, bolaPosY,
    pontosJogador, pontosOponente,teclaCimaPressionada, teclaBaixoPressionada, oponenteParaCima, velocidadeOponente,
    bolaRaio, bolaParaDireita, bolaAngulo,velocidadeBola,teclaEsquerdaPressionada,teclaDireitaPressionada,
    jogador, bola, mapaTeclas, estadoBola, tempo, tijolo, tijolos, score =0;

    mapaTecla = new Array();
    velocidadeJogador = 20;
    window.onload = init;
    window.onkeydown = teclaPressionada;
    window.onkeyup = teclaSolta;
    tamanhoBarra = 120;
    alturaBarra = 20;
    estadoBola = 0;
    tempo = 0;
    bola = new Bola(200, 560, 7);
    var tijolos = new Array();

    var bouncingSound = new Audio("sound/bounce.ogg");
    var breakingSound = new Audio("sound/break.ogg");
    var starterSound = new Audio("sound/skratch.wav");
    var gameOver = new Audio("sound/skratch17.wav");
    var zap = new Audio("sound/zap.wav");

	function init(){

		canvas = document.getElementById("canvas");// procura o canvas
        context = canvas.getContext("2d");// recupera o contexto 2d
        jogador = new Jogador((canvas.width - tamanhoBarra)/2, canvas.height-alturaBarra, tamanhoBarra, alturaBarra);
        jogador.draw();
		pontosJogador = 0;

		criadorDeBlocos();
        starterSound.play();
        setInterval(gameLoop, 30);// chama a function gameLoop a cada 30 frames
	}


	function teclaPressionada(tecla){
		mapaTecla[tecla.keyCode] = true;
	}

	function teclaSolta(tecla){
		mapaTecla[tecla.keyCode] = false;
	}

	function paint(){
		 context.clearRect(0, 0, canvas.width, canvas.height);// limpa a tela antes de desenhar
		 jogador.draw();
		 bola.draw();
		 criadorDeBlocos();
	}

	//Funcao pra gerar um valor de limite
	function clamp(val, min, max){
		return Math.max(min, Math.min(max,val));
	}

	function detectarColisaoJogadorEBola(){
		var xMaisProximo = clamp(bola.x, jogador.x, (jogador.x+jogador.largura));
		var yMaisProximo = clamp(bola.y, jogador.y, (jogador.y+jogador.altura));

		var distanciaX = bola.x - xMaisProximo;
		var distanciaY = bola.y - yMaisProximo;
		var distancia = (distanciaX*distanciaX)+(distanciaY*distanciaY);

		return distancia < (bola.raio*bola.raio);
	}

	function gameLoop() {

		if(mapaTecla[37] == true){

			if(jogador.x>0){
				jogador.mexer(-velocidadeJogador);
			}

		}else if (mapaTecla[39] == true){
			if(jogador.x < (canvas.width - tamanhoBarra)){
				jogador.mexer(velocidadeJogador);
            }

		}

		bola.mover();
		bola.verificaColisao();

		paint();

    }