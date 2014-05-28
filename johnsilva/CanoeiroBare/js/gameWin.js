var gameWin = { preload: preload, create: create, start: start };

function preload() {
    game.load.image('bgGameWin', 'assets/bg/history/4.jpg');
    game.load.spritesheet('mapinguari', 'assets/sprite/mapinguari/mapinguari_71-77-6.png', 71, 77, 6);
    //game.load.image('win', 'assets/botoes/win_350-200.png');
    //game.load.image('play', 'assets/botoes/play_100-70.png');
    //game.load.image('logoMain', 'assets/bg/logo.png');
    console.log("menu preload");
}

//Tela de Menu
function create() {
    console.log("menu create");
    var splashscreen = game.add.sprite(0, 0, 'bgGameWin');
    //var mainLogo = game.add.sprite(250, 10, 'logoMain');
    //var btWin = game.add.sprite(280, 250, 'win');


    var style = { font: "28px Arial Bold", fill: "#000000" };
    var styleBig = { font: "40px Arial Bold", fill: "#000000" };

    if (score > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", score);
        var text = game.add.text(400, 340, 'Novo Record: ' + localStorage.getItem("highscore"), style);
        text.anchor.setTo(0.5, 0.5);
        var text = game.add.text(400, 400, localStorage.getItem("highscore"), styleBig);
        text.anchor.setTo(0.5, 0.5);
    }
    else {
        var text = game.add.text(400, 340, 'Pontuação: ' + score, style);
        text.anchor.setTo(0.5, 0.5);
        var text = game.add.text(400, 390, 'Record: ' + localStorage.getItem("highscore"), style);
        text.anchor.setTo(0.5, 0.5);
    }

    var btPlay = game.add.button(650, 560, 'play', finhised, this, 1, 0, 1);
    btPlay.anchor.set(0.5, 0.5);

    var mapinguariSprite = game.add.sprite(800, 560, 'mapinguari');
    mapinguariSprite.anchor.setTo(0.5, 0.5);
    mapinguariSprite.animations.add('mapi');
    mapinguariSprite.animations.play('mapi', 4, true);
}


// Começa o jogo
function finhised() {
    score = 0;
    console.log("menu start");
    game.state.start('menu');
}

