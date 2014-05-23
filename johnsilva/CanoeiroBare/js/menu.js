var GameMenu = { preload: preload, create: create, start: start};

function preload() {
    game.load.image('initBg', 'assets/bg/initBg_900-600.jpg');

    game.load.spritesheet('btIniciar', 'assets/botoes/iniciar-350-120.png', 350, 120, 2);
    game.load.spritesheet('btTutorial', 'assets/botoes/tutorial-350-120.png', 350, 120, 2);
}

//Tela de Menu
function create() {
    var initBg = game.add.sprite(0, 0, 'initBg');

    var bt_iniciar = game.add.button(450, 365, 'btIniciar', start, this, 1, 0, 1);
    bt_iniciar.anchor.set(0.5, 0.5);

    var bt_tutorial = game.add.button(450, 500, 'btTutorial', start, this, 1, 0, 1);
    bt_tutorial.anchor.set(0.5, 0.5);

    var spacebar_keyboar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar_keyboar.onDown.add(start, this);
}


// Começa o jogo
function start() {
    console.log("menu start");
    game.state.start('fase');
}

