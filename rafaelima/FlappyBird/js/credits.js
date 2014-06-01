var credits_state = { create: create, update: update };
	
function create() {
	game.add.sprite(0, 0, 'splash_screen');
	game.add.sprite(275, 466, 'credits');
}

function update() {
	var backspace_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	backspace_key.onDown.add(menu, this);
	
	if (game.input.mousePointer.isDown){
		menu();
	}
}

function menu() {
	game.state.start('menu');
}
