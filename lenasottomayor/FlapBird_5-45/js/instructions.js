var gameInstructions = { create: create, update: update };

function create() {
	instructions = game.add.sprite(0, 0,'background');
	
	instructions = game.add.sprite(118, 204,'instructions');
	
	timerInstructions  = game.time.create(false);
	
	timerInstructions.loop(5000, start, this);
	
	timerInstructions.start();
}

function start() {
	game.state.start('playGame');
}