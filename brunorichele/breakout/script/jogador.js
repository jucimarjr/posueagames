// Jogador (JS object)
var jogador = {
	w: 90, //largura
	h: 20, //altura
	x: 0,
	y: 0,
	velocidade: null,
	resetX : null,
	resetY : null,
	derrota : null,
	vitoria : null,
	init : function(width, height){
		jogador.resetX = (width / 2) - (jogador.w / 2);
		jogador.resetY = height - jogador.h
		jogador.derrota = false;		
		jogador.vitoria = false;
		jogador.clear();
	},
	
	render : function(root){
		root.fillStyle = "black";
		root.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);	
	},
 	
    atualizar : function(width){
			// Movimentar jogador
		if(tecla.direita != tecla.esquerda){
			if(tecla.esquerda){
				if(jogador.x > 0){
					jogador.x -= jogador.velocidade;
				}
			}
			else {
				if(jogador.x < width - jogador.w){
					jogador.x += jogador.velocidade;
				}
			}
		}
	},
	
	clear : function()
	{
		jogador.x = jogador.resetX;
		jogador.y = jogador.resetY;
		jogador.velocidade = 10;
	}
};