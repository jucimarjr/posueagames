var loadGame = { preload: preload, create: create };

function preload() {
	game.load.image('startMenu', 'assets/5_45_start_screen_960-600.jpg');
	game.load.image('finalCredits', 'assets/5_45_start_screen_960-600.jpg');
	game.load.image('score', 'assets/5_45_game_score_960-600.jpg');
	game.load.image('obstacle', 'assets/Obstacle_129-509.png');
	game.load.spritesheet('player', 'assets/manspritesshet_485-131-4.png', 121.25,131);
	game.load.image('sky', 'assets/sky_1920-600.png');
}

function create() {
    game.state.start(MENU);
}