var template = {
	inicio : null,
	init : function(){
		
		inicio
	},

	image : function(path){
		img = new Image ();
		img.src = path; 
		return img;
	},
	
	menu : function(){
		if(jogador.status == true){
		}else{
		}
	
	},
	
	btnInicio : function(){
		game.btnJogar = new Image();
		game.btnJogar.src = "assets/telajogo_jogar.png";	
		
		game.context.drawImage(game.btnInicio, (game.width - 10)/2, 400);
	},
	
	btnJogar : function(){
		game.btnInicio = new Image();
		game.btnInicio.src = "assets/telajogo_inicio.png";
		
		game.context.drawImage(game.btnJogar, (game.width - 300)/2, 400);
	}
};