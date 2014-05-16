//Classe para Audio
function AudioGame(){

	//Audi Jogo
	var audioJogo = document.createElement("audio");
	audioJogo.preload = false;	
	audioJogo.src = "assets/skrillex.mp3";
	audioJogo.volume = 0.8;
	audioJogo.load();
	IS_PLAYNG = false;

	this.tocarColisao = function(){
		var audioColisao = document.createElement("audio");
		audioColisao.src = "assets/colisao.mp3";
		audioColisao.play();
	}

	this.paraAudioColisao = function(){
		console.log("parou");
		audioColisao.pause();
	}

	this.tocarAudioJogo = function(){
		if(IS_PLAYNG === false){
			audioJogo.currentTime = 67;
		  	IS_PLAYNG = true
			audioJogo.play();
		}	
	}

	this.pararAudioJogo = function(){
		if(IS_PLAYNG === true){
			IS_PLAYNG = false;
			audioJogo.pause();
		}	
	}
}
