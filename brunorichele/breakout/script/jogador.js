// Jogador (JS object)
var jogador = {
	w: 90, //largura
	h: 20, //altura
	x: 0,
	y: 0,
	velocidade: 20,
	resetX : null,
	resetY : null,
	init : function(width, height){
		jogador.resetX = jogador.x = (width / 2) - (jogador.w / 2);
		jogador.resetY = jogador.y = height - jogador.h;
	},
	
	render : function(root){
		root.fillStyle = "black";
		root.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);	
	},
 	
    atualizar : function(width){
			// Movimentação jogador
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
		jogador.velocidade = 20;	
	}
};