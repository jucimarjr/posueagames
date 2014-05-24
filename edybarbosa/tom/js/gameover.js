Game.Gameover = function (game) { };

Game.Gameover.prototype = {

	create: function () {
		game.add.sprite(0, 0, 'gameover');

		fim = game.add.text(w/2, 400, '(r) Reiniciar ');
	    fim.anchor.set(0.5);
	    fim.align = 'center';
	    fim.font = 'Nunito';
	    fim.fontSize = 40;
	    fim.fontWeight = 'bold';	
	    fim.stroke = '#FFFFFF';
	    fim.strokeThickness = 3;
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
