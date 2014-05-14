function desenharBola(){
	context.fillStyle = "silver";
	context.beginPath();// inicia o modo de desenho
	context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o círculo desejado com as coordenadas no centro.
	context.closePath();// finaliza o caminho (opcional)
	context.fill();
}

function desenharBarra(){
	desenhar(jogadorPosX, jogadorPosY, barraWidth, barraHeight, "pink");
}
function desenhar(x, y, w, h, style) {
	context.beginPath();
	if (style) {
		context.fillStyle = style;
	}
	context.rect(x, y, w, h);
	context.fill();
}

function desenharBorda() {
	context.beginPath();
	context.moveTo(bordaW,h); 
	context.lineTo(bordaW,dy+bordaW); 
	context.lineTo(w - bordaW,dy+bordaW); 
	context.lineTo(w - bordaW,h);
	context.lineTo(w,h);
	context.lineTo(w,dy);
	context.lineTo(0,dy);
	context.lineTo(0,h);
	context.closePath(); 
	context.fillStyle = "silver"; 
	context.fill();
}

function initBlocos(){
	var x,y;
	y=initDy;
	for(var i=0;i<qtdLinhas;i++){
		blocos[i]=[];
		x=initDx;
		for(var j=0;j<qtdColunas;j++){
			blocos[i][j] = new bloco(x,y,styles[i]);
			x+=blocoW;
		}
		y+=blocoH;
	}
}

function desenharBlocos(){
	for(var i=0;i<qtdLinhas;i++){
		for(var j=0;j<qtdColunas;j++){
			if(blocos[i][j].vivo){
				desenharBloco(blocos[i][j]);
			}
		}
	}
}

function desenharBloco(bloco){
	desenhar(bloco.x, bloco.y, bloco.w, bloco.h, bloco.style);
}

function atualizarPlacar(){
	var placar = pontos;
	if (placar < 10) {// se o número de pontos for menor que 10, colocamos o zero á esquerda
		placar = "00" + placar;
	}else if(placar<100){
		placar = "0" + placar;
	}

	context.font = "30pt Square One";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#silver";// cor preta (opcional)
	context.fillText(placar, (w/3), 45);
	context.fillText(vidas, (w/3)+250, 45);
	context.fillText(fase, (w/3)+400, 45);
}

function gameOver(){
	context.font = "30pt Square One";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#silver";// cor preta (opcional)
	context.fillText("Game Over", w/4, h/2);
	audioGameOver.play();
}