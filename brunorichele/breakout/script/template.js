var template = {
	imgJogar : "assets/telajogo_jogar.png",
	imgInicio : "assets/telajogo_inicio.png",
	inicio : null,
	jogar : null,
	root : null,
	init : function(root){
		template.jogar = template.image(imgJogar);
		template.inicio = template.image(imgInicio);
	},

	image : function(path){
		img = new Image ();
		img.src = path; 
		return img;
	},
	
	menu : function(){
		template.btnJogar();
		template.btnInicio();
		if(jogador.status == true){
		}else{
		}
	
	},
	
	btnInicio : function(){
		root.drawImage(game.btnInicio, (game.width - 10)/2, 400);
	},
	
	btnJogar : function(){
		root.drawImage(game.btnJogar, (game.width - 300)/2, 400);
	}
};