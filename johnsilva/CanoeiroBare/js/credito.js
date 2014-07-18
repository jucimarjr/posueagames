var credito = { create: create};


//Tela de Menu
function create() {
    var background = game.add.sprite(0, 0, 'initCredits');
    background.inputEnabled = true;
    background.events.onInputDown.add(back, this);
}


// Começa o jogo
function back() {
    console.log("menu start");
    game.state.start('menu');
}

