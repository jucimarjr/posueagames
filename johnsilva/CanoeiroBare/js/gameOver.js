﻿var gameOver = { preload: preload, create: create, start: start };

function preload() {
    game.load.image('splashscreen', 'assets/bg/jungleriver_900-1200.jpg');
    game.load.image('btGameOver', 'assets/botoes/gameover_350-280.png');
    game.load.image('btRanking', 'assets/botoes/rank_100-70.png');
    console.log("menu preload");
}

//Tela de Menu
function create() {
    console.log("menu create");
    var splashscreen = game.add.sprite(0, 0, 'splashscreen');
    var btGO = game.add.sprite(280, 100, 'btGameOver');
    var btRank = game.add.sprite(340, 310, 'btRanking');

    var style = { font: "28px Arial Bold", fill: "#ffffff" };

    if (score > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", score);
        var text = game.add.text(460, 240, 'Novo Record: ' + localStorage.getItem("highscore"), style);
        text.anchor.setTo(0.5, 0.5);
    }
    else {
        var text = game.add.text(460, 240, 'Pontuação: ' + score, style);
        text.anchor.setTo(0.5, 0.5);
        var text = game.add.text(450, 290, 'Record: ' + localStorage.getItem("highscore"), style);
        text.anchor.setTo(0.5, 0.5);
    }  

    var spacebar_keyboar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar_keyboar.onDown.add(start, this);
}


// Começa o jogo
function start() {
    score = 0;
    console.log("menu start");
    game.state.start('fase');
}
