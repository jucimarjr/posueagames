/**
 * @class sound
 * @description Classe responsável por implementar os métodos e tocar os efeitos sonoros
 * @author Bruno Araujo <bruno.araujo@gmail.com>, Bruno Richele <bruno.richele@gmail.com>, Cristina Araujo <crisoara@gmail.com>, Raymundo Junior <raymundojunior@gmail.com>
 * @version 1.0
 */
var sound = {
	fxJogador : "audio/brickDeath.mp3",
	fxBloco   : "audio/powerdown.mp3",
	jogador   : null,
	bloco     : null,
	//Metodo de inicializacao da classe sound 
	init : function(){
		sound.jogador = sound.create(sound.fxJogador);
	},
	//Metodo que cria o audio e retorna a instancia	
	create : function(fx){
		snd = new Audio(fx);
		return snd;
	},	
	//Metodo que cria e toca o audio de colisao com o bloco
	colisaoBloco : function(){
		sound.bloco = sound.create(sound.fxBloco);
		sound.bloco.play();
	},
	//Metodo que toca o audio de colisao com o jogador
	colisaoJogador : function(){
		sound.jogador.play();	
	}
};