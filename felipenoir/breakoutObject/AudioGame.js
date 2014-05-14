//Classe para Audio
function AudioGame(){
	//Audio colisao
	var audioColisao = document.createElement("audio");
	audioColisao.preload = false;	
	audioColisao.src = "assets/colisao.mp3";
	audioColisao.load();

	//Audio Jogo
	var audioJogo = document.createElement("audio");
	audioJogo.preload = false;	
	audioJogo.src = "assets/skrillex.mp3";
	audioJogo.load();
	IS_PLAYNG = false;

	this.tocarColisao = function(){
		
		setTimeout(function() { audioColisao.play(); },1);
	}

	this.tocarAudioJogo = function(){
		if(IS_PLAYNG == false){
			console.log("tocando");
			audioJogo.currentTime = 67;
		  	IS_PLAYNG = true
			audioJogo.play();
		}	
	}
}
