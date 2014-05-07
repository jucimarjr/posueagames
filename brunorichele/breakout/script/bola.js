// Bola (JS Object)
var bola = {
	raio: 10, 
	x: null, 
	y: null,
	baixo: false,
	angulo: 5,
	velocidade: 10,
	resetX : null,
	resetY : null,
	countFail : null,
	init : function(width, y){//largura do canvas e y do jogador
		bola.resetX = bola.x = width / 2;
		bola.resetY = bola.y = y - bola.raio;
		bola.countFail = 0;
	},
	render : function(root){
		root.fillStyle = "red";
		root.beginPath();
		root.arc(bola.x, bola.y, bola.raio, 0, Math.PI*2, true);
		root.closePath();
		root.fill();
	},
	atualizar : function(y, x, w, width, height, polling){		
		// Movimentação bola
		if(bola.baixo){
			bola.colisaoJogador(y, x, w);
			bola.y += bola.velocidade;
		}
		else {
			bola.y -= bola.velocidade;
		}
		// Colisão paredes
		if(bola.x - bola.raio <= 0 || bola.x + bola.raio >= width){
			bola.angulo *= -1;
		}
		//Colisao bloco
		bola.colisaoBloco();
		//Colisao chao
		bola.colisaoChao(height, polling);
		//Altera o angulo da bola
		bola.x += bola.angulo;	
	},
	clear : function()
	{
		bola.x = bola.resetX;
		bola.y = bola.resetY;	
		bola.baixo = false;
		bola.angulo = 5;
		bola.velocidade = 10;		
	},
	colisaoJogador : function(y, x, w){
		// Colisão jogador
		if((bola.y + bola.raio >= y) && 
			(bola.x - bola.raio >= x) && 
			(bola.x + bola.raio <= x + w)){
			bola.baixo = false;
		//	console.log("Colisao jogador");
		}	
	},
	colisaoBloco : function(){
		//Colisao bloco
		if(bola.y - bola.raio <= 100 && bola.y >= 0){			
			var linha  = Math.floor(((bola.y - bola.raio)-20)/20);
			var coluna = Math.floor((bola.x - bola.raio)/60);
			console.log("linha: " + linha + "coluna:" + coluna);

			if(coluna >= 0 && linha >= 0){
				if(bloco.blocos[linha][coluna] == 0){
					bola.baixo = !bola.baixo;
					bloco.blocos[linha][coluna] = 1;
				}
			}else{
				bola.baixo = !bola.baixo;
			}
		}	
	},
	colisaoChao : function(height, polling){
		//Colisao chao
		if(bola.y + bola.raio >= height){
			bola.baixo = !bola.baixo;
			console.log("Colisao chao");
			bola.clear(); // A bola retorna a posicao inicial
			jogador.clear(); // O jogador retorna a posicao inicial
			bola.countFail++;
			console.log(bola.countFail);
			if(bola.countFail == 4){
				jogador.derrota = true;
				clearInterval(polling);
			}
		}	
	}	
};