Game.Menu = function (game) { };

Game.Menu.prototype = {

	create: function () {

	   	game.add.sprite(0, 0, 'abertura');

	    curto = game.add.text(850, 20, '(a) Pulo curto ', { font: '15px Nunito', fill: '#FFFFFF' });
	    longo = game.add.text(850, 40, '(s) Pulo longo', { font: '15px Nunito', fill: '#FFFFFF' });

		iniciar = game.add.sprite(30, h-200,'iniciar');
		iniciar.animations.add('run');
		iniciar.animations.play('run', 10, true);

		i = game.input.keyboard.addKey(Phaser.Keyboard.I);
	},
	update: function () {
		
		if (i.isDown) {
			game.state.start('Play');
	    }
			
	},	

};
