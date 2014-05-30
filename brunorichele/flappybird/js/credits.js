var creditos = {
    preload: function(){
		game.scale.minWidth = 320;
		game.scale.minHeight = 240;
		game.scale.maxWidth = 960;
		game.scale.maxHeight = 600;
		
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	game.scale.setScreenSize();
				
        game.load.image('menucreditos', 'assets/menucredito_960-600.jpg');
        game.load.image('botaovoltar', 'assets/botaovoltar_150-120.png');
    },
    create: function(){
        game.add.sprite(0, 0, 'menucreditos');
		
		var buttonVoltar = game.add.button(415, 420, 'botaovoltar', this.startMenu, 0, 0, 0);
		buttonVoltar.input.useHandCursor = true;
    },
    startMenu: function(){
        game.state.start('menu');
    }	
}