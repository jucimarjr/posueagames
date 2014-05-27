var loadGame = { preload: preload, create: create };

function preload() {
	game.load.spritesheet('startMenuSprite', 'assets/startspritesheet_4800-600-5.png', 960,600);
	game.load.spritesheet('player', 'assets/manspritesshet_416-131-4.png', 104,131);
	game.load.image('creditscreen', 'assets/creditscreen_960-600.png');
	game.load.image('startscreen', 'assets/startscreen_960-600.png');
	game.load.image('obstacle', 'assets/Obstacle_129-482.png');
	game.load.image('obstacleTop', 'assets/obstacletop_129-27.png');
	game.load.image('instructions', 'assets/instructions_960-600.png');
	game.load.image('background', 'assets/background_980-600.png');
	game.load.image('plataform', 'assets/exitplatform_500-160.png');
	game.load.image('computer', 'assets/computer_400-176.png');
	game.load.image('scorescreen', 'assets/scorescreen_960-600.png');
	game.load.bitmapFont('font', 'assets/Font.png', 'assets/Font.fnt');
	game.load.audio('music', 'assets/AirDucts.wav');
	game.load.audio('jumpSound', 'assets/blip.wav');
	game.load.audio('noise', 'assets/noise.wav');
	game.load.audio('deadSound', 'assets/failure.wav');
}

function create() {
    game.state.start('menu');
}