var load_state = { preload: preload, create: create};

//Carregar todos os assets
function preload() {
	game.load.image('splash_screen', 'assets/splash_screen.png');
	game.load.image('loading', 'assets/splash_screen_loading.png');
}

function create() {

	game.add.sprite(0, 0, 'splash_screen');
	game.add.sprite(387, 490, 'loading');

	game.load.onLoadStart.add(loadStart, this);
	game.load.onFileComplete.add(fileComplete, this);
	game.load.onLoadComplete.add(loadComplete, this);

	music.pause();
	start();
}

function start() {
	game.load.crossOrigin = "Anonymous";
	game.load.spritesheet('player', 'assets/suu_208_89_4.png', 208, 89);
	game.load.spritesheet('death', 'assets/falling_208_89_2.png', 208, 89);
	game.load.spritesheet('boss', 'assets/badboss_258_371_2.png', 258, 371);
	game.load.image('background1', 'assets/background1.png');
	game.load.image('background2', 'assets/background2.png');
	game.load.image('background3', 'assets/background3.png');
	game.load.image('background4', 'assets/background4.png');
	game.load.image('background5', 'assets/background5.png');
	game.load.audio('flap_song', 'assets/flap.wav');
	game.load.spritesheet('explosion', 'assets/explosion_103_103_5.png', 103, 103);
	game.load.spritesheet('powerup1', 'assets/powerup01_55_94_4.png', 55, 94);
	game.load.spritesheet('powerup2', 'assets/powerup02_55_94_4.png', 55, 94);
	game.load.spritesheet('powerup3', 'assets/powerup03_55_94_4.png', 55, 94);
	game.load.spritesheet('powerup4', 'assets/powerup04_55_94_4.png', 55, 94);
	game.load.image('obstacle1', 'assets/obstacle_01.png');
	game.load.image('obstacle2', 'assets/obstacle_02.png');
	game.load.image('obstacle3', 'assets/obstacle_03.png');
	game.load.image('obstacle4', 'assets/obstacle_04.png');
	game.load.physics('physicsData', 'assets/polygon.json');
	game.load.image('scorebg', 'assets/placeholder.png');
	game.load.audio('gameMusic', ['sound/game_sound.wav', 'sound/game_sound.mp3']);

	game.load.start();
}

function loadStart() {
//	text.setText("Loading ...");
}

//This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
//	game.state.start('menu');
}

function loadComplete() {
	game.state.start('play');
}