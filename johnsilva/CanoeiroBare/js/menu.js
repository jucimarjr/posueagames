var GameMenu = { preload: preload, create: create, start: start};

function preload() {
    game.load.image('splashscreen', 'assets/bg/jungleriver_900-1200.jpg');
    game.load.image('btIniciar', 'assets/botoes/startgame_350-120.png');
    game.load.image('btTutorial', 'assets/botoes/tutorial_350-120.png');
}

//Tela de Menu
function create() {
    var splashscreen = game.add.sprite(0, 0, 'splashscreen');

    var bt_iniciar = game.add.button(450, 300, 'btIniciar', start, this, 1, 0, 1);
    bt_iniciar.anchor.set(0.5, 0.5);

    var bt_tutorial = game.add.button(450, 440, 'btTutorial', start, this, 1, 0, 1);
    bt_tutorial.anchor.set(0.5, 0.5);

    var spacebar_keyboar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar_keyboar.onDown.add(start, this);
}


// Começa o jogo
function start() {
    console.log("menu start");
    game.state.start('fase');
}

