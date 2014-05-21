var load_state = { preload: preload, create: create };

	//Carregar todos os assets
    function preload() { 
    	game.load.image('background', 'assets/background_960_600.png');
		game.load.image('ground', 'assets/ground_960_28.png');
		game.load.image('obstacle1', 'assets/obstacle1_167_42_03.png');
		game.load.image('obstacle2', 'assets/obstacle2_154_42_03.png');
		game.load.spritesheet('life', 'assets/heart_35_28_2.png', 35,28);
		game.load.spritesheet('billy', 'assets/smoker_76_90_3.png', 76,90);
		game.load.audio('flap_song', 'assets/flap.wav');
    }

    function create() {
        game.state.start('menu');
    }


//var main_state = { preload: preload, create: create, update: update };
//game.state.add('main', main_state);
//game.state.start('main');