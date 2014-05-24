var credits_state = { preload: preload, create: create, update: update };
	
function preload() {
	 game.load.image('splash_screen', 'assets/splash_screen.png');
	 game.load.image('credits', 'assets/splash_screen_credits.png');
}

function create() {
	game.add.sprite(0, 0, 'splash_screen');
	game.add.sprite(275, 466, 'credits');
}

function update() {
	var backspace_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	backspace_key.onDown.add(menu, this);
}

function menu() {
	game.state.start('menu');
}
