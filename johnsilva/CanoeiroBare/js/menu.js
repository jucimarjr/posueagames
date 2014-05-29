var GameMenu = {create: create };

var music;
var toggle = false;
var bt_sound;


//Tela de Menu
function create() {
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //game.input.onDown.add(gofull, this);
    //if (startSound == true) {
    //    initSound();
    //}

    var initBg = game.add.sprite(0, 0, 'initBg');

    var bt_iniciar = game.add.button(450, 365, 'btIniciar', start, this, 1, 0, 1);
    bt_iniciar.anchor.set(0.5, 0.5);

    var bt_tutorial = game.add.button(450, 500, 'btCredits', credits, this, 1, 0, 1);
    bt_tutorial.anchor.set(0.5, 0.5);

    bt_sound = game.add.button(850, 0, 'sound', pause, this, 1, 0, 1);
}

function initSound() {
    music = game.add.audio('fundosound', 1, true);
    music.play('', 0, 1, true);
    startSound = false;
}

function gofull() {
    game.scale.startFullScreen();
}

function pause() {
    if (toggle) {
        music.resume();
        toggle = false;
        bt_sound = game.add.button(850, 0, 'sound', pause, this, 1, 0, 1);
    }
    else {
        music.pause();
        toggle = true;
        bt_sound = game.add.button(850, 0, 'mute', pause, this, 1, 0, 1);
    }
}

// Começa o jogo
function start() {
    console.log("menu start");
    game.state.start('fase');
}

function credits() {
    console.log("credits");
    game.state.start('credits');
}

