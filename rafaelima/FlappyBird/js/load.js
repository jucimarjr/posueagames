var load_state = { preload: preload, create: create};

//Carregar todos os assets
function preload() {
	game.load.image('splash_screen', 'assets/splash_screen.png');
	game.load.image('loading', 'assets/splash_screen_loading.png');
}

function create() {

	game.add.sprite(0, 0, 'splash_screen');
	game.add.sprite(387, 490, 'loading');

	game.load.audio('flap_song', ['sound/wind.wav', 'sound/wind.mp3']);
	game.load.audio('menuMusic', ['sound/menu_sound.ogg', 'sound/menu_sound.mp3']);
	game.load.audio('gameMusic', ['sound/game_sound.ogg', 'sound/game_sound.mp3']);
	game.load.image('splash_screen', 'assets/splash_screen.png');
	game.load.image('button_play', 'assets/menu_play.png');
	game.load.image('button_credits', 'assets/menu_credits.png');
	game.load.image('splash_screen_space', 'assets/splash_screen_space.png');
	game.load.image('cloud_selector', 'assets/splash_selector.png');
	game.load.image('credits', 'assets/splash_screen_credits.png');
	game.load.spritesheet('player', 'assets/suu_208_89_4.png', 208, 89);
	game.load.spritesheet('death', 'assets/falling_208_89_2.png', 208, 89);
	game.load.spritesheet('boss', 'assets/badboss_258_371_2.png', 258, 371);
	game.load.spritesheet('bossinv', 'assets/badboss_inverted_258_307_2.png', 258, 307);
	game.load.image('background1', 'assets/background1.png');
	game.load.image('background2', 'assets/background2.png');
	game.load.image('background3', 'assets/background3.png');
	game.load.image('background4', 'assets/background4.png');
	game.load.image('background5', 'assets/background5.png');
	game.load.spritesheet('explosion', 'assets/explosion_103_103_5.png', 103, 103);
	game.load.spritesheet('powerup1', 'assets/powerup01_55_94_4.png', 55, 94);
	game.load.spritesheet('powerup2', 'assets/powerup02_55_94_4.png', 55, 94);
	game.load.spritesheet('powerup3', 'assets/powerup03_55_94_4.png', 55, 94);
	game.load.spritesheet('powerup4', 'assets/powerup04_55_94_4.png', 55, 94);
	game.load.image('obstacle1', 'assets/obstacle_01.png');
	game.load.image('obstacle2', 'assets/obstacle_02.png');
	game.load.image('obstacle3', 'assets/obstacle_03.png');
	game.load.image('obstacle4', 'assets/obstacle_04.png');
	game.load.image('scorebg', 'assets/placeholder.png');
	game.load.image('tutorial', 'assets/tutorial_screen.png');

	game.load.onLoadComplete.add(loadComplete, this);
	game.load.start();
}

function loadComplete() {
	game.state.start('menu');
}