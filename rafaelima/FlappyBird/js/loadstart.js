var loadstart_state = { preload: preload, create: create};

//Carregar todos os assets
function preload() {
	game.load.image('splash_screen1', 'assets/splash_screen.png');
	game.load.image('loading1', 'assets/splash_screen_loading.png');
}

function create() {
	game.add.sprite(0, 0, 'splash_screen1');
	game.add.sprite(387, 490, 'loading1');
	game.load.image('splash_screen', 'assets/splash_screen.png');
	game.load.image('button_play', 'assets/menu_play.png');
	game.load.image('button_credits', 'assets/menu_credits.png');
	game.load.image('cloud_selector', 'assets/splash_selector.png');
	game.load.audio('menuMusic', ['sound/menu_sound.ogg', 'sound/menu_sound.mp3']);

	game.load.onLoadComplete.add(loadComplete, this);
	game.load.start();
}

function loadComplete() {
	if (this.cache.isSoundDecoded('menuMusic'){
		game.state.start('menu');
	}
}