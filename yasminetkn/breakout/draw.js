
function drawPlayer(){
	// Jogador e Oponente
    context.fillStyle = "black"
    context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeight);//desenha jogador

}

function drawBola(){
	// Bola
    context.fillStyle = "orange"
    context.beginPath();// inicia o modo de desenho
    context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o c�rculo desejado com as coordenadas no centro.
    context.closePath();// finaliza o caminho (opcional)
    context.fill();
}

function drawPlacar(){
		// PLACAR
		
	var pontosA = pontosJogador;

	if (pontosA < 10) {// se o n�mero de pontos for menor que 10, colocamos o zero � esquerda
		pontosA = "0" + pontosA;
	}
	
	context.font = "42pt Helvetica";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#000000";// cor preta (opcional)
	context.fillText(pontosA, (canvas.width / 2) - 70, 50); // escreve texto na tela na posi��o desejada
}


var blocosPorLinha = 8;
var blocoHeight = 20;
var blocoWidth = canvas.width/blocosPorLinha;

var blocos = [
    [1,1,1,1,1,1,1,2],
    [1,1,3,1,0,1,1,1],
    [2,1,2,1,2,1,0,1],
    [1,2,1,1,0,3,1,1]
];


// pega o array de bloco através do desenhaBloco e preenche a tela()
function criadorDeBlocos(){

    for (var i=0; i < blocos.length; i++) {
        for (var j=0; j < blocos[i].length; j++) {
            desenhaBloco(j,i,blocos[i][j]);
        }
    }
}


// funcao que desenha cada bloco
function desenhaBloco(x,y,type){
    switch(type){
        case 1:
            context.fillStyle = 'orange';
            break;
        case 2:
            context.fillStyle = 'rgb(100,200,100)';
            break;
        case 3:
            context.fillStyle = 'rgba(50,100,50,.5)';
            break;
        default:
            context.clearRect(x*blocoWidth,y*blocoHeight,blocoWidth,blocoHeight);
            break;

    }
    if (type){
        //Draw rectangle with fillStyle color selected earlier
        context.fillRect(x*blocoWidth,y*blocoHeight,blocoWidth,blocoHeight);
        // Also draw blackish border around the brick
        context.strokeRect(x*blocoWidth+1,y*blocoHeight+1,blocoWidth-2,blocoHeight-2);
    }
}
