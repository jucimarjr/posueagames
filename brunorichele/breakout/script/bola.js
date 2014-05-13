// Bola (JS Object)
var bola = {
	raio: 15, 
	x: null, 
	y: null,
	baixo: false,
	angulo: null,
	velocidade: null,
	resetX : null,
	resetY : null,
	countFail : null,
	pontuacao : null,
	randomInit : [-1, 1],
	imagem: null,
	somColisaoBloco: null,
	
	init : function(width, y){//largura do canvas e y do jogador
		bola.resetX = width / 2;
		bola.resetY = y - 2 * bola.raio;
		bola.countFail = 0;
		bola.pontuacao = 0;
		bola.imagem = new Image();
		bola.imagem.src = "assets/bola1.png";
		bola.somColisaoBloco = document.getElementById('colisao');
		bola.clear();
	},
	render : function(root){
		
		root.drawImage(bola.imagem, bola.x , bola.y);
		//root.fillStyle = "red";
		//root.beginPath();
		//root.arc(bola.x, bola.y, bola.raio, 0, Math.PI*2, true);
		//root.closePath();
		//root.fill();
	},
	atualizar : function(y, x, w, width, height, polling){		
		// Movimentar a bola
		if(bola.baixo){
			bola.colisaoJogador(y, x, w);
			bola.y += bola.velocidade;
		}
		else {
			bola.y -= bola.velocidade;
		}
		// Colisao paredes
		//if(bola.x - bola.raio <= 0 || bola.x + bola.raio >= width){
		if(bola.x <= 0 || bola.x + 2* bola.raio >= width){
			bola.angulo *= -1;
		}
		//Colisao bloco
		bola.colisaoBloco(polling);
		
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
		bola.angulo = 5 * bola.randomInit[Math.round(Math.random() * 1)]; // Random inicio da partida
		bola.velocidade = 5;
	},
	colisaoJogador : function(y, x, w){
		// Colisao jogador
	//if((bola.y + bola.raio >= y) && 
		if((bola.y + 2* bola.raio >= y) && 
			(bola.x >= x) &&
			(bola.x <= x + w)){
			bola.baixo = false;
		//	console.log("Colisao jogador");
		}	
	},
	colisaoBloco : function(polling){
		//Colisao bloco
		if(bola.y - bola.raio <= (bloco.h * bloco.numLinhas) + bloco.h * 2 && bola.y >= 0){
			var linha  = Math.floor(((bola.y) - bloco.h) / bloco.h) - 2;
			var coluna = Math.floor((bola.x) / bloco.w);
			console.log("linha: " + linha + "coluna:" + coluna);

			if(coluna >= 0 && linha >= 0){
				if(bloco.blocos[linha][coluna] == 0){
					bola.somColisaoBloco.play();
					bola.baixo = !bola.baixo;
					bloco.blocos[linha][coluna] = 1;
					bola.pontuacao++;
					
					if(bola.pontuacao == bloco.numLinhas * bloco.numColunas){	
						bola.clear(); // A bola retorna a posicao inicial
						jogador.clear(); // O jogador retorna a posicao inicial					
						jogador.vitoria = true;
						clearInterval(polling);
					}
				}
				console.log("Colisao bloco");
			}else{
				bola.baixo = !bola.baixo;
			}
		}	
	},
	colisaoChao : function(height, polling){
		//Colisao chao
//		if(bola.y + bola.raio >= height){
		if(bola.y - bola.raio >= height){
			bola.baixo = !bola.baixo;
			console.log("Colisao chao");
			bola.clear(); // A bola retorna a posicao inicial
			jogador.clear(); // O jogador retorna a posicao inicial
			jogador.vidas--;
			console.log(bola.countFail);
			if(jogador.vidas == 0){
				jogador.derrota = true;
				clearInterval(polling);
			}
		}	
	}	
};