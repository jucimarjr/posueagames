var preload_state = { create: create, preload: preload };

function preload() {
    game.load.image('background', 'assets/background_960-600.png');
    game.load.image('stars', 'assets/estrelas_960-600.png');
    game.load.image('meteor1', 'assets/meteoro1_135-120.png');
    game.load.image('meteor2', 'assets/meteoro2_135-120.png');
    game.load.image('meteor3', 'assets/meteoro3_135-120.png');
    game.load.image('meteor4', 'assets/meteoro4_135-120.png');
    game.load.image('meteor5', 'assets/meteoro5_135-120.png');
    game.load.image('meteor6', 'assets/meteoro6_135-120.png');
    game.load.image('meteor7', 'assets/meteoro7_135-120.png');
    game.load.image('meteor8', 'assets/meteoro8_135-120.png');
    game.load.spritesheet('tardis', 'assets/tardis_455-110.png', 91, 110);
    game.load.image('telaInicio', 'assets/tela_incial1_960-600.png');
    game.load.audio('inicio','sounds/DrWTheme.mp3');
    game.load.audio('musica','sounds/DWGame.mp3');
}

function create() {
    game.state.start('Inicial');
}