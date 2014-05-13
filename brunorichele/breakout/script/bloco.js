var bloco = {
	w : 64, //largura
	h : 64,  //altura
	numLinhas : 3, // 5 linhas, 10 blocos por linha
	numColunas : 16, //n��mero de linhas e colunas dos blocos, largura: 60, altura: 20;
	bloco : null,
	blocos : [], // matriz bidimensional para guardar os blocos
	canvas :null,
	context :null,
	imagens: null,

	init : function()
	{
		for(var linha = 0; linha < bloco.numLinhas; linha++){
			bloco.blocos[linha] = [];
			for(var coluna = 0; coluna < bloco.numColunas; coluna++){
				bloco.blocos[linha][coluna] = 0;
			}
		}
		bloco.imagens = [];
		bloco.imagens[0] = bloco.criarImagem("assets/robo2_morte.png");
		bloco.imagens[1] = bloco.criarImagem("assets/robo2.png");
		bloco.imagens[2] = bloco.criarImagem("assets/robo1.png");
		bloco.imagens[3] = bloco.criarImagem("assets/robo1_morte.png");
		bloco.imagens[4] = bloco.criarImagem("assets/robo1.png");
		bloco.imagens[5] = bloco.criarImagem("assets/robo2.png");
	},

	render : function(root){
		// Blocos - desenhados linha por linha
		var img = null;
		for(var linha = 0; linha < bloco.numLinhas; linha++){
			for(var coluna = 0; coluna < bloco.numColunas; coluna++){
				if(bloco.blocos[linha][coluna] == 0){
					root.drawImage(bloco.color(linha), bloco.w * coluna, bloco.h * (linha + 3));
				}
			}
		}
	},

	color : function(linha)
	{
		switch(linha) {
			case 0:
				return bloco.imagens[0];
				break;
			case 1:
				return bloco.imagens[1];
				break;
			case 2:
				return bloco.imagens[2];
				break;
			case 3:
				return bloco.imagens[3];
				break;
			case 4:
				return bloco.imagens[4];
				break;
			default:
				return bloco.imagens[5];
		}
	},
	criarImagem: function(src){
		img = new Image();
		img.src = src;
		return img;
	}
};