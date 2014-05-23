var menu = { create: create, update: update, start: start };

function create() {
	var mainMenu = game.add.sprite(0, 0, 'startMenu');
}

function update(){
	var keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySpacebar.onDown.add(start, this);
    
    var keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
    keyC.onDown.add(credits, this);
}

function start() {
	game.state.start(GAME_PLAY);
}

function credits() {
	game.state.start(GAME_CREDITS);
}