var gameInstructions = { create: create, update: update };

function create() {

	instructions = game.add.sprite(0, 0,'instructions');
	
	timerInstructions  = game.time.create(false);
	
	timerInstructions.loop(2000, start, this);
	
	timerInstructions.start();
}

function start() {
	game.state.start('playGame');
}