var gameWin = { preload: preload, create: create, start: start };

function preload() {
    game.load.image('splashscreen', 'assets/bg/jungleriver_900-1200.jpg');
    game.load.image('win', 'assets/botoes/win_350-200.png');
    game.load.image('play', 'assets/botoes/play_100-70.png');
    console.log("menu preload");
}

//Tela de Menu
function create() {
    console.log("menu create");
    var splashscreen = game.add.sprite(0, 0, 'splashscreen');
    var btWin = game.add.sprite(280, 100, 'win');
    var btPlay = game.add.button(450, 300 + 100, 'play', start, this, 1, 0, 1);
    btPlay.anchor.set(0.5, 0.5);

    var spacebar_keyboar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar_keyboar.onDown.add(start, this);
}


// Começa o jogo
function start() {
    score = 0;
    console.log("menu start");
    game.state.start('fase');
}

