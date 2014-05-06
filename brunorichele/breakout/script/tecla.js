var tecla = {
    direita: false,
	esquerda: false,
	
	listenerKey : function()
	{
        document.addEventListener('keyup', tecla.keyUp, false);		
		document.addEventListener('keydown', tecla.keyDown, false);
	},

	// Códigos de teclas:
	// Esquerda: 37
	// Direita: 39
	 keyDown : function(e){
		if(e.keyCode == 37){
			tecla.esquerda = true;
		}
		else if(e.keyCode == 39){ 
			tecla.direita = true;
		}
	},

	 keyUp : function(e){
		if(e.keyCode == 37){
			tecla.esquerda = false;
		}
		else if(e.keyCode == 39){
			tecla.direita = false;
		}
	}	
};