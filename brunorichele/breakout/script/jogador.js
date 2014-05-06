// Jogador (JS object)
var jogador = {
	w: 90, //largura
	h: 20, //altura
	x: 0,
	y: 0,
	velocidade: 20,
	
    atualizarJogador : function(){
			// Movimentação jogador
		if(tecla.direita != tecla.esquerda){
			if(tecla.esquerda){
				if(jogador.x > 0){
					jogador.x -= jogador.velocidade;
				}
			}
			else {
				if(jogador.x < canvas.width - jogador.w){
					jogador.x += jogador.velocidade;
				}
			}
		}
	}
};