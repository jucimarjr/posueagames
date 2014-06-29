/*global State, Config, Phaser*/

State.GameOver = function (game) {
	"use strict";
	this.game = game;
};

State.GameOver.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		musicGameOver = this.game.add.audio(Config.game.audio.gameOver.key);
		musicGameOver.play();

		this.game.add.sprite(Config.gameOver.x, Config.gameOver.y, 'gameover');
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ENTER, Phaser.Keyboard.M]);
		
		var style = { font: '30px "04B_03__"', fill: "#FFFFFF" };
		var x = 480, y = 347;
		var textHighscore;
		var text;
		
		if(music!=null){
			music.pause();
			music = null;
		}
		
		textHighscore = this.scoreTransformeGO(score);
//		if (score < 10){
//			textHighscore = "00:0" + score.toFixed(0);
//		} else{
//			if (score >= 60){
//			   var min = (score/60);
//			   var seg = (min - min.toFixed(0) )*100;
//				textHighscore =  (min<10?'0':'') + min.toFixed(0) + ':'  + (seg.toFixed(0)==0?'0':'') + seg.toFixed(0) ;
//			}else textHighscore =  '00:' + score.toFixed(0) ;
//		}
		text = this.game.add.text(x, y, "You survived little more than " + textHighscore + " min in the forest...", style);
		text.anchor.setTo(0.5, 0.5);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			if(musicGameOver != null){
				musicGameOver.pause();
				musicGameOver = null;
			}
			this.game.state.start('Game');
			
		}else if (this.game.input.keyboard.isDown(Phaser.Keyboard.M)){
			//this.game.state.restart(true, true);
			if(musicGameOver != null){
				musicGameOver.pause();
				musicGameOver = null;
			}
			this.game.state.start('Menu');
		}
	},
	scoreTransformeGO: function(timeGame){
    	var textHighscore;
    	timeGame = timeGame.toFixed(0);
    	
    	if (timeGame < 10){
			textHighscore = "00:0" + timeGame;
		} else{
			if (timeGame >= 60){
			   var min = (timeGame/60);
			   var valor = min.toString().replace(/,.*/,'');
			   min = parseInt(valor);
			   var seg = timeGame % 60;
			   textHighscore =  (min < 10 ? '0' : '') + min + ':'  + (seg < 10 ? '0' : '') + seg;
			}else textHighscore =  '00:' + timeGame;
		}
    	return textHighscore;
    },

};