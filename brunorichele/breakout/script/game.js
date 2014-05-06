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

	atualizarTela : function(){
		// Limpeza da Tela
		game.clear();
		//Desenha Jogador
		jogador.render(game.context);
		//Desenha Bola
		bola.render(game.context);
		//Desenha Blocos
		bloco.render(game.context);
	}, 
	
	clear : function(){
		game.context.clearRect(0, 0, game.width, game.height);		
	}
};
