window.onload=function(){
	main.init();
};

var main = {
	init : function(){
		main.bind();
	},
	bind : function(){
		document.getElementById("jogar").onclick = function(){
			main.jogar();
		}
	},
	jogar : function(){
		document.getElementById("menu").style.display = "none";
		document.getElementById("canvas").style.display = "block";
		game.init();
	}
};