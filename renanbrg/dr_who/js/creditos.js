var creditos_state = { create: create, update: update};

function create () {
	creditsSprite = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'credits');  
}

function update () {
	if (game.input.keyboard.isDown(Phaser.Keyboard.B)) {
	game.state.start('Inicio');
	}
}
