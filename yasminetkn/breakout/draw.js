



function Jogador(jogadorPosX, jogadorPosY, barraWidth, barraHeight){

    this.x = jogadorPosX;
    this. y = jogadorPosY;

    this.largura = barraWidth;
    this.altura = barraHeight;

    this.draw = function(){
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.largura, this.altura);
    };

    this.mexer = function(valorX){
        this.x+=valorX;
    };

}

function Bola(x, y, raio){

    valor = Math.random();

    this.x = x;
    this.y = y;
    this.raio = raio;
    this.direcaoX = (valor>0.5)?20:-20;
    this.direcaoY = -20;

    this.draw = function(){
        context.beginPath();// inicia o modo de desenho
        context.arc(this.x, this.y, this.raio, 0, Math.PI * 2, true); // desenha o cï¿½rculo desejado com as coordenadas no centro.
        context.closePath();// finaliza o caminho (opcional)
        context.fill();
    };

    this.mover = function(){
        this.x+=this.direcaoX;
        this.y+=this.direcaoY;

        if (this.y + this.direcaoY - this.raio < 0
            // verifica se bateu em algum bloco por baixo ou por cima e muda a direcao
            || colisaoComTijoloY()){
        	bater.play();
            this.direcaoY = -this.direcaoY;
        }

        // Se bateu pela esquerda ou direita inverte o sentido da bola
        if ((this.x + this.direcaoX - this.raio < 0) ||(this.x + this.direcaoX + this.raio > canvas.width)
            || colisaoComTijoloX()){
        	bater.play();
            this.direcaoX = -this.direcaoX;
        }
    };

    this.inverterX = function(){
        this.direcaoX *= -1;
    };

    this.inverterY = function(){
        this.direcaoY *= -1;
    };

    this.verificaColisao = function(){
    	if((this.x-this.raio)<=0 || (this.x+this.raio)>=canvas.width){
			bater.play();
			this.inverterX();	
		}
		
		if((this.y-this.raio)<=0 || detectarColisaoJogadorEBola()){
			bater.play();
			
			if(detectarColisaoJogadorEBola()){
				// Se bateu por cima do jogador
				if (this.y + this.direcaoY + this.raio >= jogador.y){
				    // e bateu ateh a metade da largura
				    if (this.x + this.direcaoX >= jogador.x &&
				        this.x + this.direcaoX <= (jogador.x + (jogador.largura)/2)){
				        this.inverterX();
				        bater.play();
				        //senao se bateu do meio pro fim
				    }else if (this.x + this.direcaoX >= jogador.x &&
					        this.x + this.direcaoX > (jogador.x + (jogador.largura)/2) && 
					        this.x + this.direcaoX <= (jogador.x + (jogador.largura))-canvas.width){
				    	this.inverterX()* (-1);
				    	bater.play();
				    	
				    }
				}
			}
			this.inverterY();
		}
		//Se a posicao da bola for maior ou igual � altura do canvas finaliza a partida
		if((this.y-this.raio)>=canvas.height){
            gameOver = true;		
		}
		
	};
}

function colisaoComTijoloX(){
    var bateuX = false;
    for (var i=0; i < blocos.length; i++) {
        for (var j=0; j < blocos[i].length; j++) {
            if (blocos[i][j]){ // verifica se o bloco ainda ta aparecendo
                var blocoX = j * blocoWidth;
                var blocoY = i * blocoHeight;
                if (
                // se bateu pela esquerda
                    ((bola.x + bola.direcaoX + bola.raio >= blocoX) &&
                        (bola.x + bola.raio <= blocoX))
                        ||
                        // se bateu pela direita
                        ((bola.x + bola.direcaoX - bola.raio<= blocoX + blocoWidth)&&
                            (bola.x - bola.raio >= blocoX + blocoWidth))
                    ){
                    if ((bola.y + bola.direcaoY -bola.raio<= blocoY + blocoHeight) &&
                        (bola.y + bola.direcaoY + bola.raio >= blocoY)){
                        // apaga o bloco
                        quebraTijolo(i,j);

                        bateuX = true;
                    }
                }
            }
        }
    }
    return bateuX;
}

function colisaoComTijoloY(){
    var bateuY = false;
    for (var i=0; i < blocos.length; i++) {
        for (var j=0; j < blocos[i].length; j++) {
            if (blocos[i][j]){ // caso o bloco esteja visivel verifica
                var blocoX = j * blocoWidth;
                var blocoY = i * blocoHeight;
                if (
                // se bater por baixo
                    ((bola.y + bola.direcaoY - bola.raio <= blocoY + blocoHeight) && (bola.y - bola.raio >= blocoY + blocoHeight))
                        ||// Se bater por cima
                        ((bola.y + bola.direcaoY + bola.raio >= blocoY) && (bola.y + bola.raio <= blocoY ))){
                    if (bola.x + bola.direcaoX + bola.raio >= blocoX &&
                        bola.x + bola.direcaoX - bola.raio<= blocoX + blocoWidth){
                        // metodo de detruir a bola
                        quebraTijolo(i,j);
                        bateuY = true;
                    }
                }
            }
        }
    }
    return bateuY;
}

function quebraTijolo(i,j){
    // ao bater atribui o valor zero ao bloco
    blocos[i][j] = 0;
    //marcar o ponto aki
    pontuacao+=1;
    setarMaiorPontuacao();
    quebrar.play();
}


function drawPlacar(){
    context.font = "20pt bold Helvetica";// tamanho e fonte para desenhar o texto
    context.fillStyle = "#FFFFFF";// cor preta (opcional)
    context.strokeStyle = "#FFFFFF";
    context.fillText("Pontuação: "+pontuacao, (canvas.width)-180, canvas.height-10); // escreve texto na tela na posi��o desejada
    context.strokeText("Pontuação: "+pontuacao, (canvas.width)-180, canvas.height-10);
    
    context.fillText("Recorde: "+maiorPontuacao,15,canvas.height-10);
    context.strokeText("Recorde: "+maiorPontuacao,15,canvas.height-10);
}


var blocosPorLinha = 8;
var blocoHeight = 20;
var blocoWidth = canvas.width/blocosPorLinha;

var blocos = [
    [1,1,1,1,1,1,1,2],
    [1,1,3,1,0,1,1,1],
    [0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,2,1,1,0,3,1,1],
    [2,1,2,2,3,1,3,1],
];

function criadorDeBlocos(){
    for (var i=0; i < blocos.length; i++) {
        for (var j=0; j < blocos[i].length; j++) {	
        	desenhaBlocos(j,i,blocos[i][j]);
        }
    }
}

// desenha um bloco
function desenhaBlocos(x,y,type){  
    switch(type){ // pega o valor da matriz e desenha um cor
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
            break;
 
    }
    if (type){
        //Desenha o retangulo
        context.fillRect(x*blocoWidth,y*blocoHeight,blocoWidth,blocoHeight);
        // desenha o contorno do retangulo
        context.strokeRect(x*blocoWidth+1,y*blocoHeight+1,blocoWidth-2,blocoHeight-2);
    }
}   


//Cria o objeto tijolo
function Tijolo(x,y,largura, altura,type){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;

    // pega o array de bloco atravÃ©s do desenhaBloco e preenche a tela()
   
}