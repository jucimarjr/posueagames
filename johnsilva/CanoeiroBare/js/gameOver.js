var gameOver = { preload: preload, create: create, start: start };

function preload() {
    game.load.image('splashscreen', 'assets/bg/gameover_900-600.jpg');
    game.load.image('btGameOver', 'assets/botoes/gameover_350-280.png');
    game.load.image('btRanking', 'assets/botoes/rank_100-70.png');
    //game.load.image('play', 'assets/botoes/play_100-70.png');
    game.load.image('logoMain', 'assets/bg/logo.png');
    game.load.image('logoBarra', 'assets/bg/logo_barra-160-64.png');

    //sprites
    game.load.spritesheet('play', 'assets/botoes/play_100-70.png', 100, 70, 2);
    game.load.spritesheet('canoemandead', 'assets/sprite/gameover/canoeiro_138-146-13.png', 138, 146, 13);
    console.log("game over preload");
}

//Tela de Menu
function create() {
    console.log("game over create");
    var splashscreen = game.add.sprite(0, 0, 'splashscreen');
    //var mainLogo = game.add.sprite(250, 10, 'logoMain');
    var btGO = game.add.sprite(280, 200, 'btGameOver');
    //var btRank = game.add.sprite(340, 410, 'btRanking');

    var dead = game.add.sprite(450, 100, 'canoemandead'); //515,350
    dead.anchor.setTo(0.5, 0.5);
    dead.animations.add('dead');
    dead.animations.play('dead', 10, true);

    //Logo na Barra Lateral
    var loguinho = game.add.sprite(90, 570, 'logoBarra');
    loguinho.anchor.setTo(0.5, 0.5);

    var style = { font: "28px Arial Bold", fill: "#ffffff" };
    var styleBig = { font: "40px Arial Bold", fill: "#ffffff" };

    if (score > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", score);
        var text = game.add.text(450, 340, 'Novo Record ' + localStorage.getItem("highscore"), style);
        text.anchor.setTo(0.5, 0.5);
        var text = game.add.text(450, 400, localStorage.getItem("highscore"), styleBig);
        text.anchor.setTo(0.5, 0.5);
    }
    else {
        var text = game.add.text(460, 340, 'Pontuação: ' + score, style);
        text.anchor.setTo(0.5, 0.5);
        var text = game.add.text(450, 390, 'Record: ' + localStorage.getItem("highscore"), style);
        text.anchor.setTo(0.5, 0.5);
    }

    var btPlay = game.add.button(460, 480, 'play', start, this, 1, 0, 1);
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
