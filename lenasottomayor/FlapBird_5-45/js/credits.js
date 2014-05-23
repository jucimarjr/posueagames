var credits = { create: create, update: update };

function create() {
	credit = game.add.sprite(0, 0, 'finalCredits');
}

function update() {
	var keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
    keyC.onDown.add(credits, this);
}

function menu() {
	game.state.start(MENU);
}