



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
		    		    this.direcaoY = -this.direcaoY;
		    }
		    		 
    		// Se bateu pela esquerda ou direita inverte o sentido da bola
    		if ((this.x + this.direcaoX - this.raio < 0) ||(this.x + this.direcaoX + this.raio > canvas.width)
    			|| colisaoComTijoloX()){ 
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
			this.inverterX();
		}
		
		if((this.y-this.raio)<=0 || detectarColisaoJogadorEBola()){
			this.inverterY();
		}
		
		if((this.y-this.raio)>=canvas.height){
			estado=2;
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
                        explodeBrick(i,j);
 
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
                        explodeBrick(i,j);                         
                        bateuY = true;
                    }                      
                }
            }
        }
    }
    return bateuY;
}
 
function explodeBrick(i,j){
    // ao bater atribui o valor zero ao bloco
    blocos[i][j] = 0;
    //marcar o ponto aki
    score ++;
}



function drawPlacar(){
		// PLACAR
		
	var pontosA = pontosJogador;

	if (pontosA < 10) {// se o nï¿½mero de pontos for menor que 10, colocamos o zero ï¿½ esquerda
		pontosA = "0" + pontosA;
	}
	
	context.font = "42pt Helvetica";// tamanho e fonte para desenhar o texto
	context.fillStyle = "#000000";// cor preta (opcional)
	context.fillText(pontosA, (canvas.width / 2) - 70, 50); // escreve texto na tela na posiï¿½ï¿½o desejada
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

function criadorDeBlocos(){
    for (var i=0; i < blocos.length; i++) {
        for (var j=0; j < blocos[i].length; j++) {
            tijolo = new Tijolo(j, i, blocoWidth, blocoHeight, blocos[i][j]);
            tijolo.desenhaBloco();
        }
    }
}


//Cria o objeto tijolo
function Tijolo(x,y,largura, altura,type){
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	
	// pega o array de bloco atravÃ©s do desenhaBloco e preenche a tela()
	this.desenhaBloco = function(){
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
	            context.clearRect(this.x*largura,this.y*altura,this.largura,this.altura);
	            break;

	    }
	    if (type){
	        //Desenha o retangulo e preenche com a cor selecionada
	        context.fillRect(this.x*this.largura,this.y*this.altura,this.largura, this.altura);
	        // Desenha o contorno do retangulo
	        context.strokeRect(this.x*this.largura+1,this.y*this.altura+1,this.largura-2,this.altura-2);
	    }
	};
}