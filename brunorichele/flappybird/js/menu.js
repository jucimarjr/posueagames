var menu = {
    preload: function(){
        game.load.image('telamenu', 'assets/menu_960-600.jpg');
        game.load.image('botaojogar', 'assets/botaojogar_150-120.png ');
        game.load.image('botaocreditos', 'assets/botaocredito_150-120.png');
    },
    create: function(){
        game.add.sprite(0, 0, 'telamenu');
        var buttonJogar = game.add.sprite(320, 420, 'botaojogar');
        buttonJogar.inputEnabled = true;
        buttonJogar.input.useHandCursor = true; 
        buttonJogar.events.onInputDown.add(this.startGame, this);
        var buttonCreditos = game.add.sprite(510, 420, 'botaocreditos');
        buttonCreditos.inputEnabled = true;
        buttonCreditos.input.useHandCursor = true; 
        buttonCreditos.events.onInputDown.add(this.showCredits, this);
    },
    startGame: function(){
        game.state.start('game');
    },
    showCredits: function(){
        game.state.start('creditos');
    }

}