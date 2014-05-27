Game.Creditos = function (game) { };

Game.Creditos.prototype = {

	create: function () {
		game.add.sprite(0, 0, 'abertura');

		//game.add.sprite(300, 300, 'creditos');

		voltar = game.add.text(880, 30, '(v) Voltar ');
	    voltar.anchor.set(0.5);
	    voltar.align = 'center';
	    voltar.font = 'Nunito';
	    voltar.fontSize = 22;
	    voltar.fontWeight = 'bold';	
	    voltar.stroke = '#FFFFFF';
	    voltar.strokeThickness = 3;
	    voltar.fill = '#000000';		    
	
		v = game.input.keyboard.addKey(Phaser.Keyboard.V);
	},
	update: function(){
		if(v.isDown){
            game.state.start('Menu');  
        }
	},

};
