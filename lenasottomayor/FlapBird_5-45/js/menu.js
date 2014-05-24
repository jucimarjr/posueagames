var mainMenu = { create: create, update: update, start: start };

function create() {
	var mainMenu = game.add.sprite(0, 0, 'startMenu');
	this.noise = game.add.audio('noise');
    this.noise.play('',0,1,true);

   
	mainMenu.animations.add('start');
	mainMenu.animations.play('start',Phaser.Animation.generateFrameNames('startscreen',0,1,1,2,2,0,3,4,40),48,true);
}

function update(){
	var keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySpacebar.onDown.add(start, this);
    
    var keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
    keyC.onDown.add(credits, this);
}

function start() {
	this.noise.pause();
	game.state.start('playGame');
}

function credits() {
	this.noise.pause();
	game.state.start('credits');
}