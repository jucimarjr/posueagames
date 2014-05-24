Game.Gameover = function (game) { };

Game.Gameover.prototype = {

	create: function () {
	 
		restart = game.add.text(w/2, 200, 'Fim de jogo');
	    restart.anchor.set(0.5);
	    restart.align = 'center';
	    restart.font = 'Nunito';
	    restart.fontSize = 80;
	    restart.fontWeight = 'bold';	
	    restart.stroke = '#FFFFFF';
	    restart.strokeThickness = 4;
	    restart.fill = '#000000';	

		fim = game.add.text(w/2, 300, '(r) Reiniciar ');
	    fim.anchor.set(0.5);
	    fim.align = 'center';
	    fim.font = 'Nunito';
	    fim.fontSize = 50;
	    fim.fontWeight = 'bold';	
	    fim.stroke = '#FFFFFF';
	    fim.strokeThickness = 4;
	    fim.fill = '#000000';		    
	
		r = game.input.keyboard.addKey(Phaser.Keyboard.R);
		
		gameOver = false; 
	},
	update: function(){
		if(r.isDown){
            game.state.start('Tutorial');  
        }
	},

};
