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
		document.getElementById("credito").onclick = function(){
			main.creditos();
		}
		document.getElementById("inicio").onclick = function(){
			main.inicio();
		}
	},
	jogar : function(){
		document.getElementById("menu").style.display = "none";
		document.getElementById("canvas").style.display = "block";
		game.init();
	},
	creditos : function(){
		document.getElementById("links").style.display = "none";
		document.getElementById("creditos").style.display = "block";	
	},
	inicio : function(){
		document.getElementById("creditos").style.display = "none";
		document.getElementById("links").style.display = "block";	
	}
};