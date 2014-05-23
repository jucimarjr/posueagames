var mainMenu = { create: create, update: update, start: start };

function create() {
	var mainMenu = game.add.sprite(0, 0, 'startMenu');
	//mainMenu.animations.add('start');
	//mainMenu.animations.play('start',Phaser.Animation.generateFrameNames('startscreen',0,1,1,2,2,0,3,4,40),48,true);
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