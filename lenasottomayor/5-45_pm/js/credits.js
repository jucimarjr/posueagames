var creditsGame = { create: create, update: update };

function create() {
	credit = game.add.sprite(0, 0, 'creditscreen');
}

function update() {
	var keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
    keyC.onDown.add(menu, this);
}

function menu() {
	game.state.start('menu');
}