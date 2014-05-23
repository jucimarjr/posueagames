var gameScore = { create: create, update:update };

function create() {
    score= game.add.sprite(0, 0, 'score');     	
}
    
function update(){
	var keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySpacebar.onDown.add(start, this);
}
function start() {
	game.state.start('playGame');
}