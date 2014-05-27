Game.Menu = function (game) { };

Game.Menu.prototype = {

	create: function () {

	   	game.add.sprite(0, 0, 'abertura');

	    //curto = game.add.text(850, 20, '(a) Pulo curto ', { font: '15px Nunito', fill: '#FFFFFF' });
	    //longo = game.add.text(850, 40, '(s) Pulo longo', { font: '15px Nunito', fill: '#FFFFFF' });

		// iniciar = game.add.sprite(30, h-200,'iniciar');
		// iniciar.animations.add('run');
		// iniciar.animations.play('run', 10, true);

 		game.time.events.repeat(Phaser.Timer.SECOND/5, 100, this.iniciarBlink, this);

		creditos = game.add.text(880, 30, '(c) Créditos');

	    //	creditos align
	    creditos.anchor.set(0.5);
	    creditos.align = 'center';

	    //	Font style
	    creditos.font = 'Nunito';
	    creditos.fontSize = 22;
	    creditos.fontWeight = 'bold'; 		
		creditos.stroke = '#FFFFFF';
	    creditos.strokeThickness = 3;
	    creditos.fill = '#000000';	    

		i = game.input.keyboard.addKey(Phaser.Keyboard.I);
		c = game.input.keyboard.addKey(Phaser.Keyboard.C);
	},
	update: function () {
		
		if (i.isDown) {
			game.state.start('Tutorial');
	    }else if(c.isDown){
	    	game.state.start('Creditos');
	    }
			
	},	
	iniciarBlink: function(){
		
		iniciar = game.add.text(260, 450, 'Aperte a tecla i para iniciar');

	    //	Center align
	    iniciar.anchor.set(0.5);
	    iniciar.align = 'center';

	    //	Font style
	    iniciar.font = 'Nunito';
	    iniciar.fontSize = 32;
	    iniciar.fontWeight = 'bold';

	    if(iniciarBlink){
		    //	Stroke color and thickness
		    iniciar.stroke = '#000000';
		    iniciar.strokeThickness = 3;
		    iniciar.fill = '#FFFFFF';	
		    // iniciarBlink = false;	    	
	    }else{
		    //	Stroke color and thickness
		    iniciar.stroke = '#000000';
		    iniciar.strokeThickness = 3;
		    iniciar.fill = '#3faad6';	
		    // iniciarBlink = true;	    	
	    }

	    iniciarBlink = !iniciarBlink;

	    
	},

};
