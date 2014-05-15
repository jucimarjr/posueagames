var sound = {
	fxJogador : "audio/brickDeath.mp3",
	fxBloco   : "audio/powerdown.mp3",
	jogador   : null,
	bloco     : null,
		init : function(){
			sound.jogador = new Audio(sound.fxJogador);
		},
		colisaoBloco : function(){
			sound.bloco = new Audio(sound.fxBloco);
			sound.bloco.play();
		},
		colisaoJogador : function(){
			sound.jogador.play();	
		}
};