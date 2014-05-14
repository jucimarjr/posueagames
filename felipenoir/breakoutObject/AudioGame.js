//Classe para Audio
function AudioGame(){
	var audioColisao = document.createElement("audio");
	audioColisao.preload = "auto";	
	audioColisao.src = "assets/colisao.mp3";
	audioColisao.load();

	this.tocarColisao = function(){
		audioColisao.play()
	}
}
