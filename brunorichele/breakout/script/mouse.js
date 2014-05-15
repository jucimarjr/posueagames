/**
 * @class mouse
 * @description Classe responsável por implementar os métodos e disponibilizar a posicao do ponteiro do mouse
 * @author Bruno Araujo <bruno.araujo@gmail.com>, Bruno Richele <bruno.richele@gmail.com>, Cristina Araujo <crisoara@gmail.com>, Raymundo Junior <raymundojunior@gmail.com>
 * @version 1.0
 */
var mouse = {
	x : null,
	y : null,
	currentX : null,
	currentY : null,
	listener : function(root, exec)
	{
		mouse.findPosition(root);
		document.addEventListener('click', mouse.onClick, false); //Ativa quando a tecla é pressionada
	},
	onClick : function (e)
	{
		mouse.x = e.pageX - mouse.currentX;
		mouse.y = e.pageY - mouse.currentY;

		console.log("mouse x: " + mouse.x + "mouse y: " + mouse.y);

		if(mouse.x > 388 && mouse.x < 635 && mouse.y > 401 && mouse.y < 506){
			game.init();
			console.log("Iniciar novo jogo");
		}else
		if(mouse.x > 388 && mouse.x < 635 && mouse.y > 550 && mouse.y < 654){
			main.inicio();
			console.log("Menu do jogo");
		}	
	},
	findPosition : function (obj)
	{
		var curleft = curtop = 0;

		if (obj.offsetParent)
		{
			do
			{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}
			while (obj = obj.offsetParent);
		}
		mouse.currentX = curleft;
		mouse.currentY = curtop;
	}
};