var creditos = {
    preload: function(){
        game.load.image('menucreditos', 'assets/menucredito_960-600.jpg');
        game.load.image('botaovoltar', 'assets/botaovoltar_150-120.png');
    },
    create: function(){
        game.add.sprite(0, 0, 'menucreditos');
        var buttonVoltar = game.add.sprite(415, 420, 'botaovoltar');
        buttonVoltar.inputEnabled = true;
        buttonVoltar.input.useHandCursor = true; 
        buttonVoltar.events.onInputDown.add(this.startMenu, this);
    },
    startMenu: function(){
        game.state.start('menu');
    }
}