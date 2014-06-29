/*global State, Config, Phaser*/
var textHighscore;

State.Victory = function (game) {
	"use strict";
	this.game = game;
};

State.Victory.prototype = {
	preload: function () {
		"use strict";
		
	},
	create: function () {
		"use strict";
		this.game.add.sprite(Config.Victory.x, Config.Victory.y, 'victory');
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ENTER]);
		
		var style = { font: '40px "04B_03__"', fill: "#FFFFFF" };
		var x = 498, y = 395;
		var textHighscore ;
		var text;
		
//		if (score < 10){
//			textHighscore = "00:0" + score.toFixed(0);
//		} else{
//			if (score > 60){
//			   var min = (score/60);
//			   var seg = (min - min.toFixed(0) )*100;
//				textHighscore = (min<0?'0':'') + min.toFixed(0) + ':'  + seg.toFixed(0) ;
//			}else textHighscore = "00:" + score.toFixed(0) ;
//		}
		textHighscore = this.scoreTransformeV(score);
		
		this.addHighscore(score);
		
		text = this.game.add.text(x, y, textHighscore, style);
		text.anchor.setTo(0.5, 0.5);  

		this.game.add.button(475, 406, 'twitterbird', this.tweetscore, this);
		
		// this.tweetscore();

	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
//		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Menu');
		}
	},
	addHighscore: function(score){

		var style = { font: '30px "04B_03__"', fill: "#FFFFFF" };

		highscore = localStorage.getItem("highscore");

		if (highscore != null ){
		   if (score < highscore) {
				localStorage.setItem("highscore", score);
				
//				if (score < 10){
//					textHighscore = "00:0" + score.toFixed(0);
//				} else{
//					if (score > 60){
//					   var min = (score/60);
//					   var seg = (min - min.toFixed(0) )*100;
//						textHighscore =  (min<0?'0':'') + min.toFixed(0) + ':'  + seg.toFixed(0) ;
//					}else textHighscore =  '00:' + highscore.toFixed(0) ;
//				}
				textHighscore = this.scoreTransformeV(score);

				this.game.add.text(20, 50, 'Novo Record: ' + textHighscore + ' min' , style);
			}
			else { 
					var highScore = parseFloat(highscore); //string to float
//					if (highScore < 10){
//						textHighscore = "00:0" + highScore.toFixed(0);
//					} else{
//						if (highScore > 60){
//						   var min = (highScore/60);
//						   var seg = (min - min.toFixed(0) )*100;
//							textHighscore =  (min<0?'0':'') + min.toFixed(0) + ':'  + seg.toFixed(0) ;
//						}else textHighscore = '00:' + highScore.toFixed(0) ;
//					}
					
					textHighscore = this.scoreTransformeV(highScore);
					
				this.game.add.text(20, 50, 'Record: ' +  textHighscore + ' min',   style);
			}
		}else {
			localStorage.setItem("highscore", score);
		}
	},
	
		
	tweetscore: function(){
        //share score on twitter
        var tweetbegin = 'http://twitter.com/home?status=';
        var tweettxt = 'I got through the first cave in ArcaneForest in '+textHighscore+' at ' + window.location.href + '.';
        var finaltweet = tweetbegin +encodeURIComponent(tweettxt);
        window.open(finaltweet,'_blank');
    },
    
	scoreTransformeV: function(timeGame){
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