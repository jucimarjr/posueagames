var load_state = { preload: preload, create: create };

	//Carregar todos os assets
    function preload() {
        game.load.image('background', 'assets/background_960_600.png');
        game.load.spritesheet('player', 'assets/suu_208_89_4.png', 208, 89);
        game.load.spritesheet('death', 'assets/falling_208_89_2.png', 208, 89);
        game.load.spritesheet('boss', 'assets/badboss_258_371_2.png', 258, 371);
        game.load.spritesheet('bossbg', 'assets/layer_vilao.png', 258, 371);
        game.load.image('background1', 'assets/background1.png');
        game.load.image('background2', 'assets/background2.png');
        game.load.image('background3', 'assets/background3.png');
        game.load.image('background4', 'assets/background4.png');
        game.load.image('background5', 'assets/background5.png');
		game.load.audio('flap_song', 'assets/flap.wav');
		game.load.image('logo', 'assets/logo_547_421.png');
		game.load.spritesheet('powerup1', 'assets/powerup01_55_94_4.png', 55, 94);
		game.load.spritesheet('powerup2', 'assets/powerup02_55_94_4.png', 55, 94);
		game.load.spritesheet('powerup3', 'assets/powerup03_55_94_4.png', 55, 94);
		game.load.spritesheet('powerup4', 'assets/powerup04_55_94_4.png', 55, 94);
		game.load.image('obstacle1', 'assets/obstacle_01.png');
		game.load.image('obstacle2', 'assets/obstacle_02.png');
		game.load.image('obstacle3', 'assets/obstacle_03.png');
		game.load.image('obstacle4', 'assets/obstacle_04.png');
    }

    function create() {
        game.state.start('menu');
    }