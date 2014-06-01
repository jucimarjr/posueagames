Game.Tutorial = function (game) { };

Game.Tutorial.prototype = {

	create: function () {

	   	// Help curto
		curto = game.add.text(w/2, 200, '(a) Pulo curto ');
	    curto.anchor.set(0.5);
	    //curto.align = 'center';
	    curto.font = 'Nunito';
	    curto.fontSize = 60;
	    //curto.fontWeight = 'bold';	
	    curto.stroke = '#FFFFFF';
	    curto.strokeThickness = 4;
	    curto.fill = '#000000';	

	    // Help longo
		curto = game.add.text(w/2, 300 , '(s) Pulo longo ');
	    curto.anchor.set(0.5);
	    //curto.align = 'center';
	    curto.font = 'Nunito';
	    curto.fontSize = 60;
	    //curto.fontWeight = 'bold';	
	    curto.stroke = '#FFFFFF';
	    curto.strokeThickness = 4;
	    curto.fill = '#000000';		

	    game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, this.play, this);

	    metrosPercorridos = 0;

	},
	play: function(){
		game.state.start('Play');
	},

};
