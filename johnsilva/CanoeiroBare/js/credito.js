var credito = { preload: preload, create: create};

function preload() {
    game.load.image('initCredits', 'assets/bg/creditos_900_600.jpg');
    game.load.spritesheet('backBtn', 'assets/botoes/back_350-120.png', 350, 120);
}

//Tela de Menu
function create() {
    game.add.sprite(0, 0, 'initCredits');

    var btnBack = game.add.button(450 + 25, 480, 'backBtn', back, this, 1, 0, 1);
    btnBack.anchor.set(0.5, 0.5);
}


// Começa o jogo
function back() {
    console.log("menu start");
    game.state.start('menu');
}

