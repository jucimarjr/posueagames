function desenharBola(){
	context.fillStyle = "white";
	context.beginPath();// inicia o modo de desenho
	context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o círculo desejado com as coordenadas no centro.
	context.closePath();// finaliza o caminho (opcional)
	context.fill();
}

function desenharBarra(){
	//desenhar(jogadorPosX, jogadorPosY, barraWidth, barraHeight, "pink");
	context.drawImage(bgBarra, jogadorPosX, jogadorPosY);
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
	/*context.moveTo(bordaW,h); 
	context.lineTo(bordaW,dy+bordaW); 
	context.lineTo(w - bordaW,dy+bordaW); 
	context.lineTo(w - bordaW,h);
	context.lineTo(w,h);
	context.lineTo(w,dy);*/
	context.moveTo(0,dy+bordaW);
	context.lineTo(w,dy+bordaW);
	context.lineTo(w,dy);
	context.lineTo(0,dy);
	context.closePath(); 
	context.fillStyle = "#5c7a54"; 
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
	//desenhar(bloco.x, bloco.y, bloco.w, bloco.h, bloco.style);
	context.drawImage(bgBloco, bloco.x, bloco.y);
}

function atualizarPlacar(){
	var placar = pontos;
	if (placar < 10) {// se o número de pontos for menor que 10, colocamos o zero á esquerda
		placar = "00" + placar;
	}else if(placar<100){
		placar = "0" + placar;
	}

	context.font = "30pt ObelixPro";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#silver";// cor preta (opcional)
	context.fillText(placar, (w/3), 45);
	context.fillText(vidas, (w/3)+250, 45);
	context.fillText(fase, (w/3)+400, 45);
}

function gameOver(){
	context.drawImage(bgGameOver,0,0);
	audioGameOver.play();
	context.font = "30pt ObelixPro";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#white";// cor preta (opcional)
	context.fillText("F5 para reiniciar", w/4, 350);
	
	flagGameOver = true;
}