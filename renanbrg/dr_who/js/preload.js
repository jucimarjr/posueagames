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
    game.load.spritesheet('tardis', 'assets/tardissheet_600-110.png', 75, 110);
    game.load.spritesheet('telaInicial', 'assets/spriteSheetTelaInicial_7680-600.png', 7680, 600);
    game.load.spritesheet('telaInicial1', 'assets/spriteSheetTelaInicial1_1920-600.png', 960, 600);
    game.load.image('telaInicio', 'assets/tela_incial1_960-600.png');
    game.load.image('telaInicio2', 'assets/tela_incial2_960-600.png');
    game.load.image('telaInicio3', 'assets/tela_incial3_960-600.png');
    game.load.image('telaInicio4', 'assets/tela_incial4_960-600.png');
    game.load.image('telaInicio5', 'assets/tela_incial5_960-600.png');
    game.load.image('startButton', 'assets/startbutton_345-264.png');
    game.load.image('imagemExibicao', 'assets/ImagemDeExibicao_600-480.png');
    game.load.image('telaFim', 'assets/game_over_960-600.png');
    game.load.image('victoryImage', 'assets/win_960-600.png');
    game.load.image('powerup', 'assets/powerup_50-50.png');
    game.load.image('credits', 'assets/credit_960-600.png');
    game.load.audio('inicio','sounds/DrWTheme.mp3');
    game.load.audio('musica','sounds/DWGame.mp3');
    game.load.audio('tardisSound','sounds/TARDISsounds.mp3');
}

function create() {
    game.state.start('Inicial');
}