var mainMenu = { create: create, update: update, start: start };

function create() {
	mainMenu = game.add.sprite(0, 0, 'startMenuSprite');
	mainMenu.animations.add('start',[0,1,2,3,3,4,4,0],1.2,true);
	mainMenu.animations.play('start');
	
	musicMenu = game.add.audio('noise');
	musicMenu.play('',0,1,true);
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