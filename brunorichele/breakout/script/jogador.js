// Jogador (JS object)
var jogador = {
	w: 128, //largura
	h: 48, //altura
	x: 0,
	y: 0,
	vidas: 4,
	velocidade: null,
	resetX : null,
	resetY : null,
	derrota : null,
	vitoria : null,
	imagem : null,

	init : function(width, height){
		jogador.resetX = (width - jogador.w) / 2;
		jogador.resetY = height - jogador.h;
		jogador.derrota = false;
		jogador.vitoria = false;
		jogador.imagem = new Image();
		jogador.imagem.src = "assets/nave_bloco.png";
		jogador.clear();
	},

	render : function(root){
		root.drawImage(jogador.imagem, jogador.x , jogador.y);
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