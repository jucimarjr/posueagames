var mainMenu = { create: create, update: update, start: start };

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
	game.state.start('playGame');
}

function credits() {
	game.state.start('credits');
}