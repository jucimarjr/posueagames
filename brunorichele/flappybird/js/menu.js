var menu = {
    preload: function(){
		game.scale.minWidth = 320;
		game.scale.minHeight = 240;
		game.scale.maxWidth = 960;
		game.scale.maxHeight = 600;
		
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	game.scale.setScreenSize();
		
        game.load.image('telamenu', 'assets/menu_960-600.jpg');
        game.load.image('botaojogar', 'assets/botaojogar_150-120.png');
        game.load.image('botaocreditos', 'assets/botaocredito_150-120.png');
        game.load.image('progressbar', 'assets/ProgressBar_960-30.png');
    },
    create: function(){
        game.add.sprite(0, 0, 'telamenu');

		var buttonJogar = game.add.button(320, 420, 'botaojogar', this.startGame, 0, 0, 0);
		buttonJogar.input.useHandCursor = true; 
				
		var buttonCreditos = game.add.button(510, 420, 'botaocreditos', this.showCredits, 0, 0, 0);
		buttonCreditos.input.useHandCursor = true; 
		
				
		//game.input.onDown.add(this.tap, this);
    },
    startGame: function(){
        game.state.start('game');
    },
    showCredits: function(){
        game.state.start('creditos');
    },
	tap : function(pointer){
		offsetWidth = document.getElementById("phaser-game").offsetWidth;

		if((pointer.x > 320 && pointer.x < 470) && 
		(pointer.y > 420 && pointer.y < 540) ){
			game.state.start('game');
		}
		if((pointer.x > 510 && pointer.x < 660) && 
		(pointer.y > 420 && pointer.y < 540) ){
        	game.state.start('creditos');
		}
		
		if(offsetWidth < 480){
			if((pointer.x > 120 && pointer.x < 200) && 
			(pointer.y > 150 && pointer.y < 220) ){
				game.state.start('game');
			}
			if((pointer.x > 210 && pointer.x < 290) && 
			(pointer.y > 150 && pointer.y < 220) ){
				game.state.start('creditos');
			}			
		}		
	}
}