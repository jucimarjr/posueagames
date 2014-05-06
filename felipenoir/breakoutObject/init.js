//Captura o canvas e inicializa o jogo

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
	
var janela = new Janela(ctx,canvas.width,canvas.height);
var bola = new Bola(ctx,canvas.width,canvas.height);
var jogador = new Jogador(ctx,canvas.width,canvas.height);
var inimigos = new Inimigos(ctx,canvas.width,canvas.height);

var isDireita = false;
var isEsquerda = false;

//Usuário movendo
function onKeyDown(evt) {
  if (evt.keyCode == 39) isDireita = true;
  else if (evt.keyCode == 37) isEsquerda = true;
}

//usuário parado
function onKeyUp(evt) {
  if (evt.keyCode == 39) isDireita = false;
  else if (evt.keyCode == 37) isEsquerda = false;
}

document.addEventListener('keyup',onKeyUp,false);
document.addEventListener('keydown',onKeyDown,false);

function init(){
	try{
		setInterval(gameLoop, 10)
	}catch(e){
		console.log("TRETA:" + e.message)
	}
}

function gameLoop(){
	janela.desenhaJanela();
	//BOLA
	bola.desenhaBola(10);
	bola.movimentaBola(janela.width,janela.height);
	
	//JOGADOR
	jogador.desenhaJogador()
	jogador.movimentaJogador(isDireita,isEsquerda);
	
	//INIMIGOS
	inimigos.desenhaInimigos();
	
	//COLISAO
	verificarColisao(bola,jogador);
	verificaColisao(bola,inimigos);
	
	
}

function verificarColisao(bola,jogador){
	if(bola.posX + bola.raio > canvas.width || bola.posX + bola.raio < 0)
		bola.velocidadeX = - bola.velocidadeX
	
	if(bola.posY + bola.raio < 0)
		bola.velocidadeY = - bola.velocidadeY;
	else if(bola.posY + bola.raio > canvas.height){
		if(bola.posX  + bola.raio > jogador.posX && bola.posX + bola.raio < jogador.posX + jogador.width){
			bola.velocidadeY = -bola.velocidadeY;
		}else{
			gameOver();
		}
	}
}

function verificaColisao(bola,inimigos){
	var heightTotal = inimigos.height + inimigos.DISTANCIA;
	var widthTotal = inimigos.width + inimigos.DISTANCIA;
	var linha = Math.floor(bola.posY/heightTotal);
	var coluna = Math.floor(bola.posX/widthTotal);
	if(bola.posY < inimigos.QTDCOLUNAS*heightTotal  && linha >= 0 && coluna >= 0 && inimigos.inimigos[linha][coluna] == 1){
		//Ouve uma colisão
		bola.velocidadeY = -bola.velocidadeY;
		inimigos.inimigos[linha][coluna] = 0;
	}
	
}

function gameOver(){
	clearInterval(0);
}

//The Treta has been planted
init();
