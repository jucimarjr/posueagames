var load_state = { preload: preload, create: create };

	//Carregar todos os assets
    function preload() {
        game.load.image('background', 'assets/background_960_600.png');
        game.load.image('obstacle2', 'assets/obstacle2_154_42_03.png');
        game.load.spritesheet('billy', 'assets/smoker_76_90_3.png', 76, 90);
        game.load.image('background1', 'assets/background1.png');
        game.load.image('background2', 'assets/background2.png');
        game.load.image('background3', 'assets/background3.png');
        game.load.image('background4', 'assets/background4.png');
		game.load.audio('flap_song', 'assets/flap.wav');
    }

    function create() {
        game.state.start('play');
    }


//var main_state = { preload: preload, create: create, update: update };
//game.state.add('main', main_state);
//game.state.start('main');