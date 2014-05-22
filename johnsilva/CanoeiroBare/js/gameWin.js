var gameWin = { preload: preload, create: create, start: start };

function preload() {
    game.load.image('splashscreen', 'assets/splashscreen.png');
    game.load.image('bt_iniciar', 'assets/iniciarjogo_288-58.png');
    console.log("menu preload");
}

//Tela de Menu
function create() {
    console.log("menu create");
    var splashscreen = game.add.sprite(0, 0, 'splashscreen');

    var style = { font: "36px Arial", fill: "#ffffff" };
    var style2 = { font: "20px Arial", fill: "#ffffff" };

    var text = game.add.text(game.world.width / 2, game.world.height / 2, "Voce Venceu!!", style);
    text.anchor.setTo(0.5, 0.5);

    var text = game.add.text(game.world.width / 2, game.world.height / 2 + 50, "Aperte o SPACE para reiniciar o Jogo", style2);
    text.anchor.setTo(0.5, 0.5);

    var spacebar_keyboar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar_keyboar.onDown.add(start, this);
}


// Começa o jogo
function start() {
    score = 0;
    console.log("menu start");
    game.state.start('fase');
}
