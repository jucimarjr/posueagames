// TODO:
// movimentação da bola
// colisões com blocos
// remover bloco quando colidir -> setar posição na matriz para null
// pontuação
// gráficos
// o que mais for necessário
var game = {
	canvas : null, // Canvas
	context : null, // Objetos do HTML5 Canvas
	height : null,
	width : null,
	//tecla : null, // tecla sendo pressionada no momento (esquerda/direita)
	blocos : [], // matriz bidimensional para guardar os blocos
	numLinhas : 5, // 5 linhas, 10 blocos por linha
	numColunas : 10, //número de linhas e colunas dos blocos, largura: 60, altura: 20;
	
	init : function(){
		
		game.setup();

		// Intervalo do Gameloop: 30 fps
		setInterval(game.gameLoop, 1000 / 30);	
	},
	
	setup : function(){
		game.canvas = document.getElementById("canvas");
		game.context = game.canvas.getContext("2d");
		game.height = game.canvas.height;
		game.width = game.canvas.width; 
		
		jogador.x = game.width / 2 - jogador.w / 2;
		jogador.y = game.height - jogador.h;

		bola.x = canvas.width / 2;
		bola.y = jogador.y - bola.raio;

		// Blocos
		for(var linha = 0; linha < game.numLinhas; linha++){
			game.blocos[linha] = [];
			for(var coluna = 0; coluna < game.numColunas; coluna++){
				game.blocos[linha][coluna] = {
					x: 60 * coluna, // X varia junto com a coluna
					y: 20 * linha, // Y varia junto com a linha
					w: 60, //largura
					h: 20  //altura
				}
			}
		}

		game.bind();	
	},
	
	bind : function(){
		// Eventos
		tecla.listenerKey();
	},	
	
	gameLoop : function(){
		//Atualiza posição do jogador 
		jogador.atualizarJogador();
		
		// Processar entrada do jogador e atualizar estado do jogo
		game.atualizarEstadoJogo();
		// Atualizar tela do jogo
		game.atualizarTela();
	},

	 atualizarEstadoJogo : function(){

		// Movimentação bola
		if(bola.baixo){
			// Colisão jogador
			if(bola.y + bola.raio >= jogador.y && bola.x - bola.raio >= jogador.x && bola.x + bola.raio <= jogador.x + jogador.w){
				bola.baixo = false;
			}
			bola.y += bola.velocidade;
		}
		else {
			bola.y -= bola.velocidade;
		}
		// Colisão paredes
		if(bola.x - bola.raio <= 0 || bola.x + bola.raio >= canvas.width){
			bola.angulo *= -1;
		}
		// TODO: no momento a colisão com o piso está rebatendo a bola, mas
		// deverá contar como derrota
		if(bola.y - bola.raio <= 0 || bola.y + bola.raio >= canvas.height){
			bola.baixo = !bola.baixo;
		}
		// TODO: colisão blocos
		bola.x += bola.angulo;
	},

	desenharBloco : function(linha, coluna){
		// desenhar apenas blocos que não sejam null
		// (ou seja, não colidiram com a bola)
		// cada linha terá uma cor, como o Breakout de Atari
		game.bloco = game.blocos[linha][coluna];
		if(game.bloco != null) {
			// devemos adicionar um contorno?
			//context.strokeRect(bloco.x, bloco.y, bloco.w, bloco.h); //contorno
			if(linha == 0) game.context.fillStyle = "green";
			else if(linha == 1) game.context.fillStyle = "blue";
			else if(linha == 2) game.context.fillStyle = "red";
			else if(linha == 3) game.context.fillStyle = "yellow";
			else if(linha == 4) game.context.fillStyle = "orange";
			game.context.fillRect(game.bloco.x, game.bloco.y, game.bloco.w, game.bloco.h); //preenchimento
		}
	},

	atualizarTela : function(){
		// Limpeza da tela
		game.context.clearRect(0, 0, game.width, game.height);

		// Jogador
		game.context.fillStyle = "black";
		game.context.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

		// Bola
		game.context.fillStyle = "red";
		game.context.beginPath();
		game.context.arc(bola.x, bola.y, bola.raio, 0, Math.PI*2, true);
		game.context.closePath();
		game.context.fill();

		// Blocos - desenhados linha por linha
		for(var linha = 0; linha < game.numLinhas; linha++){
			for(var coluna = 0; coluna < game.numColunas; coluna++){
				game.desenharBloco(linha, coluna);
			}
		}
	} 
};
