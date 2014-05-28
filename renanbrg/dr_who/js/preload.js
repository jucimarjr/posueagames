var preload_state = { create: create, preload: preload };

function preload() {
    game.load.image('background', 'assets/background_960-600.png');
    game.load.image('stars', 'assets/stars_960-600.png');
    game.load.image('meteor1', 'assets/meteor1_135-120.png');
    game.load.image('meteor2', 'assets/meteor2_135-120.png');
    game.load.image('meteor3', 'assets/meteor3_135-120.png');
    game.load.image('meteor4', 'assets/meteor4_135-120.png');
    game.load.image('meteor5', 'assets/meteor5_135-120.png');
    game.load.image('meteor6', 'assets/meteor6_135-120.png');
    game.load.image('meteor7', 'assets/meteor7_135-120.png');
    game.load.image('meteor8', 'assets/meteor8_135-120.png');
    game.load.spritesheet('tardis', 'assets/tardissheet_600-110.png', 75, 110);
    game.load.spritesheet('telaInicial', 'assets/spritesheet_tela_inicial_7680-600.png', 7680, 600);
    game.load.spritesheet('telaInicial1', 'assets/spritesheet_telainicial1_1920-600.png', 960, 600);
    game.load.image('telaInicio', 'assets/tela_incial1_960-600.png');
    game.load.image('telaInicio2', 'assets/tela_incial2_960-600.png');
    game.load.image('telaInicio3', 'assets/tela_incial3_960-600.png');
    game.load.image('telaInicio4', 'assets/tela_incial4_960-600.png');
    game.load.image('telaInicio5', 'assets/tela_incial5_960-600.png');
    game.load.image('startButton', 'assets/startbutton_345-264.png');
    game.load.image('imagemExibicao', 'assets/imagem_exibicao_600-480.png');
    game.load.image('telaFim', 'assets/game_over_960-600.png');
    game.load.image('victoryImage', 'assets/win_960-600.png');
    game.load.image('powerup', 'assets/powerup_50-50.png');
    game.load.image('credits', 'assets/credit_960-600.png');
    game.load.audio('inicio','sounds/drwtheme.mp3');
    game.load.audio('musica','sounds/dwgame.mp3');
    game.load.audio('tardisSound','sounds/tardissounds.mp3');
}

function create() {
    game.state.start('Inicial');
}
