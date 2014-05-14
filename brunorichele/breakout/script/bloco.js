var bloco = {
	w : 64, // largura do bloco
	h : 64, // altura do bloco
	numLinhas : 3, // 5 linhas, 10 blocos por linha
	numColunas : 16, //número de linhas e colunas dos blocos
	blocos : [], // matriz bidimensional para guardar os blocos
	imagens: null, // vetor para armazenar as imagens a serem usadas

	// Inicialização da matriz de bloco e carregamento das imagens
	init : function()
	{
		for(var linha = 0; linha < bloco.numLinhas; linha++){
			bloco.blocos[linha] = [];
			for(var coluna = 0; coluna < bloco.numColunas; coluna++){
				bloco.blocos[linha][coluna] = 0;
			}
		}
		bloco.imagens = [];
		bloco.imagens[0] = bloco.createImage("assets/robo2_morte.png");
		bloco.imagens[1] = bloco.createImage("assets/robo2.png");
		bloco.imagens[2] = bloco.createImage("assets/robo1.png");
		bloco.imagens[3] = bloco.createImage("assets/robo1_morte.png");
		bloco.imagens[4] = bloco.createImage("assets/robo1.png");
		bloco.imagens[5] = bloco.createImage("assets/robo2.png");
	},

	// Desenho dos blocos, iterando pelas linhas e colunas
	render : function(root){
		var img = null;
		for(var linha = 0; linha < bloco.numLinhas; linha++){
			for(var coluna = 0; coluna < bloco.numColunas; coluna++){
				if(bloco.blocos[linha][coluna] == 0){
					root.drawImage(bloco.getImage(linha), bloco.w * coluna, bloco.h * (linha + 2));
				}
			}
		}
	},

	// Retorna a imagem correspondente ao identificador passado
	getImage : function(linha)
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

	// Instancia uma imagem
	createImage: function(src){
		img = new Image();
		img.src = src;
		return img;
	}
};