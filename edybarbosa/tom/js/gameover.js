Game.Gameover = function (game) { };

Game.Gameover.prototype = {

	create: function () {
	 
		restart = game.add.text(w/2, 200, '(r) Reiniciar ');
	    restart.anchor.set(0.5);
	    restart.align = 'center';
	    restart.font = 'Nunito';
	    restart.fontSize = 75;
	    restart.fontWeight = 'bold';	
	    restart.stroke = '#FFFFFF';
	    restart.strokeThickness = 4;
	    restart.fill = '#000000';	
	
		r = game.input.keyboard.addKey(Phaser.Keyboard.R);
		
		gameOver = false; 
	},
	update: function(){
		if(r.isDown){
            game.state.start('Tutorial');  
        }
	},

};
