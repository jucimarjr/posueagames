var bloco = {
	w: 60, //largura
	h: 20,  //altura	
	numLinhas : 5, // 5 linhas, 10 blocos por linha
	numColunas : 10, //n��mero de linhas e colunas dos blocos, largura: 60, altura: 20;
	bloco : null,
	blocos : [], // matriz bidimensional para guardar os blocos
	canvas:null,
	context:null,

	
	init : function()
	{
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		//var imagem = new Image();
		//imagem.src = "bloco-verde.png";
		
		for(var linha = 0; linha < bloco.numLinhas; linha++){
			bloco.blocos[linha] = [];
			for(var coluna = 0; coluna < bloco.numColunas; coluna++){
				bloco.blocos[linha][coluna] = 0;				
			}
		}			
	},
	
	render : function(root){
		// Blocos - desenhados linha por linha
		for(var linha = 0; linha < bloco.numLinhas; linha++){
			for(var coluna = 0; coluna < bloco.numColunas; coluna++){			
				if(bloco.blocos[linha][coluna] == 0){				
					root.fillStyle = bloco.color(linha);
					root.fillRect(bloco.w * coluna, bloco.h * linha, bloco.w, bloco.h); 
					
					//preenchimento
				}
			}
		}	
	},	

	color : function(linha)
	{
		switch(linha) {
			case 0:
				return "green";
				break;
			case 1:
				return "blue";
				break;
			case 2:
				return "red";
				break;
			case 3:
				return "yellow";
				break;
			case 4:
				return "orange";
				break;
			default:
				return "black";
		}
	}
};