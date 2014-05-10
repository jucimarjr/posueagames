
    var canvas, context,
            barraWidth, barraHeight,
            jogadorPosX, jogadorPosY,bolaRaio, bolaPosX, bolaPosY,
            pontosJogador, pontosOponente,teclaCimaPressionada, teclaBaixoPressionada, oponenteParaCima, velocidadeOponente,
            bolaRaio, bolaParaDireita, bolaAngulo,velocidadeBola,teclaEsquerdaPressionada,teclaDireitaPressionada;
			
			
	function init(){

		canvas = document.getElementById("canvas");// procura o canvas
        context = canvas.getContext("2d");// recupera o contexto 2d
		
		setJogador();
		setBola();
		
		pontosJogador = 0;
		
		document.addEventListener('keyup', keyUp, false);// adiciona evento para keyup
        document.addEventListener('keydown', keyDown, false);// adiciona evento para keydown
        setInterval(gameLoop, 30);// chama a function gameLoop a cada 30 frames
	}
	
	function setJogador(){
		barraWidth = 90;
        barraHeight = 30;

        jogadorPosX = (canvas.width - barraWidth)/2;
        jogadorPosY = canvas.height -barraHeight;

        velocidadeJogador = 15;
        teclaEsquerdaPressionada = false;
        teclaDireitaPressionada = false;
	}
	
	function setBola(){
		bolaRaio = 10;
        bolaPosX = canvas.width;
        bolaPosY = canvas.height / 2;
        bolaParaDireita = false;
        bolaAngulo = Math.floor(Math.random() * 21) - 10;
        velocidadeBola = 15;
	}
	
	function gameLoop() {
        console.log(teclaEsquerdaPressionada)
        if(teclaEsquerdaPressionada){
         if (jogadorPosX > 0) { // se não sair da tela...
           jogadorPosX -= velocidadeJogador;// muda a posição
            }
        }else if (teclaDireitaPressionada){
            if(jogadorPosX < (canvas.width - barraWidth)){
                jogadorPosX += velocidadeJogador;
            }
        }

       if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) {// se a bola bater em cima ou em baixo da tela...
            bolaAngulo = bolaAngulo * -1;// multiplicamos por -1 para inverter o sinal e a direção da bola no eixo Y
        }
        bolaPosY += bolaAngulo;// movemos a bola para cima ou para baixo, de acordo com o cáculo acima

        if (bolaParaDireita) {// se a bola estiver indo para a direita...
            bolaPosX += velocidadeBola;// movemos a bola para a direita
        }
        else {// se estiver indo para a esquerda...
            bolaPosX -= velocidadeBola;// movemos a bola para a esquerda
        }

        // Desenha tudo na tela
        context.clearRect(0, 0, canvas.width, canvas.height);// limpa a tela antes de desenhar
		
		drawPlayer();
		drawBola();
		drawPlacar();
    }