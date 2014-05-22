var load_state = { preload: preload, create: create };

	//Carregar todos os assets
    function preload() {
        game.load.image('background', 'assets/background_960_600.png');
        game.load.image('obstacle2', 'assets/obstacle2_154_42_03.png');
        game.load.spritesheet('player', 'assets/suu_208_89_4.png', 208, 89);
        game.load.spritesheet('dino', 'assets/dinossauro.png', 200, 160); //substituir por outra
        game.load.image('background1', 'assets/background1.png');
        game.load.image('background2', 'assets/background2.png');
        game.load.image('background3', 'assets/background3.png');
        game.load.image('background4', 'assets/background4.png');
        game.load.image('background5', 'assets/background5.png');
		game.load.audio('flap_song', 'assets/flap.wav');
		game.load.image('logo', 'assets/logo_547_421.png');
    }

    function create() {
        game.state.start('menu');
    }