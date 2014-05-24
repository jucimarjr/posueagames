var preload_state = { create: create, preload: preload };

function preload () {
    game.load.image('background', 'assets/background_960-600.png');
    game.load.image('meteoro', 'assets/meteoro_120-135.png');
    game.load.image('meteoro2', 'assets/meteoro2_120-135.png');
    game.load.image('meteoro3', 'assets/meteoro3_120-135.png');
    game.load.image('meteoro4', 'assets/meteoro4_120-135.png');
    game.load.image('meteoro5', 'assets/meteoro5_120-135.png');
    game.load.image('meteoro6', 'assets/meteoro6_120-135.png');
    game.load.image('meteoro7', 'assets/meteoro7_120-135.png');
    game.load.image('meteoro8', 'assets/meteoro8_120-135.png');
    game.load.image('telaInicio', 'assets/tela_incial1_960-600.png');
    game.load.image('tardis', 'assets/tardis_77-110.png');
    game.load.audio('inicio','sounds/DrWTheme.mp3');
    game.load.audio('musica','sounds/DWGame.mp3');
}

function create() {
    game.state.start('Inicial');
}