/**
 * @class game
 * @description Classe principal do jogo, contem o ciclo de vida do jogo
 * @author Bruno Araujo <bruno.araujo@gmail.com>, Bruno Richele <bruno.richele@gmail.com>, Cristina Araujo <crisoara@gmail.com>, Raymundo Junior <raymundojunior@gmail.com> 
 * @version 1.0 
 */
var game = {
	canvas  : null, // Canvas
	context : null, // Objetos do HTML5 Canvas
	height  : null,
	width   : null,	
	polling : null,
	init : function(){
		game.canvas = document.getElementById("canvas");
		game.context = game.canvas.getContext("2d");
		game.height = game.canvas.height;
		game.width = game.canvas.width; 
		//Iniciar informacoes do jogador
		jogador.init(game.width, game.height);
		//Iniciar informacoes da bola
		bola.init(game.width, jogador.y);
		//Inicia a escuta do teclado
		game.bind();
		// Intervalo do Gameloop: 30 fps
		game.polling = setInterval(game.gameLoop, 1000 / 30);	
	},
	bind : function(){
		// Eventos
		tecla.listenerKey();
	},	
	gameLoop : function(){
		//Atualiza posição do jogador 
		jogador.atualizar(game.width);
		// Atualiza posição da bola
		bola.atualizar(jogador.y, jogador.x, jogador.w, game.width, game.height, game.polling);
		// Atualizar tela do jogo
		game.atualizar();
	},
	atualizar : function(){
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
