/**
 * @class tecla
 * @description Classe responsável por implementar os métodos e escutar eventos do teclado
 * @author Bruno Araujo <bruno.araujo@gmail.com>, Bruno Richele <bruno.richele@gmail.com>, Cristina Araujo <crisoara@gmail.com>, Raymundo Junior <raymundojunior@gmail.com> 
 * @version 1.0 
 */
var tecla = {
    direita: false,
	esquerda: false,
	key : {
		left  : 37, 
		up    : 38, 
		right : 39, 
		down  : 40
	},
	/**
	*@description Método responsável por iniciar a captura dos eventos do teclado 
	*/
	listenerKey : function()
	{
		document.addEventListener('keydown', tecla.keyDown, false); //Ativa quando a tecla é pressionada 
        document.addEventListener('keyup', tecla.keyUp, false);	//Ativa quando a tecla é liberada 	
	},
	/**
	*@description Método que trata a tecla pressionada 
	*/	
	keyDown : function(e){
		if(e.keyCode == tecla.key.left){
			tecla.esquerda = true;
		}
		else if(e.keyCode == tecla.key.right){ 
			tecla.direita = true;
		}
	},
	/**
	*@description Método que trata a tecla quando liberada
	*/	
	keyUp : function(e){
		if(e.keyCode == tecla.key.left){
			tecla.esquerda = false;
		}
		else if(e.keyCode == tecla.key.right){
			tecla.direita = false;
		}
	}	
};