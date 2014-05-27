var GameMenu = { preload: preload, create: create, start: start};

function preload() {
    //Imagens
    game.load.image('river', 'assets/bg/river_512-1200.jpeg');
    game.load.image('jungleLeft', 'assets/bg/jungleLeft_196-1200.jpg');
    game.load.image('jungleRight', 'assets/bg/jungleRight_196-1200.jpg');
    game.load.image('mainScore', 'assets/botoes/score_900-110.png');
    game.load.image('record', 'assets/botoes/score_250-100.png');
    game.load.image('logo', 'asets/bg/logo.png');
    game.load.image('logoBarra', 'assets/bg/logo_barra-160-64.png');
    game.load.image('initBg', 'assets/bg/initBg_900-600.jpg');

    //Sprites
    game.load.spritesheet('canoeman', 'assets/sprite/canoeman/canoeman_50-100-20.png', 50, 100, 20);
    game.load.spritesheet('alligator', 'assets/sprite/enemies/alligator_64-43-10.png', 64, 43, 10);
    game.load.spritesheet('boto', 'assets/sprite/enemies/boto_80-67-10.png', 80, 67, 10);
    game.load.spritesheet('sand', 'assets/sprite/enemies/sand_76-25-4.png', 76, 25, 4);
    game.load.spritesheet('trunk', 'assets/sprite/enemies/trunk_64-42-4.png', 64, 42, 4);
    game.load.spritesheet('timer', 'assets/botoes/timer-1500-369.png', 150,369,10);    
    game.load.spritesheet('btIniciar', 'assets/botoes/iniciar_350-120.png', 350, 120, 2);
    game.load.spritesheet('btCredits', 'assets/botoes/creditos_350-120.png', 350, 120, 2);

    // Sons
    game.load.audio('remosound', 'songs/remada.mp3');
    game.load.audio('explodesound', 'songs/explode.mp3');
    game.load.audio('botosound', 'songs/boto.mp3');
    game.load.audio('alligatorsound', 'songs/alligator.wav');
}

//Tela de Menu
function create() {
    var initBg = game.add.sprite(0, 0, 'initBg');

    var bt_iniciar = game.add.button(450, 365, 'btIniciar', start, this, 1, 0, 1);
    bt_iniciar.anchor.set(0.5, 0.5);

    var bt_tutorial = game.add.button(450, 500, 'btCredits', credits, this, 1, 0, 1);
    bt_tutorial.anchor.set(0.5, 0.5);
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

