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
	polling : null, //Guarda a instacia do setInterval com gameLoop
	
	init : function(){
		game.canvas = document.getElementById("canvas");
		game.context = game.canvas.getContext("2d");
		game.height = game.canvas.height;
		game.width = game.canvas.width; 
		//Iniciar informacoes do jogador
		jogador.init(game.width, game.height);
		//Iniciar informacoes da bola
		bola.init(game.width, jogador.y);		
		//Iniciar informacoes do bloco
		bloco.init();
		//Inicia a escuta do teclado
		game.bind();
		// Intervalo do Gameloop: 60 fps
		game.polling = setInterval(game.gameLoop, 1000 / 60);
	},
	bind : function(){
		// Eventos
		tecla.listenerKey();
	},	
	gameLoop : function(){
		//Atualiza posi����o do jogador 
		jogador.atualizar(game.width);
		// Atualiza posi����o da bola
		bola.atualizar(jogador.y, jogador.x, jogador.w, game.width, game.height, game.polling);
		// Atualizar tela do jogo
		game.atualizar();
	},
	atualizar : function(){
		// Limpeza da Tela
		game.clear();
		//Desenha Blocos
		bloco.render(game.context);
		//Desenha Jogador
		jogador.render(game.context);
		//Desenha Bola
		bola.render(game.context);
		//Exibi os pontos do usuario
		game.pontuar();
		//Verificar derrota e desenhar na tela
		if(jogador.derrota == true){
			game.derrota();
			game.btnNewGame();
			mouse.listener(canvas);
		}
		//Verificar derrota e desenhar na tela
		if(jogador.vitoria == true){
			game.vitoria();
			game.btnNewGame();
			mouse.listener(canvas);
		}		
	}, 
	clear : function(){
		game.context.clearRect(0, 0, game.width, game.height);		
	},
	vitoria : function(){
		game.context.font = "42px Helvetica";
		game.context.fillStyle = "#000000";
		game.context.fillText("Você venceu!", 180, 250);	
	},
	derrota : function(){
		game.context.font = "42px Helvetica";
		game.context.fillStyle = "#000000";
		game.context.fillText("Você perdeu!", 180, 250);	
	},	
	pontuar : function(){

        var ponto = bola.pontuacao;
            
        if (ponto < 10) {
        	ponto = "0" + ponto;
        }
        
        game.context.font = "42pt Helvetica";
        game.context.fillStyle = "#000000";
        game.context.fillText(ponto + " ", (game.width/2) - 20, 200);
	},
	
	btnNewGame : function(){
		game.context.font = "42px Helvetica";
		game.context.fillStyle = "#000000";
		game.context.fillText("Jogar Novamente", 140, 300);	
	}		
};
