var historia = { preload: preload, create: create, start: start };

var style = { font: "28px Arial Bold", fill: "#ffffff" };
var styleBig = { font: "40px Arial Bold", fill: "#ffffff", stroke: "#000000", strokeThickness: 6 };

function preload() {
    //Imagens - Historia
    game.load.image('inicio', 'assets/bg/history/1.jpg');
    game.load.image('meio', 'assets/bg/history/2.jpg');
    game.load.image('fim', 'assets/bg/history/3.jpg');

}

//Tela de Menu
function create() {
    var inicioHistoria = game.add.sprite(0, 0, 'inicio');
    var text = game.add.text(450, 520, '', styleBig);
    text.anchor.setTo(0.5, 0.5);
    var text = game.add.text(450, 570, '', styleBig);
    text.anchor.setTo(0.5, 0.5);

    setTimeout(curupira, 4000);
}

function curupira() {
    var inicioHistoria = game.add.sprite(0, 0, 'meio');
    var text = game.add.text(450, 520, '', styleBig);
    text.anchor.setTo(0.5, 0.5);
    var text = game.add.text(450, 570, '', styleBig);
    text.anchor.setTo(0.5, 0.5);

    setTimeout(final, 5000);
}

function final() {
    var inicioHistoria = game.add.sprite(0, 0, 'fim');
    var text = game.add.text(450, 520, '', styleBig);
    text.anchor.setTo(0.5, 0.5);
    var text = game.add.text(450, 570, '', styleBig);
    text.anchor.setTo(0.5, 0.5);

    setTimeout(start, 5000);
}

// Começa o jogo
function start() {
    console.log("menu start");
    game.state.start('fase');
}


