Game.Menu = function (game) { };

Game.Menu.prototype = {

	create: function () {

	   	game.add.sprite(0, 0, 'abertura');

	    //curto = game.add.text(850, 20, '(a) Pulo curto ', { font: '15px Nunito', fill: '#FFFFFF' });
	    //longo = game.add.text(850, 40, '(s) Pulo longo', { font: '15px Nunito', fill: '#FFFFFF' });

		// iniciar = game.add.sprite(30, h-200,'iniciar');
		// iniciar.animations.add('run');
		// iniciar.animations.play('run', 10, true);
	   	
	   	buttonIniciar = game.add.button(150, 400, 'buttonIniciar', this.iniciarGame, this, 2, 1, 0);
	   	buttonCreditos = game.add.button(300, 400, 'buttonCreditos', this.creditosGame, this, 2, 1, 0);
	   	
	   //	buttonCreditos = game.add.button(game.world.centerX - 95, 500, 'buttonCreditos', iniciarGame, this, 2, 1, 0);

 		//game.time.events.repeat(Phaser.Timer.SECOND/5, 100, this.iniciarBlink, this);
	   	iniciar = game.add.text(866, 25, '(i) Iniciar');
		creditos = game.add.text(880, 50, '(c) Créditos');

	    //	Iniciar align
		iniciar.anchor.set(0.5);
		iniciar.align = 'center';

	    //	Font style
		iniciar.font = 'Nunito';
		iniciar.fontSize = 22;
		iniciar.fontWeight = 'bold'; 		
		iniciar.stroke = '#FFFFFF';
		iniciar.strokeThickness = 3;
		iniciar.fill = '#000000';	  
	    
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
	
	iniciarGame: function() {
		game.state.start('Tutorial');
	},
	
	creditosGame: function() {
		game.state.start('Creditos');
	},
	update: function () {
		
		if (i.isDown) {
			game.state.start('Tutorial');
	    }else if(c.isDown){
	    	game.state.start('Creditos');
	    }
			
	},	
//	iniciarBlink: function(){
//		
//		iniciar = game.add.text(260, 450, 'Aperte a tecla i para iniciar');
//
//	    //	Center align
//	    iniciar.anchor.set(0.5);
//	    iniciar.align = 'center';
//
//	    //	Font style
//	    iniciar.font = 'Nunito';
//	    iniciar.fontSize = 32;
//	    iniciar.fontWeight = 'bold';
//
//	    if(iniciarBlink){
//		    //	Stroke color and thickness
//		    iniciar.stroke = '#000000';
//		    iniciar.strokeThickness = 3;
//		    iniciar.fill = '#FFFFFF';	
//		    // iniciarBlink = false;	    	
//	    }else{
//		    //	Stroke color and thickness
//		    iniciar.stroke = '#000000';
//		    iniciar.strokeThickness = 3;
//		    iniciar.fill = '#3faad6';	
//		    // iniciarBlink = true;	    	
//	    }
//
//	    iniciarBlink = !iniciarBlink;
//
//	    
//	},

};
