var load_state = { preload: preload, create: create};

//Carregar todos os assets
function preload() {
	game.load.image('splash_screen', 'assets/splashscreen_960-600.png');
	game.load.image('loading', 'assets/splashscreenloading_199-58.png');
}

function create() {

	game.add.sprite(0, 0, 'splash_screen');
	game.add.sprite(387, 490, 'loading');

	game.load.audio('flap_song', ['sound/wind.wav', 'sound/wind.mp3']);
	game.load.audio('menuMusic', ['sound/menu_sound.ogg', 'sound/menu_sound.mp3']);
	game.load.audio('gameMusic', ['sound/game_sound.ogg', 'sound/game_sound.mp3']);
	game.load.image('splash_screen', 'assets/splashscreen_960-600.png');
	game.load.image('button_play', 'assets/menuplay_88-53.png');
	game.load.image('button_credits', 'assets/menucredits_128-53.png');
	game.load.image('splash_screen_space', 'assets/splashscreenspace_127-15.png');
	game.load.image('cloud_selector', 'assets/splashselector_326-34.png');
	game.load.image('credits', 'assets/splashscreencredits_393-109.png');
	game.load.spritesheet('player', 'assets/suu_208-89-4.png', 208, 89);
	game.load.spritesheet('death', 'assets/falling_208-89-2.png', 208, 89);
	game.load.spritesheet('boss', 'assets/badboss_258-371-2.png', 258, 371);
	game.load.spritesheet('bossinv', 'assets/badboss_inverted_258-307-2.png', 258, 307);
	game.load.image('background1', 'assets/background1_960-600.png');
	game.load.image('background2', 'assets/background2_2449-510.png');
	game.load.image('background3', 'assets/background3_1152-240.png');
	game.load.image('background4', 'assets/background4_1152-240.png');
	game.load.image('background5', 'assets/background5_960-600.png');
	game.load.spritesheet('explosion', 'assets/explosion_103-103-5.png', 103, 103);
	game.load.spritesheet('powerup1', 'assets/powerup01_55-94-4.png', 55, 94);
	game.load.spritesheet('powerup2', 'assets/powerup02_55-94-4.png', 55, 94);
	game.load.spritesheet('powerup3', 'assets/powerup03_55-94-4.png', 55, 94);
	game.load.spritesheet('powerup4', 'assets/powerup04_55-94-4.png', 55, 94);
	game.load.image('obstacle1', 'assets/obstacle01_245-95.png');
	game.load.image('obstacle2', 'assets/obstacle02_245-95.png');
	game.load.image('obstacle3', 'assets/obstacle03_162-275.png');
	game.load.image('obstacle4', 'assets/obstacle04_251-175.png');
	game.load.image('scorebg', 'assets/placeholder_960-600.png');
	game.load.image('tutorial', 'assets/tutorialscreen_960-600.png');

	game.load.onLoadComplete.add(loadComplete, this);
	game.load.start();
}

function loadComplete() {
	game.state.start('menu');
}