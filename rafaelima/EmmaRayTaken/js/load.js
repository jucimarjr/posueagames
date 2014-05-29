var load_state = { preload: preload, create: create};

//Carregar todos os assets
function preload() {
	game.load.image('splash_screen', 'assets/splashscreen_960-600.png');
	game.load.image('loading', 'assets/splashscreenloading_199-58.png');
}

function create() {

	game.add.sprite(0, 0, 'splash_screen');
	game.add.sprite(387, 490, 'loading');

	game.load.image('background1', 'assets/background1_960-600.png');

	game.load.onLoadComplete.add(loadComplete, this);
	game.load.start();
}

function loadComplete() {
	game.state.start('play');
}