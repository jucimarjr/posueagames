var gameScore = { create: create, update:update };


function create() {
    score= game.add.sprite(0, 0, 'score');   
    var text = game.add.bitmapText(545, 345, 'Font', '00', 90);  	
}
    
function update(){
	var keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySpacebar.onDown.add(start, this);
}
function start() {
	game.state.start('playGame');
}