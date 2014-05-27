var mainMenu = { create: create, update: update };

function create() {
	mainMenu = game.add.sprite(0, 0, 'startMenuSprite');
	mainMenu.animations.add('start',[0,1,2,3,4],1.2,true);
	mainMenu.animations.play('start');
	
	musicMenu = game.add.audio('noise');
	musicMenu.play('',0,0.3,true);
}

function update(){
	var keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySpacebar.onDown.add(startInstructions, this);
    
    var keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
    keyC.onDown.add(credits, this);
	
	var mouseClick = game.input.activePointer.isDown;
	
	if(mouseClick){
		startInstructions();
	}
	
}

function startInstructions() {
	game.state.start('gameInstructions');
}

function credits() {
	game.state.start('credits');
}