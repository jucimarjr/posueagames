var load = { preload: preload, create: create };

var music;

//Carregar todos os assets
function preload() {
    game.load.image('loading', 'assets/bg/loading_900-600.jpg');
}

function create() {
    game.add.sprite(0, 0, 'loading');

    // Sons
    game.load.audio('remosound', 'songs/remada.mp3');
    game.load.audio('explodesound', 'songs/explode.mp3');
    game.load.audio('botosound', 'songs/boto.mp3');
    game.load.audio('alligatorsound', 'songs/alligator.mp3');
    game.load.audio('fundosound', 'songs/canoeman.mp3');
    if (startSound == true) {
        initSound();
    }

    //Imagens - Menu
    game.load.image('initBg', 'assets/bg/initBg_900-600.jpg');

    //Sprites - Menu
    game.load.spritesheet('btIniciar', 'assets/botoes/iniciar_350-120.png', 350, 120, 2);
    game.load.spritesheet('btCredits', 'assets/botoes/creditos_350-120.png', 350, 120, 2);

    //Imagens - Fase
    game.load.image('river', 'assets/bg/river_512-1200.jpeg');
    game.load.image('jungleLeft', 'assets/bg/jungleLeft_196-1200.jpg');
    game.load.image('jungleRight', 'assets/bg/jungleRight_196-1200.jpg');
    game.load.image('mainScore', 'assets/botoes/score_900-110.png');
    game.load.image('record', 'assets/botoes/score_250-100.png');
    game.load.image('logo', 'assets/bg/logo.png');
    game.load.image('logoBarra', 'assets/bg/logo_barra-160-64.png');

    //Sprites - Fase
    game.load.spritesheet('canoeman', 'assets/sprite/canoeman/canoeman_50-100-20.png', 50, 100, 20);
    game.load.spritesheet('alligator', 'assets/sprite/enemies/alligator_64-43-10.png', 64, 43, 10);
    game.load.spritesheet('boto', 'assets/sprite/enemies/boto_80-67-10.png', 80, 67, 10);
    game.load.spritesheet('sand', 'assets/sprite/enemies/sand_76-25-4.png', 76, 25, 4);
    game.load.spritesheet('trunk', 'assets/sprite/enemies/trunk_64-42-4.png', 64, 42, 4);
    game.load.spritesheet('timer', 'assets/botoes/timer-1500-369.png', 150, 369, 10);
    game.load.spritesheet('sound', 'assets/botoes/sound_50-35.png', 50, 35, 2);
    game.load.spritesheet('mute', 'assets/botoes/mute_50-35.png', 50, 35, 2);
    game.load.spritesheet('full', 'assets/botoes/fullscreen_50-35.png', 50, 35, 2);

    //Imagens -- GameOver
    game.load.image('splashscreen', 'assets/bg/gameover_900-600.jpg');
    game.load.image('btGameOver', 'assets/botoes/gameover_350-280.png');
    game.load.image('btRanking', 'assets/botoes/rank_100-70.png');
    game.load.image('logoMain', 'assets/bg/logo.png');

    //Sprites - GameOver
    game.load.spritesheet('play', 'assets/botoes/play_100-70.png', 100, 70, 2);
    game.load.spritesheet('canoemandead', 'assets/sprite/gameover/canoeiro_138-146-13.png', 138, 146, 13);

    //Imagens - Historia
    game.load.image('inicio', 'assets/bg/history/1.jpg');
    game.load.image('meio', 'assets/bg/history/2.jpg');
    game.load.image('fim', 'assets/bg/history/3.jpg');

    //Imagesn Game Win
    game.load.image('bgGameWin', 'assets/bg/history/4.jpg');
    game.load.spritesheet('mapinguari', 'assets/sprite/mapinguari/mapinguari_71-77-6.png', 71, 77, 6);

    game.load.image('initCredits', 'assets/bg/creditos_900_600.jpg');
    game.load.spritesheet('backBtn', 'assets/botoes/back_350-120.png', 350, 120);

    //json
    game.load.physics('physicsData', 'assets/sprite/canoeman/canoeman.json');

    game.load.onLoadComplete.add(loadComplete, this);
    game.load.start();
}

function loadComplete() {
    game.state.start('menu');
}

function initSound() {
    music = game.add.audio('fundosound', 1, true);
    music.play('', 0, 1, true);
    startSound = false;
}