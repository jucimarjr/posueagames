
    var canvas, context,
    barraWidth, barraHeight,
    jogadorPosX, jogadorPosY,bolaRaio, bolaPosX, bolaPosY,
    pontosJogador, pontosOponente,teclaCimaPressionada, teclaBaixoPressionada, oponenteParaCima, velocidadeOponente,
    bolaRaio, bolaParaDireita, bolaAngulo,velocidadeBola,teclaEsquerdaPressionada,teclaDireitaPressionada, teclaPause,
    jogador, bola, mapaTeclas, estadoBola, tempo, tijolo, tijolos, score = 0, gameOver;

    mapaTecla = new Array();
    velocidadeJogador = 20;
    window.onload = init;
    window.onkeydown = teclaPressionada;
    window.onkeyup = teclaSolta;
    tamanhoBarra = 120;
    alturaBarra = 35;
    estadoBola = 0;
    tempo = 0;
    var gameLoop;
    var temTijolos = false;
    bola = new Bola(200, 560, 7);
    var tijolos = new Array();
    gamePaused = true;
    teclaPause = false;
    gameOver = false;
    
    var pontuacao = 0;
    var maiorPontuacao;
    
    dado = parseInt(localStorage.getItem("maiorPontuacao"));
    maiorPontuacao = (isNaN(dado))?0:dado;
    
    var quebrar = new Audio("sound/break.ogg");
    var bater = new Audio("sound/bounce.ogg");
    var starterSound = new Audio ("sound/skratch1.wav");//som de start do gamer
    var gameOverSound = new Audio("sound/alns-gameover.wav");/* ("sound/skratch17.wav")*/;//som do game over

	function init(){

		canvas = document.getElementById("canvas");// procura o canvas
        context = canvas.getContext("2d");// recupera o contexto 2d
        jogador = new Jogador((canvas.width - tamanhoBarra)/2, (canvas.height-alturaBarra) - 30, tamanhoBarra, alturaBarra);
        jogador.draw();

        pontosJogador = 0;

		criadorDeBlocos();

        starterSound.play();

        document.addEventListener('keydown',keyDown,false);
        gameLoop= setInterval(animacao, 30);// chama a function gameLoop a cada 30 frames

	}
	
	function end(){//gameOver

        context.fillStyle = "white";
        context.font = "40pt Arial";
		context.fillText("- Game Over - ",(canvas.width/2)-200, canvas.height/2);
		context.fillText("- Aperte a tecla F5 para uma nova partida - ",(canvas.width)-1024, (canvas.height/2)+60);
        gameOverSound.play();
        clearInterval(gameLoop);

	}

	function teclaPressionada(tecla){
		mapaTecla[tecla.keyCode] = true;
	}

	function teclaSolta(tecla){
		mapaTecla[tecla.keyCode] = false;
	}

    function keyDown(e) {
        if (e.keyCode == 27) { // esc
            teclaPause = !teclaPause;
        }
    }
    
    function setarMaiorPontuacao(){
  	  if(pontuacao>maiorPontuacao){
  	     maiorPontuacao = pontuacao;
  	     localStorage.setItem("maiorPontuacao", pontuacao);
  	  }
  	}

	function paint(){
		 context.clearRect(0, 0, canvas.width, canvas.height);// limpa a tela antes de desenhar
		 jogador.draw();
		 bola.draw();
		 criadorDeBlocos();

		 drawPlacar();

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

	function animacao() {
        if(!gameOver){
            if(!teclaPause){
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
        }
        else{
            end();
        }
    }