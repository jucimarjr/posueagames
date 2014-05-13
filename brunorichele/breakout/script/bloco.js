var bloco = {
	w : 64, //largura
	h : 64,  //altura	
	numLinhas : 3, // 5 linhas, 10 blocos por linha
	numColunas : 16, //n��mero de linhas e colunas dos blocos, largura: 60, altura: 20;
	bloco : null,
	blocos : [], // matriz bidimensional para guardar os blocos
	canvas :null,
	context :null,
	//imagem: null,

	
	init : function()
	{
		//canvas = document.getElementById("canvas");
		//context = canvas.getContext("2d");
		//var imagem = new Image();
		//imagem.src = "bloco-verde.png";
		for(var linha = 0; linha < bloco.numLinhas; linha++){
			bloco.blocos[linha] = [];
			for(var coluna = 0; coluna < bloco.numColunas; coluna++){
				bloco.blocos[linha][coluna] = 0;
				//bloco.imagem = new Image();
				//bloco.imagem.src = "assets/robo1.png"; //bloco.color(linha); 
				//console.log("Cor"+ bloco.color(linha));
			}
		}			
	},
	
	render : function(root){
		// Blocos - desenhados linha por linha
		var img = null;
		for(var linha = 0; linha < bloco.numLinhas; linha++){
			for(var coluna = 0; coluna < bloco.numColunas; coluna++){			
				if(bloco.blocos[linha][coluna] == 0){				
					//root.fillStyle = bloco.color(linha);
				//	root.fillRect(bloco.w * coluna, bloco.h * linha, bloco.w, bloco.h); 
					
					img = new Image();
					img.src = bloco.color(linha);
					root.drawImage(img, bloco.w * coluna, bloco.h * (linha + 3));
					//preenchimento
				}
			}
		}	
	},	

	color : function(linha)
	{
		switch(linha) {
			case 0:
				return "assets/robo2_morte.png";
				break;
			case 1:
				return "assets/robo2.png";
				break;
			case 2:
				return "assets/robo1.png";
				break;
			case 3:
				return "assets/robo1_morte.png";
				break;
			case 4:
				return "assets/robo1.png";
				break;
			default:
				return "assets/robo2.png";
		}
	}
};